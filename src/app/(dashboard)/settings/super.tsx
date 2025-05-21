"use client";

import React, { FC, useState } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import { Button } from "primereact/button";
import type { School, Term, Class, Teacher } from "@/generated/prisma";

import Schools from "./Schools/Schools";
import Terms from "./Terms/Terms";
import Classes from "./Classes/Classes";

interface SuperSettingsProps {
    initialData: {
        schools: School[];
        terms: Term[];
        classes: Class[];
        teachers: Teacher[];
    };
    role: "super" | "admin" | "management" | string;
}

const SuperSettings: FC<SuperSettingsProps> = ({ initialData, role }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleTabChange = (e: TabViewTabChangeEvent) => {
        setActiveIndex(e.index);
    };

    const renderNavButtons = () =>
        Array.from({ length: 6 }, (_, idx) => (
            <Button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="w-10 h-10 p-0 flex justify-center items-center"
                rounded
                outlined={activeIndex !== idx}
                label={`${idx + 1}`}
            />
        ));

    return (
        <section className="card">
            <div className="flex mb-2 gap-2 justify-end px-6 pt-4">
                {renderNavButtons()}
            </div>

            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="School Setup" leftIcon="pi pi-building-columns mr-2">
                    <Schools initialSchools={initialData.schools} role={role} />
                </TabPanel>
                <TabPanel header="Term Setup" leftIcon="pi pi-calendar mr-2">
                    <Terms initialTerms={initialData.terms} role={role} />
                </TabPanel>
                <TabPanel header="Class Setup" leftIcon="pi pi-cloud mr-2">
                    <Classes initialClasses={initialData.classes} teachers={initialData.teachers} role={role} />
                </TabPanel>
                <TabPanel header="Subject Setup" leftIcon="pi pi-book mr-2">
                    Subject setup
                </TabPanel>
                <TabPanel header="Trait Setup" leftIcon="pi pi-star mr-2">
                    Trait setup
                </TabPanel>
                <TabPanel header="Payment" leftIcon="pi pi-credit-card mr-2">
                    Payment setup
                </TabPanel>
            </TabView>
        </section>
    );
};

export default SuperSettings;
