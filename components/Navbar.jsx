'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Signout from './SignOut';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session } = useSession();
  session, 'data';
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex justify-between items-center py-6 w-full bg-white shadow-lg px-6">
      <Link
        href="/"
        className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition duration-300 font-[Pacifico]"
      >
        TrendMart
      </Link>

      {/* User Logout Section */}
      <div className="hidden md:flex items-center gap-3 cursor-pointer text-lg font-medium text-red-500 hover:text-red-700 transition duration-300">
        <FontAwesomeIcon
          icon={faUser}
          className="text-3xl text-blue-600 hover:text-blue-700"
        />
        <Signout />
      </div>

      {/* User Authentication Status */}
      <div className="hidden  md:flex gap-3 text-sm text-gray-800">
        {session ? (
          <span className="font-medium text-blue-600">{session.user.name}</span>
        ) : (
          <span className="font-medium text-red-500">Please log in.</span>
        )}
        <div className="cart-section relative inline-block">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="font-medium text-3xl text-blue-600"
          />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-sm flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-black">
            2
          </span>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <FontAwesomeIcon
        icon={faBars}
        onClick={toggleSidebar}
        className="block md:hidden text-3xl text-blue-600 hover:text-blue-700 transition duration-300"
      />

      {/* Sidebar for Mobile */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
