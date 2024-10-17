"use server";

import { actionClient } from "@/lib/safe-actions";

import { db } from "@/db";

import { z } from "zod";
import { favoritos } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const AddFavoriteDoctorSchema = z.object({
  doctorId: z.string(),
  userId: z.string(),
  clinicaId: z.string(),
  isFavorite: z.boolean(),
});

export const AddFavoriteDoctorAction = actionClient
  .schema(AddFavoriteDoctorSchema)
  .action(
    async ({ parsedInput: { doctorId, userId, isFavorite, clinicaId } }) => {
      if (!isFavorite) {
        try {
          await db.insert(favoritos).values({
            doctor_id: doctorId,
            usuario_id: userId,
          });
          revalidatePath(`/clinicas/${clinicaId}`);
          revalidatePath(`/mis-favoritos`);
          return { success: true };
        } catch (error) {
          console.error("Error al agregar el doctor a favoritos:", error);
          return {
            success: false,
            error:
              "Hubo un error al agregar el doctor a favoritos. Por favor, inténtalo de nuevo.",
          };
        }
      } else {
        try {
          await db
            .delete(favoritos)
            .where(
              and(
                eq(favoritos.doctor_id, doctorId),
                eq(favoritos.usuario_id, userId)
              )
            );
          revalidatePath(`/clinicas/${clinicaId}`);
          revalidatePath(`/mis-favoritos`);
          return { success: true };
        } catch (error) {
          console.error("Error al quitar el doctor de favoritos:", error);
          return {
            success: false,
            error:
              "Hubo un error al quitar el doctor de favoritos. Por favor, inténtalo de nuevo.",
          };
        }
      }
    }
  );
