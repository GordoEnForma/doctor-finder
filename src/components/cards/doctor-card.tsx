"use client"
import { FC } from "react"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks";
import { type Doctor } from "@/app/(protected)/clinicas/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { HeartIcon, CalendarIcon, StethoscopeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddFavoriteDoctorAction } from "@/app/(protected)/clinicas/[clinicaId]/actions"

type DoctorCardProps = {
    doctor: Doctor & { isFavorite: boolean }
    userId: string;
    clinicaId: string;
}


export const DoctorCard: FC<DoctorCardProps> = ({ doctor, userId, clinicaId }) => {

    const { executeAsync, isPending } = useAction(AddFavoriteDoctorAction, {
        onSuccess: () => {
            console.log("Doctor favorito actualizado");
        },
    })
    return (
        <Card key={doctor.id} className="bg-white shadow-lg flex flex-col min-w-[250px] ">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="text-2xl text-center text-primary">
                    {doctor.sex === "M" ? "Dr." : "Dra."} {doctor.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.image ?? ''} alt={doctor.name} />
                        <AvatarFallback>
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{doctor.especialidadName}</p>
                        <p className="text-sm text-gray-600">{doctor.clinicaName}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-y-4  mt-4">
                    <Button disabled={isPending}
                        onClick={async () =>
                            await executeAsync({ doctorId: doctor.id, userId, isFavorite: doctor.isFavorite, clinicaId })
                        }
                        variant="outline" className="w-full border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 text-red-600">
                        <HeartIcon className="mr-2 size-4 stroke-red-500 fill-red-500" />
                        {doctor.isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                    </Button>
                    {
                        'clinicaId' in doctor && (
                            <Button variant={"outline"} className="w-full  " asChild>
                                <Link href={`/clinicas/${clinicaId}`} className="w-full">
                                    <StethoscopeIcon className="mr-2 size-4" /> Ver más doctores
                                </Link>
                            </Button>
                        )
                    }
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                        <Link href={`/agendar?doctorId=${doctor.id}`} className="w-full">
                            <CalendarIcon className="mr-2 size-4" /> Agendar Cita
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}