'use client';

import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

const Page = () => {

    const tasks = useQuery(api.tasks.get);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        </main>
    )
}

export default Page;



