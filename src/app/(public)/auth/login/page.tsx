import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from '@/components/auth/login-form'
import { SocialProviders } from '@/components/auth/social-providers'
import Link from 'next/link'



export default async function LoginPage() {
    const session = await auth();
    if (session?.user) {
        redirect("/")
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className='text-2xl text-center'>DoctorFinder 🩺</CardTitle>
                    <CardDescription className='text-center'>La salud a tu alcance, empieza ya</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className='flex flex-col gap-y-4'>
                    <SocialProviders />
                    <Link href="/auth/register" className='text-sm text-center'>¿No tienes una cuenta? <p className='text-primary'>Registrate</p></Link>
                </CardFooter>
            </Card>
        </div >
    )
}