"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "@/components/Table"
import { MessageSquare, User } from "lucide-react"
import { Fragment } from "react"

const conversations = [
    {
        category: "Direct Messages",
        items: [
            {
                contact: "James Wilson",
                lastMessage: "We need to discuss the updated timeline",
                time: "2 hours ago",
                unread: true
            },
            {
                contact: "Olivia Parker",
                lastMessage: "The files have been sent to the client",
                time: "5 hours ago",
                unread: false
            },
            {
                contact: "Ethan Brown",
                lastMessage: "Can we schedule a meeting for tomorrow?",
                time: "Yesterday",
                unread: false
            },
        ]
    },
    {
        category: "Team Chats",
        items: [
            {
                contact: "Design Team",
                lastMessage: "Mark: I've updated the mockups based on feedback",
                time: "1 hour ago",
                unread: true
            },
            {
                contact: "Development Team",
                lastMessage: "Alex: The new build is ready for testing",
                time: "3 hours ago",
                unread: false
            },
            {
                contact: "Marketing Team",
                lastMessage: "Sarah: Let's finalize the campaign details",
                time: "1 day ago",
                unread: false
            },
        ]
    }
]

export default function MessagesPage() {
    return (
        <section aria-label="Messages">
            <div className="flex justify-end px-4 py-4">
                <Button variant="primary" className="gap-2">
                    <MessageSquare className="size-4" />
                    New Message
                </Button>
            </div>
            <TableRoot className="border-t border-gray-200 dark:border-gray-800">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Contact</TableHeaderCell>
                            <TableHeaderCell>Last Message</TableHeaderCell>
                            <TableHeaderCell>Time</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {conversations.map((group) => (
                            <Fragment key={group.category}>
                                <TableRow>
                                    <TableHeaderCell
                                        scope="colgroup"
                                        colSpan={4}
                                        className="bg-gray-50 py-3 pl-4 sm:pl-6 dark:bg-gray-900"
                                    >
                                        {group.category}
                                        <span className="ml-2 font-medium text-gray-600 dark:text-gray-400">
                                            {group.items.length}
                                        </span>
                                    </TableHeaderCell>
                                </TableRow>
                                {group.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                                <User className="size-5 text-gray-500" />
                                            </div>
                                            {item.contact}
                                        </TableCell>
                                        <TableCell className="max-w-md truncate">
                                            {item.lastMessage}
                                        </TableCell>
                                        <TableCell>{item.time}</TableCell>
                                        <TableCell>
                                            {item.unread ? (
                                                <Badge variant="default" className="rounded-full">
                                                    <span className="size-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-500" aria-hidden="true" />
                                                    Unread
                                                </Badge>
                                            ) : (
                                                <Badge variant="neutral" className="rounded-full">
                                                    <span className="size-1.5 shrink-0 rounded-full bg-gray-500 dark:bg-gray-500" aria-hidden="true" />
                                                    Read
                                                </Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>
        </section>
    )
} 