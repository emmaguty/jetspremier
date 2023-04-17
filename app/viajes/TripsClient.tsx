'use client';

import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import Container from "../components/Container/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import JetsCard from "../components/Jets/JetsCard";

interface TripsClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null,
}

const TripsClient: React.FC<TripsClientProps> = ({
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
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('');
        })
      }, [router]);

  return (
    <Container>
        <Heading
            title="Mis Viajes"
            subtitle="Todos tus viajes actualmente"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 
                        md:grid-cols-3 lg:grid-cols-4
                        xl:grid-cols-5 2xl:grid-cols-6
                        gap-8">
            {reservations.map((reservation: any) => (
                <JetsCard 
                    key={reservation.id}
                    data={reservation.jet}
                />
            ))}
        </div>
    </Container>
  )
}

export default TripsClient