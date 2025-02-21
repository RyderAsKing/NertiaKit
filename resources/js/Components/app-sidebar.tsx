import * as React from "react";
import {
    LayoutDashboard,
    Settings2,
    BookOpen,
    Users,
    FileText,
    BarChart3,
    Mail,
    Shield,
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
            roles: { name: string }[];
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
    },
    {
        title: "Settings",
        url: route("profile.edit"),
        icon: Settings2,
        isActive: route().current("profile.edit"),
    },
    {
        title: "Users",
        url: route("admin.users.index"),
        icon: Users,
        isActive: route().current("admin.users.*"),
        viewBy: "admin",
    },
    // {
    //     title: "Admin",
    //     url: "#",
    //     icon: Shield,
    //     isActive: route().current("admin.*"),
    //     viewBy: "admin",
    //     items: [
    //         {
    //             title: "Users",
    //             url: route("admin.users.index"),
    //             isActive: route().current("admin.users.*"),
    //         },
    //         // Can add more admin items here later
    //     ],
    // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, app } = usePage<PageProps>().props;
    const { isMobile } = useSidebar();

    const filteredNavigation = navigation.filter(
        (item) =>
            !item.viewBy ||
            auth.user.roles.some((role) => role.name === item.viewBy)
    );

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href="/">
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
                <NavMain items={filteredNavigation} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
