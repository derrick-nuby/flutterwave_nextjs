# Flutterwave Payment Integration with Next.js

A modern, type-safe Next.js application template for integrating **Flutterwave** payment gateway. Built with React, TypeScript, and Tailwind CSS, this project provides a solid foundation for accepting payments across Africa, including mobile money solutions.

## About Flutterwave

[Flutterwave](https://flutterwave.com) is a leading African payment infrastructure platform that enables businesses to accept payments from customers across Africa and globally. It supports:

- **Mobile Money**: MTN Mobile Money, Airtel Money, and other regional providers
- **Card Payments**: Visa, Mastercard, Verve
- **Bank Transfers**: Direct bank payments
- **USSD**: Payment via USSD codes
- **QR Codes**: Quick payment collection

### Why Flutterwave?

- Wide coverage across 34+ African countries
- Support for 150+ currencies
- Multiple payment methods including mobile money (MTN, Airtel, etc.)
- Robust API and excellent documentation
- PCI-DSS compliant for security
- Perfect for Rwanda's MTN Mobile Money and Airtel Money

## Features

- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Biome for fast linting and formatting
- Production-ready scripts for testing and deployment
- Ready for Flutterwave integration

## Prerequisites

- Node.js 18+ or higher
- npm, yarn, pnpm, or bun
- A Flutterwave account (sign up at [https://flutterwave.com](https://flutterwave.com))

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flutterwave_nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_public_key_here
FLUTTERWAVE_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Configuration

### Getting Flutterwave API Keys

1. Sign up or log in to your [Flutterwave Dashboard](https://dashboard.flutterwave.com)
2. Navigate to **Settings** > **API Keys**
3. Copy your **Public Key** and **Secret Key**
4. For testing, use the **Test API keys**
5. For production, use the **Live API keys**

## Available Scripts

### Development

```bash
npm run dev          # Start development server
```

### Production

```bash
npm run build        # Build for production
npm start            # Start production server
```

### Code Quality

```bash
npm run lint         # Run Biome linter and formatter with auto-fix
npm run format       # Format code with Biome
npm run lint:check   # Check linting without fixing
npm run format:check # Check formatting without fixing
npm run type-check   # Run TypeScript type checking
```

### Pre-deployment Checklist

Before deploying to production, run:
```bash
npm run lint:check && npm run format:check && npm run type-check && npm run build
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Code Quality**: [Biome](https://biomejs.dev/) (replaces ESLint + Prettier)
- **Payment Gateway**: [Flutterwave](https://flutterwave.com/)

## Project Structure

```
flutterwave_nextjs/
├── src/
│   └── app/              # Next.js App Router pages
│       ├── layout.tsx    # Root layout
│       ├── page.tsx      # Home page
│       └── globals.css   # Global styles
├── public/               # Static assets
├── biome.json           # Biome configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Flutterwave Integration Guide

### 1. Install Flutterwave React Package

```bash
npm install flutterwave-react-v3
```

### 2. Basic Payment Implementation

Create a payment component:

```typescript
'use client';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function PaymentButton() {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: Date.now().toString(),
    amount: 1000,
    currency: 'RWF', // Rwandan Franc
    payment_options: 'mobilemoneyrwanda,card,banktransfer',
    customer: {
      email: 'customer@example.com',
      phone_number: '250788123456',
      name: 'John Doe',
    },
    customizations: {
      title: 'My Payment',
      description: 'Payment for items in cart',
      logo: 'https://yourlogo.com/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal();
          },
          onClose: () => {},
        });
      }}
    >
      Pay with Flutterwave
    </button>
  );
}
```

### 3. Supported Payment Methods in Rwanda

- **MTN Mobile Money Rwanda**: `mobilemoneyRwanda`
- **Airtel Money**: Available through mobile money options
- **Card Payments**: Visa, Mastercard
- **Bank Transfer**: Direct bank transfers

### 4. Testing

Use Flutterwave's test credentials:
- **Test Card**: `4187427415564246`
- **CVV**: `828`
- **Expiry**: Any future date
- **OTP**: `12345`

## Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Make Changes**: Edit files in the `src/` directory

3. **Check Code Quality**:
   ```bash
   npm run lint
   npm run type-check
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Security Best Practices

1. Never commit `.env.local` to version control
2. Always validate payments on the server side
3. Use webhook signatures to verify payment notifications
4. Store secret keys securely (use environment variables)
5. Enable 3D Secure for card payments
6. Implement transaction limits and fraud detection

## Resources

### Flutterwave
- [Official Documentation](https://developer.flutterwave.com/docs)
- [React Integration Guide](https://developer.flutterwave.com/docs/flutterwave-react-v3)
- [API Reference](https://developer.flutterwave.com/reference)
- [Dashboard](https://dashboard.flutterwave.com)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Tools
- [Biome Documentation](https://biomejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Troubleshooting

### Common Issues

**Payment not processing**:
- Verify your API keys are correct
- Check if you're using test keys in development
- Ensure your account is verified for live transactions

**Mobile Money issues**:
- Confirm the phone number format (e.g., `250788123456` for Rwanda)
- Check if the mobile money provider is available in your region

**TypeScript errors**:
```bash
npm run type-check
```

**Linting errors**:
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests and linting (`npm run lint && npm run type-check`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - feel free to use this project for your applications.

## Support

For Flutterwave-specific issues:
- Email: developers@flutterwavego.com
- Documentation: https://developer.flutterwave.com

For project issues:
- Open an issue on GitHub

---

Built with ❤️ using Next.js and Flutterwave
