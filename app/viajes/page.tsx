import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const ViajesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
          <ClientOnly>
            <EmptyState
              title="No estas autorizado"
              subtitle="Por favor ingresa a tu cuenta"
            />
          </ClientOnly>
          );
        }

        const reservations = await getReservations({ userId: currentUser.id });

        if (reservations.length === 0) {
            return (
              <ClientOnly>
                <EmptyState
                  title="No se encontro ningun viaje"
                  subtitle="Actualmente no tienes ningun viaje reservado"
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

export default ViajesPage;