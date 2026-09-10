import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Receives the contact form.
 *
 * The form used to hand the visitor a mailto: link, which does nothing at
 * all for anyone on webmail or a machine with no mail client configured,
 * and fails silently when it fails. This posts to the site itself instead,
 * so the key stays on the server and a failure can actually be reported.
 *
 * Nothing is stored: the message is sent on as an email and forgotten.
 */

/** Long enough to be deliberate, short enough not to reject a fast typist. */
const MIN_FILL_MS = 3000;
const LIMITS = { name: 120, email: 200, message: 5000 };

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // A field no person can see and every naive bot fills in.
  if (clean(body.company, 200)) {
    // Answer as though it worked, so the bot has nothing to learn from.
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  // The browser validates too, but this endpoint is open to anyone.
  if (!name || !message || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.error("contact: RESEND_API_KEY or CONTACT_TO is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  try {
    const { error } = await new Resend(key).emails.send({
      // Resend's shared sender, which needs no domain of its own. It may
      // only deliver to the address that owns the account, which is exactly
      // where this is going.
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      // Replying to the notification replies to the person who wrote in.
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>\nSent from lucas-marley.vercel.app`,
    });

    if (error) {
      console.error("contact: resend refused the message", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: could not reach resend", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
