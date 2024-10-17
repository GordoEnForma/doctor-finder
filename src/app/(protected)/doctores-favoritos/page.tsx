
import { headers } from "next/headers";
import { auth } from "@/auth";
import { DoctorCard } from "@/components/cards/doctor-card"
import type { Doctor } from "../clinicas/types";
import Link from "next/link";

type DoctorWithFavorite = Doctor & { clinicaId: string, isFavorite: boolean }

const getFavoriteDoctors = async (): Promise<DoctorWithFavorite[]> => {
    const res = await fetch(`http://localhost:3000/api/favoritos`, {
        headers: headers()
    }
    )
    const data = await res.json()
    return data;
}

export default async function ClinicaDoctoresPage() {
    const session = await auth();
    const doctores = await getFavoriteDoctors()
    if (doctores.length === 0) {
        return (
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-primary/80 mb-8">
                    Tus Doctores Favoritos
                </h1>
                <div className="w-full flex flex-col gap-y-4">
                    <p className="text-xl font-semibold">
                        No tienes doctores favoritos aún
                    </p>
                    <div className="space-y-2">
                        Empieza a agregar doctores a tus favoritos desde la página de las clínicas
                        <Link href="/clinicas" className="block text-primary underline">
                            Ver Clínicas
                        </Link>
                    </div>

                </div>
            </div>)
    }
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-primary/80 mb-8">
                Tus Doctores Favoritos
            </h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} userId={session?.user.id as string} clinicaId={doctor.clinicaId} />
                ))}
            </div>
        </div>
    )
}


