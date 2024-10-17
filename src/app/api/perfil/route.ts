import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const data = await db
    .select({
      name: users.name,
      last_name: users.last_name,
      email: users.email,
      document_type: users.document_type,
      document_number: users.document_number,
      image: users.image,
    })
    .from(users)
    .where(eq(users.id, req.auth.user.id as string));
  return NextResponse.json(data[0]);
});
