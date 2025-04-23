"use client"
import { Link2 } from "lucide-react";

export default function ConnectionsPage() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <Link2 className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Connections</h1>
            </div>

            <section className="mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Manage Integrations
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Connect your applications and services to enhance functionality and automate workflows.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Active Connections</h2>
                <div className="space-y-4">
                    <ConnectionCard
                        name="GitHub"
                        status="Connected"
                        lastSync="2 hours ago"
                    />
                    <ConnectionCard
                        name="Slack"
                        status="Connected"
                        lastSync="1 day ago"
                    />
                    <ConnectionCard
                        name="Google Drive"
                        status="Not connected"
                        lastSync="Never"
                    />
                </div>
            </section>
        </div>
    )
}

function ConnectionCard({
    name,
    status,
    lastSync
}: {
    name: string;
    status: "Connected" | "Not connected";
    lastSync: string;
}) {
    const isConnected = status === "Connected";

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last sync: {lastSync}</p>
                </div>
                <div className="flex items-center">
                    <span className={`mr-2 inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <span className={`text-sm ${isConnected ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
} 