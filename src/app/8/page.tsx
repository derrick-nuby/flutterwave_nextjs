/**
 * Example 8: Payment with Redirect URL
 *
 * This example demonstrates:
 * - Redirecting user after payment
 * - Using redirect URL for success page
 * - Handling payment verification on redirect
 */

"use client";

import { useFlutterwavePayment } from "@/features/payment";

export default function WithRedirectExample() {
  const redirectUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/payment-success`;

  const { initiatePayment, isReady, config } = useFlutterwavePayment({
    amount: 20000,
    currency: "RWF",
    customer: {
      email: "redirect@example.com",
      phone_number: "0788123456",
      name: "Redirect User",
    },
    paymentMethods: ["card", "mobilemoney"],
    redirectUrl,
    customization: {
      title: "Payment with Redirect",
      description: "You will be redirected after payment",
      logo: "",
    },
  });

  const handlePayment = () => {
    initiatePayment({
      onSuccess: (response) => {
        console.log("Payment successful, redirecting...", response);
        // Note: Flutterwave will handle the redirect
        // You can also manually redirect if needed:
        // window.location.href = `/payment-success?tx_ref=${response.tx_ref}`;
      },
      onError: (error) => {
        alert(`Payment failed: ${error.message}`);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Example 8: Redirect URL</h2>

        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded border border-green-200">
            <h3 className="font-bold mb-2">Redirect Configuration</h3>
            <p className="text-sm mb-2">
              <strong>Redirect URL:</strong>
            </p>
            <p className="text-xs bg-white p-2 rounded border break-all">
              {config.redirect_url || "Not set"}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              After successful payment, you'll be redirected to this URL with
              transaction details.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded">
            <h3 className="font-bold mb-2">How it works:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Click "Pay Now"</li>
              <li>Complete payment</li>
              <li>Get redirected to success page</li>
              <li>Verify transaction on success page</li>
            </ol>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isReady}
            className="w-full bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Pay 20,000 RWF (with redirect)
          </button>
        </div>
      </div>
    </div>
  );
}
