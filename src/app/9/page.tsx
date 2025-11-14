/**
 * Example 9: Custom Validation Before Payment
 *
 * This example demonstrates:
 * - Custom validation logic
 * - Pre-payment checks
 * - Conditional payment initiation
 */

"use client";

import { useState } from "react";
import {
  isValidEmail,
  useFlutterwavePayment,
  validateAmount,
} from "@/features/payment";

export default function CustomValidationExample() {
  const [amount, setAmount] = useState<string>("5000");
  const [email, setEmail] = useState<string>("test@example.com");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: Number.parseFloat(amount) || 0,
    currency: "RWF",
    customer: {
      email,
      phone_number: "0788123456",
      name: "Validation User",
    },
    paymentMethods: ["mobilemoney"],
  });

  const runCustomValidation = (): boolean => {
    const validationErrors: string[] = [];

    // Custom validation 1: Amount check
    const amountNum = Number.parseFloat(amount);
    const amountValidation = validateAmount(amountNum, "RWF");
    if (!amountValidation.isValid) {
      validationErrors.push(amountValidation.error || "Invalid amount");
    }

    // Custom validation 2: Maximum amount
    if (amountNum > 100000) {
      validationErrors.push("Amount cannot exceed 100,000 RWF");
    }

    // Custom validation 3: Email validation
    if (!isValidEmail(email)) {
      validationErrors.push("Invalid email address");
    }

    // Custom validation 4: Terms agreement
    if (!agreeTerms) {
      validationErrors.push("You must agree to the terms and conditions");
    }

    // Custom validation 5: Business hours check (example)
    const currentHour = new Date().getHours();
    if (currentHour < 6 || currentHour > 22) {
      validationErrors.push(
        "Payments are only available between 6 AM and 10 PM",
      );
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handlePayment = () => {
    if (!runCustomValidation()) {
      return;
    }

    initiatePayment({
      onSuccess: (response) => {
        alert(`Payment validated and successful! ${response.transaction_id}`);
        setErrors([]);
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
          Example 9: Custom Validation
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block mb-2 font-medium">
              Amount (max 100,000 RWF)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions and payment policies
            </label>
          </div>

          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="font-bold text-red-700 mb-2">Validation Errors:</p>
              <ul className="text-sm text-red-600 list-disc list-inside">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isReady}
            className="w-full bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600 disabled:bg-gray-400"
          >
            Validate & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
