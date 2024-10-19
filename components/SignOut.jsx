'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Signout = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic redirect
    router.push('/'); // Redirect manually
  };

  return <button onClick={handleSignOut}>Signout</button>;
};

export default Signout;
