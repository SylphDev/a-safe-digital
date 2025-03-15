import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials) {
          const users = [
            {
              id: "1",
              email: "test@example.com",
              password: "password123",
              name: "John Doe",
            },
            {
              id: "2",
              email: "user@example.com",
              password: "password",
              name: "Jane Doe",
            },
          ];
          const user = users.find(
            (u) =>
              u.email === credentials.email &&
              u.password === credentials.password
          );

          if (user) {
            return Promise.resolve(user);
          } else {
            throw new Error("Invalid email or password");
          }
        } else {
          throw new Error("Credentials are required");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
});
