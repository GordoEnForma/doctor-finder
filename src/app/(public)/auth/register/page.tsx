
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/components/auth/register-form'

export default async function LoginPage() {
    const session = await auth();
    if (session?.user) {
        redirect("/")
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className='text-2xl text-center'>Registrarse</CardTitle>
                    <CardDescription className='text-center'>Completa los siguientes datos</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <Link href="/auth/login" className='w-full text-sm text-center'>
                        ¿Ya tienes una cuenta?
                        <p className='text-primary'>
                            Inicia sesión
                        </p>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}