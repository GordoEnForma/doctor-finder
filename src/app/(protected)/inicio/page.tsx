import { auth } from '@/auth'
import { Chart } from './appointments-chart'
import { RecentAppointmentsTable } from './recent-appointments-table';
import { MyStats } from './my-stats';

// Mock data for statistics and appointments



export default async function InicioPage() {
  const session = await auth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <h1 className="text-3xl font-bold text-primary mb-8">Bienvenido, {session?.user?.name}</h1>
      <MyStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentAppointmentsTable />
        <Chart />
      </div>
    </div>
  )
}