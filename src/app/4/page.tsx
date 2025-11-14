/**
 * Example 4: Different Payment Methods
 *
 * This example demonstrates:
 * - Multiple payment method options
 * - Payment method selection
 * - Dynamic payment method display names
 */

"use client";

import { useState } from "react";
import {
  getPaymentMethodName,
  type PaymentMethod,
  useFlutterwavePayment,
} from "@/features/payment";

const PAYMENT_METHODS: PaymentMethod[] = [
  "mobilemoney",
  "card",
  "ussd",
  "banktransfer",
  "mpesa",
];

export default function DifferentPaymentMethodsExample() {
  const [selectedMethods, setSelectedMethods] = useState<PaymentMethod[]>([
    "mobilemoney",
  ]);

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: 10000,
    currency: "RWF",
    customer: {
      email: "methods@example.com",
      phone_number: "0788123456",
      name: "Payment Methods User",
    },
    paymentMethods: selectedMethods,
    customization: {
      title: "Choose Payment Method",
      description: "Select your preferred payment option",
      logo: "",
    },
  });

  const toggleMethod = (method: PaymentMethod) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method],
    );
  };

  const handlePayment = () => {
    initiatePayment({
      onSuccess: (response) => {
        alert(`Payment successful via ${response.payment_type}!`);
      },
      onError: (error) => {
        alert(`Payment failed: ${error.message}`);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Example 4: Payment Methods</h2>

        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Select Payment Methods:</p>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMethods.includes(method)}
                    onChange={() => toggleMethod(method)}
                    className="w-4 h-4"
                  />
                  <span>{getPaymentMethodName(method)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm">
              <strong>Selected:</strong>{" "}
              {selectedMethods.map(getPaymentMethodName).join(", ")}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isReady || selectedMethods.length === 0}
            className="w-full bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600 disabled:bg-gray-400"
          >
            Pay 10,000 RWF
          </button>
        </div>
      </div>
    </div>
  );
}
