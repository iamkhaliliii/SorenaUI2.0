"use client"
import { BarChart3 } from "lucide-react"

export default function AnalyticsReportsPage() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <BarChart3 className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics Reports</h1>
            </div>

            <section className="mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Performance Reports
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        View and download detailed analytics reports for your data.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daily Report</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: Today</p>
                        <button className="mt-4 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                            Download
                        </button>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Weekly Report</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: 2 days ago</p>
                        <button className="mt-4 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                            Download
                        </button>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Monthly Report</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: 5 days ago</p>
                        <button className="mt-4 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                            Download
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
} 