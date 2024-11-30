'use client';
import { useState, useEffect, useTransition } from 'react';
import Landing from '@/components/Landing';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      startTransition(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000); // simulate loading
      });
    };

    router.prefetch('/next-route'); // Example of prefetching next route
    return () => setLoading(false);
  }, [router]);

  return (
    <>
      {(loading || isPending) && <Loader />}
      <Landing />
    </>
  );
}
