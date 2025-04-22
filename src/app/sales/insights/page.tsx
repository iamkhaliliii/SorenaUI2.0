"use client"
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
import { Download, FileBarChart } from "lucide-react"

export default function InsightsPage() {
    return (
        <section aria-label="Sales Insights" className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileBarChart className="size-5 text-blue-500" />
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Sales Insights & Reports</h1>
                </div>
                <Button variant="secondary" className="gap-2 py-1.5 text-sm">
                    <Download className="-ml-0.5 size-4 shrink-0" aria-hidden="true" />
                    Export Data
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-800 dark:bg-gray-900">
                    <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                        <h2 className="font-medium text-gray-900 dark:text-white">Sales Performance</h2>
                    </div>
                    <TableRoot>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Month</TableHeaderCell>
                                    <TableHeaderCell>Revenue</TableHeaderCell>
                                    <TableHeaderCell>Growth</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>January</TableCell>
                                    <TableCell>$45,000</TableCell>
                                    <TableCell className="text-emerald-600">+12%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>February</TableCell>
                                    <TableCell>$52,000</TableCell>
                                    <TableCell className="text-emerald-600">+15%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>March</TableCell>
                                    <TableCell>$48,000</TableCell>
                                    <TableCell className="text-rose-600">-7%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>April</TableCell>
                                    <TableCell>$55,000</TableCell>
                                    <TableCell className="text-emerald-600">+14%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>May</TableCell>
                                    <TableCell>$60,000</TableCell>
                                    <TableCell className="text-emerald-600">+9%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableRoot>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-800 dark:bg-gray-900">
                    <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                        <h2 className="font-medium text-gray-900 dark:text-white">Top Products</h2>
                    </div>
                    <TableRoot>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Product</TableHeaderCell>
                                    <TableHeaderCell>Units Sold</TableHeaderCell>
                                    <TableHeaderCell>Revenue</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Product A</TableCell>
                                    <TableCell>1,245</TableCell>
                                    <TableCell>$24,900</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product B</TableCell>
                                    <TableCell>986</TableCell>
                                    <TableCell>$19,720</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product C</TableCell>
                                    <TableCell>756</TableCell>
                                    <TableCell>$15,120</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product D</TableCell>
                                    <TableCell>652</TableCell>
                                    <TableCell>$13,040</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product E</TableCell>
                                    <TableCell>524</TableCell>
                                    <TableCell>$10,480</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableRoot>
                </div>
            </div>
        </section>
    )
} 