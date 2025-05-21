"use client";

import React, { FC, useState, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Spinner from '@/components/ui/Spinner/Spinner';
import type { Class, Teacher } from '@/generated/prisma';
import { remove } from '@/lib/actions/classes.action';

import NewClass from './NewClass';
import EditClass from './EditClass';

interface ClassesClientProps {
    initialClasses: Class[];
    teachers: Teacher[],
    role: 'super' | 'admin' | 'management' | string;
}

const Classes: FC<ClassesClientProps> = ({ initialClasses, teachers, role }) => {
    const [classes, setClasses] = useState<Class[]>(initialClasses);
    const [selected, setSelected] = useState<Class[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [current, setCurrent] = useState<Class | null>(null);
    const [newOpen, setNewOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);

    // Track deletion state: which class IDs are being deleted
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const toast = useRef<Toast>(null);
    const panel = useRef<OverlayPanel>(null);

    /* a function to confirm record deletion of records  */
    const confirmDelete = useCallback((ids: string[]) => {
        confirmDialog({
            message:
                ids.length === 1
                    ? "Do you really want to delete this class?"
                    : `Are you sure you want to delete the ${ids.length} selected classes?`,
            header: "Confirm Deletion",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            rejectClassName: "p-button-primary",
            accept: async () => {
                setDeletingIds(ids);
                try {
                    const response = await remove(undefined, ids);
                    if (response.success) {
                        toast.current?.show({
                            severity: "success",
                            summary: "Deleted",
                            detail: ids.length === 1 ? "Class record has been deleted successfully" : `${response.data.count} class records have been deleted successfully.`,
                        });
                        setClasses((prev) => prev.filter((s) => !ids.includes(s.id)));
                        setSelected((prev) => prev.filter((s) => !ids.includes(s.id)));
                    } else {
                        throw new Error(response.message);
                    }
                } catch (error) {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error",
                        detail:
                            (error as any).message || "Failed to delete class(s).",
                    });
                } finally {
                    setDeletingIds([]);
                }
            },
        });
    }, [])

    /* a function to delete single record  */
    const deleteOne = useCallback((id: string) => {
        confirmDelete([id]);
        panel.current?.hide();
    }, [confirmDelete]);

    /* a function to open new record dialog */
    const openNew = useCallback(() => setNewOpen(true), []);

    /* a function to open eidt record dialog */
    const openEdit = useCallback(() => {
        setEditOpen(true);
        panel.current?.hide();
    }, []);

    /* a function to handle creation of record dialog */
    const handleCreated = useCallback((level: Class) => {
        setClasses(prev => [level, ...prev]);
        setNewOpen(false);
        toast.current?.show({ severity: 'success', summary: 'Created', detail: 'New class created successfully.' });
    }, []);

    /* a function to handle update of record  */
    const handleUpdated = useCallback((updated: Class) => {
        setClasses(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditOpen(false);
        toast.current?.show({ severity: 'success', summary: 'Updated', detail: 'Class record has been updated successfully.' });
    }, []);

    const actionBody = useCallback((row: Class) => (
        <Button
            key={row.id}
            icon="pi pi-ellipsis-v"
            className="p-button-text"
            onClick={(e) => {
                setCurrent(row);
                panel.current?.toggle(e);
            }}
        />
    ), []);

    const overlayActions = [
        { label: 'Edit', icon: 'pi pi-pencil', action: openEdit },
        { label: 'Delete', icon: 'pi pi-trash', action: () => current && deleteOne(current.id) },
    ];

    return (
        <section className="flex flex-col w-full bg-gray-transparent">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="w-full bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-md sm:text-2xl text-gray-700 font-bold">All Classes</h1>
                    {(role === 'super' || role === 'admin' || role === 'management') && (
                        <Button
                            label="Add New"
                            icon="pi pi-plus"
                            className="p-button-sm p-button-primary"
                            onClick={openNew}
                        />
                    )}
                </div>

                <div className="mb-4 w-full">
                    <InputText
                        placeholder="Search classes..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 px-4 py-2"
                    />
                </div>

                <DataTable
                    value={classes}
                    paginator rows={5}
                    stripedRows
                    globalFilter={filter}
                    filterDisplay="menu"
                    scrollable scrollHeight="400px"
                    dataKey="id"
                    selection={selected}
                    onSelectionChange={e => setSelected(e.value)}
                    selectionMode="multiple"
                >
                    <Column selectionMode='multiple' headerStyle={{ width: '3em' }} />
                    <Column field='name' header='Class' sortable />
                    <Column field='category' header='Class Category' sortable />
                    <Column field='level' header='Class Level' sortable />
                    <Column field='capacity' header='Class Capacity' />
                    <Column field='formmaster' header='Form Master' />
                    <Column body={actionBody} header="Actions" style={{ textAlign: 'center', width: '4rem' }} />
                </DataTable>

                {selected.length > 0 && (
                    <div className="mt-4">
                        <Button
                            label={`Delete ${selected.length} Class(s)`}
                            icon="pi pi-trash"
                            className="p-button-danger"
                            onClick={() => confirmDelete(selected.map(s => s.id))}
                            loading={deletingIds.length > 0}
                            disabled={deletingIds.length > 0}
                        />
                    </div>
                )}
            </div>

            <Dialog
                header="Add New Class"
                maximizable
                visible={newOpen}
                style={{ width: '50vw' }}
                modal
                onHide={() => setNewOpen(false)}
            >
                <NewClass onCreated={handleCreated} teachers={teachers} />
            </Dialog>

            <Dialog
                header="Edit Class"
                visible={editOpen}
                style={{ width: '50vw' }}
                modal
                onHide={() => setEditOpen(false)}
            >
                {current && <EditClass myClass={current} onUpdated={handleUpdated} teachers={teachers} />}
            </Dialog>


            <OverlayPanel ref={panel}>
                <div className='flex flex-col'>
                    {overlayActions.map(({ label, icon, action }) => (
                        <Button
                            key={label}
                            label={label}
                            icon={icon}
                            className="p-button-text"
                            onClick={action}
                        />
                    ))}
                </div>
            </OverlayPanel>

            {/** Full-page spinner overlay **/}
            <Spinner visible={deletingIds.length > 0} onHide={() => setDeletingIds([])} />
        </section>
    );
}

export default Classes;