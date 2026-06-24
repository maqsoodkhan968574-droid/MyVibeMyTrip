ALTER TABLE "Consultation" ADD COLUMN "paymentOrderId" TEXT;
ALTER TABLE "Consultation" ADD COLUMN "paymentId" TEXT;
ALTER TABLE "Consultation" ADD COLUMN "paidAt" TIMESTAMP(3);
CREATE UNIQUE INDEX "Consultation_paymentOrderId_key" ON "Consultation"("paymentOrderId");
