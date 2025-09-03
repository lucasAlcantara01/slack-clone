'use client';

import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      <p>Logged in </p>
      <Button onClick={() => signOut()}> sign out</Button>
    </div>
  );
}
