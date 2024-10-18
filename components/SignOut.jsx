'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

const Signout = () => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return <button onClick={handleSignOut}>Signout</button>;
};

export default Signout;
