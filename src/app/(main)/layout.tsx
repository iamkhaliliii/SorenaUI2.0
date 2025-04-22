import React from "react";

// import { SidebarProvider, SidebarTrigger } from "@/components/Sidebar"
// import { AppSidebar } from "@/components/ui/navigation/AppSidebar"
// import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs"
// import { ThemeProvider } from "next-themes"
// import localFont from "next/font/local"
// import { cookies } from "next/headers"
// import "../globals.css"

// const geistSans = localFont(...)
// const geistMono = localFont(...)

// Make sure this is NOT async
export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const cookieStore = await cookies()
    // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    // Remove all the wrapper elements (html, body, providers, header, etc.)
    return (
        <>
            {children}
        </>
    )
} 