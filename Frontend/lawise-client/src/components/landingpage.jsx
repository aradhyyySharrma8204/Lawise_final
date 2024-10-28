import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LandingPage = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 bg-opacity-80 fixed w-full z-20 top-0 left-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                Lawise
              </Link>
              <div className="hidden md:block ml-10 space-x-8">
                <Link to="#services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
                <Link to="#about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
                <Link to="#testimonials" className="text-gray-300 hover:text-white">
                  Testimonials
                </Link>
                <Link to="#news" className="text-gray-300 hover:text-white">
                  News
                </Link>
                <Link to="#contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="border border-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/path/to/hero-image.jpg")', marginTop: '64px' }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Your Trusted Legal Partner</h1>
          <p className="text-lg mb-8">Expert legal advice and representation at your fingertips.</p>
          <Link to="#services" className="text-blue-500 hover:underline">
            Learn More
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-semibold">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Corporate Law</h3>
            <p>Expert legal assistance for your corporate needs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Family Law</h3>
            <p>Reliable and compassionate family legal services.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Criminal Defense</h3>
            <p>Experienced defense to protect your rights.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">About Us</h2>
          <p className="max-w-3xl mx-auto">
            With over 20 years of experience, we provide top-tier legal services to our clients.
            Our team is dedicated to delivering results that matter.
          </p>
          <Link
            to="/team" // Change to Link component for redirection
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Meet Our Team
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Client Testimonials</h2>
          <div className="text-lg italic">“Incredible service. I felt supported every step of the way!”</div>
        </div>
      </section>

      {/* News Bulletin Section */}
      <section id="news" className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-semibold">Latest News</h2>
          <p className="text-lg text-gray-600">Stay updated with the latest news and insights in the legal world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">New Legal Reforms 2023</h3>
            <p className="text-gray-700">Discover the latest changes in legal regulations and how they impact businesses and individuals.</p>
            <a href="https://www.mha.gov.in/en/commoncontent/new-criminal-laws" className="text-blue-600 hover:underline mt-4 block">Read More</a>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Understanding Your Rights</h3>
            <p className="text-gray-700">A guide to understanding your legal rights in everyday situations.</p>
            <a href="https://cjp.org.in/section/know-your-rights/" className="text-blue-600 hover:underline mt-4 block">Read More</a>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Top Legal Cases of the Year</h3>
            <p className="text-gray-700">An overview of the most influential cases and verdicts this year.</p>
            <a href="https://www.sci.gov.in/landmark-judgment-summaries/" className="text-blue-600 hover:underline mt-4 block">Read More</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-8 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Lawise. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
