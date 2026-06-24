import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const schema = z.object({ consultationId: z.string().min(1) });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid consultation." }, { status: 400 });
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return NextResponse.json({ error: "Payment is not configured yet." }, { status: 503 });
  const consultation = await prisma.consultation.findUnique({ where: { id: parsed.data.consultationId } });
  if (!consultation) return NextResponse.json({ error: "Consultation not found." }, { status: 404 });
  const basic = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/json" }, body: JSON.stringify({ amount: 110000, currency: "INR", receipt: consultation.id }) });
  if (!response.ok) return NextResponse.json({ error: "Unable to start payment." }, { status: 502 });
  const order = await response.json() as { id: string; amount: number; currency: string };
  await prisma.consultation.update({ where: { id: consultation.id }, data: { paymentOrderId: order.id, status: "PAYMENT_PENDING" } });
  return NextResponse.json({ order, keyId });
}
