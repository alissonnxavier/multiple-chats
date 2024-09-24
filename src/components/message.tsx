import { format, isToday, isYesterday } from "date-fns";
import { Doc, Id } from "../../convex/_generated/dataModel";
import dynamic from "next/dynamic";
import { Hint } from "./hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Thumbnail from "./thumbnail";
import Toolbar from "./toolbar";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false })

interface MessageProps {
    id: Id<"messages">;
    memberId: Id<"members">;
    authorImage?: string;
    authorName?: string;
    isAuthor: boolean;
    reactions: Array<
        Omit<Doc<"reactions">, "memberId"> & {
            count: number;
            memberIds: Id<"members">[]
        }
    >;
    body: Doc<"messages">["body"];
    image: string | null | undefined;
    createdAt: Doc<"messages">["_creationTime"];
    updatedAt: Doc<"messages">["updateAt"];
    isEditing: boolean;
    isCompact?: boolean;
    setEditingId: (id: Id<"messages"> | null) => void;
    hideThreadButton?: boolean;
    threadCount?: number;
    threadImage?: string;
    threadTimestamp?: number;
};

const formatFullTime = (date: Date) => {
    return `${isToday(date) ? "Today" : isYesterday(date) ? "yestarday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`
};

export const Message = ({
    id,
    isAuthor,
    memberId,
    authorImage,
    authorName = "Member",
    reactions,
    body,
    image,
    createdAt,
    updatedAt,
    isEditing,
    isCompact,
    setEditingId,
    hideThreadButton,
    threadCount,
    threadImage,
    threadTimestamp,
}: MessageProps) => {
    if (isCompact) {
        return (
            <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
                <div className="flex items-center gap-2">
                    <Hint label={formatFullTime(new Date(createdAt))}>
                        <button className=" text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
                            {format(new Date(createdAt), "hh:mm")}
                        </button>
                    </Hint>
                    <div className="flex flex-col w-full">
                        <Renderer value={body} />
                        <Thumbnail url={image} />
                        {updatedAt ? (
                            <span className="text-xs text-muted-foreground">
                                (edited)
                            </span>
                        ) : null
                        }
                    </div>
                </div>
            </div>

        )
    };

    const avatarFallback = authorName.charAt(0).toUpperCase();

    return (
        <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
            <div className="flex items-start gap-2">
                <button>
                    <Avatar className="rounded-md" >
                        <Image
                            className=""

                            src={authorImage ? authorImage : "/penguin.svg"}
                            width={50}
                            height={50}
                            alt="profile image"
                        />
                        <AvatarImage src={authorImage} alt='profile' asChild >
                            <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
                                {avatarFallback}
                            </AvatarFallback>
                        </AvatarImage>
                    </Avatar>
                </button>
                <div className="flex flex-col w-full overflow-hidden">
                    <div className="text-sm">
                        <button onClick={() => { }} className="font-bold text-primary hover:underline">
                            {authorName}
                        </button>
                        <span>&nbsp;&nbsp;</span>
                        <Hint label={formatFullTime(new Date(createdAt))}>
                            <button className="text-xs text-muted-foreground hover:underline">
                                {format(new Date(createdAt), "h:mm a")}
                            </button>
                        </Hint>
                    </div>
                    <div className="ml-12">
                        <Renderer value={body} />
                        <Thumbnail url={image} />
                    </div>
                    {updatedAt ? (
                        <span className="text-xs text-muted-foreground">(edited)</span>
                    ) : null}
                </div>
            </div>
            {!isEditing &&(
                <Toolbar
                    isAuthor={isAuthor}
                    isPending={false}
                    handleEdit={()=>setEditingId(id)}
                    handleThread={()=>{}}
                    handleDelete={()=>{}}
                    handleReaction={()=>{}}
                    hideTheadButton={hideThreadButton}
                />
            )}
        </div>
    )

}
