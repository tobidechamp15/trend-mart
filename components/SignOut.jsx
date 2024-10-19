'use client'; // Ensure it's a client-side component
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Signout = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true); // Indicate sign-out process started
    await signOut({ redirect: false }); // Prevent automatic redirect
    router.push('/'); // Manually redirect to home page
  };

  // Ensure the router is ready before allowing sign-out
  useEffect(() => {
    if (!router.isReady) return; // Wait until router is fully loaded
  }, [router.isReady]);

  return (
    <button onClick={handleSignOut} disabled={isSigningOut}>
      {isSigningOut ? 'Signing out...' : 'Signout'}
    </button>
  );
};

export default Signout;
