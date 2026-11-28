begin;

-- Separate from the legacy newsletter_subscribers table. No data is copied.
create table if not exists public.nd_newsletter_subscriptions (
  email text primary key,
  language text not null check (language in ('de', 'es')),
  status text not null check (status in ('pending', 'confirmed', 'unsubscribed')),
  requested_at timestamptz not null,
  consent_version text not null,
  consent_text text not null,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  token_hash text unique,
  expires_at timestamptz,
  revision bigint not null default 0,
  synced_revision bigint not null default 0,
  retry_at timestamptz not null default now(),
  lease_id uuid,
  lease_until timestamptz,
  check ((token_hash is null) = (expires_at is null)),
  check (status <> 'confirmed' or confirmed_at is not null)
);

create table if not exists public.nd_newsletter_consent (
  id bigint generated always as identity primary key,
  email text not null references public.nd_newsletter_subscriptions(email) on delete cascade,
  language text not null,
  consent_version text not null,
  consent_text text not null,
  requested_at timestamptz not null,
  confirmed_at timestamptz not null
);

create table if not exists public.nd_newsletter_limits (
  bucket text not null,
  window_start timestamptz not null,
  hits integer not null,
  primary key (bucket, window_start)
);

alter table public.nd_newsletter_subscriptions enable row level security;
alter table public.nd_newsletter_consent enable row level security;
alter table public.nd_newsletter_limits enable row level security;
revoke all on public.nd_newsletter_subscriptions, public.nd_newsletter_consent,
  public.nd_newsletter_limits from public, anon, authenticated;
grant select, insert, update, delete on public.nd_newsletter_subscriptions,
  public.nd_newsletter_consent, public.nd_newsletter_limits to service_role;
grant usage on sequence public.nd_newsletter_consent_id_seq to service_role;

-- Signup limits: 5 requests per IP per hour, 60 total per hour,
-- and at most one confirmation email per address every 15 minutes.
create or replace function public.nd_newsletter_request(
  p_email text, p_language text, p_hash text, p_bucket text, p_version text, p_text text
) returns boolean language plpgsql set search_path = '' as $$
declare
  v_now timestamptz := now();
  v_hour timestamptz := date_trunc('hour', v_now);
  v_hits integer;
begin
  insert into public.nd_newsletter_limits as limits values (p_bucket, v_hour, 1)
    on conflict (bucket, window_start) do update set hits = limits.hits + 1
    where limits.hits < 5 returning hits into v_hits;
  if not found then return false; end if;

  insert into public.nd_newsletter_limits as limits values ('global', v_hour, 1)
    on conflict (bucket, window_start) do update set hits = limits.hits + 1
    where limits.hits < 60 returning hits into v_hits;
  if not found then return false; end if;

  insert into public.nd_newsletter_subscriptions as subscriber
    (email, language, status, requested_at, token_hash, expires_at, consent_version, consent_text)
    values (p_email, p_language, 'pending', v_now, p_hash, v_now + interval '24 hours', p_version, p_text)
    on conflict (email) do update
    set language = excluded.language, requested_at = excluded.requested_at,
        token_hash = excluded.token_hash, expires_at = excluded.expires_at,
        consent_version = excluded.consent_version, consent_text = excluded.consent_text,
        status = case when subscriber.status = 'unsubscribed' then 'unsubscribed' else 'pending' end
    where subscriber.status <> 'confirmed' and
          subscriber.requested_at <= v_now - interval '15 minutes';
  return found;
end;
$$;

create or replace function public.nd_newsletter_confirm(
  p_hash text, p_language text
) returns boolean language plpgsql set search_path = '' as $$
declare
  v_sub public.nd_newsletter_subscriptions;
begin
  update public.nd_newsletter_subscriptions
    set status = 'confirmed', confirmed_at = now(), unsubscribed_at = null,
        token_hash = null, expires_at = null, revision = revision + 1, retry_at = now()
    where token_hash = p_hash and language = p_language and expires_at > now()
      and status in ('pending', 'unsubscribed')
    returning * into v_sub;
  if not found then return false; end if;
  insert into public.nd_newsletter_consent
    (email, language, consent_version, consent_text, requested_at, confirmed_at)
    values (v_sub.email, v_sub.language, v_sub.consent_version, v_sub.consent_text, v_sub.requested_at, v_sub.confirmed_at);
  return true;
end;
$$;

create or replace function public.nd_newsletter_unsubscribe(
  p_email text, p_at timestamptz
) returns void language sql set search_path = '' as $$
  update public.nd_newsletter_subscriptions
    set status = 'unsubscribed', unsubscribed_at = p_at, token_hash = null,
        expires_at = null, revision = revision + 1, retry_at = now()
    where email = p_email and status = 'confirmed'
      and confirmed_at <= p_at;
$$;

create or replace function public.nd_newsletter_claim(
  p_lease uuid
) returns table (email text, language text, status text, revision bigint)
language sql set search_path = '' as $$
  with ready as (
    select s.email from public.nd_newsletter_subscriptions as s
    where s.revision > s.synced_revision and s.retry_at <= now()
      and (s.lease_until is null or s.lease_until < now())
    order by (s.status = 'unsubscribed') desc, s.retry_at
    limit 1 for update skip locked
  )
  update public.nd_newsletter_subscriptions as s
    set lease_id = p_lease, lease_until = now() + interval '2 minutes'
    from ready where s.email = ready.email
    returning s.email, s.language, s.status, s.revision;
$$;

create or replace function public.nd_newsletter_finish(
  p_lease uuid, p_revision bigint, p_success boolean
) returns void language sql set search_path = '' as $$
  update public.nd_newsletter_subscriptions
    set synced_revision = case when p_success then greatest(synced_revision, p_revision) else synced_revision end,
        retry_at = case when revision = p_revision and not p_success
                   then now() + interval '5 minutes' else now() end,
        lease_id = null, lease_until = null
    where lease_id = p_lease;
$$;

create or replace function public.nd_newsletter_cleanup()
returns void language plpgsql set search_path = '' as $$
begin
  delete from public.nd_newsletter_limits where window_start < now() - interval '2 days';
  delete from public.nd_newsletter_subscriptions
    where status = 'pending' and expires_at < now() - interval '7 days';
  update public.nd_newsletter_subscriptions set token_hash = null, expires_at = null
    where status = 'unsubscribed' and expires_at <= now();
end;
$$;

revoke execute on function public.nd_newsletter_request(text,text,text,text,text,text),
  public.nd_newsletter_confirm(text,text), public.nd_newsletter_unsubscribe(text,timestamptz),
  public.nd_newsletter_claim(uuid), public.nd_newsletter_finish(uuid,bigint,boolean),
  public.nd_newsletter_cleanup() from public, anon, authenticated;
grant execute on function public.nd_newsletter_request(text,text,text,text,text,text),
  public.nd_newsletter_confirm(text,text), public.nd_newsletter_unsubscribe(text,timestamptz),
  public.nd_newsletter_claim(uuid), public.nd_newsletter_finish(uuid,bigint,boolean),
  public.nd_newsletter_cleanup() to service_role;

commit;
