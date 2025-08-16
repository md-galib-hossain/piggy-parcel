import { boolean } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const user= pgTable("user",{
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    emailVerified:boolean("email_verified").$defaultFn(()=> false).notNull(),
    image: text("image")
})