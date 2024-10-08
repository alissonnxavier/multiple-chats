'use client';


import { Loader } from 'lucide-react';
import { useCreateWorkspacesModal } from "@/features/workspaces/store/use-create-workspaces-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [open, setOpen] = useCreateWorkspacesModal();

    const { data, isLoading } = useGetWorkspaces();

    const workspaceId = useMemo(() => data?.[0]?._id, [data]);

    useEffect(() => {
        if (isLoading) return;

        if (workspaceId) {
            router.push(`/workspace/${workspaceId}`);
        } else if (!open) {
            setOpen(true);
        }
    }, [workspaceId, isLoading, open, setOpen, router]);

    return (
        <div className="h-full flex items-center justify-center">
            <Loader className='size-6 animate-spin text-muted-foreground' />
        </div>
    )
}
