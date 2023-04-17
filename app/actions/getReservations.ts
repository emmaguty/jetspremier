import prisma from "@/app/libs/prismadb";

interface IParams {
    jetId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try {

        const { jetId, userId, authorId } = params;

        const query: any = {};

        if (jetId) {
            query.jetId = jetId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.jet = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
              jet: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
        
        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                jet: {
                    ...reservation.jet,
                    createdAt: reservation.jet.createdAt.toISOString()
                }
            })
        );

        return safeReservations;

    } catch (error: any) {
        throw new Error(error);
    }
}
