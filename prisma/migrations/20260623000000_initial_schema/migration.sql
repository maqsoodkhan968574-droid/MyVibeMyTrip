-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'AGENT', 'ADMIN');
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'VILLA', 'STUDIO', 'PLOT', 'PENTHOUSE');
CREATE TYPE "ListingType" AS ENUM ('BUY', 'RENT');
CREATE TYPE "Furnishing" AS ENUM ('FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED');
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'VISIT_SCHEDULED', 'CLOSED');
CREATE TYPE "ConsultationPurpose" AS ENUM ('BUY', 'SELL');
CREATE TYPE "ConsultationStatus" AS ENUM ('REQUESTED', 'PAYMENT_PENDING', 'BOOKED', 'COMPLETED', 'REFUNDED', 'CANCELLED');
CREATE TYPE "SellerServiceType" AS ENUM ('DEVELOPER', 'BROKER', 'OWNER');
CREATE TYPE "SellerServiceStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_REVIEW', 'APPROVED', 'CLOSED');

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL, "name" TEXT, "email" TEXT, "emailVerified" TIMESTAMP(3), "image" TEXT,
  "passwordHash" TEXT, "phone" TEXT, "role" "Role" NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Consultation" (
  "id" TEXT NOT NULL, "purpose" "ConsultationPurpose" NOT NULL, "name" TEXT NOT NULL, "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL, "district" TEXT NOT NULL, "address" TEXT NOT NULL, "preferredDate" TIMESTAMP(3) NOT NULL,
  "tokenAmount" DECIMAL(10,2) NOT NULL DEFAULT 1100, "status" "ConsultationStatus" NOT NULL DEFAULT 'REQUESTED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "SellerServiceLead" (
  "id" TEXT NOT NULL, "serviceType" "SellerServiceType" NOT NULL,
  "status" "SellerServiceStatus" NOT NULL DEFAULT 'NEW', "name" TEXT NOT NULL, "companyName" TEXT,
  "email" TEXT NOT NULL, "phone" TEXT NOT NULL, "city" TEXT NOT NULL, "address" TEXT, "details" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SellerServiceLead_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Agent" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "licenseNo" TEXT, "bio" TEXT, "agencyName" TEXT,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.8, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Property" (
  "id" TEXT NOT NULL, "ownerId" TEXT, "agentId" TEXT, "title" TEXT NOT NULL, "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL, "city" TEXT NOT NULL, "locality" TEXT NOT NULL, "address" TEXT,
  "latitude" DOUBLE PRECISION, "longitude" DOUBLE PRECISION, "type" "PropertyType" NOT NULL,
  "listingType" "ListingType" NOT NULL, "price" DECIMAL(14,2) NOT NULL, "bedrooms" INTEGER NOT NULL,
  "bathrooms" INTEGER NOT NULL, "areaSqFt" INTEGER NOT NULL, "furnished" "Furnishing" NOT NULL,
  "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[], "status" "PropertyStatus" NOT NULL DEFAULT 'DRAFT',
  "isFeatured" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "PropertyImage" (
  "id" TEXT NOT NULL, "propertyId" TEXT NOT NULL, "url" TEXT NOT NULL, "alt" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PropertyImage_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Inquiry" (
  "id" TEXT NOT NULL, "propertyId" TEXT NOT NULL, "userId" TEXT, "name" TEXT NOT NULL,
  "email" TEXT NOT NULL, "phone" TEXT NOT NULL, "message" TEXT, "visitAt" TIMESTAMP(3),
  "status" "InquiryStatus" NOT NULL DEFAULT 'NEW', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "SavedProperty" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "propertyId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "SavedProperty_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Account" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "type" TEXT NOT NULL, "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL, "refresh_token" TEXT, "access_token" TEXT, "expires_at" INTEGER,
  "token_type" TEXT, "scope" TEXT, "id_token" TEXT, "session_state" TEXT,
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Session" (
  "id" TEXT NOT NULL, "sessionToken" TEXT NOT NULL, "userId" TEXT NOT NULL, "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL, "token" TEXT NOT NULL, "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "Consultation_status_preferredDate_idx" ON "Consultation"("status", "preferredDate");
CREATE INDEX "Consultation_email_idx" ON "Consultation"("email");
CREATE INDEX "SellerServiceLead_serviceType_status_idx" ON "SellerServiceLead"("serviceType", "status");
CREATE INDEX "SellerServiceLead_createdAt_idx" ON "SellerServiceLead"("createdAt");
CREATE UNIQUE INDEX "Agent_userId_key" ON "Agent"("userId");
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");
CREATE INDEX "Property_city_locality_idx" ON "Property"("city", "locality");
CREATE INDEX "Property_type_listingType_status_idx" ON "Property"("type", "listingType", "status");
CREATE INDEX "Property_price_idx" ON "Property"("price");
CREATE UNIQUE INDEX "SavedProperty_userId_propertyId_key" ON "SavedProperty"("userId", "propertyId");
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Property" ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PropertyImage" ADD CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SavedProperty" ADD CONSTRAINT "SavedProperty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SavedProperty" ADD CONSTRAINT "SavedProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
