import { Button } from '@/components/ui/button'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces'
import { useCreateWorkspacesModal } from '@/features/workspaces/store/use-create-workspaces-modal'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Loader } from 'lucide-react'
import React from 'react'

const WorkspaceSwitcher = () => {

    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspacesModal();

    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

    const filteredWorkspaces = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
                    {
                        workspaceLoading ? (
                            <Loader className='size-5 animate-spin shrink-0' />
                        ) : (
                            workspace?.name.charAt(0).toUpperCase()
                        )
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align='start' className='w-64'>
                <DropdownMenuItem className='cursor-pointer flex-col justify-center items-start capitalize'>
                    {workspace?.name}
                    <span className='text-xs text-muted-foreground'>
                        Active workspace
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default WorkspaceSwitcher;