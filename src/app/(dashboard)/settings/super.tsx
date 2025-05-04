"use client";

import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

const SuperSettings = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <section className='card'>
            <div className='flex mb-2 gap-2 justify-end'>
                <Button onClick={() => setActiveIndex(0)} className='w-10 h-10 p-0 flex justify-center items-center' rounded outlined={activeIndex !== 0} label='1' />
                <Button onClick={() => setActiveIndex(1)} className='w-10 h-10 p-0 flex justify-center items-center' rounded outlined={activeIndex !== 1} label='2' />
                <Button onClick={() => setActiveIndex(2)} className='w-10 h-10 p-0 flex justify-center items-center' rounded outlined={activeIndex !== 2} label='3' />
                <Button onClick={() => setActiveIndex(3)} className='w-10 h-10 p-0 flex justify-center items-center' rounded outlined={activeIndex !== 3} label='4' />
                <Button onClick={() => setActiveIndex(4)} className='w-10 h-10 p-0 flex justify-center items-center' rounded outlined={activeIndex !== 4} label='5' />
                <Button onClick={() => setActiveIndex(5)} className='w-10 h-10 p-0 flex justify-center items-center' rounded outlined={activeIndex !== 5} label='6' />
            </div>
            <TabView activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index)}>
                <TabPanel header='School Setup' leftIcon='pi pi-building-columns mr-2'>
                    <div className='m-0'>
                        School setup
                    </div>
                </TabPanel>
                <TabPanel header='Term Setup' leftIcon='pi pi-calendar mr-2'>
                    <div className='m-0'>
                        Term setup
                    </div>
                </TabPanel>
                <TabPanel header='Class Setup' leftIcon='pi pi-cloud mr-2'>
                    <div className='m-0'>
                        Classes setup
                    </div>
                </TabPanel>
                <TabPanel header='Subject Setup' leftIcon='pi pi-book mr-2'>
                    <div className='m-0'>
                        subject setup
                    </div>
                </TabPanel>
                <TabPanel header='Trait Setup' leftIcon='pi pi-star mr-2'>
                    <div className='m-0'>
                        Trait setup
                    </div>
                </TabPanel>
                <TabPanel header='Payment' leftIcon='pi pi-credit-card mr-2'>
                    <div className='m-0'>
                        Payment setup
                    </div>
                </TabPanel>
            </TabView>
        </section>
    );
}

export default SuperSettings;