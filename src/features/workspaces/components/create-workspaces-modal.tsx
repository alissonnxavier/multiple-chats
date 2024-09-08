

import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useCreateWorkspacesModal } from '../store/use-create-workspaces-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../api/use-create-workspace';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export const CreateWorkSpacesModal = () => {
    const router = useRouter();
    const [open, setOpen] = useCreateWorkspacesModal();
    const [name, setName] = useState("");

    const { mutate, isPending } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false);
        setName("");
        //TODO: Clear from
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({ name }, {
            onSuccess(id) {
                toast.success("Workspace created");
                router.push(`/workspace/${id}`);
                handleClose()
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspaces</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                    />
                    <div className='flex justify-end'>
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}