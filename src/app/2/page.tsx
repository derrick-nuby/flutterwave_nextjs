/**
 * Example 2: Form with User Input Amount
 *
 * This example demonstrates:
 * - Dynamic amount from user input
 * - Form validation
 * - Amount formatting
 */

"use client";

import { useState } from "react";
import {
  formatCurrencyDisplay,
  useFlutterwavePayment,
  validateAmount,
} from "@/features/payment";

export default function FormWithInputExample() {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: Number.parseFloat(amount) || 0,
    currency: "RWF",
    customer: {
      email: "customer@example.com",
      phone_number: "0788123456",
      name: "Jane Smith",
    },
    paymentMethods: ["mobilemoney"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numAmount = Number.parseFloat(amount);
    const validation = validateAmount(numAmount, "RWF");

    if (!validation.isValid) {
      setError(validation.error || "Invalid amount");
      return;
    }

    initiatePayment({
      onSuccess: (response) => {
        alert(
          `Payment successful! Paid ${formatCurrencyDisplay(response.amount, "RWF")}`,
        );
        setAmount("");
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Example 2: Form with Input</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block mb-2 font-medium">
              Enter Amount (RWF)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="100"
              step="1"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={!isReady || !amount}
            className="w-full bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
