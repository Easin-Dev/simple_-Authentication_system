import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials,){
            const { email, password } = credentials;

            // Replace this with your own user authentication logic
            if (email === "test@example.com" && password === "password123") {
              return { id: 1, name: "Test User", email: "test@example.com" };
            }
    
            // If authentication fails
            throw new Error("Invalid email or password");  
        },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
