import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const testUser = {
  email: "test@test.com",
  password: "password",
  name: "Test User",
  image: "",
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials were missing");
        }

        // NOTE: In a production app, you would hash the password with something like bcrypt or argon2
        // DO NOT STORE PASSWORDS IN PLAIN TEXT
        if (
          credentials.email !== testUser.email ||
          credentials.password !== testUser.password
        ) {
          throw new Error("Invalid email or password");
        }

        return {
          id: "1",
          email: testUser.email,
          name: testUser.name,
          image: testUser.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
