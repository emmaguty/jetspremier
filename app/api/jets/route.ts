import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        modelo,
        maxPeople,
        price,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
          NextResponse.error();
        }
      })

      const jet = await prisma.jets.create({
        data: {
          title,
          description,
          imageSrc,
          category,
          modelo,
          maxPeople,
          price: parseInt(price, 10),
          userId: currentUser.id
        }
      });

      return NextResponse.json(jet);
}