"use client"
import { siteConfig } from "@/app/siteConfig"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/components/Sidebar"
import { Logo } from "@/components/ui/Logo"
import { cx, focusRing } from "@/lib/utils"
import { RiArrowDownSFill } from "@remixicon/react"
import { BookText, House, PackageSearch } from "lucide-react"
import * as React from "react"
import { UserProfile } from "./UserProfile"

const navigation = [
  {
    name: "Home",
    href: siteConfig.baseLinks.home,
    icon: House,
    notifications: false,
    active: false,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: PackageSearch,
    notifications: 2,
    active: false,
  },
] as const

const navigation2 = [
  {
    name: "Sales",
    href: "#",
    icon: BookText,
    children: [
      {
        name: "Quotes",
        href: siteConfig.baseLinks.quotes.overview,
        active: true,
      },
      {
        name: "Orders",
        href: siteConfig.baseLinks.sales.orders,
        active: false,
      },
      {
        name: "Insights & Reports",
        href: siteConfig.baseLinks.sales.insights,
        active: false,
      },
    ],
  },
  {
    name: "Products",
    href: "#",
    icon: PackageSearch,
    children: [
      {
        name: "Items",
        href: siteConfig.baseLinks.products.items,
        active: false,
      },
      {
        name: "Variants",
        href: siteConfig.baseLinks.products.variants,
        active: false,
      },
      {
        name: "Suppliers",
        href: siteConfig.baseLinks.products.suppliers,
        active: false,
      },
    ],
  },
] as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeRoute, setActiveRoute] = React.useState<string>("")

  // Check URL on client side to determine active route
  React.useEffect(() => {
    const path = window.location.pathname
    setActiveRoute(path)
  }, [])

  // Determine which section is active
  const isHomeActive = activeRoute === siteConfig.baseLinks.home
  const isInboxActive = activeRoute.startsWith("/inbox")
  const isQuotesActive = activeRoute.startsWith("/quotes")
  const isSalesActive = activeRoute.startsWith("/sales")
  const isProductsActive = activeRoute.startsWith("/products")

  // Control which submenus are open
  const [openMenus, setOpenMenus] = React.useState<string[]>([
    navigation2[0].name,
    navigation2[1].name,
  ])

  const toggleMenu = (name: string) => {
    setOpenMenus((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((item: string) => item !== name)
        : [...prev, name],
    )
  }
  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-925">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <Logo className="size-6 text-blue-500 dark:text-blue-500" />
          </span>
          <div>
            <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50">
              Innovex Systems
            </span>
            <span className="block text-xs text-gray-900 dark:text-gray-50">
              Premium Starter Plan
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input
              type="search"
              placeholder="Search items..."
              className="[&>input]:sm:py-1.5"
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarLink
                    href={item.href}
                    isActive={
                      item.name === "Home"
                        ? isHomeActive
                        : item.name === "Inbox"
                          ? isInboxActive
                          : false
                    }
                    icon={item.icon}
                    notifications={item.notifications}
                  >
                    {item.name}
                  </SidebarLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-3">
          <Divider className="my-0 py-0" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {navigation2.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                      focusRing,
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className="size-[18px] shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                    <RiArrowDownSFill
                      className={cx(
                        openMenus.includes(item.name)
                          ? "rotate-0"
                          : "-rotate-90",
                        "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {item.children && openMenus.includes(item.name) && (
                    <SidebarMenuSub>
                      <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.name}>
                          <SidebarSubLink
                            href={child.href}
                            isActive={
                              child.name === "Quotes"
                                ? isQuotesActive && !isInboxActive
                                : child.name === "Orders"
                                  ? isSalesActive && activeRoute.includes("/orders")
                                  : child.name === "Insights & Reports"
                                    ? isSalesActive && activeRoute.includes("/insights")
                                    : child.name === "Items"
                                      ? isProductsActive && activeRoute.includes("/items")
                                      : child.name === "Variants"
                                        ? isProductsActive && activeRoute.includes("/variants")
                                        : child.name === "Suppliers"
                                          ? isProductsActive && activeRoute.includes("/suppliers")
                                          : false
                            }
                          >
                            {child.name}
                          </SidebarSubLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
