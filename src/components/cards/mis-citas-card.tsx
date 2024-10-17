import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, BuildingIcon } from "lucide-react"
import type { Appointment } from "@/app/(protected)/mis-citas/page"
import { Badge } from "@/components/ui/badge"

const statusColors = {
  PENDIENTE: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  CANCELADA: "bg-red-100 text-red-800 hover:bg-red-200",
  BRINDADA: "bg-green-100 text-green-800 hover:bg-green-200",
}

type MisCitasCardProps = {
  appointment: Appointment
}

export const MisCitasCard = ({ appointment }: MisCitasCardProps) => {
  return (
    <Card className="bg-white shadow-lg ">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-xl text-primary flex items-center justify-between">
          <span className="">
            {appointment.doctorSex === "M" ? "Dr. " : "Dra. "}
            {appointment.doctorName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Badge className={`${statusColors[appointment.estado]} w-full justify-center`}>
          {appointment.estado}
        </Badge>
        <p className="text-sm text-gray-600">{appointment.especialidadName}</p>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="size-4 mr-2" />
          {appointment.fecha}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ClockIcon className="size-4 mr-2" />
          {appointment.horaInicio} - {appointment.horaFin}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BuildingIcon className="size-4 mr-2" />
          <span className="" title={appointment.clinicaName}>
            {appointment.clinicaName}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}