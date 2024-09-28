import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { AlertTriangle, LoaderIcon, XIcon } from "lucide-react";
import { useGetMessage } from "../api/use-get-message";
import { Message } from "@/components/message";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useCreateMessage } from "../api/use-create-message";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { useChannelId } from "@/hooks/use-channel-id";
import { toast } from "sonner";


const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ThreadProps {
    messageId: Id<"messages">;
    onClose: () => void;
};

type CreateMessagesValues = {
    channelId: Id<"channels">;
    workspaceId: Id<"workspaces">;
    parentMessageId: Id<"messages">;
    body?: string;
    image: Id<"_storage"> | undefined;
};

const Thread = ({ messageId, onClose }: ThreadProps) => {

    const channelId = useChannelId();
    const workspaceId = useWorkspaceId();

    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
    const [editorKey, setEditorKey] = useState(0);
    const [isPending, setIsPending] = useState(false);

    const editorRef = useRef<Quill | null>(null);

    const { mutate: createMessage } = useCreateMessage();
    const { mutate: generateUploadUrl } = useGenerateUploadUrl();

    const { data: currentMember } = useCurrentMember({ workspaceId });

    const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId });

    const handleSubmit = async ({
        body,
        image,
    }: {
        body: string;
        image: File | null;
    }) => {
        try {
            setIsPending(true);
            editorRef?.current?.enable(false);

            const values: CreateMessagesValues = {
                channelId,
                workspaceId,
                parentMessageId: messageId,
                body,
                image: undefined,
            };

            if (image) {
                const url = await generateUploadUrl({}, { throwError: true });

                if (!url) {
                    throw new Error("URL not found!")
                }

                const result = await fetch(url, {
                    method: "POST",
                    headers: { "Content-type": image.type },
                    body: image,
                });

                if (!result.ok) {
                    throw new Error("Failed to upload image");
                }

                const { storageId } = await result.json();

                values.image = storageId;
            };

            await createMessage({
                workspaceId,
                channelId,
                parentMessageId: messageId,
                body,
                image: values.image,

            }, { throwError: true });

            setEditorKey((prevKey) => prevKey + 1);
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setIsPending(false);
            editorRef?.current?.enable(false);
        };
    };

    if (loadingMessage) {
        return (
            <div className="h-full flex flex-col">
                <div className="h-[49px] flex justify-between items-center px-4 border-b">
                    <p className="text-lg font-bold"> Thread</p>
                    <Button onClick={onClose} size='iconSm' variant='ghost'>
                        <XIcon className="size-5 stroke-[1.5]" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                    <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Message not found</p>
                </div>
            </div>
        )
    }

    if (!message) {
        <div className="h-full flex flex-col">
            <div className="h-[49px] flex justify-between items-center px-4 border-b">
                <p className="text-lg font-bold"> Thread</p>
                <Button onClick={onClose} size='iconSm' variant='ghost'>
                    <XIcon className="size-5 stroke-[1.5]" />
                </Button>
            </div>
            <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                <AlertTriangle className="size-5  text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Message not found</p>
            </div>
        </div>
    }

    return (
        <div className="h-full flex flex-col">
            <div className="h-[49px] flex justify-between items-center px-4 border-b">
                <p className="text-lg font-bold"> Thread</p>
                <Button onClick={onClose} size='iconSm' variant='ghost'>
                    <XIcon className="size-5 stroke-[1.5]" />
                </Button>
            </div>
            <div>
                <Message
                    hideThreadButton
                    //@ts-ignore
                    memberId={message?.memberId}
                    authorImage={message?.user.image}
                    authorName={message?.user.name}
                    isAuthor={message?.memberId === currentMember?._id}
                    //@ts-ignore
                    body={message?.body}
                    //@ts-ignore
                    image={message.image}
                    //@ts-ignore
                    createdAt={message?._creationTime}
                    updatedAt={message?.updateAt}
                    //@ts-ignore
                    id={message?._id}
                    //@ts-ignore
                    reactions={message?.reactions}
                    isEditing={editingId === message?._id}
                    setEditingId={setEditingId}
                />
            </div>
            <div className="px-4">
                <Editor
                    key={editorKey}
                    onSubmit={handleSubmit}
                    innerRef={editorRef}
                    disabled={isPending}
                    placeholder="Reply"
                />
            </div>
        </div>
    )
}

export default Thread;