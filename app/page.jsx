'use client ';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to TrendMart</h1>
        <p className="text-lg mb-8">
          Discover the best products for your daily needs at unbeatable prices.
        </p>
        <Link href="/shop">
          <span className="bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300">
            Shop Now
          </span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Free Shipping</h3>
            <p className="text-gray-600">
              Get your orders delivered to your doorstep without extra cost.
              Available on all orders above $50.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
            <p className="text-gray-600">
              Our customer service team is here to assist you any time, day or
              night. We prioritize your satisfaction.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Secure Payment</h3>
            <p className="text-gray-600">
              Shop with confidence. We provide secure and fast payment options
              for all transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="shop" className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Men's Clothing</h3>
            <p className="text-gray-600">
              Find the latest trends in men's fashion, from casual wear to
              formal attire.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Women's Clothing</h3>
            <p className="text-gray-600">
              Explore our collection of stylish and comfortable clothing for
              women.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Accessories</h3>
            <p className="text-gray-600">
              Complete your look with the perfect accessories from our exclusive
              range.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-8 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Don't Miss Out on Our Latest Deals!
        </h2>
        <p className="text-lg mb-8">
          Subscribe to our newsletter and be the first to know about new
          products and special offers.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-3 px-4 rounded-lg text-gray-800 w-full sm:w-auto"
          />
          <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-8 bg-gray-800 text-gray-400 text-center">
        <p>&copy; 2024 TrendMart. All rights reserved.</p>
        <p className="mt-2">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            Privacy Policy
          </a>{' '}
          |
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-200 ml-4"
          >
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}
