import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../lib/api"; // uses VITE_BASE_URL

import image1 from "../assets/dreamvacations/Australia.jpg";
import image2 from "../assets/dreamvacations/Brasil.jpg";
import image3 from "../assets/dreamvacations/Japan.jpeg";
import image4 from "../assets/dreamvacations/Nepal.jpg";

const DEFAULTS = [
  { id: "def-au", title: "Australia", slug: "australia", description: "Sydney, Great Barrier Reef, Outback.", image: image1 },
  { id: "def-br", title: "Brazil",    slug: "brazil",    description: "Beaches, rainforest, lively culture.", image: image2 },
  { id: "def-jp", title: "Japan",     slug: "japan",     description: "Tradition meets modernity.", image: image3 },
  { id: "def-np", title: "Nepal",     slug: "nepal",     description: "Himalayas & rich culture.", image: image4 },
];

export default function DreamVacation({ searchQuery = "" }) {
  const [serverTours, setServerTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // load real tours from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/api/tours");
        setServerTours(Array.isArray(data.tours) ? data.tours : []);
      } catch {
        setServerTours([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // normalize backend tours into same shape we render
  const normalizedServer = useMemo(
    () =>
      serverTours.map((t) => ({
        id: t._id,
        title: t.title,
        slug: t.slug,
        description: t.description,
        image: (t.images && t.images[0]) || image1, // fallback if no image URL saved
      })),
    [serverTours]
  );

  // Decide what to show: backend > defaults
  const allTours = normalizedServer.length ? normalizedServer : DEFAULTS;

  // Filter
  const q = (searchQuery || "").trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return allTours;
    return allTours.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        (d.description || "").toLowerCase().includes(q)
    );
  }, [q, allTours]);

  return (
    <div className="flex flex-col mt-14 items-center px-4">
      <h1 className="text-3xl font-semibold mb-2 text-black text-center">Dream Vacation Destinations</h1>
      <p className="text-gray-600 mb-6 text-center">Explore our top picks for dream vacation destinations around the world.</p>

      {loading ? (
        <div className="text-gray-500 py-8">Loading tours…</div>
      ) : results.length === 0 ? (
        <div className="text-red-600 font-semibold py-8">No tours found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          {results.map((destination) => (
            <Link
              key={destination.id}
              to={`/destination/${destination.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center hover:shadow-lg transition"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={destination.image} alt={destination.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{destination.title}</h2>
                <p className="text-sm text-gray-600">{destination.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
