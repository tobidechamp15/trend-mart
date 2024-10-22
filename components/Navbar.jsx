'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCartShopping,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Signout from './SignOut';
import { useSession } from 'next-auth/react';
import CartIcon from './CartIcon';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session } = useSession();
  session, 'data';
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex  justify-between items-center py-4 w-full bg-white shadow-md px-4 lg:px-8">
      {/* Logo Section */}
      <Link
        href="/"
        className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition duration-300 font-[Pacifico]"
        aria-label="Go to TrendMart homepage"
      >
        TrendMart
      </Link>

      {/* Main Navigation Links */}
      <div className="hidden lg:flex gap-8 text-lg font-medium text-gray-800">
        <Link href="/" className="hover:text-blue-600 transition duration-300">
          Home
        </Link>
        <Link
          href="/shop"
          className="hover:text-blue-600 transition duration-300"
        >
          Shop
        </Link>
        <Link
          href="/about"
          className="hover:text-blue-600 transition duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-blue-600 transition duration-300"
        >
          Contact
        </Link>
      </div>

      {/* Authentication and Cart Section */}
      <div className="flex justify-center items-center gap-6">
        {/* Display User Status */}
        {session ? (
          <div className="hidden lg:flex items-center gap-3 text-blue-600 font-medium">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            <span>{session.user.name}</span>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden lg:flex text-red-500 hover:text-red-600 transition duration-300"
          >
            Log in
          </Link>
        )}

        {/* Cart Icon */}
        <CartIcon />

        {/* Mobile Menu Toggle */}
        {isSidebarOpen ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="text-blue-600 text-2xl hover:text-gray-400 transition duration-300"
            onClick={toggleSidebar}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleSidebar}
            className="lg:hidden text-2xl text-blue-600 hover:text-blue-700 transition duration-300 cursor-pointer"
            aria-label="Open menu"
          />
        )}
      </div>

      {/* Sidebar for Mobile Navigation */}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
    </div>
  );
};

export default Navbar;
