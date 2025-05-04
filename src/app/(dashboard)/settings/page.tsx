import { currentUser } from "@clerk/nextjs/server";

import SuperSettings from "./super";

const Settings = async () => {
    const user = await currentUser();
    const role = (user?.publicMetadata.role as string) || 'guest';
    let content = (
        <p>This is the setup page</p>
    )
    if (role === 'super') {
        content = (
            <SuperSettings />
        )
    }
    return (
        <section className='p-4 flex gap-4 flex-col bg-white rounded-md shadow-md m-4'>
            {content}
        </section>
    )
}

export default Settings;