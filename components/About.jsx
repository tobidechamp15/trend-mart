import React from 'react';

const About = () => {
  return (
    <>
      <header className="bg-[#3b82f6] text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">About TrendMart</h1>
        </div>
      </header>
      {/* Main Content Section */}
      <main className="container mx-auto py-12 px-6">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold">TrendMart</span>, your
            number one destination for all things fashion, electronics, and
            more. We’re dedicated to giving you the very best of shopping, with
            a focus on quality, customer service, and uniqueness. Founded in
            2024, TrendMart has come a long way from its beginnings as a small
            online store.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed">
            At <span className="font-semibold">TrendMart</span>, our mission is
            simple: to provide our customers with high-quality products at
            competitive prices while ensuring a seamless and enjoyable shopping
            experience. We believe in making online shopping accessible,
            reliable, and fun.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">
            Why Shop With Us?
          </h2>
          <ul className="list-disc list-inside text-lg leading-relaxed">
            <li>
              <span className="font-semibold text-[#3b82f6]">
                Wide Selection
              </span>
              : We curate products from trusted brands across multiple
              categories.
            </li>
            <li>
              <span className="font-semibold text-[#3b82f6]">
                Quality You Can Trust
              </span>
              : Every item goes through a rigorous quality check.
            </li>
            <li>
              <span className="font-semibold text-[#3b82f6]">
                Customer-Centric Service
              </span>
              : 24/7 support to assist with any inquiries.
            </li>
            <li>
              <span className="font-semibold text-[#3b82f6]">
                Fast & Secure Shipping
              </span>
              : Enjoy fast delivery and secure payment methods.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">Our Values</h2>
          <p className="text-lg leading-relaxed">
            <span className="font-semibold">Customer Satisfaction</span>: We
            exceed expectations by delivering a hassle-free shopping experience.{' '}
            <br />
            <span className="font-semibold">Sustainability</span>: We partner
            with ethical suppliers and source eco-friendly products. <br />
            <span className="font-semibold">Innovation</span>: Constantly
            evolving to bring you the latest trends and products.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">Our Team</h2>
          <p className="text-lg leading-relaxed">
            TrendMart is made up of a diverse team of passionate individuals
            working together to provide you with the best online shopping
            experience.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">
            Join Our Community
          </h2>
          <p className="text-lg leading-relaxed">
            Follow us on social media, join our newsletter, and be the first to
            know about exclusive offers and new product releases.
          </p>
          <button className="mt-6 px-6 py-2 text-lg font-semibold bg-[#3b82f6] text-white rounded-full hover:bg-blue-700 transition duration-300">
            Sign Up for Newsletter
          </button>
        </section>
      </main>
      {/* Footer Section */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600">
            &copy; 2024 TrendMart. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default About;
