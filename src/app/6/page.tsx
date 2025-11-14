/**
 * Example 6: Payment with Metadata
 *
 * This example demonstrates:
 * - Adding custom metadata to payments
 * - Tracking additional information
 * - Using metadata for order details, user IDs, etc.
 */

"use client";

import { useState } from "react";
import { useFlutterwavePayment } from "@/features/payment";

export default function WithMetadataExample() {
  const [orderId] = useState(`ORD-${Date.now()}`);
  const [productId] = useState("PROD-123");

  const { initiatePayment, isReady, config } = useFlutterwavePayment({
    amount: 15000,
    currency: "RWF",
    customer: {
      email: "metadata@example.com",
      phone_number: "0788123456",
      name: "Metadata User",
    },
    paymentMethods: ["mobilemoney", "card"],
    metadata: {
      order_id: orderId,
      product_id: productId,
      source: "web",
      user_type: "premium",
      cart_items: [
        { id: "item1", name: "Product A", price: 10000 },
        { id: "item2", name: "Product B", price: 5000 },
      ],
    },
  });

  const handlePayment = () => {
    initiatePayment({
      onSuccess: (response) => {
        alert(
          `Payment successful!\nOrder: ${orderId}\nTransaction: ${response.transaction_id}`,
        );
        console.log("Payment with metadata:", response);
        console.log("Metadata sent:", config.meta);
      },
      onError: (error) => {
        alert(`Payment failed: ${error.message}`);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Example 6: Payment with Metadata
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Order Details</h3>
            <p className="text-sm">
              <strong>Order ID:</strong> {orderId}
            </p>
            <p className="text-sm">
              <strong>Product ID:</strong> {productId}
            </p>
            <p className="text-sm">
              <strong>Amount:</strong> 15,000 RWF
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded">
            <h3 className="font-bold mb-2">Metadata (sent with payment)</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(config.meta, null, 2)}
            </pre>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isReady}
            className="w-full bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 disabled:bg-gray-400"
          >
            Pay 15,000 RWF
          </button>
        </div>
      </div>
    </div>
  );
}
