// client/src/Pages/Contact.jsx
import React from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-gray-600 text-center mb-10">
        Have questions or want to reach out? Connect with us via your favorite platform.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* WhatsApp */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 border rounded-lg hover:shadow-md transition"
        >
          <FaWhatsapp className="text-green-500 text-3xl" />
          <div>
            <h2 className="font-semibold">WhatsApp</h2>
            <p className="text-sm text-gray-600">Chat with us instantly</p>
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 border rounded-lg hover:shadow-md transition"
        >
          <FaFacebook className="text-blue-600 text-3xl" />
          <div>
            <h2 className="font-semibold">Facebook</h2>
            <p className="text-sm text-gray-600">Follow us for updates</p>
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 border rounded-lg hover:shadow-md transition"
        >
          <FaInstagram className="text-pink-500 text-3xl" />
          <div>
            <h2 className="font-semibold">Instagram</h2>
            <p className="text-sm text-gray-600">See our latest stories</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:contact@travelease.com"
          className="flex items-center gap-4 p-5 border rounded-lg hover:shadow-md transition"
        >
          <FaEnvelope className="text-red-500 text-3xl" />
          <div>
            <h2 className="font-semibold">Email</h2>
            <p className="text-sm text-gray-600">contact@travelease.com</p>
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:+1234567890"
          className="flex items-center gap-4 p-5 border rounded-lg hover:shadow-md transition"
        >
          <FaPhone className="text-gray-700 text-3xl" />
          <div>
            <h2 className="font-semibold">Phone</h2>
            <p className="text-sm text-gray-600">+1 234 567 890</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
