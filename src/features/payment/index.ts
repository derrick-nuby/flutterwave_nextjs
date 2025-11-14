/**
 * Flutterwave Payment Integration
 *
 * A reusable, bulletproof payment system for Next.js applications
 *
 * @example
 * ```tsx
 * import { useFlutterwavePayment } from '@/features/payment';
 *
 * const { initiatePayment } = useFlutterwavePayment({
 *   amount: 1000,
 *   currency: 'RWF',
 *   customer: { email: 'user@example.com', phone_number: '0700000000', name: 'John Doe' }
 * });
 *
 * initiatePayment({
 *   onSuccess: (response) => console.log('Success!', response),
 *   onError: (error) => console.error('Error!', error)
 * });
 * ```
 */

// Configuration
export {
  buildPaymentConfig,
  PaymentPresets,
  validatePaymentConfig,
} from "./config/payment.config";
// Hooks
export { useFlutterwavePayment } from "./hooks/useFlutterwavePayment";
// Types
export type {
  Currency,
  Customer,
  PaymentConfig,
  PaymentCustomization,
  PaymentEnvironment,
  PaymentHandlers,
  PaymentMethod,
  PaymentResponse,
  PaymentStatus,
  UseFlutterwavePaymentOptions,
  UseFlutterwavePaymentReturn,
} from "./types/payment.types";
// Utilities
export {
  formatAmount,
  formatCurrencyDisplay,
  formatPaymentMethods,
  generateTxRef,
  getCurrencySymbol,
  getPaymentMethodName,
  getPublicKey,
  isEnvironmentConfigured,
  isTestEnvironment,
  isValidEmail,
  isValidPhone,
  sanitizeCustomerData,
  validateAmount,
} from "./utils/payment.utils";
