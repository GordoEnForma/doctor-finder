import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartHandshakeIcon, HospitalIcon, MapPinCheckInsideIcon } from "lucide-react"

const stats = [
  { title: 'Citas Totales', value: 24, mockedData: true },
  { title: 'Doctores Favoritos', value: 5, mockedData: true },
  { title: 'Clínicas Visitadas', value: 3, mockedData: true },
]
export const MyStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className='border-2 border-blue-500/20 shadow-lg'>
        <CardHeader className="flex flex-col  justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium text-primary ">
            {stats[0].title}
            {
              stats[0].mockedData && (
                <CardDescription className="text-xs text-gray-400">Data mockeada</CardDescription>)
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary inline-flex items-center">
            <HospitalIcon className="size-6 mr-2" />
            {stats[0].value}
          </div>
        </CardContent>
      </Card>
      <Card className='border-2 border-blue-500/20 shadow-lg'>
        <CardHeader className="flex flex-col  justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium text-primary ">
            {stats[1].title}
          </CardTitle>
          {
            stats[1].mockedData && (
              <CardDescription className="text-xs text-gray-400">Data mockeada</CardDescription>)
          }
        </CardHeader>
        <CardContent>
          <div className="inline-flex items-center text-2xl font-bold text-primary">
            <HeartHandshakeIcon className="size-6 mr-2" />
            {stats[1].value}
          </div>
        </CardContent>
      </Card>
      <Card className='border-2 border-blue-500/20 shadow-lg'>
        <CardHeader className="flex flex-col  justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium text-primary ">
            {stats[2].title}
          </CardTitle>
          {
            stats[2].mockedData && (
              <CardDescription className="text-xs text-gray-400">Data mockeada</CardDescription>)
          }
        </CardHeader>
        <CardContent>
          <div className="inline-flex items-center text-2xl font-bold text-primary">
            <MapPinCheckInsideIcon className="size-6 mr-1" />
            {stats[2].value}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}