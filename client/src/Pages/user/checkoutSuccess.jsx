import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-3">🎉 Payment Successful</h1>
      <p className="text-gray-700 mb-6">
        Your booking has been recorded. You’ll receive an email with the details.
      </p>
      <Link to="/" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
        Back to Home
      </Link>
      <div className="mt-4">
        <Link to="/cart" className="text-blue-600 underline">View Cart</Link>
      </div>
    </div>
  );
}
