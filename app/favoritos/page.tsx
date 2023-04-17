import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteJets from "@/app/actions/getFavoriteJets";

import FavoritosClient from "./FavoritosClient";

const FavoritosPage = async () => {
    const jets = await getFavoriteJets();
    const currentUser = await getCurrentUser();

    if (jets.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No tienes ninguna reservacion como favorita"
                    subtitle="Actualmente no tienes ninguna reservacion marcada como favorita"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritosClient
                jets={jets}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavoritosPage;