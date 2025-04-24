"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import { cx } from "@/lib/utils"
import { ChevronDown, Download } from "lucide-react"
import { useState } from "react"

const inboxMessages = [
    {
        id: "1",
        title: "How do I turn off notifications?",
        sender: "Marc Hoppermann",
        time: "3h",
        status: "New",
        sentiment: "Neutral",
        content: "User is reporting an issue with product search functionality. The search results are not displaying all available products, particularly when using specific filters.",
        tags: ["search", "filtering", "product-catalog", "bug"],
        priority: "Medium",
        type: "Question"
    },
    {
        id: "2",
        title: "I'm wondering about the new feature",
        sender: "Eli L",
        time: "11h",
        status: "Open",
        sentiment: "Positive",
        content: "Customer is inquiring about the recently announced feature and when it will be available to them.",
        tags: ["feature-request", "inquiry"],
        priority: "Low",
        type: "Feedback"
    },
    {
        id: "3",
        title: "I think that requiring a title for...",
        sender: "Brittany Wardell",
        time: "12h",
        status: "Open",
        sentiment: "Negative",
        content: "Customer is complaining about the requirement to enter a title for all submissions, suggesting it should be optional.",
        tags: ["ux", "form-input", "suggestion"],
        priority: "Low",
        type: "Feedback"
    },
    {
        id: "4",
        title: "I have been going around in circles...",
        sender: "Ryan",
        time: "12h",
        status: "Open",
        sentiment: "Negative",
        content: "User is frustrated with the navigation flow and cannot find what they're looking for after multiple attempts.",
        tags: ["navigation", "ux", "frustration"],
        priority: "High",
        type: "Complaint"
    },
    {
        id: "5",
        title: "I want to filter the visible items...",
        sender: "Adrian Rall",
        time: "13h",
        status: "Open",
        sentiment: "Neutral",
        content: "User wants more advanced filtering options for their dashboard display.",
        tags: ["filtering", "dashboard", "feature-request"],
        priority: "Medium",
        type: "Feedback"
    },
    {
        id: "6",
        title: "Hello everyone 👋 I have 2...",
        sender: "Ioan Stoica",
        time: "13h",
        status: "Open",
        sentiment: "Positive",
        content: "New user has a couple of questions about getting started with the platform.",
        tags: ["onboarding", "new-user"],
        priority: "Medium",
        type: "Question"
    },
    {
        id: "7",
        title: "Is there a way I can default to...",
        sender: "Joe Daly",
        time: "13h",
        status: "Open",
        sentiment: "Neutral",
        content: "User is asking about customizing default settings for their account.",
        tags: ["settings", "customization"],
        priority: "Low",
        type: "Question"
    },
    {
        id: "8",
        title: "Are there any detailed guides...",
        sender: "Nico",
        time: "14h",
        status: "Open",
        sentiment: "Neutral",
        content: "User is looking for in-depth documentation on using advanced features.",
        tags: ["documentation", "advanced-features"],
        priority: "Medium",
        type: "Question"
    },
    {
        id: "9",
        title: "For me, I have reactions that...",
        sender: "Mzjtdjckuxdjv",
        time: "14h",
        status: "Open",
        sentiment: "Neutral",
        content: "User is reporting inconsistent behavior with the reaction feature.",
        tags: ["bug", "reactions", "inconsistency"],
        priority: "Medium",
        type: "Bug"
    },
    {
        id: "10",
        title: "We have a community on a...",
        sender: "Dimitris Prevezanos",
        time: "20h",
        status: "Open",
        sentiment: "Positive",
        content: "Organization admin wants to know how to migrate their community from another platform.",
        tags: ["migration", "community", "admin"],
        priority: "High",
        type: "Inquiry"
    },
]

export default function InboxOverview() {
    const [selectedMessage, setSelectedMessage] = useState(inboxMessages[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <section aria-label="Inbox Messages">
                    <div className="flex flex-col justify-between gap-2 mb-4 sm:flex-row sm:items-center">
                        <Input
                            type="search"
                            placeholder="Search messages..."
                            className="sm:w-64 [&>input]:py-1.5"
                        />
                        <div className="flex flex-col items-center gap-2 sm:flex-row">
                            <Select>
                                <SelectTrigger className="w-full py-1.5 sm:w-44">
                                    <SelectValue placeholder="Filter by..." />
                                </SelectTrigger>
                                <SelectContent align="end">
                                    <SelectItem value="unread">Unread</SelectItem>
                                    <SelectItem value="high">High Priority</SelectItem>
                                    <SelectItem value="all">All Messages</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="secondary"
                                className="w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm"
                            >
                                <Download
                                    className="-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600"
                                    aria-hidden="true"
                                />
                                Export
                            </Button>
                        </div>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {inboxMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cx(
                                        "flex items-start p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900",
                                        selectedMessage.id === message.id && "bg-gray-50 dark:bg-gray-900"
                                    )}
                                    onClick={() => setSelectedMessage(message)}
                                >
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                            {message.sender.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-start justify-between">
                                            <p className="font-medium text-gray-900 dark:text-gray-50 truncate">{message.sender}</p>
                                            <p className="text-sm text-gray-500 flex-shrink-0">{message.time}</p>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{message.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>

            <div className="lg:col-span-1">
                <Card className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{selectedMessage.sender}</h2>
                        <div className="flex items-center">
                            <div className="flex items-center gap-1">
                                <span className="inline-block size-3 rounded-full bg-orange-500"></span>
                                <span className="text-sm text-gray-500">50%</span>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">Sentiment</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Summary</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedMessage.content}</p>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="neutral">Feedback</Badge>
                        <Badge variant="default">Question</Badge>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
                            <span>Tags</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedMessage.tags.map((tag) => (
                                <Badge key={tag} variant="neutral">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
                            <span>Details</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Posted in</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">Product Feedback</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Time</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">5 days ago</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Time To Response</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">1 day, 4 hours</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Priority</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{selectedMessage.priority}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
                            <span>User data</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Name</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{selectedMessage.sender}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Website</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">Better Ask Ryan</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 text-sm text-gray-500">Email</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">mh@bldg.systems</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
                            <span>Contributors</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-xs">
                                        DP
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Dan Aaron Pena</span>
                                </div>
                                <span className="text-sm text-gray-500">contributor</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-xs">
                                        MH
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedMessage.sender}</span>
                                </div>
                                <span className="text-sm text-gray-500">author</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
} 