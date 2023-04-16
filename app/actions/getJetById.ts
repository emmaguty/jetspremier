import prisma from "@/app/libs/prismadb";

interface IParams {
    jetId?: string;
}

export default async function getJetById(
    params: IParams
) {
    try {
        const { jetId } = params;

        const jet = await prisma.jets.findUnique({
            where: {
                id: jetId
            },
            include: {
                user: true
            }
        });

        if(!jet) {
            return null;
        }

        return {
            ...jet,
            createdAt: jet.createdAt.toISOString(),
            user: {
                ...jet.user,
                createdAt: jet.user.createdAt.toISOString(),
                updatedAt: jet.user.updatedAt.toISOString(),
                emailVerified: jet.user.emailVerified?.toISOString() || null
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}