"use client";

import React, { useRef, useEffect, useState, startTransition, useActionState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { termSchema, TermSchema } from "@/lib/schemas";
import { create } from "@/lib/actions/terms.action";

const termOptions = [
    { label: 'First', value: 'First' },
    { label: 'Second', value: 'Second' },
    { label: 'Third', value: 'Third' }
]

interface NewTermProps {
    onCreated: (term: any) => void;
}

const NewTerm: React.FC<NewTermProps> = ({ onCreated }) => {
    const toast = useRef<Toast>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TermSchema>({
        resolver: zodResolver(termSchema),
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

    const onSubmit = handleSubmit((data) => {
        startTransition(() => {
            formAction(data);
        });
    });


    return (
        <>
            <Toast ref={toast} />

            <form onSubmit={onSubmit} className="p-fluid space-y-4">
                <div className='flex flex-col mb-1'>
                    <label htmlFor='session' className='block text-gray-400 font-medium mb-2'>
                        Session
                    </label>
                    <span className='p-input-icon-left w-full mb-2'>
                        <InputText
                            id='session'
                            type='text'
                            className='w-full'
                            placeholder='Enter session'
                            {...register('session')}
                        />
                    </span>
                    {errors.session && <p className='text-red-500 text-sm'>{errors.session.message}</p>}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='term' className='block text-gray-400 font-medium mb-2'>
                        Term
                    </label>
                    <Controller
                        name='term'
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                id='term'
                                options={termOptions}
                                placeholder='Select term'
                                className='w-full text-sm'
                                {...field}
                            />
                        )}
                    />
                    {errors.term && (
                        <p className='text-red-500 text-sm'>{errors.term.message}</p>
                    )}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='start' className='block text-gray-400 font-medium mb-2'>
                        Start
                    </label>
                    <Controller
                        name='start'
                        control={control}
                        render={({ field }) => (
                            <Calendar
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                dateFormat='dd/mm/yy'
                                showIcon
                                placeholder='Term start date'
                            />
                        )}
                    />
                    {errors.start && (
                        <p className='text-red-500 text-sm'>{errors.start.message}</p>
                    )}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='end' className='block text-gray-400 font-medium mb-2'>
                        End
                    </label>
                    <Controller
                        name='end'
                        control={control}
                        render={({ field }) => (
                            <Calendar
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                dateFormat='dd/mm/yy'
                                showIcon
                                placeholder='Term end date'
                            />
                        )}
                    />
                    {errors.end && (
                        <p className='text-red-500 text-sm'>{errors.end.message}</p>
                    )}
                </div>

                <div className='flex flex-col mb-1'>
                    <label htmlFor='nextterm' className='block text-gray-400 font-medium mb-2'>
                        Next Term Begins
                    </label>
                    <Controller
                        name='nextterm'
                        control={control}
                        render={({ field }) => (
                            <Calendar
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                dateFormat='dd/mm/yy'
                                showIcon
                                placeholder='Next term date'
                            />
                        )}
                    />
                    {errors.nextterm && (
                        <p className='text-red-500 text-sm'>{errors.nextterm.message}</p>
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

export default NewTerm;
