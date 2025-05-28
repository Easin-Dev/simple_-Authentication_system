import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        fullName: { label: "Full Name", type: "text", placeholder: "full name" },
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const {fullName, email, password, role } = credentials;

        if (fullName && email && password) {
          return { id: 1, fullName: fullName, email: email, role: role };
        }

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
  callbacks: {
    async jwt({ token, user, account }) {
      if(user){
        token.id = user.id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.provider = account.provider || "credentials";
        token.role = user.role  || "user";

      }
      return token;
    },
    async session({ session, token, account}) {
      if (token) {
        session.id = token.id;
        session.fullName = token.fullName;
        session.email = token.email;
        session.provider = token.provider || "credentials";
        session.role = token.role || "user";
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
