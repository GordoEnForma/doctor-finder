import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCallIcon, MapPinIcon, MailIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FC } from "react"

type ClinicType = {
    id: number;
    nombre: string;
    direccion: string;
    email?: string;
    telefono?: string;
}

type ClinicCardProps = {
    clinic: ClinicType
}

export const ClinicCard: FC<ClinicCardProps> = ({ clinic }) => {
    return (
        <Card key={clinic.id} className="bg-white shadow-lg flex flex-col h-[350px] w-[300px]">
            <CardHeader className="bg-blue-100 border border-blue-300/30 flex items-center">
                <CardTitle className="text-xl text-primary line-clamp-2">{clinic.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col justify-between ">
                <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                        <PhoneCallIcon className="size-5 text-blue-600 mt-0.5 " />
                        <span className="text-gray-700">{clinic.telefono}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <MapPinIcon className="size-7 text-blue-600 mt-0.5" />
                        <span className="text-gray-700 line-clamp-2">{clinic.direccion}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <MailIcon className="size-5 text-blue-600 mt-0.5" />
                        <span className="text-gray-700 line-clamp-2">{clinic.email}</span>
                    </div>
                </div>
                <div className="mt-10">
                    <Link href={`/clinicas/${clinic.id}`} className="">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Ver Doctores
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}