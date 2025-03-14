import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const mockUser = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          password: "password",
        };

        if (credentials?.email === mockUser.email && credentials?.password === mockUser.password) {
          return { id: mockUser.id, name: mockUser.name, email: mockUser.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return "/dashboard";
    },
  },
});