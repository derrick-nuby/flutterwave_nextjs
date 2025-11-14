import type {
  Currency,
  Customer,
  PaymentConfig,
  PaymentCustomization,
  PaymentMethod,
} from "../types/payment.types";
import {
  formatPaymentMethods,
  generateTxRef,
  getPublicKey,
  sanitizeCustomerData,
} from "../utils/payment.utils";

/**
 * Default payment customization
 */
const DEFAULT_CUSTOMIZATION: PaymentCustomization = {
  title: "Payment",
  description: "Complete your payment",
  logo: "",
};

/**
 * Default currency
 */
const DEFAULT_CURRENCY: Currency = "RWF";

/**
 * Default payment methods
 */
const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = ["mobilemoney"];

/**
 * Configuration builder options
 */
export interface PaymentConfigOptions {
  amount: number;
  currency?: Currency;
  customer: Customer;
  paymentMethods?: PaymentMethod[];
  customization?: Partial<PaymentCustomization>;
  metadata?: Record<string, unknown>;
  redirectUrl?: string;
  txRef?: string;
}

/**
 * Build payment configuration for Flutterwave
 * @param options - Configuration options
 * @returns Complete payment configuration
 */
export function buildPaymentConfig(
  options: PaymentConfigOptions,
): PaymentConfig {
  const {
    amount,
    currency = DEFAULT_CURRENCY,
    customer,
    paymentMethods = DEFAULT_PAYMENT_METHODS,
    customization = {},
    metadata,
    redirectUrl,
    txRef,
  } = options;

  const sanitizedCustomer = sanitizeCustomerData(customer);

  const config: PaymentConfig = {
    public_key: getPublicKey(),
    tx_ref: txRef || generateTxRef(),
    amount,
    currency,
    payment_options: formatPaymentMethods(paymentMethods),
    customer: sanitizedCustomer,
    customizations: {
      ...DEFAULT_CUSTOMIZATION,
      ...customization,
    },
  };

  if (metadata) {
    config.meta = metadata;
  }

  if (redirectUrl) {
    config.redirect_url = redirectUrl;
  }

  return config;
}

/**
 * Preset configurations for common use cases
 */
export const PaymentPresets = {
  /**
   * Rwanda Mobile Money payment
   */
  rwandaMobileMoney: (amount: number, customer: Customer) =>
    buildPaymentConfig({
      amount,
      currency: "RWF",
      customer,
      paymentMethods: ["mobilemoney"],
      customization: {
        title: "Rwanda Mobile Money Payment",
        description: "Pay with MTN or Airtel Money",
      },
    }),

  /**
   * Uganda Mobile Money payment
   */
  ugandaMobileMoney: (amount: number, customer: Customer) =>
    buildPaymentConfig({
      amount,
      currency: "UGX",
      customer,
      paymentMethods: ["mobilemoney"],
      customization: {
        title: "Uganda Mobile Money Payment",
        description: "Pay with MTN or Airtel Money",
      },
    }),

  /**
   * Kenya M-Pesa payment
   */
  kenyaMpesa: (amount: number, customer: Customer) =>
    buildPaymentConfig({
      amount,
      currency: "KES",
      customer,
      paymentMethods: ["mpesa"],
      customization: {
        title: "M-Pesa Payment",
        description: "Pay with M-Pesa",
      },
    }),

  /**
   * Card payment (any currency)
   */
  cardPayment: (
    amount: number,
    customer: Customer,
    currency: Currency = "RWF",
  ) =>
    buildPaymentConfig({
      amount,
      currency,
      customer,
      paymentMethods: ["card"],
      customization: {
        title: "Card Payment",
        description: "Pay with your debit or credit card",
      },
    }),

  /**
   * All payment methods
   */
  allMethods: (
    amount: number,
    customer: Customer,
    currency: Currency = "RWF",
  ) =>
    buildPaymentConfig({
      amount,
      currency,
      customer,
      paymentMethods: ["card", "mobilemoney", "ussd", "banktransfer"],
      customization: {
        title: "Choose Payment Method",
        description: "Select your preferred payment method",
      },
    }),
};

/**
 * Validate payment configuration
 * @param config - Payment configuration to validate
 * @returns Validation result with errors if any
 */
export function validatePaymentConfig(config: PaymentConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.public_key) {
    errors.push("Public key is required");
  }

  if (!config.tx_ref) {
    errors.push("Transaction reference is required");
  }

  if (!config.amount || config.amount <= 0) {
    errors.push("Amount must be greater than zero");
  }

  if (!config.customer.email) {
    errors.push("Customer email is required");
  }

  if (!config.customer.phone_number) {
    errors.push("Customer phone number is required");
  }

  if (!config.customer.name) {
    errors.push("Customer name is required");
  }

  if (!config.payment_options) {
    errors.push("Payment options are required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
