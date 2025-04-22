"use client"
import { Badge } from "@/components/Badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "@/components/Table"
import { Bell } from "lucide-react"
import { Fragment } from "react"

const notifications = [
    {
        category: "Today",
        items: [
            {
                title: "New system update available",
                time: "11:45 AM",
                type: "System"
            },
            {
                title: "Your presentation was viewed by the team",
                time: "10:20 AM",
                type: "Activity"
            },
        ]
    },
    {
        category: "Last 7 Days",
        items: [
            {
                title: "New team member added to your project",
                time: "Yesterday, 3:30 PM",
                type: "Team"
            },
            {
                title: "Project deadline approaching: Marketing Campaign",
                time: "2 days ago",
                type: "Reminder"
            },
            {
                title: "Client feedback submitted on your proposal",
                time: "5 days ago",
                type: "Client"
            },
        ]
    }
]

export default function NotificationsPage() {
    return (
        <section aria-label="Notifications">
            <TableRoot className="border-t border-gray-200 dark:border-gray-800">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Notification</TableHeaderCell>
                            <TableHeaderCell>Time</TableHeaderCell>
                            <TableHeaderCell>Type</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map((group) => (
                            <Fragment key={group.category}>
                                <TableRow>
                                    <TableHeaderCell
                                        scope="colgroup"
                                        colSpan={3}
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
                                            <Bell className="size-5 text-gray-400" />
                                            {item.title}
                                        </TableCell>
                                        <TableCell>{item.time}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    item.type === "System" || item.type === "Reminder"
                                                        ? "warning"
                                                        : item.type === "Client"
                                                            ? "success"
                                                            : "default"
                                                }
                                                className="rounded-full"
                                            >
                                                {item.type}
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