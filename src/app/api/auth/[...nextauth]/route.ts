import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDatabase } from "@/lib/mongodb";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const db = await getDatabase();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role || (user.email === 'rakibulhasanmd678@gmail.com' ? 'admin' : 'user'), // Assign admin role to specific email
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.image = token.picture;
        session.user.role = token.role; // Pass role to session
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.picture = user.image;
        token.role = user.role; // Add role to token
      }
      if (trigger === "update" && session) {
        token.name = session.name;
        token.picture = session.image;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev-only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
