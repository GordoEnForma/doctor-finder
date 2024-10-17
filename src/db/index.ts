import * as schema from "./schema";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { config } from "dotenv";

const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);

// config({ path: ".env" });

export const db = drizzle(sql, { schema});
