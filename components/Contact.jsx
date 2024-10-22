'use client';
import React from 'react';
import Head from 'next/head';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Your message has been sent to admin Await our response');
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  return (
    <>
      <Head>
        <title>Contact Us - TrendMart</title>
        <meta name="description" content="Get in touch with TrendMart" />
      </Head>

      {/* Header Section */}
      <header className="bg-blue-500     text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">
            We'd love to hear from you. Please reach out with any questions or
            feedback.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto py-12 px-6">
        {/* Contact Form Section */}
        <section className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-32 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3b82f6] text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Additional Contact Information */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">
            Contact Info
          </h2>
          <p className="text-lg text-gray-600">
            You can also reach us at the following contact details:
          </p>

          <div className="mt-6 space-y-4 text-lg text-gray-800">
            <p>
              <span className="font-semibold text-[#3b82f6]">Email:</span>{' '}
              support@trendmart.com
            </p>
            <p>
              <span className="font-semibold text-[#3b82f6]">Phone:</span> +234
              3595-6536
            </p>
            <p>
              <span className="font-semibold text-[#3b82f6]">Address:</span> 123
              TrendMart Street, Fashion City, FC 10001
            </p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-6 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600">
            &copy; 2024 TrendMart. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Contact;
