import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
});
