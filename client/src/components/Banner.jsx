import React, { useState } from 'react';
import BannerImage from '../assets/banner1.jpg';

const Banner = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(text.trim());
  };

  return (
    <div
      className="w-full h-[500px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          Your Dream Vacation
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-center max-w-3xl">
          Discover the world's most beautiful destinations and create unforgettable memories.
        </p>

        
      </div>
    </div>
  );
};

export default Banner;
