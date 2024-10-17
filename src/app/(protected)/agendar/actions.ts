"use server";
import { db } from "@/db";
import { citas, horarios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { actionClient } from "@/lib/safe-actions";
import { z } from "zod";
// type ScheduleAppointmentData = {
//   userId: string;
//   doctorId: string;
//   horarioId: string;
//   clinicaId: string;
//   horaFin: string;
//   horaInicio: string;
//   fecha: string;
// };

const ScheduleAppointmentSchema = z.object({
  userId: z.string(),
  doctorId: z.string(),
  horarioId: z.string(),
  clinicaId: z.string(),
  horaFin: z.string(),
  horaInicio: z.string(),
  fecha: z.string(),
});

export const scheduleAppointmentAction = actionClient
  .schema(ScheduleAppointmentSchema)
  .action(async ({ parsedInput }) => {
    try {
      // Iniciar una transacción
      await db
        .update(horarios)
        .set({ disponible: false })
        .where(eq(horarios.id, parsedInput.horarioId));

      // Crear la cita
      const [insertedCita] = await db
        .insert(citas)
        .values({
          estado: "PENDIENTE",
          fecha: parsedInput.fecha, // Asegúrate de que la fecha esté en el formato correcto
          usuario_id: parsedInput.userId,
          hora_fin: parsedInput.horaFin,
          hora_inicio: parsedInput.horaInicio,
          clinica_id: parsedInput.clinicaId,
          doctor_id: parsedInput.doctorId,
        })
        .returning();
      return { success: true, cita: insertedCita };
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      return {
        success: false,
        error:
          "Hubo un error al agendar la cita. Por favor, inténtalo de nuevo.",
      };
    }
  });
