'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface JetHeadProps {
    title: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const JetsHead: React.FC<JetHeadProps> = ({
    title,
    imageSrc,
    id,
    currentUser
}) => {


    return (
        <>
            <Heading
                title={title}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    fill
                    src={imageSrc}
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                <HeartButton
                        jetId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}

export default JetsHead;