import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;
  if (secret) {
    const incoming = req.headers.get("x-revalidate-secret");
    if (incoming !== secret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  let body: { tags?: string[]; paths?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  for (const tag of body.tags ?? []) revalidateTag(tag, "max");
  for (const path of body.paths ?? []) revalidatePath(path);

  return NextResponse.json({ ok: true, revalidated: body, now: Date.now() });
}
