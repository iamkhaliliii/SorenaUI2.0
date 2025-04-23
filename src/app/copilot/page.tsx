"use client"
import { Sparkles } from "lucide-react"

export default function CopilotPage() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <Sparkles className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Copilot</h1>
            </div>

            <section className="mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Intelligent AI Assistant
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Use our AI-powered copilot to help with content creation, data analysis, and task automation.
                    </p>
                </div>
            </section>
        </div>
    )
} 