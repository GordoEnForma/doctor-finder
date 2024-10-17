"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import GoogleLogo from "../ui/google-logo";
import { useSearchParams } from "next/navigation";

export const SocialProviders = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "El email lo usa otro proveedor" : ""
    return (
        <div className="w-full space-y-2">
            <h2 className="w-full text-center text-lg ">Tambien puedes ingresar con</h2>
            <div className="flex items-center justify-center w-full gap-x-2">
                <Button
                    size={"lg"}
                    variant="outline"
                    onClick={() => { signIn("google") }}
                    className="w-full"
                >
                    <GoogleLogo />
                    Google
                </Button>
                <Button
                    onClick={() => { signIn("github") }}
                    size={"lg"}
                    variant="outline"
                    className="w-full"
                >
                    <GitHubLogoIcon className="mr-2 size-5" />
                    Github
                </Button>
            </div>
            {
                urlError && <p className="text-red-500 text-sm text-center">{urlError}</p>
            }
        </div>
    )
}