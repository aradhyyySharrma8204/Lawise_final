import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleLogoClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleChatToggle = () => {
    window.open("https://se-chatbot.onrender.com/", "_blank");
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen" style={{ scrollBehavior: "smooth" }}>
      {/* Navbar */}
      <nav className="bg-gray-900 bg-opacity-80 fixed w-full z-20 top-0 left-0 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleLogoClick}
                className="text-2xl font-bold text-white tracking-wide hover:text-blue-500 transition"
              >
                Lawise
              </button>
              <div className="hidden md:flex ml-10 space-x-8">
                <a href="#services" className="text-gray-300 hover:text-white transition duration-300">
                  Services
                </a>
                <a href="#about" className="text-gray-300 hover:text-white transition duration-300">
                  About Us
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition duration-300">
                  Testimonials
                </a>
                <a href="#news" className="text-gray-300 hover:text-white transition duration-300">
                  News
                </a>
                <a href="#contact" className="text-gray-300 hover:text-white transition duration-300">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="border border-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("/path/to/hero-image.jpg")',
          marginTop: "64px",
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
        <div className="relative z-10 text-center max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-6 tracking-tight text-white leading-snug">
            Your Trusted Legal Partner
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Expert legal advice and representation at your fingertips.
          </p>
          <a
            href="#services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Modal for Logo Click */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Welcome to Lawise!</h2>
            <p className="mb-6 text-gray-600">
              Lawise: Building trust and solutions with every case.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Icon */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
        onClick={handleChatToggle}
      >
        <FaCommentDots size={24} />
      </button>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chat with Us</h3>
              <button
                onClick={handleChatToggle}
                className="text-gray-500 hover:text-gray-800 transition duration-300"
              >
                ✖
              </button>
            </div>
            <p className="text-gray-600">Hi! How can we assist you today?</p>
            <div className="mt-4">
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                rows="4"
                placeholder="Type your message..."
              ></textarea>
              <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-8 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Lawise. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
