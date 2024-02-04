"use client";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { SyntheticEvent, useState } from "react";

const userPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_APP_ID as string,
};

const userPool = new CognitoUserPool(userPoolData);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("Authentication successful", result);
        // Redirect user or update UI accordingly
      },
      onFailure: (err) => {
        console.error("Authentication failed", err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // User needs to set a new password
        console.log("New password required");
      },
    });
  };

  return (
    <form className="flex flex-col gap-2 text-black">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" className="bg-white">
        Sign In
      </button>
    </form>
  );
}
