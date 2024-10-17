import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavWrapper } from "@/components/layout/nav-wrapper";

export default async function AuthorizedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (!session?.user) redirect("/auth/login");

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
            <NavWrapper user={session.user} />
            <main className="flex-1 p-8 overflow-y-auto bg-white">
                {children}
            </main>
        </div>
    )
}
