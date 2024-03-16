import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AWS from "aws-sdk";
import process from "process";
import crypto from "crypto";
import { InitiateAuthRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_REGION,
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const cognito = new AWS.CognitoIdentityServiceProvider();

        if (!credentials) return null;

        // Function to generate the secret hash
        const generateSecretHash = (email: string) => {
          const clientSecret = process.env.COGNITO_CLIENT_SECRET;
          if (!clientSecret) {
            throw new Error("COGNITO_CLIENT_SECRET is undefined");
          }
          const message = (email + process.env.COGNITO_CLIENT_ID) as string;
          return crypto
            .createHmac("SHA256", clientSecret)
            .update(message)
            .digest("base64");
        };

        const params: InitiateAuthRequest = {
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: process.env.COGNITO_CLIENT_ID as string,
          AuthParameters: {
            USERNAME: credentials.email,
            PASSWORD: credentials.password,
            SECRET_HASH: generateSecretHash(credentials.email),
          },
        };

        try {
          const response = await cognito.initiateAuth(params).promise();
          console.log(response);
          const user = {
            id: response.ChallengeParameters?.USER_ID_FOR_SRP as string, // User ID for Secure Remote Password
            name: credentials.email,
          };
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.name = user.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
