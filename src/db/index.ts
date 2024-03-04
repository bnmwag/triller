import { drizzle } from "drizzle-orm/neon-http";
import { type NeonQueryFunction, neon } from "@neondatabase/serverless";

import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!) as NeonQueryFunction<
  boolean,
  boolean
>;
export const db = drizzle<typeof schema>(sql, { logger: false, schema });

export * from "drizzle-orm";
