# Flutterwave Payment Integration System

A **bulletproof, reusable, and future-proof** payment system for integrating Flutterwave payments into any Next.js or React application. This system is designed with modularity, type safety, and developer experience in mind.

## Features

- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Reusable**: Use in any project by simply copying the `features/payment` folder
- **Flexible**: Supports multiple currencies, payment methods, and configurations
- **Well-Tested**: 10 comprehensive examples covering all use cases
- **Zero Dependencies**: Only requires `flutterwave-react-v3` (already in your project)
- **Hook-Based**: Clean React hooks API for easy integration
- **Validation**: Built-in validation utilities for amounts, emails, and phone numbers
- **Presets**: Pre-configured payment setups for common scenarios

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Core Components](#core-components)
4. [API Reference](#api-reference)
5. [Examples](#examples)
6. [Utilities](#utilities)
7. [Configuration](#configuration)
8. [Type Definitions](#type-definitions)
9. [Best Practices](#best-practices)

---

## Installation

### 1. Copy the Payment System

Copy the entire `features/payment` folder into your project:

```powershell
src/
└── features/
    └── payment/
        ├── hooks/
        ├── utils/
        ├── config/
        ├── types/
        └── index.ts
```

### 2. Install Dependencies

```bash
pnpm add flutterwave-react-v3
```

### 3. Set Environment Variables

Create a `.env` or `.env.local` file:

```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-your-public-key-here"
```

---

## Quick Start

### Basic Usage

```tsx
"use client";

import { useFlutterwavePayment } from "@/features/payment";

export default function MyPaymentPage() {
  const { initiatePayment, isReady } = useFlutterwavePayment({
    amount: 5000,
    currency: "RWF",
    customer: {
      email: "user@example.com",
      phone_number: "0788123456",
      name: "John Doe",
    },
    paymentMethods: ["mobilemoney"],
  });

  const handlePayment = () => {
    initiatePayment({
      onSuccess: (response) => {
        console.log("Payment successful!", response);
        alert(`Transaction ID: ${response.transaction_id}`);
      },
      onError: (error) => {
        console.error("Payment failed:", error);
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };

  return (
    <button onClick={handlePayment} disabled={!isReady}>
      Pay Now
    </button>
  );
}
```

---

## Core Components

### 1. `useFlutterwavePayment` Hook

The main hook for handling Flutterwave payments.

**Parameters:**

```typescript
interface UseFlutterwavePaymentOptions {
  amount: number;
  currency?: Currency; // Default: "RWF"
  customer: Customer;
  paymentMethods?: PaymentMethod[]; // Default: ["mobilemoney"]
  customization?: Partial<PaymentCustomization>;
  metadata?: Record<string, unknown>;
  redirectUrl?: string;
}
```

**Returns:**

```typescript
interface UseFlutterwavePaymentReturn {
  initiatePayment: (handlers?: PaymentHandlers) => void;
  isReady: boolean;
  config: PaymentConfig;
}
```

### 2. Payment Configuration Builder

Build custom payment configurations:

```typescript
import { buildPaymentConfig } from "@/features/payment";

const config = buildPaymentConfig({
  amount: 10000,
  currency: "RWF",
  customer: { email: "...", phone_number: "...", name: "..." },
  paymentMethods: ["mobilemoney", "card"],
  customization: {
    title: "My Payment",
    description: "Payment for services",
  },
});
```

### 3. Payment Presets

Pre-configured payment setups:

```typescript
import { PaymentPresets } from "@/features/payment";

// Rwanda Mobile Money
const config1 = PaymentPresets.rwandaMobileMoney(5000, customer);

// Uganda Mobile Money
const config2 = PaymentPresets.ugandaMobileMoney(10000, customer);

// Kenya M-Pesa
const config3 = PaymentPresets.kenyaMpesa(2000, customer);

// Card Payment
const config4 = PaymentPresets.cardPayment(15000, customer, "RWF");

// All Payment Methods
const config5 = PaymentPresets.allMethods(20000, customer, "RWF");
```

---

## API Reference

### Hooks

#### `useFlutterwavePayment(options)`

Main payment hook.

```typescript
const { initiatePayment, isReady, config } = useFlutterwavePayment({
  amount: 5000,
  currency: "RWF",
  customer: { email: "...", phone_number: "...", name: "..." },
  paymentMethods: ["mobilemoney"],
  customization: { title: "...", description: "..." },
  metadata: { order_id: "..." },
  redirectUrl: "https://...",
});
```

### Utilities

#### `generateTxRef(prefix?: string)`

Generate unique transaction reference.

```typescript
const txRef = generateTxRef("order"); // "order-1234567890-abc123"
```

#### `formatPaymentMethods(methods: PaymentMethod[])`

Format payment methods array into string.

```typescript
const formatted = formatPaymentMethods(["card", "mobilemoney"]); // "card,mobilemoney"
```

#### `isValidEmail(email: string)`

Validate email address.

```typescript
const valid = isValidEmail("user@example.com"); // true
```

#### `isValidPhone(phone: string)`

Validate phone number.

```typescript
const valid = isValidPhone("0788123456"); // true
```

#### `formatAmount(amount: number)`

Format amount to 2 decimal places.

```typescript
const formatted = formatAmount(123.456); // 123.46
```

#### `getCurrencySymbol(currency: Currency)`

Get currency symbol.

```typescript
const symbol = getCurrencySymbol("RWF"); // "FRw"
```

#### `validateAmount(amount: number, currency: Currency)`

Validate amount for currency.

```typescript
const result = validateAmount(50, "RWF");
// { isValid: false, error: "Minimum amount is 100 RWF" }
```

#### `formatCurrencyDisplay(amount: number, currency: Currency)`

Format amount with currency for display.

```typescript
const display = formatCurrencyDisplay(5000, "RWF"); // "FRw 5,000"
```

### Configuration

#### `buildPaymentConfig(options: PaymentConfigOptions)`

Build complete payment configuration.

#### `validatePaymentConfig(config: PaymentConfig)`

Validate payment configuration.

```typescript
const result = validatePaymentConfig(config);
// { isValid: true, errors: [] }
```

---

## Examples

We provide 10 comprehensive examples covering all use cases. Each example is a working page that you can test:

### 1. Simple Button with Fixed Amount

Basic payment button with hardcoded amount.

**Route:** `/1`

```tsx
const { initiatePayment } = useFlutterwavePayment({
  amount: 5000,
  currency: "RWF",
  customer: { ... },
});
```

### 2. Form with User Input Amount

Payment form where user enters amount.

**Route:** `/2`

```tsx
const [amount, setAmount] = useState("");
const { initiatePayment } = useFlutterwavePayment({
  amount: parseFloat(amount) || 0,
  ...
});
```

### 3. Multiple Currencies

Support for multiple currencies with selection.

**Route:** `/3`

```tsx
const [currency, setCurrency] = useState<Currency>("RWF");
const { initiatePayment } = useFlutterwavePayment({
  currency,
  ...
});
```

### 4. Different Payment Methods

Multiple payment method selection.

**Route:** `/4`

```tsx
const [methods, setMethods] = useState<PaymentMethod[]>(["mobilemoney"]);
const { initiatePayment } = useFlutterwavePayment({
  paymentMethods: methods,
  ...
});
```

### 5. Pre-filled Customer Data

Dynamic customer information from state.

**Route:** `/5`

```tsx
const [customer, setCustomer] = useState<Customer>({ ... });
const { initiatePayment } = useFlutterwavePayment({
  customer,
  ...
});
```

### 6. Payment with Metadata

Add custom metadata to payments.

**Route:** `/6`

```tsx
const { initiatePayment } = useFlutterwavePayment({
  metadata: {
    order_id: "ORD-123",
    cart_items: [...],
  },
  ...
});
```

### 7. Programmatic Trigger

Auto-trigger payment without user click.

**Route:** `/7`

```tsx
useEffect(() => {
  if (shouldPay) {
    initiatePayment({ ... });
  }
}, [shouldPay]);
```

### 8. Payment with Redirect

Redirect user after successful payment.

**Route:** `/8`

```tsx
const { initiatePayment } = useFlutterwavePayment({
  redirectUrl: "https://myapp.com/success",
  ...
});
```

### 9. Custom Validation

Custom validation before payment.

**Route:** `/9`

```tsx
const handlePayment = () => {
  if (!customValidation()) return;
  initiatePayment({ ... });
};
```

### 10. Using Presets

Pre-configured payment setups.

**Route:** `/10`

```tsx
const config = PaymentPresets.rwandaMobileMoney(5000, customer);
```

---

## Type Definitions

### Core Types

```typescript
// Currencies
type Currency = "RWF" | "UGX" | "KES" | "TZS" | "NGN" | "GHS" | "ZAR" | "USD" | "EUR" | "GBP";

// Payment Methods
type PaymentMethod =
  | "card"
  | "mobilemoney"
  | "ussd"
  | "banktransfer"
  | "mpesa"
  | "Ghana mobile money"
  | "Uganda mobile money"
  | "Rwanda mobile money"
  | "Zambia mobile money"
  | "barter"
  | "nqr";

// Customer
interface Customer {
  email: string;
  phone_number: string;
  name: string;
}

// Payment Response
interface PaymentResponse {
  status: "successful" | "failed" | "cancelled";
  transaction_id: string;
  tx_ref: string;
  flw_ref: string;
  currency: string;
  amount: number;
  charged_amount: number;
  customer: Customer;
  payment_type?: string;
}

// Payment Handlers
interface PaymentHandlers {
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}
```

---

## Best Practices

### 1. Environment Variables

Always use environment variables for API keys:

```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."
```

### 2. Error Handling

Always implement error handlers:

```typescript
initiatePayment({
  onSuccess: (response) => {
    // Handle success
  },
  onError: (error) => {
    // Handle error
    console.error(error);
    showErrorToUser(error.message);
  },
});
```

### 3. Validation

Validate inputs before initiating payment:

```typescript
import { validateAmount, isValidEmail } from "@/features/payment";

const validation = validateAmount(amount, currency);
if (!validation.isValid) {
  alert(validation.error);
  return;
}
```

### 4. Loading States

Use the `isReady` flag for loading states:

```typescript
const { initiatePayment, isReady } = useFlutterwavePayment({ ... });

return (
  <button onClick={handlePayment} disabled={!isReady}>
    {isReady ? "Pay Now" : "Loading..."}
  </button>
);
```

### 5. Transaction References

Generate unique transaction references:

```typescript
import { generateTxRef } from "@/features/payment";

const txRef = generateTxRef(`order-${orderId}`);
```

### 6. Metadata

Use metadata for tracking:

```typescript
metadata: {
  order_id: orderId,
  user_id: userId,
  source: "web",
  cart_items: items,
}
```

---

## Testing

### Test Mode

Use test API keys for development:

```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."
```

### Test Cards

Flutterwave provides test card numbers for testing payments. Check their documentation for details.

---

## Migration to Other Projects

### Step 1: Copy Folder

Copy the entire `features/payment` folder to your new project.

### Step 2: Install Dependencies

```bash
pnpm add flutterwave-react-v3
# or
npm install flutterwave-react-v3
# or
yarn add flutterwave-react-v3
```

### Step 3: Set Environment Variables

```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY="your-key-here"
```

### Step 4: Import and Use

```typescript
import { useFlutterwavePayment } from "@/features/payment";
```

---

## Support

For issues with:

- **This payment system**: Check the example routes (/1 through /10) and type definitions
- **Flutterwave API**: Visit [Flutterwave Documentation](https://developer.flutterwave.com)
- **Integration issues**: Review the example pages at routes /1 through /10

---

## License

This payment system is part of your project and follows your project's license.

---

## Changelog

### v1.0.0

- Initial release
- 10 comprehensive examples
- Full TypeScript support
- Payment presets
- Validation utilities
- Multi-currency support
