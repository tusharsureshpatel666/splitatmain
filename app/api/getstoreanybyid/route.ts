import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id;
  if (!id) {
    return NextResponse.json("id is not found");
  }
  try {
    const storeany = await prisma.store.findUnique({
      where: { id: id },
      select: {
        latitude: true,
        longitude: true,
        streetAddress: true,
        user: {
          select: {
            userBussinessType: true,
          },
        },
      },
    });

    return NextResponse.json(storeany);
  } catch (error) {
    return NextResponse.error(error);
  }
}
