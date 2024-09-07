import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { TrashIcon } from "lucide-react";
import { useState } from "react";


interface PreferencesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialValue: string;
}

const PreferencesModal = ({
    open,
    setOpen,
    initialValue
}: PreferencesModalProps) => {

    const [value, setValue] = useState(initialValue);
    const [editOpen, setEditOpen] = useState(false);

    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
    const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-white">
                    <DialogTitle>
                        {value}
                    </DialogTitle>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-y-2">
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger asChild>
                            <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold">
                                        Workspace name
                                    </p>
                                    <p className="text-sm text-[#1264a3] hover:underline font-semibold ">
                                        Edit
                                    </p>
                                </div>
                                <p className="text-sm">
                                    {value}
                                </p>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Rename this workpace</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4" onSubmit={() => { }}>
                                <Input
                                    value={value}
                                    disabled={isUpdatingWorkspace}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                    autoFocus
                                    minLength={3}
                                    maxLength={80}
                                    placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                                />
                            </form>
                        </DialogContent>
                    </Dialog>
                    <button
                        disabled={false}
                        onClick={() => { }}
                        className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:gb-gray-50 text-rose-600"
                    >
                        <TrashIcon />
                        <p className="text-sm font-semibold">Delete workspace</p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PreferencesModal;