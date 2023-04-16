'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImagesUpload from "../Inputs/ImagesUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    INFO = 1,
    IMAGES = 2,
    DESCRIPTION = 3,
    PRICE = 4
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            maxPeople: 1,
            modelo: 2010,
            imageSrc: '',
            price: 100,
            title: '',
            description: '',
        }
    })

    const category = watch('category');
    const maxPeople = watch('maxPeople')
    const modelo = watch('modelo')
    const imageSrc = watch('imageSrc')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldValidate: true,
            shouldDirty: true
        })
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/jets', data)
        .then(() => {
            toast.success('Jet agregado');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Ocurrio un error intentalo más tarde');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Subir';
        }

        return 'Siguente';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Atras'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Destino del viaje"
                subtitle="Elige un estado como destino" />
            <div className="grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-3
                                max-h-[50vh]
                                overflow-y-auto">
                {categories.map((item => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            />
                    </div>
                )))}
            </div>
        </div>
    )

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Detalles del Jet"
                    subtitle="Escribe aqui algunos detalles acerca del Jet"
                />
                <Counter
                    title="Máximo de personas"
                    subtitle="¿Cuántas personas soporta el Jet?"
                    value={maxPeople}
                    onChange={(value) => setCustomValue('maxPeople', value)}
                />
                <hr />
                <Counter
                    title="Modelo del Jet"
                    subtitle="¿Cual es el modelo del Jet?"
                    value={modelo}
                    onChange={(value) => setCustomValue('modelo', value) }
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Agregar una foto del jet"
                    subtitle="Carga una foto donde se vea el Jet a rentar"
                />
                <ImagesUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Lugar del Jet"
                    subtitle="Elige el lugar de donde va a partir el Jet"
                />
                <Input
                    id="title"
                    label="Ej. Chihuahua, Chihuahua"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Alguna descripcion extra (opcional)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Precio renta del Jet"
                    subtitle="¿Cuanto cuesta la renta del jet por día?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
            title="Jets Premier"
        />
    )
}

export default RentModal