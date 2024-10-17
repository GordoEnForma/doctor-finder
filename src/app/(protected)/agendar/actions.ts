"use server";
import { db } from "@/db";
import { citas, horarios } from "@/db/schema";
import { eq } from "drizzle-orm";

type ScheduleAppointmentData = {
  userId: string;
  doctorId: string;
  horarioId: string;
  clinicaId: string;
  horaFin: string;
  horaInicio: string;
  fecha: string;
};

export const scheduleAppointmentAction = async (
  data: ScheduleAppointmentData
) => {
  try {
    // Iniciar una transacción
    await db
      .update(horarios)
      .set({ disponible: false })
      .where(eq(horarios.id, data.horarioId));

    // Crear la cita
    const [insertedCita] = await db
      .insert(citas)
      .values({
        estado: "PENDIENTE",
        fecha: data.fecha, // Asegúrate de que la fecha esté en el formato correcto
        usuario_id: data.userId,
        hora_fin: data.horaFin,
        hora_inicio: data.horaInicio,
        clinica_id: data.clinicaId,
        doctor_id: data.doctorId,
      })
      .returning();
    return { success: true, cita: insertedCita };
  } catch (error) {
    console.error("Error al agendar la cita:", error);
    return {
      success: false,
      error: "Hubo un error al agendar la cita. Por favor, inténtalo de nuevo.",
    };
  }
};
