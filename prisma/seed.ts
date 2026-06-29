import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { properties } from "../lib/property-data";

const prisma = new PrismaClient();

const propertyTypeMap = {
  Apartment: "APARTMENT",
  Villa: "VILLA",
  Studio: "STUDIO",
  Plot: "PLOT",
  Penthouse: "PENTHOUSE"
} as const;

const listingTypeMap = {
  Buy: "BUY",
  Rent: "RENT"
} as const;

const furnishingMap = {
  Furnished: "FURNISHED",
  "Semi-furnished": "SEMI_FURNISHED",
  Unfurnished: "UNFURNISHED"
} as const;

async function main() {
  const passwordHash = await bcrypt.hash("8809155543@MVMT", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@myvibemytrip.com" },
    update: { name: "Harsh Raj", role: "ADMIN", passwordHash },
    create: {
      name: "Harsh Raj",
      email: "admin@myvibemytrip.com",
      passwordHash,
      role: "ADMIN",
      phone: "+918809155543"
    }
  });

  for (const item of properties) {
    const agentEmail = `${item.agent.name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@rivanta-realty.in`;
    const agentUser = await prisma.user.upsert({
      where: { email: agentEmail },
      update: {
        name: item.agent.name,
        role: "AGENT",
        phone: `+${item.agent.phone}`
      },
      create: {
        name: item.agent.name,
        email: agentEmail,
        passwordHash,
        role: "AGENT",
        phone: `+${item.agent.phone}`,
        image: item.agent.avatar
      }
    });

    const agent = await prisma.agent.upsert({
      where: { userId: agentUser.id },
      update: {
        agencyName: item.agent.role,
        licenseNo: "RERA-RR-2026",
        bio: `${item.agent.role} at Rivanta Realty.`
      },
      create: {
        userId: agentUser.id,
        agencyName: item.agent.role,
        licenseNo: "RERA-RR-2026",
        bio: `${item.agent.role} at Rivanta Realty.`
      }
    });

    await prisma.property.upsert({
      where: { slug: item.slug },
      update: {
        ownerId: admin.id,
        agentId: agent.id,
        title: item.title,
        description: item.description,
        city: item.city,
        locality: item.locality,
        type: propertyTypeMap[item.type],
        listingType: listingTypeMap[item.status],
        price: item.price,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        areaSqFt: item.area,
        furnished: furnishingMap[item.furnished],
        amenities: item.amenities,
        status: "APPROVED",
        isFeatured: item.featured
      },
      create: {
        ownerId: admin.id,
        agentId: agent.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        city: item.city,
        locality: item.locality,
        type: propertyTypeMap[item.type],
        listingType: listingTypeMap[item.status],
        price: item.price,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        areaSqFt: item.area,
        furnished: furnishingMap[item.furnished],
        amenities: item.amenities,
        status: "APPROVED",
        isFeatured: item.featured,
        images: {
          create: item.gallery.map((image, index) => ({
            url: image,
            alt: `${item.title} image ${index + 1}`,
            sortOrder: index
          }))
        }
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
