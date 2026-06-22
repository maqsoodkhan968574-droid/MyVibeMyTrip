import { NextResponse } from "next/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const parsed = forgotPasswordSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: true });
  }

  // Plug in an email provider and token table here for a full reset flow.
  return NextResponse.json({ ok: true });
}
