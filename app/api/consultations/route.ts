import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const consultationSchema = z.object({
  purpose: z.enum(["BUY", "SELL"]),
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  district: z.string().min(2),
  address: z.string().min(8),
  preferredDate: z.string().date()
});

export async function POST(request: Request) {
  const parsed = consultationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide complete consultation details." }, { status: 400 });
  }

  const consultation = await prisma.consultation.create({
    data: {
      ...parsed.data,
      preferredDate: new Date(parsed.data.preferredDate),
      tokenAmount: 1100
    },
    select: { id: true }
  });

  return NextResponse.json({ consultation }, { status: 201 });
}
