"use client"
import type { User } from "next-auth";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sidebar } from "./sidebar";
import { useState } from "react";
type NavbarProps = {
    user: {
        last_name?: string;
    } & User
}

export const Navbar = ({ user }: NavbarProps) => {
    const [open, setOpen] = useState(false);
    return (
        <header className="flex items-center py-4 px-10 gap-x-3 bg-primary text-white">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <HamburgerMenuIcon className="size-6 text-white" />
                </SheetTrigger>
                <SheetContent side="left" className="p-0" >
                    <Sidebar user={user} closeSidebar={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
            <h2 className="text-2xl font-semibold"> DoctorFinder 💊</h2>
        </header>
    )
}