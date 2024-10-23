'use client';
import {
  faBoxOpen,
  faCog,
  faHeart,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Dropdown = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true); // Indicate sign-out process started
    await signOut({ redirect: false }); // Prevent automatic redirect
    window.location.href = '/'; // Use window.location for redirection
  };
  return (
    <div className="absolute r top-[60px] w-48 bg-white rounded-lg shadow-lg py-2 z-10">
      <ul className="text-sm text-gray-700 m-0 p-0">
        {/* Profile Link */}
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
          <Link href="/profile" className="w-full">
            Profile
          </Link>
        </li>

        {/* Order History */}
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faBoxOpen} className="mr-2 text-blue-600" />
          <Link href="/orders" className="w-full">
            Order History
          </Link>
        </li>

        {/* Wishlist */}
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faHeart} className="mr-2 text-blue-600" />
          <Link href="/wishlist" className="w-full">
            Wishlist
          </Link>
        </li>

        {/* Account Settings */}
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faCog} className="mr-2 text-blue-600" />
          <Link href="/settings" className="w-full">
            Account Settings
          </Link>
        </li>

        {/* Sign Out */}
        <li
          className="flex items-center px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
          onClick={handleSignOut}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-500" />
          <span className="w-full text-red-500">
            {isSigningOut ? 'Signing out...' : 'Signout'}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
