'use client'
import React, { useState, useMemo, useTransition } from 'react'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Doctor } from '@/app/(protected)/clinicas/types'
import { Schedule } from '@/app/(protected)/agendar/page'
import { scheduleAppointmentAction } from '@/app/(protected)/agendar/actions'
import { useRouter } from 'next/navigation'

interface AppointmentSchedulerProps {
  userId: string;
  appointmentInfo: {
    doctor: Doctor & { clinicaId: string }
    horariosDisponibles: Schedule[]
  }
}

export const AppointmentScheduler = ({ appointmentInfo, userId }: AppointmentSchedulerProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedHorario, setSelectedHorario] = useState<string | undefined>(undefined)

  const availableDates = useMemo(() =>
    appointmentInfo.horariosDisponibles.map(h => parse(h.fecha, 'yyyy-MM-dd', new Date())),
    [appointmentInfo.horariosDisponibles]
  )

  const horariosPorFecha = useMemo(() =>
    selectedDate
      ? appointmentInfo.horariosDisponibles.filter(h => h.fecha === format(selectedDate, 'yyyy-MM-dd'))
      : [],
    [appointmentInfo.horariosDisponibles, selectedDate]
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedHorario("")
  }

  const handleHorarioSelect = (horarioId: string) => {
    setSelectedHorario(horarioId)
  }

  const selectedHorarioDetails = useMemo(() =>
    selectedHorario
      ? appointmentInfo.horariosDisponibles.find(h => h.id === selectedHorario)
      : "",
    [appointmentInfo.horariosDisponibles, selectedHorario]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !appointmentInfo?.doctor.id || !selectedHorario) {
      console.error("Faltan datos necesarios para agendar la cita");
      return;
    }

    const horario = appointmentInfo.horariosDisponibles.find(h => h.id === selectedHorario);
    if (!horario) {
      console.error("Horario seleccionado no encontrado");
      return;
    }

    const appointmentData = {
      userId: userId,
      clinicaId: appointmentInfo.doctor.clinicaId,
      doctorId: appointmentInfo.doctor.id,
      horarioId: selectedHorario,
      fecha: horario.fecha,
      horaInicio: horario.horaInicio,
      horaFin: horario.horaFin,
    };

    try {
      const result = await scheduleAppointmentAction(appointmentData);
      if (result.success) {
        console.log("Cita agendada con éxito:");
        startTransition(() => {
          router.push('/mis-citas');
        });
      } else if ('error' in result) {
        console.error("Error al agendar la cita:", result.error);
      } else {
        console.error("Error desconocido al agendar la cita");
      }
    } catch (error) {
      console.error("Error inesperado al agendar la cita:", error);
    }
  }

  return (
    <div className='mt-4'>
      <Card className=' border-0'>
        <CardHeader>
          <CardTitle>Información del Doctor</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={appointmentInfo.doctor.image as string} alt={appointmentInfo.doctor.name} />
            <AvatarFallback className='text-primary text-xl'>{appointmentInfo.doctor.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-primary">{appointmentInfo.doctor.name}</h2>
            <p className="text-muted-foreground">{appointmentInfo.doctor.especialidadName}</p>
            <p className="text-muted-foreground">{appointmentInfo.doctor.clinicaName}</p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card className=' border-0'>
          <CardHeader>
            <CardTitle>Seleccionar Fecha y Hora</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:space-x-4">
            <div className="mb-4 md:mb-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => !availableDates.some(d => d.toDateString() === date.toDateString())}
                className="rounded-md border"
              />
            </div>
            <div className="sm:min-w-[170px]">
              <Select
                disabled={!selectedDate}
                onValueChange={handleHorarioSelect}
                value={selectedHorario}
              >
                <SelectTrigger  className="w-full border-2 border-black/30">
                  <SelectValue placeholder="Seleccionar horario" />
                </SelectTrigger>
                <SelectContent >
                  {horariosPorFecha.map((horario) => (
                    <SelectItem key={horario.id} value={horario.id}>
                      {`${horario.horaInicio.slice(0, 5)} - ${horario.horaFin.slice(0, 5)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDate && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Fecha seleccionada: <span className='font-bold block'>{format(selectedDate, 'PPP', { locale: es })}</span>
                </p>
              )}
              {selectedHorarioDetails && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Horario seleccionado: <span className='font-bold block'>{selectedHorarioDetails.horaInicio.slice(0, 5)} - {selectedHorarioDetails.horaFin.slice(0, 5)}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Button disabled={isPending} type="submit" className='w-full'>Confirmar Cita</Button>
      </form>
    </div>
  )
}