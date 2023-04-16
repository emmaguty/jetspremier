import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    jetId?: string;
}

export async function POST(
    request: Request,
    { params } : { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { jetId } = params;

    if (!jetId || typeof jetId !== 'string') {
        throw new Error("Ocurrio un error: ID Invalido");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(jetId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { jetId } = params;

    if(!jetId || typeof jetId !== 'string') {
        throw new Error('ID Invalido');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== jetId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}