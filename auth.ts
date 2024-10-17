import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
// import { getUserById } from "@/app/(public)/auth/actions";

declare module "next-auth" {
  interface Session {
    user: {
      last_name?: string;
      document_type?: string;
      document_number?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      return token;
    },
    session: async ({ token, session }) => {
      // console.log({ token, session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.last_name) {
        session.user.last_name = token.last_name as string;
      }
      // console.log({ token, session });
      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.query.users.findFirst({
          where: (users, { eq }) =>
            eq(users.email, credentials.email as string),
        });
        if (!user) {
          console.log("No hay un usuario con ese correo electronico");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        if (!passwordMatch) {
          console.log("No coinciden las contraseñas");
          return null;
        }
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          last_name: user.last_name,
          image: user.image,
        };
        // return mockUser;
      },
    }),
    Google,
    Github,
  ],
});
