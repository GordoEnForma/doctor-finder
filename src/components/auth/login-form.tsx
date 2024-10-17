"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogInIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/app/(public)/auth/actions";
import { useTransition } from "react";
const LoginFormSchema = z.object({
  email: z.string().email({
    message: "El correo electronico es invalido",
  }),
  password: z.string().min(1, {
    message: "La contraseña es obligatoria",
  }),
})
type LoginFormProps = z.infer<typeof LoginFormSchema>
export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast()
  const form = useForm<LoginFormProps>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })


  return (
    <form className="space-y-4" onSubmit={
      form.handleSubmit(
        (data) => {
          startTransition(() => {
            login(
              data.email,
              data.password
            ).then(
              (response) => {
                if (response?.error) {
                  toast({
                    variant: "destructive",
                    title: 'Ha ocurrido un error',
                    description: response.error,
                    duration: 6000
                  })
                }
              }
            )
          }
          )
        }
      )}>
      <div>
        <Label htmlFor="email" >
          Correo Electronico
        </Label>
        < Input
          {...form.register("email")}
          placeholder="ejemplo@test.com"
        />
        <p className="text-sm text-red-500">
          {form.formState.errors.email?.message}
        </p>
      </div>
      <div className="">
        <Label htmlFor="password">
          Contraseña
        </Label>
        <Input
          {...form.register("password")}
          type="password"
          placeholder="******"
        />
        <p className="text-sm text-red-500">
          {form.formState.errors.password?.message}
        </p>
      </div>
      <Button disabled={isPending} type="submit" className="w-full flex items-center">
        <LogInIcon className="mr-2 size-5" />
        Ingresar
      </Button>
    </form >
  )
}