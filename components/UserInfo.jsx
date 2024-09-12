'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
const UserInfo = () => {
  const { data: session } = useSession();
  console.log('session', session);
  return (
    <div>
      <span className="">{session?.user?.name}</span>
      <button
        className="btn btn-outline-danger fixed top-0 right-0 m-3"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;
