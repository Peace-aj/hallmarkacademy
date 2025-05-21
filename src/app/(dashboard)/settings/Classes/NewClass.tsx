"use client";

import React, { useRef, useEffect, startTransition, useActionState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { classSchema, ClassSchema } from "@/lib/schemas";
import { Teacher } from "@/generated/prisma";
import { create } from "@/lib/actions/classes.action";

const levelsOptions = [
    { label: 'PRE-NURSERY', value: 'PRE-NURSERY' },
    { label: 'NURSERY', value: 'NURSERY' },
    { label: 'PRIMARY', value: 'PRIMARY' },
    { label: 'JSS', value: 'JSS' },
    { label: 'SSS', value: 'SSS' },
]
const categoryOptions = [
    { label: 'Diamon', value: 'Diamon' },
    { label: 'Gold', value: 'Gold' },
    { label: 'Silver', value: 'Silver' },
]

interface NewClassProps {
    onCreated: (myClass: any) => void;
    teachers: Teacher[],
}

const NewClass: React.FC<NewClassProps> = ({ onCreated, teachers }) => {
    const toast = useRef<Toast>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
        mode: 'onBlur'
    });

    const [state, formAction, pending] = useActionState(create, {
        success: false,
        error: false,
        message: "",
        data: null,
    });

    useEffect(() => {
        if (state.success && state.data) {
            onCreated(state.data);
        }
        if (state.error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: state.message,
            });
        }
    }, [state, onCreated]);

    const formMasters = teachers?.map(({ id, firstname, surname, othername, title }) => {
        return {
            label: `${title || ''} ${firstname} ${othername} ${surname}`,
            value: id,
        }
    })

    const onSubmit = handleSubmit((data) => {
        startTransition(() => {
            formAction({
                ...data,
                name: `${data.name} ${data.category}`,
            });
        });
    });


    return (
        <>
            <Toast ref={toast} />

            <form onSubmit={onSubmit} className="p-fluid space-y-4">
                <div className='flex flex-col mb-1'>
                    <label htmlFor='name' className='block text-gray-400 font-medium mb-2'>
                        Name
                    </label>
                    <span className='p-input-icon-left w-full mb-2'>
                        <InputText
                            id='name'
                            type='text'
                            className='w-full'
                            placeholder='Enter name'
                            {...register('name')}
                        />
                    </span>
                    {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='level' className='block text-gray-400 font-medium mb-2'>
                        Class Level
                    </label>
                    <Controller
                        name='level'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <Dropdown
                                id='level'
                                options={levelsOptions}
                                placeholder='Select Class Level'
                                className='w-full text-sm'
                                {...field}
                            />
                        )}
                    />
                    {errors.level && (
                        <p className='text-red-500 text-sm'>{errors.level.message}</p>
                    )}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='category' className='block text-gray-400 font-medium mb-2'>
                        Class Category
                    </label>
                    <Controller
                        name='category'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <Dropdown
                                id='category'
                                options={categoryOptions}
                                placeholder='Select Class Category'
                                className='w-full text-sm'
                                {...field}
                            />
                        )}
                    />
                    {errors.category && (
                        <p className='text-red-500 text-sm'>{errors.category.message}</p>
                    )}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='capacity' className='block text-gray-400 font-medium mb-2'>
                        Capacity
                    </label>
                    <span className='p-input-icon-left w-full mb-2'>
                        <InputText
                            id='capacity'
                            type='number'
                            className='w-full'
                            placeholder='Enter capacity'
                            {...register('capacity')}
                        />
                    </span>
                    {errors.capacity && <p className='text-red-500 text-sm'>{errors.capacity.message}</p>}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='formmaster' className='block text-gray-400 font-medium mb-2'>
                        Form Master
                    </label>
                    <Controller
                        name='formmasterid'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <Dropdown
                                id='formmasterid'
                                options={formMasters}
                                placeholder='Select Form Master'
                                className='w-full text-sm'
                                {...field}
                            />
                        )}
                    />
                    {errors.formmasterid && (
                        <p className='text-red-500 text-sm'>{errors.formmasterid.message}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        label="Save"
                        type="submit"
                        className="p-button-primary"
                        loading={pending}
                        disabled={pending}
                    />
                </div>
            </form>
        </>
    );
};

export default NewClass;
