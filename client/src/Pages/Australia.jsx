import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../lib/cart";

export default function Australia() {
  const navigate = useNavigate();
  const handleBook = () => {
    addItem({ slug: "australia", title: "Australia Tour — Highlights of the East", price: 1200, qty: 1 });
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Australia Tour</h1>

      <p className="text-gray-700 leading-7 mb-6">
        Experience the essence of Australia in just 7 days. Explore Sydney’s Opera House
        and Harbour Bridge, venture into the Blue Mountains, and discover the Great Barrier Reef.
        Relax on golden beaches, enjoy vibrant city life, and spot unique wildlife.
        A perfect mix of adventure, culture, and leisure — ideal for first-time visitors and explorers alike.
      </p>

      <div className="bg-gray-50 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-3">Tour Details</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Max Persons:</strong> 10 travelers</li>
          <li><strong>Price:</strong> €1200 per person</li>
          <li><strong>Duration:</strong> 7 days / 6 nights</li>
          <li><strong>Departure:</strong> Sydney (SYD)</li>
          <li><strong>Best Season:</strong> September–November, March–May</li>
        </ul>
      </div>

      <button onClick={handleBook} className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
        Book Now
      </button>

      <div className="mt-4">
        <Link to="/" className="underline text-blue-600">← Back to Home</Link>
      </div>
    </div>
  );
}
