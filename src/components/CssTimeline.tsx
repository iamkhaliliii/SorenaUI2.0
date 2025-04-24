"use client"


const timelineData = [
    { day: "Mon", value: 20 },
    { day: "Tue", value: 40 },
    { day: "Wed", value: 30 },
    { day: "Thu", value: 50 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 80 },
]

export function CssTimeline() {
    const maxValue = Math.max(...timelineData.map(item => item.value))

    return (
        <div className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Simple CSS Timeline</h3>
            <div className="space-y-2">
                {timelineData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-8 text-xs text-gray-500">{item.day}</div>
                        <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${(item.value / maxValue) * 100}%` }}
                            />
                        </div>
                        <div className="w-8 text-xs text-gray-500 text-right">{item.value}%</div>
                    </div>
                ))}
            </div>
        </div>
    )
} 