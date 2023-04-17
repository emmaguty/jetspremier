import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservacionesClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
          <ClientOnly> 
            <EmptyState
              title="No estas autorizado"
              subtitle="Por favor ingresa"
            />
          </ClientOnly>
        )
      }

      const reservations = await getReservations({ authorId: currentUser.id });

      if (reservations.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="No se encontraron reservaciones"
              subtitle="Actualmente no se ha realizado ninguna reservación"
            />
          </ClientOnly>
        );
      }

      return (
        <ClientOnly>
          <TripsClient
            reservations={reservations}
            currentUser={currentUser}
          />
        </ClientOnly>
      );

}

export default ReservationsPage;