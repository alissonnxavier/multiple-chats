import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";


interface SidebarItemProps {
    label: string;
    id: string;
    icon: LucideIcon | IconType;
}

const SidebarItem = ({
    label,
    id,
    icon,
}: SidebarItemProps) => {
    return (
        <Button>
            
        </Button>
    )
}

export default SidebarItem