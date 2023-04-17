import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getJets from "../actions/getJets";

const PropertiesPage = async () => {
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

      const jets = await getJets({ userId: currentUser.id });

      if (jets.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="No se encontro ningun Jet"
              subtitle="Actualmente no hay ningún jet en la lista"
            />
          </ClientOnly>
        );
      }

      return (
        <ClientOnly>
            <PropertiesClient
                jets={jets}
                currentUser={currentUser}
            />
        </ClientOnly>
      )
}

export default PropertiesPage;