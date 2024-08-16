'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
const UserInfo = () => {
  const { data: session } = useSession();
  console.log('session', session);
  return <div>{session?.user?.userName}</div>;
};

export default UserInfo;
