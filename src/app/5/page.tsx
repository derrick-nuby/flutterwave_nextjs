/**
 * Example 5: Pre-filled Customer Data
 *
 * This example demonstrates:
 * - Using customer data from state/props
 * - Dynamic customer information
 * - Email and phone validation
 */

"use client";

import { useState } from "react";
import {
  type Customer,
  isValidEmail,
  isValidPhone,
  useFlutterwavePayment,
} from "@/features/payment";

export default function PrefilledCustomerDataExample() {
  const [customer, setCustomer] = useState<Customer>({
    email: "john.doe@example.com",
    phone_number: "0788123456",
    name: "John Doe",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: 7500,
    currency: "RWF",
    customer,
    paymentMethods: ["mobilemoney"],
  });

  const validateCustomer = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(customer.email)) {
      newErrors.email = "Invalid email address";
    }

    // if (!isValidPhone(customer.phone_number)) {
    //   newErrors.phone = "Invalid phone number";
    // }

    if (!customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateCustomer()) {
      return;
    }

    initiatePayment({
      onSuccess: (response) => {
        alert(`Payment successful!\nCustomer: ${response.customer.name}`);
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
          Example 5: Pre-filled Customer
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={customer.phone_number}
              onChange={(e) =>
                setCustomer({ ...customer, phone_number: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isReady}
            className="w-full bg-teal-500 text-white px-6 py-3 rounded hover:bg-teal-600 disabled:bg-gray-400"
          >
            Pay 7,500 RWF
          </button>
        </div>
      </div>
    </div>
  );
}
