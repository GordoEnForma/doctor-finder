import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { clinicas } from "@/db/schema";
import { ilike } from "drizzle-orm";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.nextUrl);
  const name = searchParams.get("name");
  console.log(name);
  if (!name || name === "undefined") {
    const data = await db.select().from(clinicas);
    return NextResponse.json(data);
  }
  const data = await db
    .select()
    .from(clinicas)
    .where(ilike(clinicas.nombre, `%${name}%`));
  return NextResponse.json(data);
});
