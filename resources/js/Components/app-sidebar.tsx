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
import { PageProps as InertiaPageProps } from "@inertiajs/core";

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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, app } = usePage<InertiaPageProps>().props;
    const { isMobile } = useSidebar();

    const filteredNavigation = navigation.filter(
        (item) =>
            !item.viewBy ||
            auth.user.roles.some((role) => role.name === item.viewBy)
    );

    return (
        <Sidebar collapsible="icon" {...props} variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground bg-black p-1.5">
                                    <img
                                        src={`/assets/${app.logo}`}
                                        alt={app.name}
                                        className="size-8 rounded-md "
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
                <NavMain items={filteredNavigation} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
