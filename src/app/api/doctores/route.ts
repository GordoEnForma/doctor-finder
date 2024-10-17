import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import {
  doctores as doctoresTable,
  clinicas as clinicasTable,
  especialidades as especialidadesTable,
  favoritos as favoritosTable,
} from "@/db/schema";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const searchParams = new URL(req.url).searchParams;
  const clinicaId = searchParams.get("clinicaId") ?? "";
  if (searchParams.get("clinicaId") === null) {
    return NextResponse.json(
      { message: "No se ha especificado la clínica" },
      { status: 400 }
    );
  }
  const userId = req.auth.user.id as string;
  const doctores = await db
    .select({
      id: doctoresTable.id,
      name: doctoresTable.nombre,
      image: doctoresTable.image,
      sex: doctoresTable.sexo,
      clinicaName: clinicasTable.nombre,
      especialidadName: especialidadesTable.nombre,
      isFavorite: sql`CASE WHEN ${favoritosTable.id} IS NOT NULL THEN TRUE ELSE FALSE END`,
      // Acá quisiera devolver un booleano que indique si el doctor es favorito del usuario
    })
    .from(doctoresTable)
    .leftJoin(clinicasTable, eq(doctoresTable.clinica_id, clinicasTable.id))
    .leftJoin(
      especialidadesTable,
      eq(doctoresTable.especialidad_id, especialidadesTable.id)
    )
    .leftJoin(
      favoritosTable,
      and(
        eq(favoritosTable.doctor_id, doctoresTable.id),
        eq(favoritosTable.usuario_id, userId as string)
      )
    )
    .where(eq(doctoresTable.clinica_id, clinicaId));
  // console.log(doctores);
  return NextResponse.json(doctores);
});
