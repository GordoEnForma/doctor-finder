import { headers } from "next/headers"
import { MisCitasCard } from "@/components/cards/mis-citas-card"
import Link from "next/link"

export type Appointment = {
  id: string
  estado: 'PENDIENTE' | 'CANCELADA' | 'BRINDADA'
  fecha: string
  horaInicio: string
  horaFin: string
  doctorName: string
  doctorSex: string
  clinicaName: string
  especialidadName: string
}



const getMyAppointments = async (): Promise<Appointment[]> => {
  const res = await fetch(`http://localhost:3000/api/mis-citas`,
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

export default async function MisCitasPage() {

  const appointments = await getMyAppointments()
  if (appointments.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary/80 mb-8">
          Mis Citas
        </h1>
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-xl font-semibold">
            No haz agendado ni una cita aún
          </p>
          <div className="space-y-2">
            Haz click acá para buscar doctores en las clínicas que tenemos para ti y puedas agendar tus citas
            <Link href="/clinicas" className="block text-primary underline">
              Ver Clínicas
            </Link>
          </div>
        </div>
      </div>)
  }
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Mis Citas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {appointments.map((appointment) => (
          <MisCitasCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  )
}