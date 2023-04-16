'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
// import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import JetCategory from "./JetCategory";

interface JetInfoProps {
    user: SafeUser;
    description: string;
    maxPeople: number;
    modelo: number;
    category: {
        label: string;
        description: string;
    } | undefined
}

const JetsInfo: React.FC<JetInfoProps> = ({
    user,
    description,
    maxPeople,
    modelo,
    category,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex
                            flex-row items-center gap-2">
                <div>El piloto es {user?.name}</div>
                <Avatar src={user?.image} />
            </div>
            <div className="flex flex-row items-center
                            gap-4 font-light text-neutral-500">
                <div>
                    Máximo de personas: {maxPeople}
                </div>
                <div>
                    Modelo del Jet: {modelo}
                </div>
            </div>
        </div>
        <hr />
        {category && (
                <JetCategory
                    label={category.label}
                    description={category.description}
                />
            )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
                {description ? description : 'No se agregó ninguna descripción extra'}
        </div>
    </div>
  )
}

export default JetsInfo