import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Generic Gravity Forms relay.
 *
 * The client posts a FormData payload containing:
 *   - `form_id`   — required, GF form ID
 *   - `input_<N>` — one entry per GF field ID
 *   - any honeypot field defined in the form
 *
 * The route picks up every `input_*` key and forwards as JSON to GF REST
 * (`POST /gf/v2/forms/<id>/submissions`) when credentials are configured.
 * Falls back to logging when GF env vars are unset so the UI flow keeps
 * working during local dev.
 *
 * To wire Gravity Forms REST:
 *   1. WP admin → Forms → Settings → REST API → enable v2.
 *   2. Create a REST API key (consumer key + secret).
 *   3. Set in ure-frontend/.env.local:
 *        GF_BASE_URL  = http://localhost/projects/ure-cms/web/wp-json/gf/v2
 *        GF_REST_USER = <consumer key>
 *        GF_REST_PASS = <consumer secret>
 */
export async function POST(req: Request) {
  const fd = await req.formData();

  const formId = String(fd.get("form_id") ?? "").trim();
  if (!formId) {
    return NextResponse.json({ ok: false, error: "missing_form_id" }, { status: 400 });
  }

  // Collect every `input_<n>` field from the FormData. Anything else is
  // ignored — GF only cares about `input_values`.
  const input_values: Record<string, string> = {};
  for (const [key, value] of fd.entries()) {
    if (!/^input_\d+$/.test(key)) continue;
    input_values[key] = typeof value === "string" ? value : "";
  }

  const base = process.env.GF_BASE_URL;
  const user = process.env.GF_REST_USER;
  const pass = process.env.GF_REST_PASS;

  if (base && user && pass) {
    const auth = Buffer.from(`${user}:${pass}`).toString("base64");
    const res = await fetch(`${base.replace(/\/$/, "")}/forms/${formId}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Basic ${auth}`,
      },
      body: JSON.stringify({ input_values }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.warn("[contact] GF submission failed", res.status, body);
      return NextResponse.json({ ok: false, gf: body }, { status: 502 });
    }
    // GF returns { is_valid, confirmation_message, ... } even on success.
    if (body?.is_valid === false) {
      return NextResponse.json({ ok: false, gf: body }, { status: 422 });
    }
    return NextResponse.json({ ok: true, gf: body });
  }

  console.log("[contact] submission (no GF wired):", { form_id: formId, input_values });
  return NextResponse.json({ ok: true });
}
