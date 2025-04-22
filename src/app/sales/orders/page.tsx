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
import { Download, Package } from "lucide-react"
import { Fragment } from "react"

const orders = [
    {
        category: "Recent Orders",
        items: [
            {
                id: "ORD-2023-1234",
                customer: "Acme Corp",
                date: "Today, 10:30 AM",
                amount: "$1,250.00",
                status: "Pending",
            },
            {
                id: "ORD-2023-1233",
                customer: "TechSolutions Inc",
                date: "Today, 9:15 AM",
                amount: "$3,450.00",
                status: "Processing",
            },
        ]
    },
    {
        category: "Earlier Orders",
        items: [
            {
                id: "ORD-2023-1232",
                customer: "Global Enterprises",
                date: "Yesterday, 3:45 PM",
                amount: "$5,750.00",
                status: "Shipped",
            },
            {
                id: "ORD-2023-1231",
                customer: "Innovate Systems",
                date: "Yesterday, 11:20 AM",
                amount: "$2,100.00",
                status: "Completed",
            },
            {
                id: "ORD-2023-1230",
                customer: "Quantum Dynamics",
                date: "2 days ago",
                amount: "$4,300.00",
                status: "Cancelled",
            },
        ]
    }
]

export default function OrdersPage() {
    return (
        <section aria-label="Orders">
            <div className="flex flex-col justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center sm:p-6">
                <Input
                    type="search"
                    placeholder="Search orders..."
                    className="sm:w-64 [&>input]:py-1.5"
                />
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <Select>
                        <SelectTrigger className="w-full py-1.5 sm:w-44">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
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
                            <TableHeaderCell>Order ID</TableHeaderCell>
                            <TableHeaderCell>Customer</TableHeaderCell>
                            <TableHeaderCell>Date</TableHeaderCell>
                            <TableHeaderCell>Amount</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((group) => (
                            <Fragment key={group.category}>
                                <TableRow>
                                    <TableHeaderCell
                                        scope="colgroup"
                                        colSpan={5}
                                        className="bg-gray-50 py-3 pl-4 sm:pl-6 dark:bg-gray-900"
                                    >
                                        {group.category}
                                        <span className="ml-2 font-medium text-gray-600 dark:text-gray-400">
                                            {group.items.length}
                                        </span>
                                    </TableHeaderCell>
                                </TableRow>
                                {group.items.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center gap-3">
                                            <Package className="size-5 text-gray-400" />
                                            {order.id}
                                        </TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.amount}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    order.status === "Completed"
                                                        ? "success"
                                                        : order.status === "Pending"
                                                            ? "warning"
                                                            : order.status === "Cancelled"
                                                                ? "error"
                                                                : "default"
                                                }
                                                className="rounded-full"
                                            >
                                                {order.status}
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