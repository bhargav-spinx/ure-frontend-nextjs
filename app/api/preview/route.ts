import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path") || "/";

  const expected = process.env.WORDPRESS_REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // Whitelist same-origin paths only.
  if (!path.startsWith("/") || path.startsWith("//")) {
    return NextResponse.json({ ok: false, error: "invalid_path" }, { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(path);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";
  const draft = await draftMode();
  draft.disable();
  return NextResponse.json({ ok: true, redirected: path });
}
