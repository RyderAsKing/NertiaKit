import { AppSidebar } from "@/Components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Separator } from "@/Components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import React, { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { ThemeSwitcher } from "@/Components/theme-switcher";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface BreadcrumbItem {
    name: string;
    link?: string;
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: BreadcrumbItem[] }>) {
    const { auth, app, flash } = usePage<InertiaPageProps>().props;
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
    }, [flash]);

    useEffect(() => {
        const viewport = scrollViewportRef.current?.querySelector(
            "[data-radix-scroll-area-viewport]"
        );
        if (viewport) {
            viewport.scrollTop = 0;
        }
    }, [children]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex h-screen flex-col">
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background p-4">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={route("dashboard")}>
                                            {app.name}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {header &&
                                    header.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {item.link ? (
                                                    <BreadcrumbLink asChild>
                                                        <Link href={item.link}>
                                                            {item.name}
                                                        </Link>
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>
                                                        {item.name}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2 px-4">
                        <ThemeSwitcher />
                    </div>
                </header>
                <ScrollArea className="flex-1" ref={scrollViewportRef}>
                    <main className="p-4">{children}</main>
                </ScrollArea>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
}
