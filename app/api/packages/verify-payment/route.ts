import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getPackageBySlug } from "@/utils/packages";

const schema = z.object({
  packageSlug: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payment response." }, { status: 400 });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Payment verification is not configured." }, { status: 503 });
  }

  const trip = getPackageBySlug(parsed.data.packageSlug);

  if (!trip) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  const expected = createHmac("sha256", secret)
    .update(`${parsed.data.razorpay_order_id}|${parsed.data.razorpay_payment_id}`)
    .digest("hex");

  const isValid =
    expected.length === parsed.data.razorpay_signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(parsed.data.razorpay_signature));

  if (!isValid) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    packageSlug: trip.slug,
    packageTitle: trip.title,
    paymentId: parsed.data.razorpay_payment_id
  });
}
