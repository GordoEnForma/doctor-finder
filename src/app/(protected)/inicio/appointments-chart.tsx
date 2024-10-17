"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig
const appointmentsByMonth = [
    { month: 'Ene', appointments: 3 },
    { month: 'Feb', appointments: 5 },
    { month: 'Mar', appointments: 2 },
    { month: 'Abr', appointments: 7 },
    { month: 'May', appointments: 4 },
    { month: 'Jun', appointments: 6 },
]

export const Chart = () => {
    return (
        <Card className="col-span-1 h-fit border-2 border-blue-500/20 shadow-lg">
            <CardHeader>
                <CardTitle>Citas por Mes</CardTitle>
                <CardDescription>Data mockeada</CardDescription>

            </CardHeader>
            <CardContent className="h-[300px] p-0 ">
                <ChartContainer config={chartConfig} className="w-full h-full -ml-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={appointmentsByMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="appointments" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}