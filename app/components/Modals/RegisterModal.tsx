'use client'

import { useCallback, useState } from "react"
import axios from "axios";
import { FcGoogle } from "react-icons/fc"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('api/register', data)
            .then(() => {
                toast.success("Success! Please Login");
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error('Ocurrio un error, intentalo más tarde.')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Bienvenido a Jets Premier"
                subtitle="Crea una cuenta ahora"
            />
            <Input id="email"
                type="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required />
            <Input id="name"
                label="Nombre"
                disabled={isLoading}
                register={register}
                errors={errors}
                required />
            <Input id="password"
                type="password"
                label="Contraseña"
                disabled={isLoading}
                register={register}
                errors={errors}
                required />
        </div>
    )


    const footerContent = (
        <div className="flex flex-col gap-4 mt-2">
            <hr />
            <Button
                outline
                label="Continuar con Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <div className="
                text-neutral-500
                text-center
                mt-1
                font-light">
                <div className="
                    justify-center 
                    flex 
                    flex-row 
                    items-center 
                    gap-2">
                    <div>
                        ¿Ya tienes una cuenta?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline">
                        Ingresar
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Registrate"
            actionLabel="Continuar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal