"use client"

import { Badge, type BadgeProps } from '@/components/Badge';
import {
    RiAddFill,
    RiArchiveLine,
    RiBookOpenLine,
    RiCodeLine,
    RiDatabase2Line,
    RiFileTextLine,
    RiGlobalLine,
    RiGuideLine,
    RiMoreLine
} from '@remixicon/react';
import { Card, Select, SelectItem } from '@tremor/react';

type ResourceType = 'Docs & Files' | 'Webpages' | 'Snippet';
type ResourceVariant = NonNullable<BadgeProps['variant']>;

interface Resource {
    id: number;
    name: string;
    description: string;
    href: string;
    type: ResourceType;
    variant: ResourceVariant;
    icon: React.ReactNode;
}

const data: Resource[] = [
    {
        id: 1,
        name: 'Handbook 2.0',
        description: 'Platform documentation and guidelines',
        href: '/knowledge-base/articles',
        type: 'Docs & Files',
        variant: 'default',
        icon: <RiFileTextLine className="size-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />,
    },
    {
        id: 2,
        name: 'Destination',
        description: 'External resources and platforms',
        href: '/knowledge-base/articles',
        type: 'Webpages',
        variant: 'neutral',
        icon: <RiGlobalLine className="size-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />,
    },
    {
        id: 3,
        name: 'Reference',
        description: 'Important reference materials',
        href: '/knowledge-base/articles',
        type: 'Webpages',
        variant: 'success',
        icon: <RiGlobalLine className="size-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />,
    },
    {
        id: 4,
        name: 'Archive',
        description: 'Historical documentation and references',
        href: '/knowledge-base/articles',
        type: 'Webpages',
        variant: 'warning',
        icon: <RiArchiveLine className="size-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />,
    },
    {
        id: 5,
        name: 'Guide',
        description: 'Step-by-step instructions and walkthroughs',
        href: '/knowledge-base/articles',
        type: 'Webpages',
        variant: 'error',
        icon: <RiGuideLine className="size-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />,
    },
    {
        id: 6,
        name: 'Sorena\'s Starter snippet',
        description: 'Code snippets and templates',
        href: '/knowledge-base/articles',
        type: 'Snippet',
        variant: 'default',
        icon: <RiCodeLine className="size-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />,
    },
];

export default function KnowledgeBasePage() {
    return (
        <>
            <div className="border-b border-tremor-border bg-tremor-background-muted p-4 dark:border-dark-tremor-border dark:bg-gray-950 sm:p-6 lg:p-8">
                <header>
                    <h1 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Knowledge Base
                    </h1>
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                        Access guides, documentation, and resources to help you get the most out of the platform
                    </p>
                    <div className="mt-8 w-full md:flex md:max-w-3xl md:items-stretch md:space-x-4">
                        <Card className="w-full md:w-7/12">
                            <div className="inline-flex items-center justify-center rounded-tremor-small border border-tremor-border p-2 dark:border-dark-tremor-border">
                                <RiBookOpenLine
                                    className="size-5 text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis"
                                    aria-hidden={true}
                                />
                            </div>
                            <h3 className="mt-4 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                <a href="/knowledge-base/articles" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden={true} />
                                    Documentation
                                </a>
                            </h3>
                            <p className="dark:text-dark-tremor-cont text-tremor-default text-tremor-content">
                                Browse our guides and documentation to make the most of the platform
                            </p>
                        </Card>
                        <Card className="mt-4 w-full md:mt-0 md:w-5/12">
                            <div className="inline-flex items-center justify-center rounded-tremor-small border border-tremor-border p-2 dark:border-dark-tremor-border">
                                <RiDatabase2Line
                                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content"
                                    aria-hidden={true}
                                />
                            </div>
                            <h3 className="mt-4 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                <a href="/knowledge-base/articles" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden={true} />
                                    Resources
                                </a>
                            </h3>
                            <p className="dark:text-dark-tremor-cont text-tremor-default text-tremor-content">
                                Access templates, examples, and other helpful resources
                            </p>
                        </Card>
                    </div>
                </header>
            </div>
            <div>
                <div className="p-4 sm:p-6 lg:p-8">
                    <main>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Other resources
                            </h2>
                            <div className="flex items-center space-x-2">
                                <Select
                                    placeholder="Sort by"
                                    enableClear={false}
                                    className="[&>button]:rounded-tremor-small"
                                >
                                    <SelectItem value="1">Name</SelectItem>
                                    <SelectItem value="2">Last updated</SelectItem>
                                    <SelectItem value="3">Popularity</SelectItem>
                                </Select>
                                <button
                                    type="button"
                                    className="hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-3 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:inline-flex"
                                >
                                    <RiAddFill
                                        className="-ml-1 size-5 shrink-0"
                                        aria-hidden={true}
                                    />
                                    Add Resource
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {data.map((item) => (
                                <Card
                                    key={item.id}
                                    className="p-4 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <a
                                                    href={item.href}
                                                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong hover:underline"
                                                >
                                                    {item.name}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Badge variant={item.variant}>
                                                {item.type}
                                            </Badge>

                                            <button
                                                className="rounded-full p-1 hover:bg-tremor-background dark:hover:bg-dark-tremor-background transition-colors"
                                                aria-label="More options"
                                            >
                                                <RiMoreLine className="size-5 text-tremor-content dark:text-dark-tremor-content" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
} 