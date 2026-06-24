import { PaymentCheckout } from "@/components/consultation/payment-checkout";
export default async function ConsultationPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PaymentCheckout consultationId={id} />;
}
