import prisma from "@/app/libs/prismadb";

export interface IJetsParams {
    userId?: string;
}

export default async function getJets(
    params: IJetsParams
) {
    try {
        const { userId } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        const jets = await prisma.jets.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeJets = jets.map((jet) => ({
            ...jet,
            createdAt: jet.createdAt.toISOString(),
        }));

        return safeJets;
    } catch (error: any) {
        throw new Error(error);
    }
}