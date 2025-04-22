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
import { Boxes, Download, Plus } from "lucide-react"
import { Fragment } from "react"

const products = [
    {
        category: "Software Products",
        items: [
            {
                id: "PRD-001",
                name: "Enterprise CRM Solution",
                price: "$1,200.00",
                stock: 150,
                status: "Active",
            },
            {
                id: "PRD-002",
                name: "Cloud Hosting Package",
                price: "$80.00/mo",
                stock: 999,
                status: "Active",
            },
            {
                id: "PRD-003",
                name: "Data Analytics Suite",
                price: "$350.00",
                stock: 78,
                status: "Low Stock",
            },
        ]
    },
    {
        category: "Hardware Products",
        items: [
            {
                id: "PRD-004",
                name: "Business Laptop Pro",
                price: "$1,499.00",
                stock: 32,
                status: "Active",
            },
            {
                id: "PRD-005",
                name: "4K Monitor 32\"",
                price: "$649.00",
                stock: 15,
                status: "Low Stock",
            },
            {
                id: "PRD-006",
                name: "Wireless Mesh System",
                price: "$299.00",
                stock: 0,
                status: "Out of Stock",
            },
        ]
    }
]

export default function ProductsItemsPage() {
    return (
        <section aria-label="Products">
            <div className="flex flex-col justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center sm:p-6">
                <div className="flex items-center gap-2">
                    <Boxes className="size-5 text-blue-500" />
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Products</h1>
                </div>
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="sm:w-64 [&>input]:py-1.5"
                    />
                    <Button variant="primary" className="gap-2 py-1.5 text-sm">
                        <Plus className="size-4 shrink-0" aria-hidden="true" />
                        Add Product
                    </Button>
                </div>
            </div>
            <div className="px-4 pb-6">
                <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row sm:items-center">
                    <Select>
                        <SelectTrigger className="w-full py-1.5 sm:w-44">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                            <SelectItem value="hardware">Hardware</SelectItem>
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
                            <TableHeaderCell>Product ID</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                            <TableHeaderCell>Stock</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((group) => (
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
                                {group.items.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    product.status === "Active"
                                                        ? "success"
                                                        : product.status === "Low Stock"
                                                            ? "warning"
                                                            : "error"
                                                }
                                                className="rounded-full"
                                            >
                                                {product.status}
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