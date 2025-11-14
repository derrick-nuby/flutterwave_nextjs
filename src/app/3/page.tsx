/**
 * Example 3: Multiple Currency Support
 *
 * This example demonstrates:
 * - Currency selection
 * - Dynamic currency symbols
 * - Currency-specific validation
 */

"use client";

import { useState } from "react";
import {
  type Currency,
  formatCurrencyDisplay,
  getCurrencySymbol,
  useFlutterwavePayment,
} from "@/features/payment";

const SUPPORTED_CURRENCIES: Currency[] = [
  "RWF",
  "UGX",
  "KES",
  "TZS",
  "NGN",
  "USD",
];

export default function MultipleCurrenciesExample() {
  const [amount, setAmount] = useState<string>("1000");
  const [currency, setCurrency] = useState<Currency>("RWF");

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: Number.parseFloat(amount) || 0,
    currency,
    customer: {
      email: "multi@example.com",
      phone_number: "0788123456",
      name: "Multi Currency User",
    },
    paymentMethods: ["mobilemoney", "card"],
  });

  const handlePayment = () => {
    initiatePayment({
      onSuccess: (response) => {
        alert(
          `Success! Paid ${formatCurrencyDisplay(response.amount, currency)}\nTransaction: ${response.transaction_id}`,
        );
      },
      onError: (error) => {
        alert(`Error: ${error.message}`);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Example 3: Multiple Currencies
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="currency" className="block mb-2 font-medium">
              Select Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="w-full border rounded px-3 py-2"
            >
              {SUPPORTED_CURRENCIES.map((curr) => (
                <option key={curr} value={curr}>
                  {curr} ({getCurrencySymbol(curr)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block mb-2 font-medium">
              Amount
            </label>
            <div className="flex gap-2">
              <span className="border rounded px-3 py-2 bg-gray-100">
                {getCurrencySymbol(currency)}
              </span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 border rounded px-3 py-2"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isReady}
            className="w-full bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            Pay{" "}
            {formatCurrencyDisplay(Number.parseFloat(amount) || 0, currency)}
          </button>
        </div>
      </div>
    </div>
  );
}
