/**
 * Example 1: Simple Button with Fixed Amount
 *
 * This example demonstrates the simplest use case:
 * - Fixed payment amount
 * - Single payment method (mobile money)
 * - Basic success/error handling
 */

"use client";

import { useFlutterwavePayment } from "@/features/payment";

export default function SimpleButtonExample() {
  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: 5000, // Fixed amount in RWF
    currency: "RWF",
    customer: {
      email: "user@example.com",
      phone_number: "0788123456",
      name: "John Doe",
    },
    paymentMethods: ["mobilemoney"],
    customization: {
      title: "Simple Payment",
      description: "Pay 5000 RWF",
      logo: "",
    },
  });

  const handlePayment = () => {
    initiatePayment({
      onSuccess: (response) => {
        alert(`Payment successful! Transaction ID: ${response.transaction_id}`);
        console.log("Payment response:", response);
      },
      onError: (error) => {
        alert(`Payment failed: ${error.message}`);
        console.error("Payment error:", error);
      },
      onClose: () => {
        console.log("Payment modal was closed");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Example 1: Simple Button</h2>
        <button
          type="button"
          onClick={handlePayment}
          disabled={!isReady}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Pay 5000 RWF
        </button>
        {!isReady && <p className="text-red-500 mt-2">Payment not ready</p>}
      </div>
    </div>
  );
}
