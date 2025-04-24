"use client"


import { Card } from "./Card"
import { SparkAreaChart } from "./SparkChart"

const chartdata = [
    {
        month: "Jan",
        Performance: 4000,
    },
    {
        month: "Feb",
        Performance: 3000,
    },
    {
        month: "Mar",
        Performance: 2000,
    },
    {
        month: "Apr",
        Performance: 2780,
    },
    {
        month: "May",
        Performance: 1890,
    },
    {
        month: "Jun",
        Performance: 2390,
    },
    {
        month: "Jul",
        Performance: 3490,
    },
]

export function SparkChartExample() {
    return (
        <Card className="p-4 max-w-xl mx-auto">
            <h3 className="text-lg font-medium mb-4">SparkChart Test</h3>
            <div className="h-16 w-full border border-gray-200 dark:border-gray-800 rounded p-2">
                <SparkAreaChart
                    data={chartdata}
                    categories={["Performance"]}
                    index="month"
                    colors={["emerald"]}
                    fill="gradient"
                    className="h-full w-full"
                />
            </div>
        </Card>
    )
} 