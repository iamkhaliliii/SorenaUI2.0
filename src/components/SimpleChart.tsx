"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 40 },
    { name: "Wed", value: 30 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 70 },
    { name: "Sat", value: 90 },
    { name: "Sun", value: 80 },
]

export function SimpleChart() {
    return (
        <div className="w-full h-48 bg-white dark:bg-gray-900 border-2 border-emerald-300 rounded-md p-4 my-4">
            <h3 className="text-lg font-medium mb-2">Direct Recharts Implementation</h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
} 