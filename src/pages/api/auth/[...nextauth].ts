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
      async authorize(credentials, req) {
        const mockUser = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          password: "password",
        };
        console.log(credentials?.email === mockUser.email, credentials?.password === mockUser.password)
        if (credentials?.email === mockUser.email && credentials?.password === mockUser.password) {
          return { id: mockUser.id, name: mockUser.name, email: mockUser.email };
        } else {
          throw new Error("Invalid email or password")
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
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
});