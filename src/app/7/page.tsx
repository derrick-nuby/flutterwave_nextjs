/**
 * Example 7: Programmatic Payment Trigger
 *
 * This example demonstrates:
 * - Triggering payment without user interaction
 * - Auto-initiating payment based on conditions
 * - useEffect integration
 */

"use client";

import { useEffect, useState } from "react";
import { useFlutterwavePayment } from "@/features/payment";

export default function ProgrammaticTriggerExample() {
  const [autoTrigger, setAutoTrigger] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: 3000,
    currency: "RWF",
    customer: {
      email: "auto@example.com",
      phone_number: "0788123456",
      name: "Auto Trigger User",
    },
    paymentMethods: ["mobilemoney"],
    customization: {
      title: "Auto Payment",
      description: "Automatically triggered payment",
      logo: "",
    },
  });

  // Countdown effect
  useEffect(() => {
    if (autoTrigger && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [autoTrigger, countdown]);

  // Auto-trigger payment when countdown reaches 0
  useEffect(() => {
    if (autoTrigger && countdown === 0 && isReady) {
      initiatePayment({
        onSuccess: (response) => {
          alert(`Auto-payment successful! ${response.transaction_id}`);
          setAutoTrigger(false);
          setCountdown(5);
        },
        onError: (error) => {
          alert(`Auto-payment failed: ${error.message}`);
          setAutoTrigger(false);
          setCountdown(5);
        },
        onClose: () => {
          setAutoTrigger(false);
          setCountdown(5);
        },
      });
    }
  }, [autoTrigger, countdown, isReady, initiatePayment]);

  const handleManualTrigger = () => {
    initiatePayment({
      onSuccess: (response) => {
        alert(`Manual payment successful! ${response.transaction_id}`);
      },
      onError: (error) => {
        alert(`Payment failed: ${error.message}`);
      },
    });
  };

  const startAutoTrigger = () => {
    setAutoTrigger(true);
    setCountdown(5);
  };

  const cancelAutoTrigger = () => {
    setAutoTrigger(false);
    setCountdown(5);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Example 7: Programmatic Trigger
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-sm mb-2">
              This demonstrates auto-triggering payment after a countdown.
            </p>
            {autoTrigger && (
              <p className="text-2xl font-bold text-center">
                Payment in {countdown}s...
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleManualTrigger}
            disabled={!isReady || autoTrigger}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Manual Trigger - Pay 3,000 RWF
          </button>

          {!autoTrigger ? (
            <button
              type="button"
              onClick={startAutoTrigger}
              disabled={!isReady}
              className="w-full bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              Start Auto-Trigger (5s countdown)
            </button>
          ) : (
            <button
              type="button"
              onClick={cancelAutoTrigger}
              className="w-full bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel Auto-Trigger
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
