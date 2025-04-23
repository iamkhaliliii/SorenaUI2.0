"use client"
import { FileText } from "lucide-react";

export default function KnowledgeBaseArticlesPage() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <FileText className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Knowledge Base Articles</h1>
            </div>

            <section className="mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Featured Articles
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Browse through our curated collection of knowledge base articles.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <div className="space-y-4">
                    <ArticleCard
                        title="Getting Started with the Platform"
                        summary="Learn how to set up your account and navigate the dashboard"
                        readTime={5}
                        date="May 15, 2023"
                    />
                    <ArticleCard
                        title="Advanced Configuration Options"
                        summary="Discover how to customize and configure the platform to your needs"
                        readTime={8}
                        date="June 3, 2023"
                    />
                    <ArticleCard
                        title="Troubleshooting Common Issues"
                        summary="Solutions to frequently encountered problems and error messages"
                        readTime={10}
                        date="July 21, 2023"
                    />
                    <ArticleCard
                        title="Security Best Practices"
                        summary="Recommended settings and practices to keep your account secure"
                        readTime={7}
                        date="August 12, 2023"
                    />
                </div>
            </section>
        </div>
    )
}

function ArticleCard({
    title,
    summary,
    readTime,
    date
}: {
    title: string;
    summary: string;
    readTime: number;
    date: string;
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{summary}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Published: {date}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{readTime} min read</span>
            </div>
        </div>
    );
} 