"use client"
import { Button } from "@/components/Button"
import { MetricsCards } from "@/components/ui/homepage/MetricsCards"
import { House } from "lucide-react"

export default function Home() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <House className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>

            <section className="mb-8">
                <MetricsCards />
            </section>

            <section className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
                    <Button variant="secondary" className="text-sm py-1.5">View All</Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <ActionCard
                        title="Create New Quote"
                        description="Generate a new quote for a client"
                        href="/quotes/overview"
                    />
                    <ActionCard
                        title="Check Messages"
                        description="View your unread messages"
                        href="/inbox/messages"
                    />
                    <ActionCard
                        title="Manage Products"
                        description="Add or edit product inventory"
                        href="/products/items"
                    />
                    <ActionCard
                        title="View Reports"
                        description="Access sales insights and reports"
                        href="/sales/insights"
                    />
                </div>
            </section>
        </div>
    )
}

function ActionCard({ title, description, href }: { title: string, description: string, href: string }) {
    return (
        <a
            href={href}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
            <h3 className="mb-1 text-base font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </a>
    )
}
