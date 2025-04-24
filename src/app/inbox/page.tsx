"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { Input } from "@/components/Input"
import { TabbedBarList } from "@/components/TabbedBarList"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/Tabs"
import { BarChart2, Clock, ExternalLink, Info, MessageCircle, MoreHorizontal, PaperclipIcon, SendHorizontal, Smile, Star, Tag, ThumbsDown, ThumbsUp, TrendingUp, User } from "lucide-react"
import { useEffect, useState } from "react"

// Get access to the parent layout's setShowDrawer function
declare global {
    interface Window {
        inboxLayoutContext?: {
            setShowDrawer: (show: boolean) => void;
            closeDrawer: () => void;
            setActiveTab?: (tab: string) => void;
        };
    }
}

export default function InboxPage() {
    const [messageText, setMessageText] = useState("")
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

    // Connect to layout context for tab synchronization
    useEffect(() => {
        // Check if the context exists and has a setActiveTab method
        if (window.inboxLayoutContext) {
            window.inboxLayoutContext.setActiveTab = (tab: string) => {
                setActiveTab(tab);
            };
        }
    }, []);

    const selectedMessageData = {
        id: "1",
        title: "Message reactions",
        sender: "Jonathon Grimmer",
        avatar: "Jo",
        time: "3h",
        timestamp: "Today at 10:32 AM",
        isStarred: false,
        priority: "medium",
        content: "\"I would like the ability to \\\"react\\\" to a message with an emoji when using direct messages on Bettermode.\"",
        replies: [
            {
                id: "r1",
                sender: "Fareed Amiry",
                avatar: "FA",
                role: "Support Agent",
                time: "42m",
                timestamp: "Today at 2:15 PM",
                content: "\"Thanks for the suggestion, Jonathon Grimmer! Unfortunately, message reactions with emojis in direct messages aren't available just yet, but the good news is that it's already on our roadmap and actively being worked on! In the meantime, you can still send emojis or GIFs directly in your messages to express yourself. We appreciate your feedback—features like this help us shape a better experience for everyone on Bettermode. Keep the ideas coming!\""
            }
        ]
    }

    const toggleStar = () => {
        // In a real app, we would update the star status in the state or API
        selectedMessageData.isStarred = !selectedMessageData.isStarred
    }

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // Here we would send the message via API
            console.log("Sending message:", messageText)
            setMessageText("")
        }
    }

    const closeDrawer = () => {
        // Use the layout's closeDrawer if available
        if (window.inboxLayoutContext?.closeDrawer) {
            window.inboxLayoutContext.closeDrawer();
        } else if (window.inboxLayoutContext?.setShowDrawer) {
            window.inboxLayoutContext.setShowDrawer(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Enhanced Header with user info - improved for mobile */}
            <div className="border-b h-14 border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center bg-white dark:bg-gray-950">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        {/* Hide avatar on mobile */}
                        <div className={`${isMobile ? 'hidden' : 'block'} h-8 w-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-medium text-base`}>
                            {selectedMessageData.avatar}
                        </div>

                        {/* Back button in place of avatar on mobile */}
                        {isMobile && (
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 mr-1"
                                onClick={closeDrawer}
                            >
                                <div className="h-5 w-5" ></div>
                            </Button>
                        )}

                        <div className="flex flex-col">
                            <h1 className="font-medium text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <span className="truncate max-w-[120px] sm:max-w-none">{selectedMessageData.sender}</span>
                                <Button variant="ghost" onClick={toggleStar} className="p-0.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full">
                                    <Star className={`h-4 w-4 ${selectedMessageData.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                </Button>
                            </h1>

                            {/* Show time under name on mobile */}
                            {isMobile && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {selectedMessageData.time}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Show badges in action area on mobile */}
                        {isMobile && (
                            <div className="flex items-center gap-1.5 mr-1">
                                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    Request
                                </span>
                                {selectedMessageData.priority && (
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${selectedMessageData.priority === 'high'
                                        ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-500/20'
                                        : selectedMessageData.priority === 'medium'
                                            ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/20'
                                            : 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20 dark:bg-gray-950/30 dark:text-gray-400 dark:ring-gray-500/20'
                                        }`}>
                                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current"></span>
                                        {selectedMessageData.priority.charAt(0).toUpperCase() + selectedMessageData.priority.slice(1)}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Only show larger badges on desktop */}
                        <div className={`${isMobile ? 'hidden' : 'flex items-center flex-wrap gap-x-3 gap-y-1'}`}>
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                Request
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {selectedMessageData.timestamp}
                            </span>
                            {selectedMessageData.priority && (
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${selectedMessageData.priority === 'high'
                                    ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-500/20'
                                    : selectedMessageData.priority === 'medium'
                                        ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/20'
                                        : 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20 dark:bg-gray-950/30 dark:text-gray-400 dark:ring-gray-500/20'
                                    }`}>
                                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current"></span>
                                    {selectedMessageData.priority.charAt(0).toUpperCase() + selectedMessageData.priority.slice(1)}
                                </span>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs
                defaultValue="messages"
                className="flex-1 flex flex-col h-full"
                onValueChange={(value) => setActiveTab(value)}
            >
                <div className="pt-4 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                    <TabsList variant="line">
                        <TabsTrigger value="messages" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>Messages</span>
                        </TabsTrigger>
                        <TabsTrigger value="insights" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            <span>Insights</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Messages Tab Content */}
                <div className={`h-full ${activeTab === "messages" ? "block" : "hidden"}`}>
                    <TabsContent
                        value="messages"
                        className="h-full bg-gray-50 dark:bg-gray-950"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex-1 overflow-auto">
                                <div className="max-w-3xl mx-auto py-6 px-4 space-y-8">
                                    {/* Original Message */}
                                    <div className="relative">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-medium flex-shrink-0">
                                                {selectedMessageData.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{selectedMessageData.sender}</p>
                                                    <Badge variant="neutral" className="text-[10px] py-0 px-1.5">Customer</Badge>
                                                    <span className="text-xs text-gray-500">{selectedMessageData.time}</span>
                                                </div>
                                                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                        {selectedMessageData.content}
                                                    </p>
                                                </div>
                                                <div className="flex mt-2 items-center gap-1.5">
                                                    <Button variant="ghost" className="h-7 rounded-full px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 text-xs">
                                                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                                        Reply
                                                    </Button>
                                                    <Button variant="ghost" className="h-7 rounded-full px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 text-xs">
                                                        <Smile className="h-3.5 w-3.5 mr-1" />
                                                        React
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    {selectedMessageData.replies.map(reply => (
                                        <div key={reply.id} className="relative">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 flex items-center justify-center font-medium flex-shrink-0">
                                                    {reply.avatar}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{reply.sender}</p>
                                                        <Badge variant="success" className="text-[10px] py-0 px-1.5">{reply.role}</Badge>
                                                        <span className="text-xs text-gray-500">{reply.time}</span>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                            {reply.content}
                                                        </p>
                                                    </div>
                                                    <div className="flex mt-2 items-center gap-1.5">
                                                        <Button variant="ghost" className="h-7 rounded-full px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 text-xs">
                                                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                                            Reply
                                                        </Button>
                                                        <Button variant="ghost" className="h-7 rounded-full px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 text-xs">
                                                            <Smile className="h-3.5 w-3.5 mr-1" />
                                                            React
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Input Area - Now only in Messages tab */}
                            <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 mt-auto">
                                <div className="flex items-end gap-3 max-w-3xl mx-auto">
                                    <div className="flex-1 relative">
                                        <Input
                                            placeholder="Write your message..."
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            className="min-h-[80px] py-3 pl-4 pr-10 text-sm resize-none overflow-auto"
                                        />
                                        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                            <PaperclipIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!messageText.trim()}
                                        className="h-10 w-10 p-0 rounded-full flex items-center justify-center"
                                    >
                                        <SendHorizontal className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between mt-2 max-w-3xl mx-auto">
                                    <div className="flex items-center gap-2">
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                                            <Smile className="h-5 w-5" />
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                                            <PaperclipIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Use @ to mention colleagues
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </div>

                {/* Insights Tab Content */}
                <div className={`h-full ${activeTab === "insights" ? "block" : "hidden"}`}>
                    <TabsContent
                        value="insights"
                        className="h-full overflow-auto bg-gray-50 dark:bg-gray-950 pb-16"
                    >
                        <div className="max-w-3xl mx-auto py-6 px-4 pb-20">
                            <div className="space-y-6">
                                {/* Overview Card - Main insights in a clean, minimal design */}
                                <Card className="p-0 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                                    {/* Header */}
                                    <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                            <Info className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                            Overview
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-md px-2 py-0.5 flex items-center">
                                                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">AI Confidence: 94%</span>
                                                <div className="flex ml-1.5">
                                                    <button className="h-4 w-4 text-gray-400 hover:text-green-500 dark:text-gray-500 dark:hover:text-green-400">
                                                        <ThumbsUp className="h-3 w-3" />
                                                    </button>
                                                    <button className="h-4 w-4 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400">
                                                        <ThumbsDown className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                                <span className="font-mono">ID:</span>
                                                <span className="font-semibold">#12345</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Feature request card */}
                                    <div className="px-4 py-5">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-50/30 dark:from-blue-950/40 dark:to-blue-900/10 p-5 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Emoji reactions</h4>
                                                <div className="flex -space-x-1">
                                                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/70 dark:text-blue-300 flex items-center justify-center font-medium text-xs ring-2 ring-white dark:ring-gray-900">
                                                        JK
                                                    </div>
                                                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/70 dark:text-emerald-300 flex items-center justify-center font-medium text-xs ring-2 ring-white dark:ring-gray-900">
                                                        FA
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                                                User is requesting the ability to react with emojis to direct messages to improve engagement and interaction between users.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-500/20">
                                                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                    Prioritized
                                                </span>
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-500/20">
                                                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                                    In Roadmap
                                                </span>
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20 dark:bg-purple-950/30 dark:text-purple-400 dark:ring-purple-500/20">
                                                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                                    Q2 2023
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Analysis Section - NEW */}
                                    <div className="px-4 pb-5">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h5 className="text-xs font-medium text-gray-500">Source</h5>
                                                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded">Bettermode</span>
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    Request submitted through the community platform on May 15, 2023.
                                                </div>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h5 className="text-xs font-medium text-gray-500">Routing</h5>
                                                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded">Product</span>
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    Content should be routed to the Product team for consideration.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics grid */}
                                    <div className="grid grid-cols-2 border-t border-gray-200 dark:border-gray-800">
                                        {/* Intent & Emotion */}
                                        <div className="border-r border-gray-200 dark:border-gray-800 p-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                                                            <MessageCircle className="h-3.5 w-3.5" />
                                                            Intent
                                                        </span>
                                                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
                                                            Request
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "75%" }}></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                                                            <Smile className="h-3.5 w-3.5" />
                                                            Emotion
                                                        </span>
                                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-1.5 py-0.5 rounded">
                                                            Gratitude
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sentiment & Volume */}
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                                                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                                            Sentiment Trend
                                                        </span>
                                                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                            +12% <span className="text-gray-500">(increasing)</span>
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" style={{ width: "70%" }}></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                                                            <BarChart2 className="h-3.5 w-3.5" />
                                                            Volume
                                                        </span>
                                                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                            24 <span className="text-gray-500">(last 30 days)</span>
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: "40%" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Theme & Similarity Analysis - NEW */}
                                    <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                Theme Summary
                                            </h3>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 rounded-md p-3 mb-3">
                                            <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                                                "Users frequently request emoji reactions as a lightweight way to acknowledge messages without typing a full response. This feature is seen as essential for modern messaging platforms and could increase overall engagement."
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400">Common Phrases</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">emoji reactions</span>
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">quick response</span>
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">like messages</span>
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">express feelings</span>
                                        </div>
                                    </div>

                                    {/* Chart section */}
                                    <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                                        <TabbedBarList />
                                    </div>

                                    {/* Insight note */}
                                    <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                                        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50">
                                            <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Info className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">High Priority Insight</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Feature request has significant community support based on sentiment analysis and similar requests.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Details Card - Classic Style */}
                                <Card className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {/* Tags Section */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                <Tag className="h-4 w-4 text-gray-500" />
                                                Tags
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                Product
                                            </span>
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                General
                                            </span>
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                Enterprise
                                            </span>
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                <Info className="h-4 w-4 text-gray-500" />
                                                Conversation Details
                                            </h3>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-start">
                                                <span className="w-40 text-gray-500">Posted in:</span>
                                                <span className="text-gray-700 dark:text-gray-300">Support Forum</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-40 text-gray-500">Time:</span>
                                                <span className="text-gray-700 dark:text-gray-300">2 hours</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-40 text-gray-500">Time to response:</span>
                                                <span className="text-gray-700 dark:text-gray-300">2 hours</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Data Section */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                <User className="h-4 w-4 text-gray-500" />
                                                User Data
                                            </h3>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-start">
                                                <span className="w-40 text-gray-500">Name:</span>
                                                <span className="text-gray-700 dark:text-gray-300">Amir Khalili</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-40 text-gray-500">Website:</span>
                                                <span className="text-gray-700 dark:text-gray-300">community.bettermode.com</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-40 text-gray-500">Email:</span>
                                                <span className="text-gray-700 dark:text-gray-300">amir@bettermode.com</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Intent Analysis Section */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                <MessageCircle className="h-4 w-4 text-gray-500" />
                                                Intent Analysis
                                            </h3>
                                        </div>
                                        <div className="space-y-4">
                                            <CategoryBar
                                                values={[10, 5, 75, 5, 5, 0, 0, 0]}
                                                colors={["gray", "gray", "emerald", "gray", "gray", "gray", "gray", "gray"]}
                                                marker={{ value: 75, tooltip: "Request: 75%" }}
                                                className="w-full"
                                            />
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Question (10%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Bug (5%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-emerald-500"></div>
                                                    <span>Request (75%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Complaint (5%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Objection (5%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Emotion Analysis Section */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                <Smile className="h-4 w-4 text-gray-500" />
                                                Emotion Analysis
                                            </h3>
                                        </div>
                                        <div className="space-y-4">
                                            <CategoryBar
                                                values={[10, 5, 0, 15, 60, 10]}
                                                colors={["gray", "gray", "gray", "gray", "blue", "gray"]}
                                                marker={{ value: 60, tooltip: "Gratitude: 60%" }}
                                                className="w-full"
                                            />
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Frustration (10%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Confusion (5%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Joy (15%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-blue-500"></div>
                                                    <span>Gratitude (60%)</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-3 rounded-sm bg-gray-400"></div>
                                                    <span>Disappointment (10%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contributors Section */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                <User className="h-4 w-4 text-gray-500" />
                                                Contributors
                                            </h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-cover bg-center" style={{ backgroundColor: "#f3f4f6" }}></div>
                                                    <span className="text-sm">Kimberly Weidner</span>
                                                </div>
                                                <span className="text-xs text-gray-500">Author</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-cover bg-center" style={{ backgroundColor: "#f3f4f6" }}></div>
                                                    <span className="text-sm">Joe Workman</span>
                                                </div>
                                                <span className="text-xs text-gray-500">Member</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-cover bg-center" style={{ backgroundColor: "#f3f4f6" }}></div>
                                                    <span className="text-sm">Jennifer Serrat</span>
                                                </div>
                                                <span className="text-xs text-gray-500">Member</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
} 