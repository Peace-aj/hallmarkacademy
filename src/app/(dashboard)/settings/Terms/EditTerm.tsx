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

import { termSchema, TermSchema } from "@/lib/schemas";
import { update } from "@/lib/actions/terms.action";

const termOptions = [
    { label: 'First', value: 'First' },
    { label: 'Second', value: 'Second' },
    { label: 'Third', value: 'Third' }
]

const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
]

interface EditTermProps {
    term: any;
    onUpdated: (term: any) => void;
}
const EditTerm: React.FC<EditTermProps> = ({ term, onUpdated }) => {
    const toast = useRef<Toast>(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TermSchema>({
        resolver: zodResolver(termSchema),
        defaultValues: {
            session: term?.session,
            term: term?.term,
            start: term && term.start ? moment(term.start).toDate() : undefined,
            end: term?.end ? moment(term.end).toDate() : undefined,
            nextterm: term?.nextterm ? moment(term.nextterm).toDate() : undefined,
            daysopen: term?.daysopen,
            status: term?.status,
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

    const onSubmit = handleSubmit((data) => {
        startTransition(() => {
            formAction({ id: term?.id, ...data });
        })
    })

    return (
        <>
            <Toast ref={toast} />
            <form className='space-y-6' onSubmit={onSubmit}>
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
                                onChange={(e) => field.onChange(e)}
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

                <div className='flex flex-col mb-3'>
                    <label htmlFor='status' className='block text-gray-400 font-medium mb-2'>
                        Status
                    </label>
                    <Controller
                        name='status'
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                id='status'
                                options={statusOptions}
                                placeholder='Select status'
                                className='w-full text-sm'
                                {...field}
                            />
                        )}
                    />
                    {errors.status && (
                        <p className='text-red-500 text-sm'>{errors.status.message}</p>
                    )}
                </div>

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

export default EditTerm;