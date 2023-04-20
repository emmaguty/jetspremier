'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types"
    ;
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import JetsCard from "@/app/components/Jets/JetsCard";

interface ReservationsClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null,
}

const ReservacionesClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservacion cancelada');
                router.refresh();
            })
            .catch(() => {
                toast.error('Ocurrio un error intentalo más tarde')
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);

    return (
        <Container>
            <Heading
                title="Reservaciones"
                subtitle="Los Jets agregados por ti"
            />
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation: any) => (
                    <JetsCard
                        key={reservation.id}
                        data={reservation.jet}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancelar la reservacion del cliente"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservacionesClient