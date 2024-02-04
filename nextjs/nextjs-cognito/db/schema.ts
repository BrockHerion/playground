import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  roleId: integer("role_id").references(() => role.id),
  externalId: text("external_id"),
});

export const role = sqliteTable("role", {
  id: integer("id").primaryKey(),
  name: text("name"),
});
