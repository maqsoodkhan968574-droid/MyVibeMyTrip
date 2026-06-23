import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
  serviceType: z.enum(["DEVELOPER", "BROKER", "OWNER"]),
  name: z.string().min(2),
  companyName: z.string().max(120).optional(),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  city: z.string().min(2),
  address: z.string().max(500).optional(),
  images: z.array(z.string().url()).min(1).max(10),
  details: z.object({
    title: z.string().min(2).max(160),
    propertyType: z.string().min(2).max(60),
    listingType: z.string().min(2).max(30),
    price: z.string().min(1).max(50),
    locality: z.string().min(2).max(100),
    description: z.string().min(10).max(2000),
    inventory: z.string().max(50).optional(),
    website: z.string().url().optional().or(z.literal(""))
  })
});

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete all required details." }, { status: 400 });
  }

  const lead = await prisma.sellerServiceLead.create({
    data: parsed.data,
    select: { id: true }
  });

  return NextResponse.json({ lead }, { status: 201 });
}
