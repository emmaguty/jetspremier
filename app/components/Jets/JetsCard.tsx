'use client';

import {
    SafeJets,
    SafeReservation,
    SafeUser
} from "@/app/types";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface JetCardProps {
    data: SafeJets;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const JetCard: React.FC<JetCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {

    const router = useRouter();

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/jets/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full mt-8">
                <div
                    className="
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl">
                    <Image
                        fill
                        className="
                        object-cover 
                        h-full 
                        w-full 
                        group-hover:scale-110 
                        transition"
                        src={data.imageSrc}
                        alt="Jet"
                    />
                    <div className="
                            absolute
                            top-3
                            right-3">
                    <HeartButton jetId={data.id} 
                                 currentUser={currentUser}/>
                       
                    </div>
                    </div>
                    <div className="font-light text-neutral-500">
                        {reservationDate || data.category}
                    <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ${price}
                    </div>
                    {!reservation && (
                        <div className="font-light">por Día</div>
                    )}
                    </div>
                    {onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel} 
                            onClick={handleCancel}/> )}
                </div>
            </div>
        </div>
    )
}

export default JetCard;