import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  date,
  time,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  last_name: text("last_name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  document_type: text("document_type"),
  document_number: text("document_number"),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const citas = pgTable("citas", {
  id: uuid("id").primaryKey().defaultRandom(),
  usuario_id: uuid("usuario_id").references(() => users.id),
  doctor_id: uuid("doctor_id").references(() => doctores.id),
  fecha: date("fecha").notNull(),
  hora_inicio: time("hora_inicio").notNull(),
  hora_fin: time("hora_fin").notNull(),
  clinica_id: uuid("clinica_id").references(() => clinicas.id),
  estado: text("estado").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
});


export const especialidades = pgTable("especialidades", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre").notNull(),
});


export const doctores = pgTable("doctores", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre").notNull(),
  image: text("image"),
  especialidad_id: uuid("especialidad_id").references(() => especialidades.id),
  clinica_id: uuid("clinica_id").references(() => clinicas.id),
  sexo: text("sexo", { enum: ["M", "F"] }).notNull(),
});


export const clinicas = pgTable("clinicas", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre").notNull(),
  direccion: text("direccion"),
  telefono: text("telefono"),
  email: text("email"),
});

export const horarios = pgTable("horarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  doctor_id: uuid("doctor_id").references(() => doctores.id),
  fecha: date("fecha").notNull(),
  hora_inicio: time("hora_inicio").notNull(),
  hora_fin: time("hora_fin").notNull(),
  disponible: boolean("disponible").default(true),
});


export const favoritos = pgTable("favoritos", {
  id: uuid("id").primaryKey().defaultRandom(),
  usuario_id: uuid("usuario_id").references(() => users.id),
  doctor_id: uuid("doctor_id").references(() => doctores.id),
  created_at: timestamp("created_at").defaultNow(),
});