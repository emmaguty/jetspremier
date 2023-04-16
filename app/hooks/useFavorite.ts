import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    jetId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    jetId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const jet = currentUser?.favoriteIds || [];

        return jet.includes(jetId);
    }, [currentUser, jetId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${jetId}`);
            } else {
                request = () => axios.post(`/api/favorites/${jetId}`);
            }

            await request();

            router.refresh();

            toast.success('Se guardaron los cambios')
        } catch (error) {
            toast.error('Ocurrio un error, intentalo más tarde');
        }
    }, [
        currentUser,
        hasFavorited,
        jetId,
        loginModal,
        router
    ]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;