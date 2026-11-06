import type { EnquiryOrder } from "./whatsapp";

/**
 * FUTURE INTEGRATION BOUNDARY (not implemented).
 *
 * Real payments (e.g. Paystack) need a backend or a trusted hosted-checkout integration; a static
 * GitHub Pages site must never hold secret keys or claim a payment succeeded. When that exists,
 * implement this interface and assign it to `paymentGateway`; checkout UI should switch on it.
 */
export interface PaymentGateway {
  readonly id: string;
  createCheckoutSession(order: EnquiryOrder): Promise<{ redirectUrl: string }>;
}

export const paymentGateway: PaymentGateway | null = null;
export const paymentsEnabled = paymentGateway !== null;
