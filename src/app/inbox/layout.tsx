"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { AlertCircle, Archive, Bell, ChevronLeft, CornerDownRight, Filter, Inbox, Mail, Menu, MessageSquare, MessageSquare as MessageSquareIcon, Monitor, Search, Star, Twitter, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

// Add CSS animation styles
const drawerStyles = `
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-out forwards;
}
`;

// Define the inbox layout context interface for TypeScript
declare global {
    interface Window {
        inboxLayoutContext?: {
            setShowDrawer: (show: boolean) => void;
            closeDrawer: () => void;
            setActiveTab?: (tab: string) => void;
        };
    }
}

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
    source?: 'email' | 'slack' | 'twitter' | 'bettermode' | 'discord';
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [filterOpen, setFilterOpen] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [activeTab, setActiveTab] = useState("messages")

    useEffect(() => {
        // Check if we're on mobile on initial load
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Set initial state
        checkIsMobile()

        // Add event listener for window resize
        window.addEventListener('resize', checkIsMobile)

        // Clean up event listener
        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    // When a post is selected on mobile, show the drawer
    useEffect(() => {
        if (selectedPost && isMobile) {
            setShowDrawer(true)
        }
    }, [selectedPost, isMobile])

    // Make setShowDrawer available to child components right after component mounts
    useEffect(() => {
        // Add context to window object for child components to access
        window.inboxLayoutContext = {
            setShowDrawer,
            closeDrawer: () => setShowDrawer(false),
            setActiveTab: (tab: string) => setActiveTab(tab)
        };

        // Clean up
        return () => {
            if (window.inboxLayoutContext) {
                delete window.inboxLayoutContext;
            }
        };
    }, []);  // Empty dependency array means this runs once on mount

    // Close drawer when navigating
    useEffect(() => {
        setShowDrawer(false)
    }, [pathname])

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
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "email"
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
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "bettermode"
        },
        {
            id: "3",
            sender: "Kimberly Weidner-Feigh",
            time: "2h",
            message: "Reposting this to the wish list to...",
            category: "Wishlist",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "slack"
        },
        {
            id: "4",
            sender: "Kimberly Weidner-Feigh",
            time: "4h",
            message: "I am going to try to duplicate...",
            isUnread: true,
            category: "Bug",
            priority: "high",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "bettermode"
        },
        {
            id: "5",
            sender: "Han Zuyderwijk",
            time: "7h",
            message: "Is there a way to turn-off clickin...",
            category: "Question",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "bettermode"
        },
        {
            id: "6",
            sender: "Eli L",
            time: "14h",
            message: "Hello! I'm currently setting up th...",
            category: "Onboarding",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "email"
        },
        {
            id: "7",
            sender: "Ben Gray",
            time: "22h",
            message: "I would like community sign-up...",
            isStarred: true,
            category: "Feature",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "twitter"
        },
        {
            id: "8",
            sender: "Kimberly Weidner-Feigh",
            time: "1d",
            message: "The post time stamp on what a...",
            category: "Bug",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "discord"
        },
        {
            id: "9",
            sender: "Brittany Wardell",
            time: "1d",
            message: "I think that requiring a title for...",
            category: "Feedback",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "bettermode"
        },
        {
            id: "10",
            sender: "Julianadigitals",
            time: "1d",
            message: "null",
            priority: "low",
            avatarColor: "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
            source: "email"
        }
    ]

    // Stats for the inbox
    const inboxStats = {
        unread: 4,
        total: posts.length,
        urgent: posts.filter(p => p.priority === 'high').length,
        starred: posts.filter(p => p.isStarred).length
    }

    // Toggle between message and insight tabs
    const handlePostClick = (post: Post) => {
        setSelectedPost(post);

        // Toggle between messages and insights tab when clicking on a different post
        if (window.inboxLayoutContext?.setActiveTab && post.id !== selectedPost?.id) {
            window.inboxLayoutContext.setActiveTab("messages");
        }
    };

    return (
        <>
            {/* Add animation styles */}
            <style jsx global>{drawerStyles}</style>

            <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
                {/* Mobile Sidebar Toggle */}
                {isMobile && (
                    <div className="fixed top-[4.5rem] left-4 z-40">
                        <Button
                            variant="secondary"
                            className="rounded-full h-10 w-10 shadow-lg bg-white dark:bg-gray-900"
                            onClick={() => setShowSidebar(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                {/* Inbox Sidebar - hidden on mobile unless toggled */}
                <div className={`${isMobile ? 'fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out' : 'w-[16rem] min-w-[200px] shrink-0'} 
                    ${isMobile && !showSidebar ? '-translate-x-full' : 'translate-x-0'} 
                    ${isMobile && showSidebar ? 'backdrop-blur-sm bg-black/20 dark:bg-gray-950/80' : ''} 
                    ${isMobile ? 'min-h-screen' : 'h-full'}`}>

                    <div className={`${isMobile ? 'w-[85%] max-w-[280px] h-full' : 'w-full h-full'} border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden`}>
                        <div className="p-4 h-14 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 flex items-center justify-between">
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50 tracking-tight">Inbox</h1>
                            {isMobile && (
                                <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setShowSidebar(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto py-2 px-2 overscroll-contain">
                            <div className="mt-2 space-y-1 px-2">
                                <Link
                                    href="/inbox"
                                    className={`flex items-center justify-between rounded-md p-2 text-sm ${pathname === "/inbox"
                                        ? "bg-white shadow-sm text-blue-600 shadow-blue-100 dark:shadow-none dark:bg-gray-900 dark:text-blue-500 dark:ring-1 dark:ring-gray-800"
                                        : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 hover:dark:bg-gray-900 dark:hover:text-gray-50"}`}
                                    onClick={() => isMobile && setShowSidebar(false)}
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
                                    onClick={() => isMobile && setShowSidebar(false)}
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
                                    onClick={() => isMobile && setShowSidebar(false)}
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
                                    onClick={() => isMobile && setShowSidebar(false)}
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
                                    onClick={() => isMobile && setShowSidebar(false)}
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
                                    onClick={() => isMobile && setShowSidebar(false)}
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
                                    onClick={() => isMobile && setShowSidebar(false)}
                                >
                                    <span className="flex items-center gap-3">
                                        <Archive className="h-4 w-4" />
                                        <span>Archive</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Close sidebar when clicking the backdrop on mobile */}
                    {isMobile && showSidebar && (
                        <div
                            className="absolute inset-0 -z-10"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}
                </div>

                {/* Posts Column - full width on mobile */}
                <div className={`${isMobile ? 'w-full' : 'w-[20rem] min-w-[200px]'} border-r border-gray-200 dark:border-gray-800 h-full bg-white dark:bg-gray-950 flex flex-col overflow-hidden`}>
                    <div className="border-b border-gray-200 dark:border-gray-800 h-14 flex items-center justify-between px-4 flex-shrink-0">
                        <div className="flex items-center">
                            {/* Adjust the spacing to make room for the mobile menu button */}
                            <h2 className={`text-base font-medium text-gray-900 dark:text-gray-50 ${isMobile ? 'ml-12' : ''}`}>Posts</h2>
                        </div>
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
                                onClick={() => handlePostClick(post)}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`h-7 w-7 rounded-full ${post.avatarColor} flex items-center justify-center relative text-sm font-medium`}>
                                        {post.sender.charAt(0)}
                                        {post.isUnread && (
                                            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-white dark:border-gray-950"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-1.5">
                                                <p className={`text-xs ${post.isUnread ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-gray-100 truncate`}>{post.sender}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                {post.source && (
                                                    <div className="relative group">
                                                        <span className={`flex items-center justify-center h-4.5 w-4.5 rounded-full ${post.source === 'email' ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400' :
                                                                post.source === 'slack' ? 'bg-purple-50 text-purple-500 dark:bg-purple-900/30 dark:text-purple-400' :
                                                                    post.source === 'twitter' ? 'bg-blue-50 text-blue-400 dark:bg-blue-900/30 dark:text-blue-300' :
                                                                        post.source === 'discord' ? 'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                                                            post.source === 'bettermode' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                                                'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                                            }`}>
                                                            {post.source === 'email' ? <Mail className="h-3 w-3" /> :
                                                                post.source === 'slack' ? <span className="text-[9px] font-bold">S</span> :
                                                                    post.source === 'twitter' ? <Twitter className="h-3 w-3" /> :
                                                                        post.source === 'discord' ? <span className="text-[9px] font-bold">D</span> :
                                                                            post.source === 'bettermode' ? <MessageSquareIcon className="h-3 w-3" /> :
                                                                                <Monitor className="h-3 w-3" />}
                                                        </span>
                                                        <div className="absolute top-0 right-full mr-1 w-auto px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                                            Source: {post.source.charAt(0).toUpperCase() + post.source.slice(1)}
                                                        </div>
                                                    </div>
                                                )}
                                                <span className="text-[10px] text-gray-500">{post.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className={`text-xs ${post.isUnread ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'} truncate flex-1`}>{post.message.substring(0, 20)}...</p>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                {post.category && (
                                                    <div className="relative group">
                                                        <span className={`h-2 w-2 rounded-full inline-block ${post.category === 'Support' ? 'bg-purple-500' :
                                                            post.category === 'Feature' ? 'bg-green-500' :
                                                                post.category === 'Bug' ? 'bg-red-500' :
                                                                    post.category === 'Wishlist' ? 'bg-blue-500' :
                                                                        post.category === 'Question' ? 'bg-amber-500' :
                                                                            post.category === 'Feedback' ? 'bg-indigo-500' :
                                                                                post.category === 'Onboarding' ? 'bg-teal-500' :
                                                                                    'bg-gray-500'
                                                            }`}></span>
                                                        <div className="absolute top-0 right-full mr-1 w-auto px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                                            {post.category}
                                                        </div>
                                                    </div>
                                                )}
                                                {post.priority && (
                                                    <div className="relative group">
                                                        <span className={`h-2 w-2 rounded-full inline-block ${post.priority === 'high' ? 'bg-red-500' :
                                                            post.priority === 'medium' ? 'bg-amber-500' :
                                                                'bg-gray-500'
                                                            }`}></span>
                                                        <div className="absolute top-0 right-full mr-1 w-auto px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                                            {post.priority.charAt(0).toUpperCase() + post.priority.slice(1)} Priority
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content - hidden on mobile unless in drawer */}
                {isMobile && showDrawer ? (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
                        <div className="w-full h-full bg-white dark:bg-gray-950 animate-slide-in-right flex flex-col">
                            {/* Add a visible close button for mobile as a backup */}
                            <Button
                                variant="ghost"
                                className="absolute top-4 left-4 z-50 h-8 w-8 p-0 mr-1"
                                onClick={() => setShowDrawer(false)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {/* Drawer content */}
                            <div className="flex-1 overflow-auto">
                                {children}
                            </div>
                        </div>
                    </div>
                ) : (
                    !isMobile && (
                        <div className="flex-1 min-w-[400px] bg-white dark:bg-gray-950 overflow-hidden flex flex-col">
                            {children}
                        </div>
                    )
                )}
            </div>
        </>
    )
} 