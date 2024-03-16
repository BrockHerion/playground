"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Hello, guest</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session?.user?.name}
    </main>
  );
}
