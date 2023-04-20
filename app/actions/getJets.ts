import prisma from "@/app/libs/prismadb";

export interface IJetsParams {
    userId?: string;
    maxPeople?:number;
    modelo?: number;
    startDate?:string;
    endDate?: string;
    category?: string;
}

export default async function getJets(
    params: IJetsParams
) {
    try {
        const {
            userId,
            modelo,
            maxPeople,
            startDate,
            endDate, 
            category
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (modelo) {
            query.modelo = {
                gte: +modelo
            }
        }

        if (startDate && endDate) {
            query.NOT = {
              reservations: {
                some: {
                  OR: [
                    {
                      endDate: { gte: startDate },
                      startDate: { lte: startDate }
                    },
                    {
                      startDate: { lte: endDate },
                      endDate: { gte: endDate }
                    }
                  ]
                }
              }
            }
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