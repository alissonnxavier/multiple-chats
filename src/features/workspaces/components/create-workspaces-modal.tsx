'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useCreateWorkspacesModal } from '../store/use-create-workspaces-modal';


export const CreateWorkSpacesModal = () => {
    const [open, setOpen] = useCreateWorkspacesModal();

    const handleClose = () => {
        setOpen(false);
        //TODO: Clear from
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspaces</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}