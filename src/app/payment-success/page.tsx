"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';



export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [transactionData, setTransactionData] = useState({
    transactionId: '',
    amount: '',
    currency: '',
    status: ''
  });

  useEffect(() => {
    // Get transaction details from URL params
    setTransactionData({
      transactionId: searchParams.get('transaction_id') || 'N/A',
      amount: searchParams.get('amount') || '0',
      currency: searchParams.get('currency') || 'USD',
      status: searchParams.get('status') || 'successful'
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your transaction has been completed successfully.
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Transaction Details
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="text-gray-900 font-medium">
                {transactionData.transactionId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="text-gray-900 font-medium">
                {transactionData.currency} {transactionData.amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-medium capitalize">
                {transactionData.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-900 font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download Receipt
          </button>

          <Link
            href="/"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
}