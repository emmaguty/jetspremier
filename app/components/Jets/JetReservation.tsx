'use client';

import { Range } from "react-date-range";

import OrderButton from "../OrderButton";
import Calendar from "../Inputs/Calendar";

interface JetReservationProps {
    price: number;
    dateRange: Range,
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const JetReservation: React.FC<JetReservationProps> = ({
    price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
    return (
        <div className="bg-white rounded-xl border-[1px]
                    border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center
                            gap-1 p-4">
                <div className="text-2xl font-semibold">
                    Reservar ${price} USD
                </div>
                <div className="font-light text-neutral-600 text-lg">
                    por día
                </div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => 
                  onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                {/* <OrderButton 
                    disabled={disabled}
                    label="Reservar ahora"
                    onClick={onSubmit}
                /> */}
                <OrderButton 
                    disabled={disabled}
                    label="Reservar Ahora"
                    onClick={onSubmit}
                />


            </div>
            <div className="p-4 flex flex-row items-center
                            justify-between font-semibold 
                            text-lg">
                <div>
                    Total
                </div>
                <div>
                    ${totalPrice}
                </div>
            </div>
        </div>
    )
}

export default JetReservation