import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/"); // 👈 this should take you to HomePage
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About TravelEase</h1>
      <p className="text-gray-600 text-lg leading-relaxed text-center mb-10">
        At <span className="font-semibold text-blue-600">TravelEase</span>, we believe traveling should
        be simple, inspiring, and stress-free. Our mission is to help you
        discover breathtaking destinations and make booking your dream vacation
        effortless.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
          <ul className="space-y-3 text-gray-700">
            <li>🌍 Wide range of destinations worldwide</li>
            <li>💳 Easy booking with secure payment options</li>
            <li>🤝 Personalized customer support</li>
            <li>✨ Hand-picked experiences to make your trip unforgettable</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          We aim to connect travelers with unique experiences across the globe.
          Whether it’s exploring iconic landmarks, relaxing on pristine beaches,
          or discovering hidden gems, TravelEase is here to make your journey
          unforgettable.
        </p>
        <button
          onClick={handleStartJourney}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default About;
