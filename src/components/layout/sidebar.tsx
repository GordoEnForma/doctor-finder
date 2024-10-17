"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { UserIcon, CalendarIcon, Building2Icon, HeartIcon, HomeIcon } from 'lucide-react'
import { LogoutButton } from '../auth/logout-button'
import type { User } from 'next-auth'
import { useTransition } from 'react'

type SidebarProps = {
  user: {
    last_name?: string;
  } & User;
  closeSidebar?: () => void;
}

export function Sidebar({ user, closeSidebar }: SidebarProps) {
  const pathname = usePathname()
  const [, startTransition] = useTransition()
  const { name, last_name } = user;
  const nameParts = name!.split(' ');
  const hasLastNameInName = nameParts.length > 1;
  const fullName = hasLastNameInName ? name : `${name} ${last_name || ''}`.trim();

  const handleNavigation = () => {
    if (closeSidebar) {
      startTransition(() => {
        closeSidebar?.()
      })
    }
  }

  return (
    <div className="flex flex-col w-full h-full lg:w-64 bg-primary text-white">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">💊 DoctorFinder</h2>
      </div>
      <div className="flex items-center space-x-4 py-4 px-2 border-y border-secondary mx-4">
        <Avatar>
          <AvatarImage src={user.image as string} alt="User" />
          <AvatarFallback className='text-primary'>{fullName?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-blue-200">Bienvenido</p>
          <p className="font-medium">{fullName}</p>

        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {
            ROUTES.map(({ name, Icon, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={handleNavigation}
                  className={
                    cn("flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-700", pathname === href && 'bg-blue-700')
                  }
                >
                  <Icon className="size-5 mr-2" />
                  {name}
                </Link>
              </li>
            ))
          }
        </ul>
        <div className="py-4 border-t border-secondary mt-4">
          <LogoutButton />
        </div>
      </nav>
    </div>
  )
}


const ROUTES = [
  { name: 'Inicio', href: '/inicio', Icon: HomeIcon },
  { name: 'Clínicas', href: '/clinicas', Icon: Building2Icon },
  { name: 'Mis Citas', href: '/mis-citas', Icon: CalendarIcon },
  { name: 'Doctores Favoritos', href: '/doctores-favoritos', Icon: HeartIcon },
  { name: 'Mi Perfil', href: '/mi-perfil', Icon: UserIcon },
]