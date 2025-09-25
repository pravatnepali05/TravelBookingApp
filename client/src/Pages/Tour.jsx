import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import tours from "../data/tours";
import { addItem } from "../lib/cart";

export default function Tour() {
  const { slug } = useParams(); // australia, brazil, japan, nepal
  const navigate = useNavigate();
  const tour = tours[slug];

  if (!tour) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-3">Tour not found</h1>
        <Link to="/" className="text-blue-600 underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const handleBook = () => {
    addItem({
      slug,
      title: tour.title,
      price: tour.price,
      qty: 1,
    });
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

      {/* Image grid */}
      {tour.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {tour.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${tour.title} ${i + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* Description */}
      <div className="text-gray-700 leading-7 mb-6 space-y-2">
        {tour.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {/* Details */}
      <div className="bg-gray-50 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-3">Tour Details</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Max Persons:</strong> {tour.maxPersons}
          </li>
          <li>
            <strong>Price:</strong> €{tour.price} per person
          </li>
          <li>
            <strong>Duration:</strong> {tour.duration}
          </li>
          <li>
            <strong>Departure:</strong> {tour.departure}
          </li>
          <li>
            <strong>Best Season:</strong> {tour.season}
          </li>
        </ul>
      </div>

      <button
        onClick={handleBook}
        className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
      >
        Book Now
      </button>

      <div className="mt-4">
        <Link to="/" className="underline text-blue-600">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
