import Link from "next/link"
import { ArrowLeftCircleIcon } from "lucide-react"
import { DoctorCard } from "@/components/cards/doctor-card"
import { headers } from "next/headers";
import type { Doctor } from "../types";
import { auth } from "@/auth";

type DoctorWithFavorite = Doctor & { isFavorite: boolean }

const getDoctoresByClinicaId = async (clinicaId: string): Promise<DoctorWithFavorite[]> => {
    const res = await fetch(`http://localhost:3000/api/doctores?clinicaId=${clinicaId}`, {
        headers: headers()
    }
    )
    const data = await res.json()
    return data;
}

export default async function ClinicaDoctoresPage({ params }: { params: { clinicaId: string } }) {
    const session = await auth();
    const doctores = await getDoctoresByClinicaId(params.clinicaId)
    return (
        <div className="max-w-7xl mx-auto">
            <Link href="/clinicas">
                <p className="inline-flex items-center text-sm text-gray-600">
                    <ArrowLeftCircleIcon className="size-4 mr-2" />
                    Ver clínicas
                </p>
            </Link>
            <h1 className="text-3xl font-bold text-primary/80 mb-8">
                Doctores en{" "}
                <span className="text-primary">{doctores[0].clinicaName}</span>
            </h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} userId={session?.user.id as string} clinicaId={params.clinicaId}/>
                ))}
            </div>
        </div>
    )
}


