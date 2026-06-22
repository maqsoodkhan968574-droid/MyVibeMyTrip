import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@propertysphere.in" },
    update: {},
    create: {
      name: "Property Sphere Admin",
      email: "admin@propertysphere.in",
      passwordHash,
      role: "ADMIN"
    }
  });

  const agentUser = await prisma.user.upsert({
    where: { email: "aarav@propertysphere.in" },
    update: {},
    create: {
      name: "Aarav Mehta",
      email: "aarav@propertysphere.in",
      passwordHash,
      role: "AGENT",
      phone: "+919999999999"
    }
  });

  const agent = await prisma.agent.upsert({
    where: { userId: agentUser.id },
    update: {},
    create: {
      userId: agentUser.id,
      agencyName: "Sphere Luxury Partners",
      licenseNo: "MH-RERA-PS-1024",
      bio: "Luxury homes advisor for Mumbai and Pune."
    }
  });

  await prisma.property.upsert({
    where: { slug: "skyline-residences-bandra-west" },
    update: {},
    create: {
      ownerId: admin.id,
      agentId: agent.id,
      title: "Skyline Residences",
      slug: "skyline-residences-bandra-west",
      description: "A refined high-floor apartment with sweeping views and premium amenities.",
      city: "Mumbai",
      locality: "Bandra West",
      type: "APARTMENT",
      listingType: "BUY",
      price: 42500000,
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 2680,
      furnished: "FURNISHED",
      amenities: ["Sea-facing deck", "Clubhouse", "Gym", "Valet parking"],
      status: "APPROVED",
      isFeatured: true,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
            alt: "Skyline Residences living area"
          }
        ]
      }
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
