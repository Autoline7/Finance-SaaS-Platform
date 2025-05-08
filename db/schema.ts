import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const insertAccountsSchema = createInsertSchema(accounts,{
    // Optional: Customize schema if needed
    id: z.string().optional(), // ID is optional for inserts (can be generated)
    plaidId: z.string().optional(), // Nullable field
    name: z.string(), // Required
    userId: z.string(), // Required
  });