import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, data.email),
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Correo ya existe",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        last_name: data.lastName,
        password: hashedPassword,
        document_number: data.documentNumber,
        document_type: data.documentType,
        image:
          "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=dd060fe209b4a56733a1dcc9b5aea53a",
      })
      .returning();

    const user = {
      ...newUser[0],
      password: null,
    };
    return NextResponse.json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return NextResponse.json(
      {
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
