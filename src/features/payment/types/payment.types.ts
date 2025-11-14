/**
 * Supported currencies for Flutterwave payments
 */
export type Currency =
  | "RWF"
  | "UGX"
  | "KES"
  | "TZS"
  | "NGN"
  | "GHS"
  | "ZAR"
  | "USD"
  | "EUR"
  | "GBP";

/**
 * Available payment methods
 */
export type PaymentMethod =
  | "card"
  | "mobilemoney"
  | "ussd"
  | "banktransfer"
  | "mpesa"
  | "Ghana mobile money"
  | "Uganda mobile money"
  | "Rwanda mobile money"
  | "Zambia mobile money"
  | "barter"
  | "nqr";

/**
 * Payment status from Flutterwave response
 */
export type PaymentStatus = "successful" | "failed" | "cancelled";

/**
 * Customer information for payment
 */
export interface Customer {
  email: string;
  phone_number: string;
  name: string;
}

/**
 * Payment customization options
 */
export interface PaymentCustomization {
  title: string;
  description: string;
  logo: string;
}

/**
 * Core payment configuration
 */
export interface PaymentConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: Currency;
  payment_options: string;
  customer: Customer;
  customizations: PaymentCustomization;
  redirect_url?: string;
  meta?: Record<string, unknown>;
  payment_plan?: string;
  subaccounts?: Array<{
    id: string;
    transaction_split_ratio?: number;
    transaction_charge_type?: string;
    transaction_charge?: number;
  }>;
}

/**
 * Payment response from Flutterwave
 */
export interface PaymentResponse {
  status: PaymentStatus;
  transaction_id: string;
  tx_ref: string;
  flw_ref?: string;
  currency: string;
  amount: number;
  charged_amount?: number;
  customer: Customer;
  payment_type?: string;
  [key: string]: unknown;
}

/**
 * Payment callback handlers
 */
export interface PaymentHandlers {
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

/**
 * Options for useFlutterwavePayment hook
 */
export interface UseFlutterwavePaymentOptions {
  amount: number;
  currency?: Currency;
  customer: Customer;
  paymentMethods?: PaymentMethod[];
  customization?: Partial<PaymentCustomization>;
  metadata?: Record<string, unknown>;
  redirectUrl?: string;
}

/**
 * Return type for useFlutterwavePayment hook
 */
export interface UseFlutterwavePaymentReturn {
  initiatePayment: (handlers?: PaymentHandlers) => void;
  isReady: boolean;
  config: PaymentConfig;
}

/**
 * Props for PaymentButton component
 */
export interface PaymentButtonProps {
  amount: number;
  currency?: Currency;
  customer: Customer;
  paymentMethods?: PaymentMethod[];
  customization?: Partial<PaymentCustomization>;
  buttonText?: string;
  buttonClassName?: string;
  disabled?: boolean;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

/**
 * Props for PaymentForm component
 */
export interface PaymentFormProps {
  currency?: Currency;
  customer?: Partial<Customer>;
  paymentMethods?: PaymentMethod[];
  customization?: Partial<PaymentCustomization>;
  defaultAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  showCustomerFields?: boolean;
  buttonText?: string;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

/**
 * Environment configuration
 */
export interface PaymentEnvironment {
  publicKey: string;
  isTest: boolean;
}
