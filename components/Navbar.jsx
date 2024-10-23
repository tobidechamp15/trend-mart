'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { useSession } from 'next-auth/react';
import CartIcon from './CartIcon';
import { usePathname } from 'next/navigation'; // Import usePathname
import Dropdown from './Dropdown';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname(); // Get current pathname

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const isActive = (path) => pathname === path; // Helper function to check active status

  return (
    <div className="flex justify-between items-center py-4 w-full bg-white shadow-md px-4 lg:px-8">
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
        <Link
          href="/"
          className={`hover:text-blue-600 transition duration-300 ${isActive('/') ? 'text-blue-600 font-bold border-b-2 border-blue-600' : ''}`}
        >
          Home
        </Link>
        <Link
          href="/shop"
          className={`hover:text-blue-600 transition duration-300 ${isActive('/shop') ? 'text-blue-600 font-bold border-b-2 border-blue-600' : ''}`}
        >
          Shop
        </Link>
        <Link
          href="/about"
          className={`hover:text-blue-600 transition duration-300 ${isActive('/about') ? 'text-blue-600 font-bold border-b-2 border-blue-600' : ''}`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`hover:text-blue-600 transition duration-300 ${isActive('/contact') ? 'text-blue-600 font-bold border-b-2 border-blue-600' : ''}`}
        >
          Contact
        </Link>
      </div>

      {/* Authentication and Cart Section */}
      <div className="flex justify-center items-center gap-6">
        {/* Display User Status */}
        {session ? (
          <div
            className="hidden relative lg:flex items-center gap-3 text-blue-600 font-medium justify-center hover:bg-gray-200 px-2 py-1 rounded-full"
            onClick={handleDropDown}
          >
            <div className="flex gap-2 items-center justify-center cursor-pointer ">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              <span>Hi, {session.user.name}</span>
            </div>
            {dropDown && <Dropdown />}
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
