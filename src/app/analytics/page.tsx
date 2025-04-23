"use client"
import { Binoculars } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <Binoculars className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
            </div>

            <section className="mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Data Insights
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Monitor performance and gain insights through comprehensive analytics dashboards.
                    </p>
                    <div className="mt-4">
                        <Link
                            href="/analytics/reports"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                        >
                            View Reports
                            <svg
                                className="ml-1 size-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">User Activity</h3>
                        <div className="mt-4 h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">Activity chart will appear here</span>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Metrics</h3>
                        <div className="mt-4 h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">Performance data will appear here</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
} 