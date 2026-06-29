import { NextResponse } from "next/server";
import { z } from "zod";
import { groupPackages } from "@/data/travel";
import { getPackageBySlug } from "@/utils/packages";

const schema = z.object({
  packageSlug: z.string().min(1),
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional()
});

const bookingTokenAmount = 1100;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid package payment request." }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Razorpay payment is not configured yet." }, { status: 503 });
  }

  const trip = getPackageBySlug(parsed.data.packageSlug);

  if (!trip) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  const basic = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const receipt = `mvmt_${trip.slug}_${Date.now()}`.slice(0, 40);

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: bookingTokenAmount * 100,
      currency: "INR",
      receipt,
      notes: {
        packageSlug: trip.slug,
        packageTitle: trip.title,
        customerName: parsed.data.customerName ?? "",
        customerEmail: parsed.data.customerEmail ?? ""
      }
    })
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ error: "Unable to start package payment." }, { status: 502 });
  }

  const order = (await response.json()) as { id: string; amount: number; currency: string };

  return NextResponse.json({
    order,
    keyId,
    packageTitle: trip.title,
    amount: bookingTokenAmount,
    packagesCount: groupPackages.length
  });
}
