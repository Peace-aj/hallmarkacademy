"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { deleteTeachersAction } from '@/lib/actions';
import type { Teacher } from '@/generated/prisma';

interface TeachersClientProps {
    initialTeachers: Teacher[];
    role: 'super' | 'admin' | 'management' | string;
}

export default function Teachers({ initialTeachers, role }: TeachersClientProps) {
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [selected, setSelected] = useState<Teacher[]>([]);
    const [filter, setFilter] = useState('');
    const [current, setCurrent] = useState<Teacher | null>(null);
    const toast = useRef<Toast>(null);
    const panel = useRef<OverlayPanel>(null);
    const router = useRouter();

    // Show feedback after deletion
    useEffect(() => {
        // No SSR refresh necessary; state updates will re-render
    }, []);

    const confirmDelete = (ids: string[]) => {
        confirmDialog({
            message: 'Are you sure you want to delete selected teacher(s)?',
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await deleteTeachersAction(ids);
                    toast.current?.show({ severity: 'success', summary: 'Deleted', detail: 'Teacher(s) deleted.' });
                    setTeachers(prev => prev.filter(t => !ids.includes(t.id)));
                    setSelected([]);
                } catch {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Deletion failed.' });
                }
            }
        });
    };

    const actionBody = (row: Teacher) => (
        <Button
            icon="pi pi-ellipsis-v"
            className="p-button-text"
            onClick={e => {
                setCurrent(row);
                panel.current?.toggle(e);
            }}
        />
    );

    const view = (id: string) => router.push(`/list/teachers/${id}`);
    const edit = (id: string) => router.push(`/list/teachers/edit/${id}`);
    const deleteOne = (id: string) => confirmDelete([id]);

    return (
        <section className="flex flex-col w-full bg-gray-transparent min-h-screen p-4">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="w-full bg-white p-6 rounded-lg shadow-md">
                {/* Title and new button */}
                <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                    <h1 className='text-md sm:text-2xl text-gray-700 font-bold hover:text-gray-900 transition duration-300'>
                        All Teachers
                    </h1>
                    {(role === 'super' || role === 'admin' || role === 'management') && <Link
                        href={"/list/teachers/new"}
                        className="text-sm sm:text-base bg-cyan-700 text-white font-semibold px-2 py-2 sm:px-4 rounded-md shadow-md hover:bg-cyan-500 transition duration-300"
                    >
                        Add New
                    </Link>}
                </div>

                {/* Search input section */}
                <div className="mb-4 w-full">
                    <span className="p-input-icon-left block w-full">
                        <i className="pi pi-search ml-2" />
                        <InputText
                            placeholder="Search teachers..."
                            onInput={e => setFilter(e.currentTarget.value)}
                            className='w-full rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-8 py-2'
                        />
                    </span>
                </div>

                {/* Render DataTable */}
                <div>
                    <DataTable
                        value={teachers}
                        paginator
                        rows={5}
                        stripedRows
                        globalFilter={filter}
                        filterDisplay='menu'
                        scrollable
                        scrollHeight='400px'
                        dataKey="id"
                        selection={selected}
                        onSelectionChange={e => setSelected(e.value)}
                        selectionMode="multiple"
                    >
                        <Column selectionMode='multiple' headerStyle={{ width: '3em' }} />
                        <Column field="title" header="Title" sortable />
                        <Column field="firstname" header="First Name" sortable />
                        <Column field="surname" header="Surname" sortable />
                        <Column field="email" header="Email" sortable />
                        <Column field="phone" header="Phone" sortable />
                        <Column body={actionBody} header="Actions" style={{ textAlign: 'center', width: '4rem' }} />
                    </DataTable>

                    <OverlayPanel ref={panel} showCloseIcon>
                        <div className="p-d-flex p-flex-column">
                            <Button label="View" icon="pi pi-eye" className="p-button-text" onClick={() => current && view(current.id)} />
                            <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => current && edit(current.id)} />
                            <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={() => current && deleteOne(current.id)} />
                        </div>
                    </OverlayPanel>
                </div>
            </div>

            {/* Multi-delete Button */}
            {selected.length > 0 && (
                <div className='mt-2 w-full'>
                    <Button
                        label={`Delete ${selected.length} Teacher(s)`}
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={() => confirmDelete(selected.map(t => t.id))}
                        style={{ marginTop: '1rem' }}
                    />
                </div>
            )}
        </section>
    );
}