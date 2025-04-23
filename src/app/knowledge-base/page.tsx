"use client"
import { LibraryBig } from "lucide-react";
import Link from "next/link";

export default function KnowledgeBasePage() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <LibraryBig className="mr-2 size-5 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Knowledge Base</h1>
            </div>

            <section className="mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Information Center
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Access guides, documentation, and resources to help you get the most out of the platform.
                    </p>
                    <div className="mt-4">
                        <Link
                            href="/knowledge-base/articles"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                        >
                            Browse Articles
                            <svg
                                className="ml-1 size-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Popular Topics</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <TopicCard
                        title="Getting Started"
                        description="Learn the basics of the platform and how to set up your account"
                        articleCount={5}
                    />
                    <TopicCard
                        title="Advanced Features"
                        description="Discover powerful features to enhance your workflow"
                        articleCount={8}
                    />
                    <TopicCard
                        title="Troubleshooting"
                        description="Find solutions to common issues and questions"
                        articleCount={12}
                    />
                    <TopicCard
                        title="API Documentation"
                        description="Comprehensive guide to integrating with our API"
                        articleCount={10}
                    />
                    <TopicCard
                        title="Best Practices"
                        description="Tips and recommendations for optimal usage"
                        articleCount={7}
                    />
                    <TopicCard
                        title="Updates & Releases"
                        description="Stay informed about the latest features and improvements"
                        articleCount={4}
                    />
                </div>
            </section>
        </div>
    )
}

function TopicCard({
    title,
    description,
    articleCount
}: {
    title: string;
    description: string;
    articleCount: number;
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-1 text-base font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-500">
                <span>{articleCount} articles</span>
            </div>
        </div>
    );
} 