import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


interface ThreadBarProps {
    count?: number;
    image?: string;
    timeStamp?: number;
    onClick?: () => void;
};

export const ThreadBar = ({
    count,
    image,
    timeStamp,
    onClick,
}: ThreadBarProps) => {



    if (!count || !timeStamp) return null;

    return (
        <button
            onClick={onClick}
            className="p-1 rounded-md hover:gb-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-[600px]"
        >
            <div className="flex items-center gap-2 overflow-hidden">
                <Avatar className="size-6 shrink-0">
                    <AvatarImage src={image} />
                    <AvatarFallback>
                        M
                    </AvatarFallback>
                </Avatar>
                <span className="text-xs text-sky-700 hover:underline font-bold truncate">
                    {count} {count > 1 ? "replies" : "reply"}
                </span>
                <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
                    Lets reply {formatDistanceToNow(timeStamp, { addSuffix: true })}
                </span>
                <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">

                </span>
            </div>
        </button>
    )
};
