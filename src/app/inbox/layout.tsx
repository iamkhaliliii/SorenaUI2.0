"use client"
import { Badge } from "@/components/Badge"
import { AlertCircle, Archive, Bell, CornerDownRight, Filter, Inbox, MessageSquare, Search, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

interface Post {
    id: string;
    sender: string;
    time: string;
    message: string;
    isUnread?: boolean;
    isStarred?: boolean;
    category?: string;
    priority?: 'low' | 'medium' | 'high';
    avatarColor?: string;
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [filterOpen, setFilterOpen] = useState(false)

    // Simulated post data with enhanced properties
    const posts: Post[] = [
        {
            id: "1",
            sender: "Vantagepoint Collaboration",
            time: "6m",
            message: "Trying to upgrade to paid plan...",
            isUnread: true,
            category: "Support",
            priority: "high",
            avatarColor: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
        },
        {
            id: "2",
            sender: "Jonathon Grimmer",
            time: "42m",
            message: "I would like the ability to \"react\"...",
            isUnread: true,
            isStarred: true,
            category: "Feature",
            priority: "medium",
            avatarColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
        },
        {
            id: "3",
            sender: "Kimberly Weidner-Feigh",
            time: "2h",
            message: "Reposting this to the wish list to...",
            category: "Wishlist",
            avatarColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
        },
        {
            id: "4",
            sender: "Kimberly Weidner-Feigh",
            time: "4h",
            message: "I am going to try to duplicate...",
            isUnread: true,
            category: "Bug",
            priority: "high",
            avatarColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
        },
        {
            id: "5",
            sender: "Han Zuyderwijk",
            time: "7h",
            message: "Is there a way to turn-off clickin...",
            category: "Question",
            avatarColor: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
        },
        {
            id: "6",
            sender: "Eli L",
            time: "14h",
            message: "Hello! I'm currently setting up th...",
            category: "Onboarding",
            avatarColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
        },
        {
            id: "7",
            sender: "Ben Gray",
            time: "22h",
            message: "I would like community sign-up...",
            isStarred: true,
            category: "Feature",
            avatarColor: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400"
        },
        {
            id: "8",
            sender: "Kimberly Weidner-Feigh",
            time: "1d",
            message: "The post time stamp on what a...",
            category: "Bug",
            avatarColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
        },
        {
            id: "9",
            sender: "Brittany Wardell",
            time: "1d",
            message: "I think that requiring a title for...",
            category: "Feedback",
            avatarColor: "bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400"
        },
        {
            id: "10",
            sender: "Julianadigitals",
            time: "1d",
            message: "null",
            priority: "low",
            avatarColor: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400"
        }
    ]

    // Stats for the inbox
    const inboxStats = {
        unread: 4,
        total: posts.length,
        urgent: posts.filter(p => p.priority === 'high').length,
        starred: posts.filter(p => p.isStarred).length
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
            {/* Inbox Sidebar */}
            <div className="w-[20%] min-w-[200px] shrink-0 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden">
                <div className="p-4 h-14 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50 tracking-tight">Inbox</h1>

                </div>

                <div className="flex-1 overflow-y-auto py-2 px-2 overscroll-contain">
                    <div className="mt-2 space-y-1 px-2">
                        <Link
                            href="/inbox"
                            className={`flex items-center justify-between rounded-md p-2 text-sm ${pathname === "/inbox"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <Inbox className="h-4 w-4" />
                                <span>Inbox</span>
                            </span>
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                {inboxStats.unread}
                            </span>
                        </Link>
                        <Link
                            href="/inbox/mentions"
                            className={`flex items-center justify-between rounded-md p-2 text-sm ${pathname === "/inbox/mentions"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <MessageSquare className="h-4 w-4" />
                                <span>Mentions</span>
                            </span>
                        </Link>
                        <Link
                            href="/inbox/unassigned"
                            className={`flex items-center justify-between rounded-md p-2 text-sm ${pathname === "/inbox/unassigned"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <AlertCircle className="h-4 w-4" />
                                <span>Unassigned</span>
                            </span>
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                5
                            </span>
                        </Link>
                    </div>

                    <div className="mt-6 space-y-1 px-2">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-2 mb-1">Status</h3>
                        <Link
                            href="/inbox/replied"
                            className={`flex items-center rounded-md p-2 text-sm ${pathname === "/inbox/replied"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <CornerDownRight className="h-4 w-4" />
                                <span>Replied</span>
                            </span>
                        </Link>
                        <Link
                            href="/inbox/starred"
                            className={`flex items-center justify-between rounded-md p-2 text-sm ${pathname === "/inbox/starred"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <Star className="h-4 w-4" />
                                <span>Starred</span>
                            </span>
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400">
                                {inboxStats.starred}
                            </span>
                        </Link>
                        <Link
                            href="/inbox/urgent"
                            className={`flex items-center justify-between rounded-md p-2 text-sm ${pathname === "/inbox/urgent"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <Bell className="h-4 w-4" />
                                <span>Urgent</span>
                            </span>
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600 dark:bg-red-500/20 dark:text-red-400">
                                {inboxStats.urgent}
                            </span>
                        </Link>
                        <Link
                            href="/inbox/archive"
                            className={`flex items-center rounded-md p-2 text-sm ${pathname === "/inbox/archive"
                                ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                        >
                            <span className="flex items-center gap-3">
                                <Archive className="h-4 w-4" />
                                <span>Archive</span>
                            </span>
                        </Link>
                    </div>
                </div>

            </div>

            {/* Posts Column */}
            <div className="w-[20%] min-w-[200px] border-r border-gray-200 dark:border-gray-800 h-full bg-white dark:bg-gray-950 flex flex-col overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 h-14 flex items-center justify-between px-4 flex-shrink-0">
                    <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Posts</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className={`p-1.5 rounded-md ${filterOpen
                                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        >
                            <Filter className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                            <Search className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {filterOpen && (
                    <div className="border-b border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-900 flex flex-wrap gap-2 text-xs flex-shrink-0">
                        <Badge variant="default" className="rounded-full cursor-pointer flex items-center gap-1 bg-white dark:bg-gray-800">
                            <span>Unread</span>
                            <span className="text-[10px] font-normal opacity-70">({inboxStats.unread})</span>
                        </Badge>
                        <Badge variant="neutral" className="rounded-full cursor-pointer flex items-center gap-1 bg-white dark:bg-gray-800">
                            <span>Urgent</span>
                            <span className="text-[10px] font-normal opacity-70">({inboxStats.urgent})</span>
                        </Badge>
                        <Badge variant="neutral" className="rounded-full cursor-pointer flex items-center gap-1 bg-white dark:bg-gray-800">
                            <span>Starred</span>
                            <span className="text-[10px] font-normal opacity-70">({inboxStats.starred})</span>
                        </Badge>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto overscroll-contain">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className={`border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 px-4 py-3 cursor-pointer transition-colors ${selectedPost?.id === post.id ? 'bg-gray-50 dark:bg-gray-900' : ''
                                } ${post.isUnread ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                                }`}
                            onClick={() => setSelectedPost(post)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`h-9 w-9 rounded-full ${post.avatarColor || 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'} flex items-center justify-center relative`}>
                                    {post.sender.charAt(0)}
                                    {post.isUnread && (
                                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-950"></span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className={`text-sm ${post.isUnread ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-gray-100 truncate`}>{post.sender}</p>
                                        <div className="flex items-center gap-1">
                                            {post.priority === 'high' && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
                                            )}
                                            {post.isStarred && (
                                                <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                                            )}
                                            <span className="text-xs text-gray-500">{post.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {post.category && (
                                            <span className="inline-block px-1.5 text-[10px] rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                {post.category}
                                            </span>
                                        )}
                                        <p className={`text-xs ${post.isUnread ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'} truncate`}>{post.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-[400px] bg-white dark:bg-gray-950 overflow-hidden flex flex-col">
                {children}
            </div>
        </div>
    )
} 