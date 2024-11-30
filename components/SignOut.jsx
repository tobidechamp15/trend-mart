'use client'; // Ensure it's a client-side component
import { signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Signout = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true); // Indicate sign-out process started
    await signOut({ redirect: false }); // Prevent automatic redirect
    window.location.href = '/'; // Use window.location for redirection
  };

  // Ensure the router is ready before allowing sign-out

  return (
    <button onClick={handleSignOut} disabled={isSigningOut}>
      {isSigningOut ? 'Signing out...' : 'Signout'}
    </button>
  );
};

export default Signout;
