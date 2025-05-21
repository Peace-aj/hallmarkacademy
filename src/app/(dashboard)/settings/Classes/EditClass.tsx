"use client";

import React, { useRef, useEffect, useState, startTransition, useActionState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import moment from "moment";

import { classSchema, ClassSchema } from "@/lib/schemas";
import { Teacher } from "@/generated/prisma";
import { update } from "@/lib/actions/classes.action";

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

interface EditClassProps {
    myClass: any;
    teachers: Teacher[],
    onUpdated: (myClass: any) => void;
}
const EditClass: React.FC<EditClassProps> = ({ myClass, onUpdated, teachers }) => {
    const toast = useRef<Toast>(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            name: myClass?.name,
            level: myClass?.level,
            category: myClass?.category,
            capacity: myClass?.capacity,
            formmasterid: myClass?.formmasterid,
        },
        mode: 'onBlur',
    });

    const [state, formAction, pending] = useActionState(update, {
        success: false,
        error: false,
        message: "",
        data: null,
    })

    useEffect(() => {
        if (state.success && state.data) {
            onUpdated(state.data);
        }
        if (state.error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: state.message,
            });
        }
    }, [state, onUpdated])

    const formMasters = teachers?.map(({ id, firstname, surname, othername, title }) => {
        return {
            label: `${title || ''} ${firstname} ${othername} ${surname}`,
            value: id,
        }
    })

    const onSubmit = handleSubmit((data) => {
        startTransition(() => {
            formAction({ id: myClass?.id, ...data });
        })
    })

    return (
        <>
            <Toast ref={toast} />
            <form className='space-y-6' onSubmit={onSubmit}>
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
                <div className="flex justify-end gap-2 pt-3">
                    <Button
                        label="Update"
                        type="submit"
                        className="p-button-primary w-full"
                        loading={pending}
                        disabled={pending}
                    />
                </div>
            </form>
        </>
    )
}

export default EditClass;