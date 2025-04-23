"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/Tabs"
import { Calendar, ChevronDown, Clock, ExternalLink, Flag, HelpCircle, Info, MessageCircle, MoreHorizontal, PaperclipIcon, SendHorizontal, Smile, Star, Tag, ThumbsUp, User } from "lucide-react"
import { useState } from "react"

export default function InboxPage() {
    const [messageText, setMessageText] = useState("")

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

    return (
        <div className="h-full flex flex-col">
            {/* Enhanced Header with user info */}
            <div className="border-b h-14 border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-col bg-white dark:bg-gray-950">
                {/* Top row with breadcrumb and actions */}

                {/* Main header content */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-medium text-base">
                            {selectedMessageData.avatar}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-medium text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                {selectedMessageData.sender}
                                <Button variant="ghost" onClick={toggleStar} className="p-0.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full">
                                    <Star className={`h-4 w-4 ${selectedMessageData.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                </Button>
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-1">
                            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-0.5">
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-800">
                                    Customer
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {selectedMessageData.timestamp}
                                </span>
                                {selectedMessageData.priority && (
                                    <span className={`text-xs flex items-center gap-1 ${selectedMessageData.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                                        selectedMessageData.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                                            'text-gray-600 dark:text-gray-400'
                                        }`}>
                                        <Flag className="h-3 w-3" />
                                        {selectedMessageData.priority.charAt(0).toUpperCase() + selectedMessageData.priority.slice(1)} Priority
                                    </span>
                                )}
                            </div>

                            <div className="relative">
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
            </div>

            {/* Tabs */}
            <Tabs defaultValue="messages" className="flex-1 flex flex-col h-full">
                <div className="pt-4  border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
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
                <TabsContent value="messages" className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
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
                </TabsContent>

                {/* Insights Tab Content */}
                <TabsContent value="insights" className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-3xl mx-auto py-6 px-4">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Analysis Cards */}
                            <Card className="p-4 space-y-2 overflow-hidden">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <Flag className="h-4 w-4 text-amber-500" />
                                    <span>Sentiment Analysis</span>
                                </h3>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-gray-500">Sentiment Score</span>
                                        <Badge variant="default" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                            Neutral
                                        </Badge>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                        <span>Negative</span>
                                        <span>Neutral</span>
                                        <span>Positive</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 space-y-2">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-500" />
                                    <span>Customer Profile</span>
                                </h3>
                                <div className="space-y-3 text-xs">
                                    <div className="flex items-start">
                                        <span className="w-24 text-gray-500">User ID</span>
                                        <span className="text-gray-700 dark:text-gray-300 font-mono">#12345</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="w-24 text-gray-500">Joined</span>
                                        <span className="text-gray-700 dark:text-gray-300">5 months ago</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="w-24 text-gray-500">Activity</span>
                                        <span className="text-gray-700 dark:text-gray-300">15 previous messages</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Summary Card */}
                            <Card className="p-4 space-y-3 sm:col-span-2">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4 text-indigo-500" />
                                    <span>Message Summary</span>
                                </h3>
                                <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 text-sm text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800/30 dark:text-indigo-400">
                                    User is requesting the ability to react with emojis to direct messages in the Bettermode platform.
                                </div>

                                <h4 className="text-xs font-medium text-gray-500 mt-2">Key Insights</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800 flex items-start">
                                        <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300">Feature request for emoji reactions</span>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800 flex items-start">
                                        <ThumbsUp className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300">Positive engagement with platform features</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Details */}
                            <Card className="p-4 space-y-3 sm:col-span-2">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Info className="h-4 w-4 text-gray-500" />
                                        <span>Message Details</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                    <div className="flex items-start">
                                        <span className="w-24 flex items-center gap-1.5 text-xs text-gray-500">
                                            <Tag className="h-3.5 w-3.5" />
                                            <span>Category</span>
                                        </span>
                                        <span className="text-xs text-gray-700 dark:text-gray-300">Feature Requests</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="w-24 flex items-center gap-1.5 text-xs text-gray-500">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>Created</span>
                                        </span>
                                        <span className="text-xs text-gray-700 dark:text-gray-300">3 hours ago</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="w-24 flex items-center gap-1.5 text-xs text-gray-500">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>Response</span>
                                        </span>
                                        <span className="text-xs text-gray-700 dark:text-gray-300">42 minutes</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="w-24 flex items-center gap-1.5 text-xs text-gray-500">
                                            <Flag className="h-3.5 w-3.5" />
                                            <span>Status</span>
                                        </span>
                                        <Badge variant="default" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                            In progress
                                        </Badge>
                                    </div>
                                </div>
                            </Card>

                            {/* Tags */}
                            <Card className="p-4 space-y-3 sm:col-span-2">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-gray-500" />
                                        <span>Tags</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="neutral" className="rounded-full py-1 px-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                        <Tag className="h-3 w-3 mr-1" />
                                        feature-request
                                    </Badge>
                                    <Badge variant="neutral" className="rounded-full py-1 px-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                        <Tag className="h-3 w-3 mr-1" />
                                        messaging
                                    </Badge>
                                    <Badge variant="neutral" className="rounded-full py-1 px-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                        <Tag className="h-3 w-3 mr-1" />
                                        reactions
                                    </Badge>
                                    <Badge variant="neutral" className="rounded-full py-1 px-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                        <Tag className="h-3 w-3 mr-1" />
                                        emoji
                                    </Badge>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
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
    )
} 