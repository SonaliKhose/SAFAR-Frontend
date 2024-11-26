import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios"; // To make HTTP requests

let userResponse = null;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email public_profile",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        userResponse = await axios.post(`${process.env.BACKEND_URL}/social-signin`, {
          social_id: account.providerAccountId,
          social_name: profile.name,
          social_email: profile.email,
          provider: account.provider,
          access_token: account.access_token,
        });
        //console.log("userResponse", userResponse.data);
        console.log("User id", userResponse.data.data._id);

        return true;
      } catch (error) {
        console.error("Error saving social sign-in:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (account && user && userResponse) {
        token.accessToken = account.access_token;
        token.userId = userResponse.data.data._id; // Store MongoDB _id in token
        token.email = user.email;
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userId = token.userId; // Assign MongoDB _id to session.userId
      session.user.email = token.email;
      session.provider = token.provider;

      console.log("Session in callback:", session); // Print session here
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to home page after successful sign-in
    },
  },

  pages: {
    signIn: "/auth/login", // Custom sign-in page if needed
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
