import * as React from "react";
import {
    LayoutDashboard,
    Settings2,
    BookOpen,
    Users,
    FileText,
    BarChart3,
    Mail,
} from "lucide-react";
import { Link } from "@inertiajs/react";

import { NavMain } from "@/Components/nav-main";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            avatar?: string;
        };
    };
    app: {
        name: string;
        tagline: string;
        logo: string;
    };
    [key: string]: any;
}

const navigation = [
    {
        title: "Dashboard",
        url: route("dashboard"),
        icon: LayoutDashboard,
        isActive: route().current("dashboard"),
        items: undefined,
    },
    {
        title: "Documents",
        url: "#",
        icon: FileText,
        isActive: false,
        items: undefined,
    },
    {
        title: "Messages",
        url: "#",
        icon: Mail,
        isActive: false,
        items: undefined,
    },
    {
        title: "Analytics",
        url: "#",
        icon: BarChart3,
        isActive: false,
        items: [
            {
                title: "Overview",
                url: "#",
            },
            {
                title: "Reports",
                url: "#",
            },
            {
                title: "Statistics",
                url: "#",
            },
        ],
    },
    {
        title: "Team",
        url: "#",
        icon: Users,
        isActive: false,
        items: [
            {
                title: "Members",
                url: "#",
            },
            {
                title: "Permissions",
                url: "#",
            },
        ],
    },
    {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        isActive: false,
    },
    {
        title: "Settings",
        url: route("profile.edit"),
        icon: Settings2,
        isActive: route().current("profile.edit"),
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, app } = usePage<PageProps>().props;
    const { isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                    <img
                                        src={`/assets/${app.logo}`}
                                        alt={app.name}
                                        className="size-8 rounded-md"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {app.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {app.tagline}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navigation} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
