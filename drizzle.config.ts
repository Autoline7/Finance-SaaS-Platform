import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";


console.log(process.env.DATABASE_URL);
config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});