'use client';

import axios from "axios";
import { useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeJets, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container/Container";
import { categories } from "@/app/components/Navbar/Categories";
import JetsHead from "@/app/components/Jets/JetsHead";
import JetsInfo from "@/app/components/Jets/JetsInfo";
import JetReservation from "@/app/components/Jets/JetReservation";
import { loadStripe, Stripe } from '@stripe/stripe-js';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface JetClientProps {
    reservations?: SafeReservation[];
    jet: SafeJets & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const JetClient: React.FC<JetClientProps> = ({
    jet,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((items) =>
            items.label === jet.category);
    }, [jet.category]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(jet.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);


        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            jetId: jet?.id
        })

            .then(() => {
                toast.success('Jet reservado!');
                setDateRange(initialDateRange);
                router.push('/');
            })
            .catch(() => {
                toast.error('Ocurrio un error intentalo más tarde');
            })
            .finally(() => {
                setIsLoading(false);

            })
    }, [
        totalPrice,
        dateRange,
        jet?.id,
        router,
        currentUser,
        loginModal
    ]);


    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && jet.price) {
                setTotalPrice(dayCount * jet.price);
            } else {
                setTotalPrice(jet.price);
            }
        }
    }, [dateRange, jet.price]);

return (
    <Container>
        <div
            className=" max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <JetsHead
                    title={jet.title}
                    imageSrc={jet.imageSrc}
                    id={jet.id}
                    currentUser={currentUser} />
                <div className="grid grid-cols-1 md:grid-cols-7 
                                    md:gap-10 mt-6">
                    <JetsInfo
                        user={jet.user}
                        category={category}
                        description={jet.description}
                        modelo={jet.modelo}
                        maxPeople={jet.maxPeople}
                    />
                    <div
                        className="order-first mb-10 
                                       md:order-last md:col-span-3">
                        <JetReservation
                            price={jet.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
);
}

export default JetClient;