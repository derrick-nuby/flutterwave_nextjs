/**
 * Example 10: Using Payment Presets
 *
 * This example demonstrates:
 * - Using pre-configured payment presets
 * - Quick setup for common scenarios
 * - Different preset configurations
 */

"use client";

import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useState } from "react";
import { type Customer, PaymentPresets } from "@/features/payment";

type PresetType = "rwanda" | "uganda" | "kenya" | "card" | "all";

export default function UsingPresetsExample() {
  const [selectedPreset, setSelectedPreset] = useState<PresetType>("rwanda");
  const [amount, setAmount] = useState<string>("5000");

  const customer: Customer = {
    email: "preset@example.com",
    phone_number: "0788123456",
    name: "Preset User",
  };

  // Generate config based on selected preset
  const getConfig = () => {
    const amountNum = Number.parseFloat(amount) || 0;

    switch (selectedPreset) {
      case "rwanda":
        return PaymentPresets.rwandaMobileMoney(amountNum, customer);
      case "uganda":
        return PaymentPresets.ugandaMobileMoney(amountNum, customer);
      case "kenya":
        return PaymentPresets.kenyaMpesa(amountNum, customer);
      case "card":
        return PaymentPresets.cardPayment(amountNum, customer, "RWF");
      case "all":
        return PaymentPresets.allMethods(amountNum, customer, "RWF");
      default:
        return PaymentPresets.rwandaMobileMoney(amountNum, customer);
    }
  };

  const config = getConfig();
  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log("Preset payment response:", response);
        if (response.status === "successful") {
          alert(
            `Preset payment successful!\nType: ${selectedPreset}\nTransaction: ${response.transaction_id}`,
          );
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };

  const presetInfo = {
    rwanda: {
      name: "Rwanda Mobile Money",
      currency: "RWF",
      methods: "Mobile Money (MTN, Airtel)",
    },
    uganda: {
      name: "Uganda Mobile Money",
      currency: "UGX",
      methods: "Mobile Money (MTN, Airtel)",
    },
    kenya: { name: "Kenya M-Pesa", currency: "KES", methods: "M-Pesa" },
    card: {
      name: "Card Payment",
      currency: "RWF",
      methods: "Debit/Credit Cards",
    },
    all: {
      name: "All Methods",
      currency: "RWF",
      methods: "Card, Mobile Money, USSD, Bank Transfer",
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Example 10: Payment Presets</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="preset" className="block mb-2 font-medium">
              Select Preset
            </label>
            <select
              id="preset"
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value as PresetType)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="rwanda">Rwanda Mobile Money</option>
              <option value="uganda">Uganda Mobile Money</option>
              <option value="kenya">Kenya M-Pesa</option>
              <option value="card">Card Payment</option>
              <option value="all">All Payment Methods</option>
            </select>
          </div>

          <div className="p-4 bg-purple-50 rounded border border-purple-200">
            <h3 className="font-bold mb-2">
              {presetInfo[selectedPreset].name}
            </h3>
            <p className="text-sm">
              <strong>Currency:</strong> {presetInfo[selectedPreset].currency}
            </p>
            <p className="text-sm">
              <strong>Methods:</strong> {presetInfo[selectedPreset].methods}
            </p>
          </div>

          <div>
            <label htmlFor="amount" className="block mb-2 font-medium">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!amount || Number.parseFloat(amount) <= 0}
            className="w-full bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            Pay with {presetInfo[selectedPreset].name}
          </button>

          <div className="p-3 bg-gray-100 rounded text-xs">
            <p className="font-bold mb-1">Config Preview:</p>
            <pre className="overflow-auto">
              {JSON.stringify(
                {
                  currency: config.currency,
                  payment_options: config.payment_options,
                  title: config.customizations.title,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
