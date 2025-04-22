"use client"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "@/components/Table"
import { Boxes, Building2, Download, GlobeLock, Plus } from "lucide-react"
import { Fragment } from "react"

const suppliers = [
    {
        category: "Hardware Suppliers",
        items: [
            {
                id: "SUP-001",
                name: "TechComponents Inc.",
                location: "San Francisco, CA",
                leadTime: "3-5 days",
                status: "Active",
            },
            {
                id: "SUP-002",
                name: "Global Hardware Solutions",
                location: "New York, NY",
                leadTime: "5-7 days",
                status: "Active",
            },
            {
                id: "SUP-003",
                name: "Precision Parts Ltd.",
                location: "Chicago, IL",
                leadTime: "7-10 days",
                status: "Under Review",
            },
        ]
    },
    {
        category: "Software Partners",
        items: [
            {
                id: "SUP-004",
                name: "CloudSoft Systems",
                location: "Seattle, WA",
                leadTime: "1-2 days",
                status: "Active",
            },
            {
                id: "SUP-005",
                name: "Digital Solutions Co.",
                location: "Austin, TX",
                leadTime: "2-3 days",
                status: "Active",
            },
            {
                id: "SUP-006",
                name: "SecureCode LLC",
                location: "Boston, MA",
                leadTime: "1 day",
                status: "Inactive",
            },
        ]
    }
]

export default function ProductsSuppliersPage() {
    return (
        <section aria-label="Suppliers">
            <div className="flex flex-col justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center sm:p-6">
                <div className="flex items-center gap-2">
                    <Boxes className="size-5 text-blue-500" />
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Suppliers</h1>
                </div>
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <Input
                        type="search"
                        placeholder="Search suppliers..."
                        className="sm:w-64 [&>input]:py-1.5"
                    />
                    <Button variant="primary" className="gap-2 py-1.5 text-sm">
                        <Plus className="size-4 shrink-0" aria-hidden="true" />
                        Add Supplier
                    </Button>
                </div>
            </div>
            <div className="px-4 pb-6">
                <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <GlobeLock className="size-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {suppliers.reduce((total, group) => total + group.items.length, 0)} suppliers from 6 countries
                        </span>
                    </div>
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
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Supplier</TableHeaderCell>
                            <TableHeaderCell>Location</TableHeaderCell>
                            <TableHeaderCell>Lead Time</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.map((group) => (
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
                                {group.items.map((supplier, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{supplier.id}</TableCell>
                                        <TableCell className="flex items-center gap-3">
                                            <Building2 className="size-5 text-gray-400" />
                                            {supplier.name}
                                        </TableCell>
                                        <TableCell>{supplier.location}</TableCell>
                                        <TableCell>{supplier.leadTime}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    supplier.status === "Active"
                                                        ? "success"
                                                        : supplier.status === "Under Review"
                                                            ? "warning"
                                                            : "error"
                                                }
                                                className="rounded-full"
                                            >
                                                {supplier.status}
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