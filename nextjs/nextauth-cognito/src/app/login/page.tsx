"use client";

import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[300px] mx-auto sm:w-full z-10"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs">Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-[5px] text-darkTextColor dark:text-lightTextColor shadow-small"
          name="email"
          type="email"
          value={email}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs">Password</p>
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-[5px] w-full pr-8 text-darkTextColor dark:text-lightTextColor shadow-small"
            name="password"
            type={"password"}
            value={password}
          ></input>
        </div>
      </div>
      <button
        className="p-2 bg-detailsColor text-lightTextColor rounded-[5px] hover:scale-105 transition duration-200 shadow-small"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}
