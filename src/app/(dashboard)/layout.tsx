

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <article className="h-screen flex">
            <div className="flex flex-col w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                </header>
                <main className="flex-grow p-4 overflow-auto">{children}</main>
            </div>
        </article>
    );
}

export default DashboardLayout;
