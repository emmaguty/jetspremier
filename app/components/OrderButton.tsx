'use client';

import { IconType } from "react-icons";
import { BsPaypal } from "react-icons/bs";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;

}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-blue-500'}
        ${outline ? 'border-black' : 'border-blue-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1]' : 'border-2'}`}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
                    absolute
                    left-4
                    top-3"
                />
            )}
            <div className="flex justify-center items-center gap-2">
                <BsPaypal />
                {label}
            </div>
           
        </button>
    )
}

export default Button;