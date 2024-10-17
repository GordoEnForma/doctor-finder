import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import {
  citas as citasTable,
  doctores as doctoresTable,
  clinicas as clinicasTable,
  especialidades as especialidadesTable,
} from "@/db/schema";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const misCitas = await db
    .select({
      id: citasTable.id,
      estado: citasTable.estado,
      fecha: citasTable.fecha,
      horaInicio: citasTable.hora_inicio,
      horaFin: citasTable.hora_fin,
      doctorName: doctoresTable.nombre,
      doctorSex: doctoresTable.sexo,
      clinicaName: clinicasTable.nombre,
      especialidadName: especialidadesTable.nombre,
    })
    .from(citasTable)
    .leftJoin(clinicasTable, eq(clinicasTable.id, citasTable.clinica_id))
    .leftJoin(doctoresTable, eq(doctoresTable.id, citasTable.doctor_id))
    .leftJoin(
      especialidadesTable,
      eq(especialidadesTable.id, doctoresTable.especialidad_id)
    )
    .where(eq(citasTable.usuario_id, req.auth.user.id as string));
  return NextResponse.json(misCitas);
});
