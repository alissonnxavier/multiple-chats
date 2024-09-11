'use client';

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader2, LoaderIcon, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {

    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [open, setOpen] = useCreateChannelModal();

    const { data: workspace, isLoading: workspaceloading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsIsLoading } = useGetChannels({ workspaceId })

    const channelId = useMemo(() => channels?.[0]?._id, [channels]);

    useEffect(() => {
        if (workspaceloading || channelsIsLoading || !workspace) return;

        if (channelId) {
            router.push(`/workspace/${workspaceId}/channel/${channelId}`);
        } else if (!open) {
            setOpen(true);
        }

    }, [
        workspaceloading,
        channelsIsLoading,
        workspace,
        channelId,
        open,
        router,
        workspaceId,
        setOpen
    ]);

    if (workspaceloading || channelsIsLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                <LoaderIcon className="sieze-6 animate-ping text-muted-foreground" />
            </div>
        );
    };

    if (!workspace) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                <TriangleAlert className="sieze-6 animate-ping text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                    Workspace not found
                </span>
            </div>
        );
    };



    return null;
}

export default WorkspaceIdPage;