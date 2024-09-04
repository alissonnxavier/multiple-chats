'use client';


import Toolbar from "./toobar";

interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
};

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar/>
            {children}
        </div>
    );
};

export default WorkspaceIdLayout;

