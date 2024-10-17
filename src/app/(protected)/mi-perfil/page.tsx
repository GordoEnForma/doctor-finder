import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ProfileSchema = {
  name: string | null;
  last_name: string | null;
  email: string;
  document_type: string | null;
  document_number: string | null;
  image: string | null;
}

const getProfileInformation = async (): Promise<ProfileSchema> => {
  const response = await fetch('http://localhost:3000/api/perfil', {
    credentials: 'include',
    headers: headers()
  });
  const data = await response.json();
  return data;
}

export default async function MiPerfilPage() {
  const profile = await getProfileInformation();
  const fullName = `${profile.name} ${profile.last_name ?? ''}`.trim();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Mi Perfil</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-2xl text-primary">Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-8">
            <Avatar className="size-32">
              <AvatarImage src={profile.image as string} alt="Imagen de perfil" />
              <AvatarFallback className='text-primary text-2xl font-bold'>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-primary">{profile.name} {profile.last_name ?? ''}</h2>
              <p className="text-gray-600">Tipo de Documento: {profile?.document_type ?? "Sin especificar"}</p>
              <p className="text-gray-600">Número: {profile?.document_number ?? "Sin especificar"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}