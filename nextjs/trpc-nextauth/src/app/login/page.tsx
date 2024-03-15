"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  return (
    <form className="flex flex-col gap-y-6 dark:text-black" onSubmit={login}>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="dark:text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password" className="dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="dark:bg-white">
        Login
      </button>
    </form>
  );
}
