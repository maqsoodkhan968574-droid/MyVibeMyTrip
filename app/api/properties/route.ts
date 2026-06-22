import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const propertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  city: z.string().min(2),
  locality: z.string().min(2),
  type: z.enum(["APARTMENT", "VILLA", "STUDIO", "PLOT", "PENTHOUSE"]),
  listingType: z.enum(["BUY", "RENT"]),
  price: z.coerce.number().positive(),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  areaSqFt: z.coerce.number().positive(),
  furnished: z.enum(["FURNISHED", "SEMI_FURNISHED", "UNFURNISHED"])
});

export async function GET() {
  const properties = await prisma.property.findMany({
    include: { images: true, agent: true },
    orderBy: { createdAt: "desc" },
    take: 24
  });
  return NextResponse.json({ properties });
}

export async function POST(request: Request) {
  const json = await request.json();
  const payload = propertySchema.parse(json);
  const property = await prisma.property.create({
    data: {
      ...payload,
      slug: `${payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      status: "PENDING_REVIEW"
    }
  });
  return NextResponse.json({ property }, { status: 201 });
}
