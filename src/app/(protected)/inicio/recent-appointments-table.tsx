import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const recentAppointments = [
    { id: 6, doctor: 'Dr. Henrry Bustos', specialty: 'Medicina General', date: '2024-07-10', time: '10:15 AM' },
    { id: 5, doctor: 'Dr. Adrían Vega', specialty: 'Ginecología', date: '2024-04-02', time: '10:15 AM' },
    { id: 4, doctor: 'Dr. Lino Moises', specialty: 'Oftamologo', date: '2024-03-24', time: '15:15 PM' },
    { id: 2, doctor: 'Dr. Carlos Ruiz', specialty: 'Dermatología', date: '2024-03-18', time: '3:30 PM' },
    { id: 3, doctor: 'Dra. María García', specialty: 'Pediatría', date: '2024-03-22', time: '11:15 AM' },
    { id: 1, doctor: 'Dra. Ana López', specialty: 'Cardiología', date: '2024-03-15', time: '10:00 AM' },
]

export const RecentAppointmentsTable = () => {
    return (
        <Card className="col-span-1 border-2 border-blue-500/20 shadow-lg">
            <CardHeader>
                <CardTitle>Citas Recientes</CardTitle>
                <CardDescription>Data mockeada</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Especialidad</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.doctor}</TableCell>
                                <TableCell>{appointment.specialty}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}