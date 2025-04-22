"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import { AppSidebar } from "@/components/ui/navigation/AppSidebar";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { usePathname } from "next/navigation";
import React from "react";

interface LayoutClientWrapperProps {
    children: React.ReactNode;
}

export default function LayoutClientWrapper({
    children,
}: LayoutClientWrapperProps) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    if (isLoginPage) {
        // For login page, just render children centered (or however you want login styled)
        // No SidebarProvider, AppSidebar, or Header needed
        return (
            <div className="w-full h-full flex items-center justify-center">
                <main>{children}</main>
            </div>
        );
    }

    // For other pages, render the full layout with sidebar and header
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full peer-[[data-state=collapsed]]:md:ml-0 transition-[margin-left] duration-150 ease-in-out">
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
                    <SidebarTrigger className="-ml-1" />
                    <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
                    <Breadcrumbs />
                </header>
                <main>{children}</main>
            </div>
        </SidebarProvider>
    );
} 