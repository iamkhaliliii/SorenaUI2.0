import { BasicAreaChart } from "@/components/BasicAreaChart"
import { CssTimeline } from "@/components/CssTimeline"
import { SimpleChart } from "@/components/SimpleChart"
import { SparkChartExample } from "@/components/SparkChartExample"

export default function TestChartPage() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Chart Test Page</h1>

            {/* CSS-only timeline */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">CSS-only Timeline (No Libraries)</h2>
                <div className="max-w-xl">
                    <CssTimeline />
                </div>
            </div>

            {/* New basic area chart implementation */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Basic Area Chart (Fully-featured)</h2>
                <BasicAreaChart />
            </div>

            {/* Simple chart implementation */}
            <SimpleChart />

            {/* Original SparkChartExample */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Original SparkChart Example</h2>
                <SparkChartExample />
            </div>
        </div>
    )
} 