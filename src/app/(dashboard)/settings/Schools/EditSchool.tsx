"use client";

import React, { useRef, useEffect, useState, startTransition, useActionState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { CldUploadWidget } from "next-cloudinary";

import { schoolSchema, SchoolSchema } from "@/lib/schemas";
import { update } from "@/lib/actions/schools.action";

const schoolTypeOptions = [
    { label: "Nursery", value: "NURSERY" },
    { label: "Nursery/Primary", value: "NURSERY/Primary" },
    { label: "Primary", value: "PRIMARY" },
    { label: "Junior Secondary", value: "JUNIOR" },
    { label: "Secondary", value: "SECONDARY" },
];

interface EditSchoolProps {
    school: any;
    onUpdated: (school: any) => void;
}

const EditSchool: React.FC<EditSchoolProps> = ({ school, onUpdated }) => {
    const toast = useRef<Toast>(null);
    const [logoUrl, setLogoUrl] = useState<string | null>(school.logo || null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SchoolSchema>({
        resolver: zodResolver(schoolSchema),
        defaultValues: {
            name: school.name,
            subtitle: school.subtitle,
            schooltype: school.schooltype,
            email: school.email,
            phone: school.phone,
            address: school.address,
            logo: school.logo,
            contactperson: school.contactperson,
            contactpersonphone: school.contactpersonphone,
            contactpersonemail: school.contactpersonemail,
            youtube: school.youtube,
            facebook: school.facebook,
            regnumbercount: school.regnumbercount,
            regnumberprepend: school.regnumberprepend,
            regnumberappend: school.regnumberappend,
        },
        mode: 'onBlur',
    });

    const [state, formAction, pending] = useActionState(update, {
        success: false,
        error: false,
        message: "",
        data: null,
    });

    /*  useEffect(() => {
         reset({
             ...school,
             youtube: school.youtube,
             facebook: school.facebook,
         });
         setLogoUrl(school.logo || null);
     }, [school, reset]); */

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
    }, [state, onUpdated]);

    const onSubmit = handleSubmit((data) => {
        const fd = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            fd.append(key, String(value));
        });
        if (logoUrl) {
            fd.append("logo", logoUrl);
        }
        fd.append("id", String(school.id));

        startTransition(() => {
            formAction(fd);
        });
    });

    return (
        <>
            <Toast ref={toast} />

            <form onSubmit={onSubmit} className="p-fluid space-y-4">
                {/* Logo Upload */}
                <CldUploadWidget
                    uploadPreset="hallmark"
                    onSuccess={(result: any, { widget }: any) => {
                        setLogoUrl(result.info.secure_url);
                        widget.close();
                    }}
                >
                    {({ open }) => (
                        <Button
                            type="button"
                            label={logoUrl ? "Change Logo" : "Upload Logo"}
                            icon="pi pi-image"
                            onClick={() => open()}
                            className="p-button-text"
                        />
                    )}
                </CldUploadWidget>

                {/* Name */}
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        {...register("name")}
                        className={errors.name ? "p-invalid" : ""}
                    />
                    {errors.name && <small className="p-error">{errors.name.message}</small>}
                </div>

                {/* Subtitle */}
                <div className="p-field">
                    <label htmlFor="subtitle">Subtitle</label>
                    <InputText
                        id="subtitle"
                        {...register("subtitle")}
                        className={errors.subtitle ? "p-invalid" : ""}
                    />
                    {errors.subtitle && <small className="p-error">{errors.subtitle.message}</small>}
                </div>

                {/* School Type */}
                <div className="p-field">
                    <label htmlFor="schooltype">School Type</label>
                    <Controller
                        name="schooltype"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                id="schooltype"
                                {...field}
                                options={schoolTypeOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select a type"
                                className={errors.schooltype ? "p-invalid" : ""}
                            />
                        )}
                    />
                    {errors.schooltype && (
                        <small className="p-error">{errors.schooltype.message}</small>
                    )}
                </div>

                {/* Email */}
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "p-invalid" : ""}
                    />
                    {errors.email && <small className="p-error">{errors.email.message}</small>}
                </div>

                {/* Phone */}
                <div className="p-field">
                    <label htmlFor="phone">Phone</label>
                    <InputText
                        id="phone"
                        {...register("phone")}
                        className={errors.phone ? "p-invalid" : ""}
                    />
                    {errors.phone && <small className="p-error">{errors.phone.message}</small>}
                </div>

                {/* Address */}
                <div className="p-field">
                    <label htmlFor="address">Address</label>
                    <InputText
                        id="address"
                        {...register("address")}
                        className={errors.address ? "p-invalid" : ""}
                    />
                    {errors.address && <small className="p-error">{errors.address.message}</small>}
                </div>

                {/* Contact Person */}
                <div className="p-field">
                    <label htmlFor="contactperson">Contact Person</label>
                    <InputText
                        id="contactperson"
                        {...register("contactperson")}
                        className={errors.contactperson ? "p-invalid" : ""}
                    />
                    {errors.contactperson && (
                        <small className="p-error">{errors.contactperson.message}</small>
                    )}
                </div>

                {/* Contact Person Phone */}
                <div className="p-field">
                    <label htmlFor="contactpersonphone">Contact Person Phone</label>
                    <InputText
                        id="contactpersonphone"
                        {...register("contactpersonphone")}
                        className={errors.contactpersonphone ? "p-invalid" : ""}
                    />
                    {errors.contactpersonphone && (
                        <small className="p-error">{errors.contactpersonphone.message}</small>
                    )}
                </div>

                {/* Contact Person Email */}
                <div className="p-field">
                    <label htmlFor="contactpersonemail">Contact Person Email</label>
                    <InputText
                        id="contactpersonemail"
                        type="email"
                        {...register("contactpersonemail")}
                        className={errors.contactpersonemail ? "p-invalid" : ""}
                    />
                    {errors.contactpersonemail && (
                        <small className="p-error">{errors.contactpersonemail.message}</small>
                    )}
                </div>

                {/* YouTube */}
                <div className="p-field">
                    <label htmlFor="youtube">YouTube URL</label>
                    <InputText
                        id="youtube"
                        {...register("youtube")}
                        className={errors.youtube ? "p-invalid" : ""}
                    />
                    {errors.youtube && <small className="p-error">{errors.youtube.message}</small>}
                </div>

                {/* Facebook */}
                <div className="p-field">
                    <label htmlFor="facebook">Facebook URL</label>
                    <InputText
                        id="facebook"
                        {...register("facebook")}
                        className={errors.facebook ? "p-invalid" : ""}
                    />
                    {errors.facebook && <small className="p-error">{errors.facebook.message}</small>}
                </div>

                {/* Registration Number Count */}
                <div className="p-field">
                    <label htmlFor="regnumbercount">Reg. No. Count</label>
                    <InputText
                        id="regnumbercount"
                        type="number"
                        {...register("regnumbercount", { valueAsNumber: true })}
                        className={errors.regnumbercount ? "p-invalid" : ""}
                    />
                    {errors.regnumbercount && (
                        <small className="p-error">{errors.regnumbercount.message}</small>
                    )}
                </div>

                {/* Registration Number Prepend */}
                <div className="p-field">
                    <label htmlFor="regnumberprepend">Reg. No. Prefix</label>
                    <InputText
                        id="regnumberprepend"
                        {...register("regnumberprepend")}
                        className={errors.regnumberprepend ? "p-invalid" : ""}
                    />
                    {errors.regnumberprepend && (
                        <small className="p-error">{errors.regnumberprepend.message}</small>
                    )}
                </div>

                {/* Registration Number Append */}
                <div className="p-field">
                    <label htmlFor="regnumberappend">Reg. No. Suffix</label>
                    <InputText
                        id="regnumberappend"
                        {...register("regnumberappend")}
                        className={errors.regnumberappend ? "p-invalid" : ""}
                    />
                    {errors.regnumberappend && (
                        <small className="p-error">{errors.regnumberappend.message}</small>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        label="Update"
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

export default EditSchool;
