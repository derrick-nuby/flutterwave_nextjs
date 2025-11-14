import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useMemo } from "react";
import { buildPaymentConfig } from "../config/payment.config";
import type {
  PaymentHandlers,
  PaymentResponse,
  UseFlutterwavePaymentOptions,
  UseFlutterwavePaymentReturn,
} from "../types/payment.types";

/**
 * Custom hook for Flutterwave payments with enhanced features
 * @param options - Payment configuration options
 * @returns Payment initiation function and configuration
 */
export function useFlutterwavePayment(
  options: UseFlutterwavePaymentOptions,
): UseFlutterwavePaymentReturn {
  const {
    amount,
    currency = "RWF",
    customer,
    paymentMethods = ["mobilemoney"],
    customization,
    metadata,
    redirectUrl,
  } = options;

  // Build payment configuration
  const config = useMemo(
    () =>
      buildPaymentConfig({
        amount,
        currency,
        customer,
        paymentMethods,
        customization,
        metadata,
        redirectUrl,
      }),
    [
      amount,
      currency,
      customer,
      paymentMethods,
      customization,
      metadata,
      redirectUrl,
    ],
  );

  // Initialize Flutterwave hook
  const handleFlutterPayment = useFlutterwave(config);

  // Check if payment is ready
  const isReady = useMemo(() => {
    return !!(
      config.public_key &&
      amount > 0 &&
      customer.email &&
      customer.name
    );
  }, [config.public_key, amount, customer.email, customer.name]);

  /**
   * Initiate payment with optional handlers
   */
  const initiatePayment = (handlers?: PaymentHandlers) => {
    if (!isReady) {
      console.error("Payment is not ready. Check configuration.");
      handlers?.onError?.(new Error("Payment configuration is incomplete"));
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log("Payment response:", response);

        if (response.status === "successful") {
          handlers?.onSuccess?.(response as unknown as PaymentResponse);
        } else {
          handlers?.onError?.(new Error(`Payment ${response.status}`));
        }

        closePaymentModal();
      },
      onClose: () => {
        console.log("Payment modal closed");
        handlers?.onClose?.();
      },
    });
  };

  return {
    initiatePayment,
    isReady,
    config,
  };
}
