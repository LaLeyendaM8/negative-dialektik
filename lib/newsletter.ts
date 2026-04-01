type NewsletterLanguage = "de" | "es";

type NewsletterInsert = {
  email: string;
  language: NewsletterLanguage;
};

type NewsletterResult =
  | { status: "created" }
  | { status: "exists" }
  | { status: "not_configured" }
  | { status: "error" };

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

export async function storeNewsletterSubscription({
  email,
  language,
}: NewsletterInsert): Promise<NewsletterResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return { status: "not_configured" };
  }

  try {
    const response = await fetch(
      `${config.url}/rest/v1/newsletter_subscribers`,
      {
        method: "POST",
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=minimal",
        },
        body: JSON.stringify([
          {
            email,
            language,
          },
        ]),
        cache: "no-store",
      },
    );

    if (response.ok) {
      return { status: "created" };
    }

    if (response.status === 409) {
      return { status: "exists" };
    }

    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}
