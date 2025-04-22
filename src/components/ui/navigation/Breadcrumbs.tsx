"use client"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type Breadcrumb = {
  label: string
  href: string
}

export function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  useEffect(() => {
    const path = window.location.pathname

    const generateBreadcrumbs = () => {
      const items: Breadcrumb[] = []

      // Handle root
      if (path === "/") {
        return items
      }

      // Split the path
      const pathParts = path.split("/").filter(Boolean)

      // Handle inbox paths
      if (pathParts[0] === "inbox") {
        items.push({ label: "Inbox", href: "/inbox" })

        if (pathParts.length > 1) {
          const subPage = pathParts[1]
          const capitalized = subPage.charAt(0).toUpperCase() + subPage.slice(1)
          items.push({ label: capitalized, href: path })
        }
      }

      // Handle quotes paths
      else if (pathParts[0] === "quotes") {
        items.push({ label: "Quotes", href: "/quotes" })

        if (pathParts.length > 1) {
          const subPage = pathParts[1]
          const capitalized = subPage.charAt(0).toUpperCase() + subPage.slice(1)
          items.push({ label: capitalized, href: path })
        }
      }

      return items
    }

    setBreadcrumbs(generateBreadcrumbs())
  }, [])

  if (breadcrumbs.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className="ml-2">
        <ol role="list" className="flex items-center space-x-3 text-sm">
          <li className="flex">
            <Link
              href="/"
              className="text-gray-900 dark:text-gray-50"
            >
              Home
            </Link>
          </li>
        </ol>
      </nav>
    )
  }

  return (
    <nav aria-label="Breadcrumb" className="ml-2">
      <ol role="list" className="flex items-center space-x-3 text-sm">
        <li className="flex">
          <Link
            href="/"
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
          >
            Home
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex">
            <ChevronRight
              className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
            />
            <div className="flex items-center">
              <Link
                href={item.href}
                className={index === breadcrumbs.length - 1
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
                }
                aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
