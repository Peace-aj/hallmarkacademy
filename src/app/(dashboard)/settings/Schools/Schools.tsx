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
import moment from 'moment';
import type { School } from '@/generated/prisma';
import { remove } from '@/lib/actions/schools.action';
import SchoolPage from './School';
import NewSchool from './NewSchool';
import EditSchool from './EditSchool';

interface SchoolsClientProps {
    initialSchools: School[];
    role: 'super' | 'admin' | 'management' | string;
}

const Schools: FC<SchoolsClientProps> = ({ initialSchools, role }) => {
    const [schools, setSchools] = useState<School[]>(initialSchools);
    const [selected, setSelected] = useState<School[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [current, setCurrent] = useState<School | null>(null);
    const [newOpen, setNewOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [viewOpen, setViewOpen] = useState<boolean>(false);

    // Track deletion state: which school IDs are being deleted
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const toast = useRef<Toast>(null);
    const panel = useRef<OverlayPanel>(null);

    const confirmDelete = useCallback((ids: string[]) => {
        confirmDialog({
            message:
                ids.length === 1
                    ? "Do you really want to delete this school?"
                    : `Are you sure you want to delete the ${ids.length} selected schools?`,
            header: "Confirm Deletion",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            rejectClassName: "p-button-primary",
            accept: async () => {
                setDeletingIds(ids);
                try {
                    const formData = new FormData();
                    ids.forEach((id) => formData.append("ids", id));
                    const response = await remove(undefined, formData);

                    if (response.success) {
                        toast.current?.show({
                            severity: "success",
                            summary: "Deleted",
                            detail:
                                ids.length === 1
                                    ? "School deleted successfully."
                                    : `${response.data.count} schools deleted successfully.`,
                        });
                        setSchools((prev) => prev.filter((s) => !ids.includes(s.id)));
                        setSelected((prev) => prev.filter((s) => !ids.includes(s.id)));
                    } else {
                        throw new Error(response.message);
                    }
                } catch (error) {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error",
                        detail:
                            (error as any).message || "Failed to delete school(s).",
                    });
                } finally {
                    setDeletingIds([]);
                }
            },
        });
    }, []);

    const deleteOne = useCallback((id: string) => {
        confirmDelete([id]);
        panel.current?.hide();
    }, [confirmDelete]);

    const openNew = useCallback(() => setNewOpen(true), []);
    const openEdit = useCallback(() => {
        setEditOpen(true);
        panel.current?.hide();
    }, []);
    const openView = useCallback(() => {
        setViewOpen(true);
        panel.current?.hide();
    }, []);

    const handleCreated = useCallback((school: School) => {
        setSchools(prev => [school, ...prev]);
        setNewOpen(false);
        toast.current?.show({ severity: 'success', summary: 'Created', detail: 'School record created successfully.' });
    }, []);

    const handleUpdated = useCallback((updated: School) => {
        setSchools(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditOpen(false);
        toast.current?.show({ severity: 'success', summary: 'Updated', detail: 'School record has been updated successfully.' });
    }, []);

    const actionBody = useCallback((row: School) => (
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
        { label: 'View', icon: 'pi pi-eye', action: openView },
        { label: 'Edit', icon: 'pi pi-pencil', action: openEdit },
        { label: 'Delete', icon: 'pi pi-trash', action: () => current && deleteOne(current.id) },
    ];

    return (
        <section className="flex flex-col w-full bg-gray-transparent">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="w-full bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-md sm:text-2xl text-gray-700 font-bold">All Schools</h1>
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
                        placeholder="Search schools..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 px-4 py-2"
                    />
                </div>

                <DataTable
                    value={schools}
                    paginator rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    stripedRows
                    globalFilter={filter}
                    filterDisplay="menu"
                    scrollable scrollHeight="400px"
                    dataKey="id"
                    selection={selected}
                    onSelectionChange={e => setSelected(e.value)}
                    selectionMode="multiple"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                    <Column field="name" header="Name" sortable />
                    <Column field="schooltype" header="School Type" sortable />
                    <Column field="phone" header="Phone" />
                    <Column field="date" header="Date" body={row => moment(row.createdAt).format('DD MMM. YYYY')} />
                    <Column body={actionBody} header="Actions" style={{ textAlign: 'center', width: '4rem' }} />
                </DataTable>

                {selected.length > 0 && (
                    <div className="mt-4">
                        <Button
                            label={`Delete ${selected.length} School(s)`}
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
                header="Add New School"
                maximizable
                visible={newOpen}
                style={{ width: '50vw' }}
                modal
                onHide={() => setNewOpen(false)}
            >
                <NewSchool onCreated={handleCreated} />
            </Dialog>

            <Dialog
                header="Edit School"
                visible={editOpen}
                style={{ width: '50vw' }}
                modal
                onHide={() => setEditOpen(false)}
            >
                {current && <EditSchool school={current} onUpdated={handleUpdated} /* onCancel={() => setEditOpen(false)} */ />}
            </Dialog>

            <Dialog
                header="View School"
                visible={viewOpen}
                style={{ width: '60vw' }}
                modal
                onHide={() => setViewOpen(false)}
            >
                {current && <SchoolPage school={current} onClose={() => setViewOpen(false)} />}
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
};

export default Schools;
