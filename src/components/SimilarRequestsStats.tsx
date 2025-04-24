"use client"

import { BarChart2 } from "lucide-react"

const similarData = [
    { label: "Emoji Reactions", count: 24 },
    { label: "Media Sharing", count: 18 },
    { label: "Message Threading", count: 12 },
    { label: "Read Receipts", count: 7 },
]

export function SimilarRequestsStats() {
    const totalRequests = similarData.reduce((sum, item) => sum + item.count, 0)
    const maxCount = Math.max(...similarData.map(item => item.count))

    return (
        <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-4">
            <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Similar Feature Requests</h3>
                <span className="text-xs text-gray-500 ml-auto">{totalRequests} total</span>
            </div>

            <div className="space-y-3">
                {similarData.map((item, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                            <span className="text-gray-500">{item.count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                            />
                        </div>
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-800 mt-2 last:hidden"></div>
                    </div>
                ))}
            </div>
        </div>
    )
} 