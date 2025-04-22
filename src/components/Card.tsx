import { cx } from "@/lib/utils"
import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cx(
                "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
                className
            )}
            {...props}
        />
    )
} 