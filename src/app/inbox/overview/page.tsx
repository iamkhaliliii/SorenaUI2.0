"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "@/components/Table"
import { cx } from "@/lib/utils"
import { Download, Mail } from "lucide-react"
import { Fragment } from "react"

const inboxMessages = [
    {
        category: "Today",
        messages: [
            {
                title: "New project proposal",
                sender: "John Smith",
                time: "10:32 AM",
                status: "Unread",
                priority: "High"
            },
            {
                title: "Meeting reminder: Product review",
                sender: "Sarah Johnson",
                time: "9:15 AM",
                status: "Unread",
                priority: "Medium"
            },
        ]
    },
    {
        category: "Yesterday",
        messages: [
            {
                title: "Design mockups ready for review",
                sender: "Michael Jones",
                time: "4:45 PM",
                status: "Read",
                priority: "Normal"
            },
            {
                title: "Budget approval needed",
                sender: "Emily Williams",
                time: "2:20 PM",
                status: "Read",
                priority: "Medium"
            },
            {
                title: "Client feedback on latest delivery",
                sender: "Robert Davis",
                time: "11:05 AM",
                status: "Read",
                priority: "Normal"
            },
        ]
    }
]

export default function InboxOverview() {
    return (
        <section aria-label="Inbox Overview">
            <div className="flex flex-col justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center sm:p-6">
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
            <TableRoot className="border-t border-gray-200 dark:border-gray-800">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Message</TableHeaderCell>
                            <TableHeaderCell>Sender</TableHeaderCell>
                            <TableHeaderCell>Time</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Priority</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inboxMessages.map((group) => (
                            <Fragment key={group.category}>
                                <TableRow>
                                    <TableHeaderCell
                                        scope="colgroup"
                                        colSpan={5}
                                        className="bg-gray-50 py-3 pl-4 sm:pl-6 dark:bg-gray-900"
                                    >
                                        {group.category}
                                        <span className="ml-2 font-medium text-gray-600 dark:text-gray-400">
                                            {group.messages.length}
                                        </span>
                                    </TableHeaderCell>
                                </TableRow>
                                {group.messages.map((message, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center gap-3">
                                            <Mail className="size-5 text-gray-400" />
                                            {message.title}
                                        </TableCell>
                                        <TableCell>{message.sender}</TableCell>
                                        <TableCell>{message.time}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={message.status === "Unread" ? "default" : "neutral"}
                                                className="rounded-full"
                                            >
                                                <span
                                                    className={cx(
                                                        "size-1.5 shrink-0 rounded-full",
                                                        {
                                                            "bg-blue-500 dark:bg-blue-500": message.status === "Unread",
                                                            "bg-gray-500 dark:bg-gray-500": message.status === "Read",
                                                        }
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {message.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    message.priority === "High"
                                                        ? "error"
                                                        : message.priority === "Medium"
                                                            ? "default"
                                                            : "neutral"
                                                }
                                                className="rounded-full"
                                            >
                                                {message.priority}
                                            </Badge>
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