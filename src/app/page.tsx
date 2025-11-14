"use client";

import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
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

export default function Home() {
  const [amount, setAmount] = useState<string>("");

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: `tx-${Date.now()}`,
    amount: Number.parseFloat(amount) || 0,
    currency: "RWF",
    payment_options: "mobilemoney",
    customer: {
      email: "user@example.com",
      phone_number: "0700000000",
      name: "Test User",
    },
    customizations: {
      title: "Mobile Money Payment",
      description: "Pay with Mobile Money",
      logo: "",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "successful") {
          alert(
            `Payment successful! Transaction ID: ${response.transaction_id}`,
          );
        }
        closePaymentModal();
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
            Enter the amount you want to pay with mobile money
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (RWF)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="1"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Pay with Mobile Money
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
