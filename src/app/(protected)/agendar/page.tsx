import { headers } from "next/headers"
import type { Doctor } from "../clinicas/types"
import { AppointmentScheduler } from "@/components/appointment-form";
import { Suspense } from "react";
import { auth } from "@/auth";


export type Schedule = {
    id: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
}
export type AppointmentInfo = {
    doctor: Doctor & { clinicaId: string }
    horariosDisponibles: Schedule[]

}

// const getInfo = async (id: string): Promise<AppointmentInfo> => {
//     const idDoctor = id ?? "";
//     const randomInt = Math.floor(Math.random() * 100);
//     console.log(randomInt);
//     const doctorInfo = await db
//         .select({
//             doctorId: doctores.id,
//             name: doctores.nombre,
//             image: doctores.image,
//             sex: doctores.sexo,
//             clinicaId: clinicas.id,
//             clinicaName: clinicas.nombre,
//             especialidadName: especialidades.nombre,
//         })
//         .from(doctores)
//         .leftJoin(clinicas, eq(doctores.clinica_id, clinicas.id))
//         .leftJoin(
//             especialidades,
//             eq(doctores.especialidad_id, especialidades.id)
//         )
//         .where(eq(doctores.id, idDoctor))
//         .limit(1);

//     const horariosDisponibles = await db
//         .select({
//             horarioId: horarios.id,
//             fecha: horarios.fecha,
//             horaInicio: horarios.hora_inicio,
//             horaFin: horarios.hora_fin,
//         })
//         .from(horarios)
//         .where(
//             and(
//                 eq(horarios.doctor_id, idDoctor),
//                 eq(horarios.disponible, true)
//             )
//         );

//     const appointmentInfo = {
//         doctor: doctorInfo[0],
//         horariosDisponibles,
//     };

//     return appointmentInfo;
// }


const getInfoToScheduleAppointment = async (doctorId: string): Promise<AppointmentInfo> => {
    const res = await fetch(`http://localhost:3000/api/agendar?doctorId=${doctorId}`,
        {
            headers: headers(),
            next: {
                revalidate: 60
            }
        }
    )
    const data = await res.json()
    return data;
}


export default async function AgendarPage({ searchParams }: { searchParams: { doctorId: string } }) {
    const doctorId = searchParams.doctorId ?? '';
    const session = await auth()

    // const appointmentInfo = await getInfo(doctorId) // Esto sería más eficiente porque se puede guardar en caché
    return (
        <div className="flex flex-col items-center mx-auto" >
            <h1 className="text-3xl font-bold text-primary mb-8">Agendar Cita</h1>
            {/* <p className="font-semibold text-lg text-slate-600">Completa el siguiente formulario para agendar tu cita con el médico de tu preferencia.</p> */}
            <Suspense fallback={<div>Cargando...</div>}>
                <AppointmentInfo doctorId={doctorId} userId={session?.user.id as string} />
            </Suspense>
        </div >

    )
}

const AppointmentInfo = async ({ doctorId, userId }: { doctorId: string, userId: string }) => {
    const appointmentInfo = await getInfoToScheduleAppointment(doctorId)
    return <AppointmentScheduler appointmentInfo={appointmentInfo} userId={userId} />
}
