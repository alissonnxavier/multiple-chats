'use client';

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader2, LoaderIcon, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {

    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [open, setOpen] = useCreateChannelModal();

    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceloading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsIsLoading } = useGetChannels({ workspaceId })

    const channelId = useMemo(() => channels?.[0]?._id, [channels]);
    const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

    useEffect(() => {
        if (workspaceloading || channelsIsLoading || memberLoading || !member || !workspace) return;

        if (channelId) {
            router.push(`/workspace/${workspaceId}/channel/${channelId}`);
        } else if (!open && isAdmin) {
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
        setOpen,
        memberLoading,
        member,
        isAdmin,
    ]);

    if (workspaceloading || channelsIsLoading || memberLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                <LoaderIcon className="sieze-6 animate-spin text-muted-foreground" />
            </div>
        );
    };

    if (!workspace || !member) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                <TriangleAlert className="sieze-6  text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                    Workspace not found
                </span>
            </div>
        );
    };



    return (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
            <TriangleAlert className="sieze-6  text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
                No channel found.
            </span>
        </div>
    );;
}

export default WorkspaceIdPage;