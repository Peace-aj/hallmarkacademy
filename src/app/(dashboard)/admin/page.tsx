
const Admin = ({
    searchParams,
}: {
    searchParams: { [keys: string]: string | undefined };
}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-4 text-lg">Welcome to the admin dashboard!</p>
            <p className="mt-2 text-sm text-gray-500">
                Search Params
            </p>
        </div>
    );
}

export default Admin;