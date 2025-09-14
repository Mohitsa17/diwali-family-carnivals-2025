import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.create({
      data: {
        email: "firstuser@example.com",
        name: "First User",
      },
    });

    return NextResponse.json({ message: "User created!", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
