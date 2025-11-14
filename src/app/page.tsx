"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFlutterwavePayment, validateAmount } from "@/features/payment";

export default function Home() {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: Number.parseFloat(amount) || 0,
    currency: "RWF",
    customer: {
      email: "user@example.com",
      phone_number: "0700000000",
      name: "Test User",
    },
    paymentMethods: ["mobilemoney"],
    customization: {
      title: "Mobile Money Payment",
      description: "Pay with Mobile Money",
    },
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
        alert(`Payment successful! Transaction ID: ${response.transaction_id}`);
        console.log("Payment response:", response);
        setAmount("");
      },
      onError: (error) => {
        setError(error.message);
        console.error("Payment error:", error);
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Mobile Money Payment</CardTitle>
          <CardDescription>
            Enter the amount you want to pay with mobile money (RWF)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (RWF)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (min 100)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                step="1"
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isReady || !amount}
            >
              Pay with Mobile Money
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
