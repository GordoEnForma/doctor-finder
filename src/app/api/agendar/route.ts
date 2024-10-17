import { auth } from "@/auth";
import { db } from "@/db";
import {
  doctores as doctoresTable,
  clinicas as clinicasTable,
  especialidades as especialidadesTable,
  horarios as horariosTable,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  const searchParams = new URL(req.url).searchParams;
  const doctorId = searchParams.get("doctorId") ?? "";
  const randomInt = Math.floor(Math.random() * 100);
  console.log(randomInt);
  const doctorInfo = await db
    .select({
      id: doctoresTable.id,
      name: doctoresTable.nombre,
      image: doctoresTable.image,
      sex: doctoresTable.sexo,
      clinicaId: clinicasTable.id,
      clinicaName: clinicasTable.nombre,
      especialidadName: especialidadesTable.nombre,
    })
    .from(doctoresTable)
    .leftJoin(clinicasTable, eq(doctoresTable.clinica_id, clinicasTable.id))
    .leftJoin(
      especialidadesTable,
      eq(doctoresTable.especialidad_id, especialidadesTable.id)
    )
    .where(eq(doctoresTable.id, doctorId))
    .limit(1);

  const horariosDisponibles = await db
    .select({
      id: horariosTable.id,
      fecha: horariosTable.fecha,
      horaInicio: horariosTable.hora_inicio,
      horaFin: horariosTable.hora_fin,
    })
    .from(horariosTable)
    .where(
      and(
        eq(horariosTable.doctor_id, doctorId),
        eq(horariosTable.disponible, true)
      )
    );

  const appointmentInfo = {
    doctor: doctorInfo[0],
    horariosDisponibles,
  };

  return NextResponse.json(appointmentInfo, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    }
  });
});
