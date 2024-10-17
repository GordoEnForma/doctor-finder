import { headers } from 'next/headers'
import { ClinicCard } from '@/components/cards/clinic-card'
import SearchByURLParamsInput from '@/components/search-by-url';

type Clinic = {
  id: number;
  nombre: string;
  direccion: string;
  email?: string;
  telefono?: string;
}
const getClinics = async (name?: string): Promise<Clinic[]> => {
  const response = await fetch(`http://localhost:3000/api/clinicas?name=${name}`, {
    credentials: 'include',
    headers: headers()
  });
  const data = await response.json();
  return data;
}

export default async function ClinicasPage({ searchParams }: {
  searchParams: {
    name: string;
  }
}) {
  const clinics = await getClinics(searchParams.name);
  return (
    <div className="mx-auto">
      <h1 className="text-3xl text-center sm:text-left font-bold text-primary mb-8">Clínicas</h1>
      <div className="mb-6">
        <SearchByURLParamsInput placeholder='Buscar clínicas...' debounce />
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2  lg:flex lg:flex-wrap lg:justify-center gap-x-5 gap-y-5">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  )
}