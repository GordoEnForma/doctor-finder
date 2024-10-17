"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
// import { signIn } from "@/auth";
import { LogInIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useRouter } from "next/navigation";

const RegisterFormSchema = z.object({
    email: z.string().email({ message: "El correo electrónico no es válido" }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
    name: z.string().min(1, {
        message: "El nombre es obligatorio",
    }),
    lastName: z.string().min(1, {
        message: "El apellido es obligatorio",
    }),
    documentType: z.enum(["RUC", "DNI", "CE"]),
    documentNumber: z.string().min(1, {
        message: "El número de documento es obligatorio",
    }).max(255),
})

type RegisterFormProps = z.infer<typeof RegisterFormSchema>
export const RegisterForm = () => {
    const router = useRouter()
    const form = useForm<RegisterFormProps>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            lastName: "",
            documentType: "DNI",
            documentNumber: "",
        }
    })
    return (
        <form className="space-y-4" onSubmit={form.handleSubmit(async (formData) => {
            console.log(formData)
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                router.push("/auth/login");
            }
        })}
        >

            <div>
                <Label htmlFor="name">
                    Nombre
                </Label>
                <Input
                    {...form.register("name")}
                    placeholder="Henrry"
                    type="text"
                    autoComplete="false"
                />
                <p className="text-sm text-red-500">
                    {form.formState.errors.name?.message}
                </p>
            </div>
            <div>
                <Label htmlFor="lastName">
                    Apellido
                </Label>
                <Input
                    {...form.register("lastName")}
                    placeholder="Brown"
                    autoComplete="false"
                />
                <p className="text-sm text-red-500">
                    {form.formState.errors.lastName?.message}
                </p>
            </div>
            <div>
                <Label htmlFor="email" >
                    Correo Electronico
                </Label>
                < Input
                    {...form.register("email")}
                    placeholder="doctor@example.com"
                    autoComplete="false"
                />
                <p className="text-sm text-red-500">
                    {form.formState.errors.email?.message}
                </p>
            </div>
            <div>
                <Label htmlFor="password">
                    Contraseña
                </Label>
                <Input
                    {...form.register("password")}
                    placeholder="*******"
                    type="password"
                    autoComplete="false"
                />
                <p className="text-sm text-red-500">
                    {form.formState.errors.password?.message}
                </p>
            </div>
            <div>
                <Label>
                    Tipo de Documento
                    <Controller name="documentType" control={form.control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Elija un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Elija un tipo</SelectLabel>
                                    <SelectItem value="RUC">RUC</SelectItem>
                                    <SelectItem value="DNI">DNI</SelectItem>
                                    <SelectItem value="carnet">Carnet de Extranjería</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )} />

                </Label>
            </div>
            <div>
                <Label htmlFor="document-number">
                    Número de Documento
                </Label>
                <Input
                    {...form.register("documentNumber")}
                    placeholder="12345678"
                />
                <p className="text-sm text-red-500">
                    {form.formState.errors.documentNumber?.message}
                </p>
            </div>
            <Button type="submit" className="w-full flex items-center">
                <LogInIcon className="mr-2 size-5" />
                Registrarse
            </Button>
        </form >
    )
}