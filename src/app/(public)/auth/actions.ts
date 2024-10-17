"use server";
import { signIn } from "@/auth";
import { db } from "@/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const getUserByEmail = async (email: string) => {
  try {
    const userFound = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    return userFound;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    console.log(`[ERROR in getUserByEmail]`, errorMessage);
    return { error: errorMessage };
  }
};

export const getUserById = async (id: string) => {
  console.log("getUserById");
  try {
    const userFound = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return { userFound };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    console.log(`[ERROR in getUserById]`, errorMessage);
    return { error: errorMessage };
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "El correo electronico o la contraseña son incorrectos",
          };
        default:
          return { error: "Ha ocurrido un error" };
      }
    }
  }
};
