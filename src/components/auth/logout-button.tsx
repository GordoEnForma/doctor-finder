"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { useState, useTransition } from "react"


export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    const [isCompleted, setIsCompleted] = useState(false)
    const handleLogout = () => {
        startTransition(() => signOut().then(() => {
            setIsCompleted(true)
        }).catch(() => {
            setIsCompleted(false)
        }))
    }
    const disabled = isPending || isCompleted
    return (
        <Button disabled={disabled} onClick={handleLogout} className="p-3 w-full rounded-lg bg-blue-500 hover:bg-blue-800 justify-normal">
            <LogOutIcon className="size-5 mr-2" />
            <span>
                {disabled ? "Cerrando Sesión" : "Cerrar Sesión"}
            </span>
        </Button>
    )
}