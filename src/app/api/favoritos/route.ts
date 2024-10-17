import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { clinicas, doctores, especialidades, favoritos } from "@/db/schema";
export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const userId = req.auth.user.id as string;
  try {
    const doctoresFavoritos = await db
      .select({
        id: doctores.id,
        name: doctores.nombre,
        image: doctores.image,
        sex: doctores.sexo,
        clinicaId: doctores.clinica_id,
        clinicaName: clinicas.nombre,
        especialidadName: especialidades.nombre,
        isFavorite: sql`CASE WHEN ${favoritos.id} IS NOT NULL THEN TRUE ELSE FALSE END`,
      })
      .from(doctores)
      .leftJoin(clinicas, eq(doctores.clinica_id, clinicas.id))
      .leftJoin(especialidades, eq(doctores.especialidad_id, especialidades.id))
      .innerJoin(
        favoritos,
        and(
          eq(favoritos.doctor_id, doctores.id),
          eq(favoritos.usuario_id, userId)
        )
      );

    return NextResponse.json(doctoresFavoritos);
  } catch (error) {
    console.error("Error al obtener doctores favoritos:", error);
    return NextResponse.json(
      { message: "Error al obtener doctores favoritos" },
      { status: 500 }
    );
  }
});
