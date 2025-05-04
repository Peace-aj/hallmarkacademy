import Image from "next/image";

import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {
    const data = await prisma.student.groupBy({
        by: ['gender'],
        _count: { _all: true },
    });

    const boys = data.find((d) => d.gender === 'MALE')?._count._all ?? 20;
    const girls = data.find((d) => d.gender === 'FEMALE')?._count._all ?? 40;
    const total = boys + girls;

    const boysPct = total > 0 ? Math.round((boys / total) * 100) : 0;
    const girlsPct = total > 0 ? Math.round((girls / total) * 100) : 0;

    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Students</h1>
                <Image src="/assets/moreDark.png" alt="" width={20} height={20} />
            </div>
            {/* CHART */}
            <CountChart boys={boys} girls={girls} />
            {/* BOTTOM */}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full" />
                    <h1 className="font-bold">{boys}</h1>
                    <h2 className="text-xs text-gray-500">
                        Boys ({boysPct}%)
                    </h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaYellow rounded-full" />
                    <h1 className="font-bold">{girls}</h1>
                    <h2 className="text-xs text-gray-500">
                        Girls ({girlsPct}%)
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default CountChartContainer;
