"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/Sidebar"
import { Logo } from "@/components/ui/Logo"
import { RiArrowDownSFill } from "@remixicon/react"
import { Binoculars, Inbox, LibraryBig, Link2, Settings, Sparkles } from "lucide-react"
import * as React from "react"
import { UserProfile } from "./UserProfile"

const navigation = [
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
    notifications: 2,
    active: false,
  },
  {
    name: "Copilot",
    href: "/copilot",
    icon: Sparkles,
    notifications: false,
    active: false,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: Binoculars,
    notifications: false,
    active: false,
  },
  {
    name: "Connections",
    href: "/connections",
    icon: Link2,
    notifications: false,
    active: false,
  },
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: LibraryBig,
    notifications: false,
    active: false,
  },
] as const

const navigation3 = [
  {
    name: "Settings",
    href: "#",
    icon: Settings,
  },
] as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeRoute, setActiveRoute] = React.useState<string>("")

  // Check URL on client side to determine active route
  React.useEffect(() => {
    const path = window.location.pathname
    setActiveRoute(path)

    // Listen for route changes to update sidebar active state
    const handleRouteChange = () => {
      setActiveRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [])

  // Determine which section is active
  const isInboxActive = activeRoute.startsWith("/inbox")
  const isAnalyticsActive = activeRoute.startsWith("/analytics")
  const isCopilotActive = activeRoute.startsWith("/copilot")
  const isKnowledgeBaseActive = activeRoute.startsWith("/knowledge-base")
  const isConnectionsActive = activeRoute.startsWith("/connections")

  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-950" suppressHydrationWarning tremor-id="tremor-raw">
      <SidebarHeader className="py-4 px-8" suppressHydrationWarning>
        <div className="flex items-center gap-2" suppressHydrationWarning>
          <span className="flex size-8 items-center justify-center rounded-md bg-black p-1.5">
            <Logo className="size-5 text-white" />
          </span>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-base font-medium text-gray-900 dark:text-gray-50">
                SorenaUI2.0
              </span>
              <RiArrowDownSFill className="ml-1 size-5 text-gray-500" />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2" suppressHydrationWarning>
        <SidebarGroup className="pt-0" suppressHydrationWarning>
          <SidebarGroupContent suppressHydrationWarning>
            <SidebarMenu className="space-y-1 px-4" suppressHydrationWarning>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarLink
                    href={item.href}
                    isActive={
                      item.name === "Inbox"
                        ? isInboxActive
                        : item.name === "Analytics"
                          ? isAnalyticsActive
                          : item.name === "Copilot"
                            ? isCopilotActive
                            : item.name === "Connections"
                              ? isConnectionsActive
                              : item.name === "Knowledge Base"
                                ? isKnowledgeBaseActive
                                : false
                    }
                    icon={item.icon}
                    notifications={item.notifications}
                    className="py-2 px-4 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </SidebarLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter suppressHydrationWarning>
        <SidebarGroup suppressHydrationWarning>
          <SidebarGroupContent suppressHydrationWarning>
            <SidebarMenu className="px-2" suppressHydrationWarning>
              {navigation3.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarLink
                    href={item.href}
                    icon={item.icon}
                    className="py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </SidebarLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="border-t border-gray-200 dark:border-gray-800" suppressHydrationWarning />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
