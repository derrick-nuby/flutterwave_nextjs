import type { Currency, PaymentMethod } from "../types/payment.types";

/**
 * Generate a unique transaction reference
 * @param prefix - Optional prefix for the transaction reference
 * @returns Unique transaction reference string
 */
export function generateTxRef(prefix = "tx"): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Format payment methods array into Flutterwave-compatible string
 * @param methods - Array of payment methods
 * @returns Comma-separated string of payment methods
 */
export function formatPaymentMethods(methods: PaymentMethod[]): string {
  return methods.join(",");
}

/**
 * Validate email address
 * @param email - Email address to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic validation)
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Format amount to 2 decimal places
 * @param amount - Amount to format
 * @returns Formatted amount
 */
export function formatAmount(amount: number): number {
  return Number.parseFloat(amount.toFixed(2));
}

/**
 * Get currency symbol
 * @param currency - Currency code
 * @returns Currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    RWF: "FRw",
    UGX: "USh",
    KES: "KSh",
    TZS: "TSh",
    NGN: "₦",
    GHS: "GH₵",
    ZAR: "R",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  return symbols[currency] || currency;
}

/**
 * Validate amount based on currency
 * @param amount - Amount to validate
 * @param currency - Currency code
 * @returns Validation result with error message if invalid
 */
export function validateAmount(
  amount: number,
  currency: Currency,
): { isValid: boolean; error?: string } {
  if (amount <= 0) {
    return { isValid: false, error: "Amount must be greater than zero" };
  }

  // Minimum amounts per currency (in minor units where applicable)
  const minimums: Partial<Record<Currency, number>> = {
    RWF: 100,
    UGX: 100,
    KES: 10,
    TZS: 100,
    NGN: 10,
    GHS: 1,
    ZAR: 1,
    USD: 1,
    EUR: 1,
    GBP: 1,
  };

  const minimum = minimums[currency] || 1;
  if (amount < minimum) {
    return {
      isValid: false,
      error: `Minimum amount is ${minimum} ${currency}`,
    };
  }

  return { isValid: true };
}

/**
 * Get payment method display name
 * @param method - Payment method
 * @returns Human-readable payment method name
 */
export function getPaymentMethodName(method: PaymentMethod): string {
  const names: Record<PaymentMethod, string> = {
    card: "Card Payment",
    mobilemoney: "Mobile Money",
    ussd: "USSD",
    banktransfer: "Bank Transfer",
    mpesa: "M-Pesa",
    "Ghana mobile money": "Ghana Mobile Money",
    "Uganda mobile money": "Uganda Mobile Money",
    "Rwanda mobile money": "Rwanda Mobile Money",
    "Zambia mobile money": "Zambia Mobile Money",
    barter: "Barter",
    nqr: "NQR",
  };
  return names[method] || method;
}

/**
 * Sanitize customer data
 * @param customer - Customer object
 * @returns Sanitized customer object
 */
export function sanitizeCustomerData(customer: {
  email: string;
  phone_number: string;
  name: string;
}): { email: string; phone_number: string; name: string } {
  return {
    email: customer.email.trim().toLowerCase(),
    phone_number: customer.phone_number.trim().replace(/[\s-]/g, ""),
    name: customer.name.trim(),
  };
}

/**
 * Check if environment is configured correctly
 * @returns True if configured, false otherwise
 */
export function isEnvironmentConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;
}

/**
 * Get public key from environment
 * @returns Public key or empty string
 */
export function getPublicKey(): string {
  return process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "";
}

/**
 * Check if public key is for test environment
 * @param publicKey - Public key to check
 * @returns True if test key, false otherwise
 */
export function isTestEnvironment(publicKey: string): boolean {
  return publicKey.includes("TEST");
}

/**
 * Format currency amount for display
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted string
 */
export function formatCurrencyDisplay(
  amount: number,
  currency: Currency,
): string {
  const symbol = getCurrencySymbol(currency);
  const formattedAmount = formatAmount(amount).toLocaleString();
  return `${symbol} ${formattedAmount}`;
}
