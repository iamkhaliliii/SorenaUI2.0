"use client"
import { TooltipProps } from "@/components/BarChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { AvailableChartColorsKeys } from "@/lib/chartUtils"
import { cx } from "@/lib/utils"
import {
    RiArrowDownLine,
    RiBugLine,
    RiChat1Line,
    RiChat3Line,
    RiCheckLine,
    RiCloseLine,
    RiCommunityLine,
    RiFlagLine,
    RiFlaskLine,
    RiHeartLine,
    RiLightbulbFlashLine,
    RiMegaphoneLine,
    RiQuestionLine,
    RiSearchLine,
    RiSlackLine,
    RiSparklingLine,
    RiStarLine,
    RiTimeLine,
    RiToolsLine,
    RiUserVoiceLine
} from '@remixicon/react'
import {
    AreaChart,
    Badge,
    BarList,
    Button,
    Card,
    Dialog,
    DialogPanel,
    Divider,
    Icon,
    MultiSelect,
    MultiSelectItem,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TextInput
} from "@tremor/react"
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from "react"

// Dynamically import our custom CategoryChart component to avoid SSR issues
const CategoryChart = dynamic(() => import('@/components/CategoryChart'), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center"><p>Loading visualization...</p></div>
});

// Dynamically import our custom ZoomableCirclePack component to avoid SSR issues
const ZoomableCirclePack = dynamic(() => import('@/components/ZoomableCirclePack'), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center"><p>Loading visualization...</p></div>
});

// Fix for classNames function with proper types
function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

// Define post type (Keep if used in Overview or other parts)
interface Post {
    name: string;
    value: number;
    href: string;
}

// Define type for the map of category to posts (Keep if used in Overview)
type PostsByCategoryMap = {
    [key: string]: Post[];
}

// --- NEW Data Structures and Dummy Data ---

type Persona = 'Product' | 'Support' | 'Marketing';
type InsightSource = 'Community' | 'Slack' | 'Intercom' | 'Reviews' | 'Support Tickets' | 'Social Media' | 'Beta Feedback' | 'Surveys';
type InsightIntent = 'Bug Report' | 'Feature Request' | 'Question' | 'Complaint' | 'Praise' | 'Objection' | 'Suggestion' | 'General Feedback' | 'Integration Issue';
type InsightUrgency = 'High' | 'Medium' | 'Low' | 'N/A';
type InsightResolutionStatus = 'Resolved' | 'Unresolved' | 'In Progress' | 'N/A';
type InsightTopic = 'UI/UX' | 'Performance' | 'Billing' | 'API' | 'Integrations' | 'Mobile' | 'Onboarding' | 'Pricing' | 'Security' | 'Feature X' | 'General';

interface InsightItem {
    id: string;
    persona: Persona[]; // Can belong to multiple personas
    insightText: string; // The core insight/summary
    detail: string; // The original quote or detailed feedback
    source: InsightSource;
    intent: InsightIntent[]; // Can have multiple intents
    topic: InsightTopic;
    subTopic?: string;
    urgency: InsightUrgency;
    resolutionStatus: InsightResolutionStatus;
    timestamp: Date;
    sentimentScore?: number; // e.g., -1 to 1 or 0 to 100
    link?: string; // Link to original post/ticket
    userHandle?: string; // e.g., Slack username, email prefix
    tags?: string[]; // Additional freeform tags
    mentions?: number; // How many times this theme appeared
    trend?: 'Rising' | 'Falling' | 'Stable'; // Optional trend indicator
}

// Helper function to generate random dates
const getRandomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate Dummy Insight Data - returns empty array
const generateDummyData = (count: number): InsightItem[] => {
    return [];
};

const allInsightsData: InsightItem[] = []; // Empty array instead of generating dummy data

// --- END NEW Data Structures and Dummy Data ---


export default function AnalyticsPage() {
    // --- Existing State and Data (Mostly for Overview Tab) ---
    // ... (keep topFeatureRequests, trendingTopics, sentimentByFeature etc. if used in Overview)
    const topFeatureRequests = []
    const trendingTopics = []
    const sentimentByFeature = []

    // Support Insights Data
    const topQuestions = []
    const unansweredThreads = []
    const bugMentions = []

    // Marketing Insights Data
    const positiveQuotes = []
    const commonObjections = []
    const userDescriptions = []

    // Chart data
    const chartData = []
    const trendChartData = []
    const trackerData = []
    const sentimentTrendData = []

    // Sentiment status color mapping for the tooltip
    const sentimentStatus = {
        "positive": "bg-emerald-500 dark:bg-emerald-500",
        "neutral": "bg-blue-500 dark:bg-blue-500",
        "negative": "bg-red-500 dark:bg-red-500",
    };

    // Value formatter for sentiment numbers
    const sentimentValueFormatter = (number: number): string => {
        return Intl.NumberFormat("us").format(number).toString();
    };

    // Value formatter for numerical values
    const insightsValueFormatter = (number: number): string => {
        return Intl.NumberFormat("us").format(number).toString();
    };

    // Custom tooltip for sentiment chart
    const SentimentTooltip = ({ payload, active, label }: TooltipProps) => {
        if (!active || !payload || payload.length === 0) return null;

        const data = payload.map((item) => ({
            sentiment: item.category as string,
            value: item.value,
            percentage: (
                (item.value /
                    (item.payload.positive +
                        item.payload.neutral +
                        item.payload.negative)) *
                100
            ).toFixed(2),
        }));

        return (
            <>
                <div className="w-60 rounded-md border border-gray-500/10 bg-blue-500 px-4 py-1.5 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
                    <p className="flex items-center justify-between">
                        <span className="text-gray-50 dark:text-gray-50">
                            Date
                        </span>
                        <span className="font-medium text-gray-50 dark:text-gray-50">{label}</span>
                    </p>
                </div>
                <div className="mt-1 w-60 space-y-1 rounded-md border border-gray-500/10 bg-white px-4 py-2 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2.5">
                            <span
                                className={cx(
                                    sentimentStatus[item.sentiment as keyof typeof sentimentStatus],
                                    "size-2.5 shrink-0 rounded-xs"
                                )}
                                aria-hidden={true}
                            />
                            <div className="flex w-full justify-between">
                                <span className="text-gray-700 dark:text-gray-300">
                                    {item.sentiment}
                                </span>
                                <div className="flex items-center space-x-1">
                                    <span className="font-medium text-gray-900 dark:text-gray-50">
                                        {item.value}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-500">
                                        ({item.percentage}&#37;)
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    // Daily sentiment data for the data tab
    const dailySentimentData = []

    // Sentiment trend data for TabGroup implementation
    const overallSentiment = []
    const sentimentByCategory = []

    // Tab configuration for sentiment chart
    const sentimentTabs = [
        {
            name: 'Overall',
            data: [],
            categories: ['Positive', 'Neutral', 'Negative'],
            colors: ['emerald', 'amber', 'red'] as Array<AvailableChartColorsKeys>,
            summary: [
                {
                    name: 'Positive',
                    total: 0,
                    color: 'bg-emerald-500'
                },
                {
                    name: 'Neutral',
                    total: 0,
                    color: 'bg-amber-500'
                },
                {
                    name: 'Negative',
                    total: 0,
                    color: 'bg-red-500'
                }
            ]
        },
        {
            name: 'By Category',
            data: [],
            categories: ['Product', 'Support', 'UX'],
            colors: ['indigo', 'cyan', 'violet'] as Array<AvailableChartColorsKeys>,
            summary: [
                {
                    name: 'Product',
                    total: 0,
                    color: 'bg-indigo-500'
                },
                {
                    name: 'Support',
                    total: 0,
                    color: 'bg-cyan-500'
                },
                {
                    name: 'UX',
                    total: 0,
                    color: 'bg-violet-500'
                }
            ]
        }
    ];

    // Create full 12-month chart data by extending the existing data
    const fullYearChartData = []

    // Create time-filtered data for all components based on time periods
    const timeFilters = [
        // Last 7 days
        {
            topFeatureRequests: [],
            topQuestions: [],
            bugReports: [],
            chartData: []
        },
        // Last 6 months
        {
            topFeatureRequests: [],
            topQuestions: [],
            bugReports: [],
            chartData: []
        },
        // Last 12 months
        {
            topFeatureRequests: [],
            topQuestions: [],
            bugReports: [],
            chartData: []
        }
    ];

    // Create time-filtered data for the insights trend tabs
    const trendTabs = [
        {
            name: 'Last 7 days',
            data: [],
        },
        {
            name: 'Last 6 months',
            data: [],
        },
        {
            name: 'Last 12 months',
            data: [],
        },
    ];

    // Calculate totals for summary based on selected tab
    const getLatestData = (tabIndex: number) => {
        return { "Feature Requests": 0, "Bug Reports": 0, "Support Queries": 0 };
    };

    // Add state for selected tab
    const [selectedTab, setSelectedTab] = useState(1);

    // Get current latest data for summary metrics
    const latestData = getLatestData(selectedTab);
    const featureRequestsTotal = 0;
    const bugReportsTotal = 0;
    const supportQueriesTotal = 0;

    // Get current data for each card based on selected tab
    const currentFeatureRequests = [];
    const currentQuestions = [];
    const currentBugReports = [];

    // Add state for dialogs and search
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
    const [isQuestionsDialogOpen, setIsQuestionsDialogOpen] = useState(false);
    const [isBugDialogOpen, setIsBugDialogOpen] = useState(false);
    const [featureSearchQuery, setFeatureSearchQuery] = useState('');
    const [questionsSearchQuery, setQuestionsSearchQuery] = useState('');
    const [bugSearchQuery, setBugSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('30');
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedUrgencies, setSelectedUrgencies] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Define value formatter here to ensure it's in scope
    const valueFormatter = (number: number): string => {
        return Intl.NumberFormat("us").format(number).toString();
    };

    // --- Placeholder Data for Missing Variables ---
    const topicsData = { // Empty structure for ZoomableCirclePack
        name: "All Topics",
        children: []
    };

    const postsToShow: Post[] = [];
    // --- END Placeholder Data ---

    // --- NEW Filter Options ---
    const allSources: InsightSource[] = ['Community', 'Slack', 'Intercom', 'Reviews', 'Support Tickets', 'Social Media', 'Beta Feedback', 'Surveys'];
    const allIntents: InsightIntent[] = ['Bug Report', 'Feature Request', 'Question', 'Complaint', 'Praise', 'Objection', 'Suggestion', 'General Feedback', 'Integration Issue'];
    const allTopics: InsightTopic[] = ['UI/UX', 'Performance', 'Billing', 'API', 'Integrations', 'Mobile', 'Onboarding', 'Pricing', 'Security', 'Feature X', 'General'];
    const allUrgencies: InsightUrgency[] = ['High', 'Medium', 'Low', 'N/A'];
    const allStatuses: InsightResolutionStatus[] = ['Resolved', 'Unresolved', 'In Progress', 'N/A'];

    // --- NEW Filter Logic ---
    const filteredInsights = [];

    // --- NEW Helper Components / Mappings ---

    const UrgencyBadge = ({ urgency }: { urgency: InsightUrgency }) => {
        const colorMap: Record<InsightUrgency, string> = {
            'High': 'red',
            'Medium': 'amber',
            'Low': 'blue',
            'N/A': 'gray',
        };
        const iconMap: Record<InsightUrgency, React.ElementType> = {
            'High': RiFlagLine,
            'Medium': RiTimeLine,
            'Low': RiArrowDownLine,
            'N/A': RiQuestionLine,
        }
        return <Badge color={colorMap[urgency]} icon={iconMap[urgency]}>{urgency}</Badge>;
    };

    const StatusBadge = ({ status }: { status: InsightResolutionStatus }) => {
        const colorMap: Record<InsightResolutionStatus, string> = {
            'Resolved': 'emerald',
            'Unresolved': 'rose',
            'In Progress': 'indigo',
            'N/A': 'gray',
        };
        const iconMap: Record<InsightResolutionStatus, React.ElementType> = {
            'Resolved': RiCheckLine,
            'Unresolved': RiCloseLine, // Or RiQuestionLine
            'In Progress': RiSparklingLine,
            'N/A': RiQuestionLine,
        }
        return <Badge color={colorMap[status]} icon={iconMap[status]}>{status}</Badge>;
    };

    const SourceIcon = ({ source }: { source: InsightSource }) => {
        const iconMap: Record<InsightSource, React.ElementType> = {
            'Community': RiCommunityLine,
            'Slack': RiSlackLine,
            'Intercom': RiChat3Line,
            'Reviews': RiStarLine,
            'Support Tickets': RiChat1Line,
            'Social Media': RiMegaphoneLine, // Or RiTwitterLine if specifically needed
            'Beta Feedback': RiFlaskLine,
            'Surveys': RiUserVoiceLine,
        };
        const IconComp = iconMap[source] || RiQuestionLine;
        return <Icon icon={IconComp} tooltip={source} variant="light" size="sm" />;
    };

    const IntentIcon = ({ intent }: { intent: InsightIntent[] }) => {
        const iconMap: Record<InsightIntent, React.ElementType> = {
            'Bug Report': RiBugLine,
            'Feature Request': RiLightbulbFlashLine,
            'Question': RiQuestionLine,
            'Complaint': RiChat1Line, // Placeholder - adjust icon
            'Praise': RiHeartLine,
            'Objection': RiFlagLine, // Placeholder - adjust icon
            'Suggestion': RiSparklingLine,
            'General Feedback': RiChat1Line, // Placeholder - adjust icon
            'Integration Issue': RiToolsLine,
        };
        // Show the first intent's icon for simplicity in the table
        const firstIntent = intent[0] || 'General Feedback';
        const IconComp = iconMap[firstIntent as InsightIntent];
        const tooltipText = intent.join(', ');
        return <Icon icon={IconComp} tooltip={tooltipText} variant="light" size="sm" />;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // --- NEW Filter Bar Component ---
    const FilterBar = () => (
        <Card className="mb-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
                {/* Time Range */}
                <div className="flex flex-col">
                    <label htmlFor="timeRange" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Time Range</label>
                    <Select id="timeRange" defaultValue={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="14">Last 14 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                    </Select>
                </div>

                {/* Source */}
                <div className="flex flex-col">
                    <label htmlFor="sourceFilter" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Source</label>
                    <MultiSelect id="sourceFilter" value={selectedSources} onValueChange={setSelectedSources}>
                        {allSources.map(source => <MultiSelectItem key={source} value={source}>{source}</MultiSelectItem>)}
                    </MultiSelect>
                </div>

                {/* Intent */}
                <div className="flex flex-col">
                    <label htmlFor="intentFilter" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Intent</label>
                    <MultiSelect id="intentFilter" value={selectedIntents} onValueChange={setSelectedIntents}>
                        {allIntents.map(intent => <MultiSelectItem key={intent} value={intent}>{intent}</MultiSelectItem>)}
                    </MultiSelect>
                </div>

                {/* Topic */}
                <div className="flex flex-col">
                    <label htmlFor="topicFilter" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Topic</label>
                    <MultiSelect id="topicFilter" value={selectedTopics} onValueChange={setSelectedTopics}>
                        {allTopics.map(topic => <MultiSelectItem key={topic} value={topic}>{topic}</MultiSelectItem>)}
                    </MultiSelect>
                </div>

                {/* Urgency */}
                <div className="flex flex-col">
                    <label htmlFor="urgencyFilter" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Urgency</label>
                    <MultiSelect id="urgencyFilter" value={selectedUrgencies} onValueChange={setSelectedUrgencies}>
                        {allUrgencies.map(urgency => <MultiSelectItem key={urgency} value={urgency}>{urgency}</MultiSelectItem>)}
                    </MultiSelect>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                    <label htmlFor="statusFilter" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Status</label>
                    <MultiSelect id="statusFilter" value={selectedStatuses} onValueChange={setSelectedStatuses}>
                        {allStatuses.map(status => <MultiSelectItem key={status} value={status}>{status}</MultiSelectItem>)}
                    </MultiSelect>
                </div>

                {/* Search */}
                <div className="flex flex-col">
                    <label htmlFor="searchFilter" className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content mb-1">Search</label>
                    <TextInput
                        id="searchFilter"
                        icon={RiSearchLine}
                        placeholder="Search insights..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                </div>
            </div>
            {/* Active Filters Display */}
            <div className="mt-3 flex flex-wrap gap-2 items-center">
                <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mr-2">Active Filters:</span>
                {selectedSources.length === 0 && selectedIntents.length === 0 && selectedTopics.length === 0 && selectedUrgencies.length === 0 && selectedStatuses.length === 0 && !searchTerm ? (
                    <Badge color="gray">None</Badge>
                ) : (
                    <>
                        {selectedSources.map(s => <Badge key={s} color="blue">{s}</Badge>)}
                        {selectedIntents.map(i => <Badge key={i} color="violet">{i}</Badge>)}
                        {selectedTopics.map(t => <Badge key={t} color="teal">{t}</Badge>)}
                        {selectedUrgencies.map(u => <Badge key={u} color="amber">{u}</Badge>)}
                        {selectedStatuses.map(s => <Badge key={s} color="emerald">{s}</Badge>)}
                        {searchTerm && <Badge color="gray">Search: "{searchTerm}"</Badge>}
                    </>
                )}
                {(selectedSources.length > 0 || selectedIntents.length > 0 || selectedTopics.length > 0 || selectedUrgencies.length > 0 || selectedStatuses.length > 0 || searchTerm) && (
                    <Button
                        variant="light"
                        size="xs"
                        icon={RiCloseLine}
                        onClick={() => {
                            setSelectedSources([]);
                            setSelectedIntents([]);
                            setSelectedTopics([]);
                            setSelectedUrgencies([]);
                            setSelectedStatuses([]);
                            setSearchTerm('');
                        }}
                        tooltip="Clear all filters"
                    >
                        Clear
                    </Button>
                )}
            </div>
        </Card>
    );

    // --- NEW Insight Table Component ---
    const InsightTable = ({ personaFilter }: { personaFilter: Persona }) => {
        return (
            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Insight / Detail</TableHeaderCell>
                                <TableHeaderCell className="text-center">Source</TableHeaderCell>
                                <TableHeaderCell className="text-center">Intent</TableHeaderCell>
                                <TableHeaderCell>Topic</TableHeaderCell>
                                <TableHeaderCell className="text-center">Urgency</TableHeaderCell>
                                <TableHeaderCell className="text-center">Status</TableHeaderCell>
                                <TableHeaderCell className="text-right">Date</TableHeaderCell>
                                <TableHeaderCell className="text-right">Mentions</TableHeaderCell>
                                <TableHeaderCell className="text-center">Trend</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-10">
                                    <p className="text-tremor-content italic">No data available</p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>
        );
    };

    // Feature Requests and Support Questions dummy data
    const insightsData = [
        {
            date: 'Aug 01',
            'Feature Requests': 12,
            'Support Questions': 38,
            'Bug Reports': 5,
        },
        {
            date: 'Aug 02',
            'Feature Requests': 14,
            'Support Questions': 42,
            'Bug Reports': 7,
        },
        {
            date: 'Aug 03',
            'Feature Requests': 10,
            'Support Questions': 45,
            'Bug Reports': 4,
        },
        {
            date: 'Aug 04',
            'Feature Requests': 18,
            'Support Questions': 39,
            'Bug Reports': 9,
        },
        {
            date: 'Aug 05',
            'Feature Requests': 15,
            'Support Questions': 36,
            'Bug Reports': 6,
        },
        {
            date: 'Aug 06',
            'Feature Requests': 13,
            'Support Questions': 32,
            'Bug Reports': 8,
        },
        {
            date: 'Aug 07',
            'Feature Requests': 9,
            'Support Questions': 30,
            'Bug Reports': 5,
        },
        {
            date: 'Aug 08',
            'Feature Requests': 11,
            'Support Questions': 34,
            'Bug Reports': 7,
        },
        {
            date: 'Aug 09',
            'Feature Requests': 13,
            'Support Questions': 38,
            'Bug Reports': 9,
        },
        {
            date: 'Aug 10',
            'Feature Requests': 17,
            'Support Questions': 40,
            'Bug Reports': 11,
        },
        {
            date: 'Aug 11',
            'Feature Requests': 16,
            'Support Questions': 42,
            'Bug Reports': 8,
        },
        {
            date: 'Aug 12',
            'Feature Requests': 19,
            'Support Questions': 44,
            'Bug Reports': 12,
        },
        {
            date: 'Aug 13',
            'Feature Requests': 21,
            'Support Questions': 39,
            'Bug Reports': 10,
        },
        {
            date: 'Aug 14',
            'Feature Requests': 20,
            'Support Questions': 37,
            'Bug Reports': 9,
        },
        {
            date: 'Aug 15',
            'Feature Requests': 18,
            'Support Questions': 35,
            'Bug Reports': 7,
        },
        {
            date: 'Aug 16',
            'Feature Requests': 22,
            'Support Questions': 40,
            'Bug Reports': 13,
        },
        {
            date: 'Aug 17',
            'Feature Requests': 25,
            'Support Questions': 43,
            'Bug Reports': 15,
        },
        {
            date: 'Aug 18',
            'Feature Requests': 23,
            'Support Questions': 45,
            'Bug Reports': 14,
        },
        {
            date: 'Aug 19',
            'Feature Requests': 20,
            'Support Questions': 41,
            'Bug Reports': 12,
        },
        {
            date: 'Aug 20',
            'Feature Requests': 18,
            'Support Questions': 38,
            'Bug Reports': 9,
        },
        {
            date: 'Aug 21',
            'Feature Requests': 15,
            'Support Questions': 36,
            'Bug Reports': 8,
        },
        {
            date: 'Aug 22',
            'Feature Requests': 17,
            'Support Questions': 39,
            'Bug Reports': 11,
        },
        {
            date: 'Aug 23',
            'Feature Requests': 19,
            'Support Questions': 41,
            'Bug Reports': 14,
        },
        {
            date: 'Aug 24',
            'Feature Requests': 18,
            'Support Questions': 40,
            'Bug Reports': 13,
        },
        {
            date: 'Aug 25',
            'Feature Requests': 20,
            'Support Questions': 38,
            'Bug Reports': 10,
        },
        {
            date: 'Aug 26',
            'Feature Requests': 22,
            'Support Questions': 42,
            'Bug Reports': 16,
        },
        {
            date: 'Aug 27',
            'Feature Requests': 24,
            'Support Questions': 40,
            'Bug Reports': 14,
        },
        {
            date: 'Aug 28',
            'Feature Requests': 21,
            'Support Questions': 39,
            'Bug Reports': 12,
        },
        {
            date: 'Aug 29',
            'Feature Requests': 19,
            'Support Questions': 37,
            'Bug Reports': 9,
        },
        {
            date: 'Aug 30',
            'Feature Requests': 23,
            'Support Questions': 42,
            'Bug Reports': 15,
        },
        {
            date: 'Aug 31',
            'Feature Requests': 25,
            'Support Questions': 45,
            'Bug Reports': 17,
        },
    ];

    // States for Product Pages dialog
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const [productSearchQuery, setProductSearchQuery] = useState('');

    // Pages data for BarList in Product tab
    const pages = [
        { name: '/home', value: 2019 },
        { name: '/blocks', value: 1053 },
        { name: '/components', value: 997 },
        { name: '/docs/getting-started/installation', value: 982 },
        { name: '/docs/components/button', value: 782 },
        { name: '/docs/components/table', value: 752 },
        { name: '/docs/components/area-chart', value: 741 },
        { name: '/docs/components/badge', value: 750 },
        { name: '/docs/components/bar-chart', value: 750 },
        { name: '/docs/components/tabs', value: 720 },
        { name: '/docs/components/tracker', value: 723 },
        { name: '/docs/components/icons', value: 678 },
        { name: '/docs/components/list', value: 645 },
        { name: '/journal', value: 701 },
        { name: '/spotlight', value: 650 },
        { name: '/resources', value: 601 },
        { name: '/imprint', value: 345 },
        { name: '/about', value: 302 },
    ];

    // Filtered pages based on search query
    const filteredPages = pages.filter((item) =>
        item.name.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    // Generate time-specific dummy data based on selected tab
    const generateTimeSpecificData = (tab: number) => {
        // Feature Requests data per time period
        const featureRequestsData = [
            // Last 7 days
            [
                { name: 'Dark mode support', value: 187 },
                { name: 'Mobile app improvements', value: 134 },
                { name: 'Export to PDF function', value: 96 }
            ],
            // Last 6 months
            [
                { name: 'Integration with Slack', value: 328 },
                { name: 'Customize dashboard', value: 245 },
                { name: 'API improvements', value: 187 }
            ],
            // Last 12 months
            [
                { name: 'Add dark mode support', value: 421 },
                { name: 'Mobile app improvements', value: 352 },
                { name: 'Export to PDF function', value: 298 }
            ]
        ];

        // Support Questions data per time period
        const supportQuestionsData = [
            // Last 7 days
            [
                { name: 'Login issues on mobile', value: 156 },
                { name: 'Password reset help', value: 121 },
                { name: 'Data import failures', value: 89 }
            ],
            // Last 6 months
            [
                { name: 'How to reset password', value: 423 },
                { name: 'Login issues on mobile', value: 297 },
                { name: 'Data import failures', value: 243 }
            ],
            // Last 12 months
            [
                { name: 'How to reset password', value: 542 },
                { name: 'Login issues on mobile', value: 432 },
                { name: 'Account setup guide', value: 378 }
            ]
        ];

        // Bug Reports data per time period
        const bugReportsData = [
            // Last 7 days
            [
                { name: 'Form validation error', value: 76 },
                { name: 'Login failures', value: 65 },
                { name: 'Chart doesn\'t render', value: 54 }
            ],
            // Last 6 months
            [
                { name: 'Chart doesn\'t render on Safari', value: 187 },
                { name: 'API timeout on large datasets', value: 135 },
                { name: 'Form validation error', value: 98 }
            ],
            // Last 12 months
            [
                { name: 'Chart rendering issues', value: 243 },
                { name: 'API timeout errors', value: 203 },
                { name: 'Form validation bugs', value: 187 }
            ]
        ];

        // Area chart data per time period
        const areaChartData = [
            // Last 7 days (last 7 days data)
            insightsData.slice(-7),
            // Last 6 months (use all data)
            insightsData,
            // Last 12 months (double the data with slight variations)
            [
                ...insightsData.map(item => ({
                    ...item,
                    'Feature Requests': Math.floor(item['Feature Requests'] * 1.5),
                    'Support Questions': Math.floor(item['Support Questions'] * 1.3),
                    'Bug Reports': Math.floor(item['Bug Reports'] * 1.7)
                }))
            ]
        ];

        return {
            featureRequests: featureRequestsData[tab],
            supportQuestions: supportQuestionsData[tab],
            bugReports: bugReportsData[tab],
            areaChart: areaChartData[tab]
        };
    };

    // Add state for animation
    const [isChangingTimeframe, setIsChangingTimeframe] = useState(false);
    const [currentDataset, setCurrentDataset] = useState(() => generateTimeSpecificData(selectedTab));

    // Add timeout ref to handle animation timing
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Update data when tab changes
    useEffect(() => {
        setCurrentDataset(generateTimeSpecificData(selectedTab));
    }, [selectedTab]);

    // Function to handle timeframe change with animation
    const handleTimeframeChange = (value: string) => {
        // Set new tab immediately without animation
        setSelectedTab(parseInt(value) - 1);
    };

    return (
        <div className="p-6">
            <style jsx global>{`
                /* Remove general container transitions */
                
                /* Keep only data animations */
                .tremor-BarList-bar {
                    transition: width 0.7s ease-in-out, background-color 0.7s ease-in-out;
                }
                
                /* Enhanced area chart animations */
                .tremor-AreaChart-path {
                    transition: d 0.7s ease-in-out !important;
                }
                
                .tremor-AreaChart-gradientBackground {
                    transition: opacity 0.7s ease-in-out !important;
                }
                
                .tremor-AreaChart-line {
                    transition: d 0.7s ease-in-out !important;
                }
                
                .tremor-AreaChart-dot {
                    transition: transform 0.7s ease-in-out, opacity 0.7s ease-in-out !important;
                }
                
                .tremor-AreaChart-tickLabel, .tremor-AreaChart-text {
                    transition: transform 0.7s ease-in-out, opacity 0.7s ease-in-out !important;
                }
                
                .tremor-BarChart-bar rect {
                    transition: height 0.7s ease-in-out, y 0.7s ease-in-out;
                }
                
                /* Hide scrollbar for all browsers */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <Tabs defaultValue="overview">
                <TabsList className="mb-6" variant="solid">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="product">Product Insights</TabsTrigger>
                    <TabsTrigger value="support">Support Insights</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing Insights</TabsTrigger>
                </TabsList>

                {/* Overview Tab - Empty */}
                <TabsContent value="overview">
                    <div className="p-4 sm:p-6">
                        <header>
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Analytics Report
                                </h3>
                                <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-2">
                                    <Select
                                        className="w-full sm:w-fit [&>button]:rounded-tremor-small"
                                        enableClear={false}
                                        value={(selectedTab + 1).toString()}
                                        onValueChange={handleTimeframeChange}
                                    >
                                        <SelectItem value="1">Last 7 days</SelectItem>
                                        <SelectItem value="2">Last 6 months</SelectItem>
                                        <SelectItem value="3">Last 12 months</SelectItem>
                                    </Select>
                                </div>
                            </div>
                        </header>
                        <Divider />
                        <main>
                            <Card className="rounded-tremor-small p-0">
                                <div className="grid-cols-12 divide-y divide-tremor-border dark:divide-dark-tremor-border md:grid md:divide-x md:divide-y-0">
                                    {/* Left Column (BarLists) */}
                                    <div className="space-y-4 px-4 py-4 md:col-span-4">
                                        <Card className="p-0 sm:mx-auto sm:max-w-lg">
                                            <div className="flex h-2 items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="size-3 shrink-0 rounded-sm bg-blue-500"
                                                        aria-hidden={true}
                                                    />
                                                    <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                        Feature Requests
                                                    </p>

                                                </div>
                                                <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                                    Posts
                                                </p>
                                            </div>
                                            <BarList
                                                data={currentDataset.featureRequests}
                                                valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
                                                className="p-6"
                                                key={`feature-requests-${selectedTab}`}
                                            />
                                            <div className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-tremor-default bg-gradient-to-t from-tremor-background to-transparent py-7 dark:from-dark-tremor-background">
                                                <button
                                                    className="flex items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                                    onClick={() => setIsProductDialogOpen(true)}
                                                >
                                                    Show more
                                                </button>
                                            </div>
                                            <Dialog
                                                open={isProductDialogOpen}
                                                onClose={() => setIsProductDialogOpen(false)}
                                                static={true}
                                                className="z-[100]"
                                            >
                                                <DialogPanel className="overflow-hidden p-0">
                                                    <div className="border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                Pages
                                                            </p>
                                                            <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                                                Visitors
                                                            </p>
                                                        </div>
                                                        <TextInput
                                                            icon={RiSearchLine}
                                                            placeholder="Search page..."
                                                            className="mt-2 rounded-tremor-small"
                                                            value={productSearchQuery}
                                                            onValueChange={setProductSearchQuery}
                                                        />
                                                    </div>
                                                    <div className="h-96 overflow-y-scroll px-6 pt-4">
                                                        {filteredPages.length > 0 ? (
                                                            <BarList data={filteredPages} valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`} />
                                                        ) : (
                                                            <p className="flex h-full items-center justify-center text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                No results.
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 border-t border-tremor-border bg-tremor-background-muted p-6 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
                                                        <button
                                                            className="flex w-full items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                                            onClick={() => setIsProductDialogOpen(false)}
                                                        >
                                                            Go back
                                                        </button>
                                                    </div>
                                                </DialogPanel>
                                            </Dialog>
                                        </Card>

                                        <Card className="p-0 sm:mx-auto sm:max-w-lg">
                                            <div className="flex h-2 items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="size-3 shrink-0 rounded-sm bg-red-500"
                                                        aria-hidden={true}
                                                    />
                                                    <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                        Support Questions
                                                    </p>

                                                </div>
                                                <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                                    Posts
                                                </p>
                                            </div>
                                            <BarList
                                                data={currentDataset.supportQuestions}
                                                valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
                                                className="p-6"
                                                key={`support-questions-${selectedTab}`}
                                            />
                                            <div className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-tremor-default bg-gradient-to-t from-tremor-background to-transparent py-7 dark:from-dark-tremor-background">
                                                <button
                                                    className="flex items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                                    onClick={() => setIsQuestionsDialogOpen(true)}
                                                >
                                                    Show more
                                                </button>
                                            </div>
                                            <Dialog
                                                open={isQuestionsDialogOpen}
                                                onClose={() => setIsQuestionsDialogOpen(false)}
                                                static={true}
                                                className="z-[100]"
                                            >
                                                <DialogPanel className="overflow-hidden p-0">
                                                    <div className="border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                Support Questions
                                                            </p>
                                                            <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                                                Posts
                                                            </p>
                                                        </div>
                                                        <TextInput
                                                            icon={RiSearchLine}
                                                            placeholder="Search questions..."
                                                            className="mt-2 rounded-tremor-small"
                                                            value={questionsSearchQuery}
                                                            onValueChange={setQuestionsSearchQuery}
                                                        />
                                                    </div>
                                                    <div className="h-96 overflow-y-scroll px-6 pt-4">
                                                        {filteredPages.length > 0 ? (
                                                            <BarList data={filteredPages} valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`} />
                                                        ) : (
                                                            <p className="flex h-full items-center justify-center text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                No results.
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 border-t border-tremor-border bg-tremor-background-muted p-6 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
                                                        <button
                                                            className="flex w-full items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                                            onClick={() => setIsQuestionsDialogOpen(false)}
                                                        >
                                                            Go back
                                                        </button>
                                                    </div>
                                                </DialogPanel>
                                            </Dialog>
                                        </Card>

                                        <Card className="p-0 sm:mx-auto sm:max-w-lg">
                                            <div className="flex h-2 items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="size-3 shrink-0 rounded-sm bg-yellow-500"
                                                        aria-hidden={true}
                                                    />
                                                    <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                        Bug Reports
                                                    </p>

                                                </div>
                                                <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                                    Posts
                                                </p>
                                            </div>
                                            <BarList
                                                data={currentDataset.bugReports}
                                                valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
                                                className="p-6"
                                                key={`bug-reports-${selectedTab}`}
                                            />
                                            <div className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-tremor-default bg-gradient-to-t from-tremor-background to-transparent py-7 dark:from-dark-tremor-background">
                                                <button
                                                    className="flex items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                                    onClick={() => setIsBugDialogOpen(true)}
                                                >
                                                    Show more
                                                </button>
                                            </div>
                                            <Dialog
                                                open={isBugDialogOpen}
                                                onClose={() => setIsBugDialogOpen(false)}
                                                static={true}
                                                className="z-[100]"
                                            >
                                                <DialogPanel className="overflow-hidden p-0">
                                                    <div className="border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                Bug Reports
                                                            </p>
                                                            <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                                                Posts
                                                            </p>
                                                        </div>
                                                        <TextInput
                                                            icon={RiSearchLine}
                                                            placeholder="Search bugs..."
                                                            className="mt-2 rounded-tremor-small"
                                                            value={bugSearchQuery}
                                                            onValueChange={setBugSearchQuery}
                                                        />
                                                    </div>
                                                    <div className="h-96 overflow-y-scroll px-6 pt-4">
                                                        {filteredPages.length > 0 ? (
                                                            <BarList data={filteredPages} valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`} />
                                                        ) : (
                                                            <p className="flex h-full items-center justify-center text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                No results.
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 border-t border-tremor-border bg-tremor-background-muted p-6 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
                                                        <button
                                                            className="flex w-full items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                                            onClick={() => setIsBugDialogOpen(false)}
                                                        >
                                                            Go back
                                                        </button>
                                                    </div>
                                                </DialogPanel>
                                            </Dialog>
                                        </Card>
                                    </div>
                                    {/* Right Column (Empty Charts) */}
                                    <div className="p-4 md:col-span-8 md:h-auto">
                                        <div className="flex items-center mb-6">
                                            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                Insights Trends
                                            </h3>
                                        </div>

                                        <div className="border-t border-tremor-border p-6 dark:border-dark-tremor-border">
                                            <ul
                                                role="list"
                                                className="flex flex-wrap items-center gap-x-10 gap-y-4"
                                            >
                                                <li>
                                                    <div className="flex items-center space-x-2">
                                                        <span
                                                            className="size-3 shrink-0 rounded-sm bg-blue-500"
                                                            aria-hidden={true}
                                                        />
                                                        <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                            589
                                                        </p>
                                                    </div>
                                                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                        Feature Requests
                                                    </p>
                                                </li>
                                                <li>
                                                    <div className="flex items-center space-x-2">
                                                        <span
                                                            className="size-3 shrink-0 rounded-sm bg-red-500"
                                                            aria-hidden={true}
                                                        />
                                                        <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                            1,216
                                                        </p>
                                                    </div>
                                                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                        Support Questions
                                                    </p>
                                                </li>
                                                <li>
                                                    <div className="flex items-center space-x-2">
                                                        <span
                                                            className="size-3 shrink-0 rounded-sm bg-yellow-500"
                                                            aria-hidden={true}
                                                        />
                                                        <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                            310
                                                        </p>
                                                    </div>
                                                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                        Bug Reports
                                                    </p>
                                                </li>
                                            </ul>
                                            <AreaChart
                                                data={currentDataset.areaChart}
                                                index="date"
                                                categories={['Feature Requests', 'Support Questions', 'Bug Reports']}
                                                colors={['blue', 'red', 'yellow']}
                                                showLegend={false}
                                                showGradient={true}
                                                yAxisWidth={44}
                                                valueFormatter={valueFormatter}
                                                className="mt-10 hidden h-[28rem] sm:block"
                                                key={`area-chart-${selectedTab}`}
                                                animationDuration={700}
                                            />
                                            <AreaChart
                                                data={currentDataset.areaChart}
                                                index="date"
                                                categories={['Feature Requests', 'Support Questions', 'Bug Reports']}
                                                colors={['blue', 'red', 'yellow']}
                                                showLegend={false}
                                                showGradient={true}
                                                showYAxis={false}
                                                valueFormatter={valueFormatter}
                                                className="mt-6 h-[28rem] sm:hidden"
                                                key={`area-chart-mobile-${selectedTab}`}
                                                animationDuration={700}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </Card>
                            {/* Empty Bubble Chart Section */}
                            <Card className="rounded-tremor-small mt-6 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Side - BarList */}
                                    <div className="h-[28rem] overflow-y-auto hide-scrollbar">
                                        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
                                            Topic Distribution
                                        </h3>
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="size-3 shrink-0 rounded-sm bg-blue-500" aria-hidden={true} />
                                                <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Feature Requests
                                                </p>
                                            </div>
                                            <BarList
                                                data={[
                                                    { name: "Dark Mode Support", value: 78 },
                                                    { name: "Mobile App Improvements", value: 63 },
                                                    { name: "Export to PDF", value: 54 },
                                                    { name: "Bulk Editing", value: 48 },
                                                    { name: "Custom Dashboard", value: 42 }
                                                ]}
                                                valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="size-3 shrink-0 rounded-sm bg-yellow-500" aria-hidden={true} />
                                                <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Bug Reports
                                                </p>
                                            </div>
                                            <BarList
                                                data={[
                                                    { name: "Chart rendering on Safari", value: 45 },
                                                    { name: "API timeout issues", value: 38 },
                                                    { name: "Form validation errors", value: 32 },
                                                    { name: "Login failures", value: 28 },
                                                    { name: "Data not refreshing", value: 22 }
                                                ]}
                                                valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="size-3 shrink-0 rounded-sm bg-red-500" aria-hidden={true} />
                                                <p className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Support Questions
                                                </p>
                                            </div>
                                            <BarList
                                                data={[
                                                    { name: "Password reset process", value: 56 },
                                                    { name: "Connection issues", value: 42 },
                                                    { name: "Data import failures", value: 38 },
                                                    { name: "Account setup", value: 31 },
                                                    { name: "Billing questions", value: 27 }
                                                ]}
                                                valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    {/* Right Side - ZoomableCirclePack */}
                                    <div className="h-[28rem] relative">
                                        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
                                            Topic Clusters
                                        </h3>
                                        <div className="absolute inset-0 top-12 overflow-hidden">
                                            <ZoomableCirclePack
                                                data={{
                                                    name: "All Topics",
                                                    children: [
                                                        {
                                                            name: "Question",
                                                            children: [
                                                                {
                                                                    name: "Dashboard", children: [
                                                                        { name: "API", value: 47 },
                                                                        { name: "OAuth", value: 32 },
                                                                        { name: "Webhooks", value: 25 }
                                                                    ]
                                                                },
                                                                { name: "Navigation", value: 38 },
                                                                { name: "Forms", value: 35 },
                                                                { name: "Mobile UI", value: 28 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Bug",
                                                            children: [
                                                                { name: "Load Time", value: 53 },
                                                                { name: "API Speed", value: 34 },
                                                                { name: "Animation", value: 25 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Request",
                                                            children: [
                                                                {
                                                                    name: "Export", children: [
                                                                        { name: "API", value: 47 },
                                                                        { name: "OAuth", value: 32 },
                                                                        { name: "Webhooks", value: 25 }
                                                                    ]
                                                                },
                                                                { name: "Filters", value: 42 },
                                                                { name: "Search", value: 31 },
                                                                { name: "Reports", value: 39 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Complaint",
                                                            children: [
                                                                { name: "API", value: 47 },
                                                                { name: "OAuth", value: 32 },
                                                                { name: "Webhooks", value: 25 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Objection",
                                                            children: [
                                                                { name: "API", value: 47 },
                                                                { name: "OAuth", value: 32 },
                                                                { name: "Webhooks", value: 25 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Praise",
                                                            children: [
                                                                { name: "API", value: 47 },
                                                                { name: "OAuth", value: 32 },
                                                                { name: "Webhooks", value: 25 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Discussion",
                                                            children: [
                                                                { name: "API", value: 47 },
                                                                { name: "OAuth", value: 32 },
                                                                { name: "Webhooks", value: 25 }
                                                            ]
                                                        },
                                                        {
                                                            name: "Other",
                                                            children: [
                                                                { name: "API", value: 47 },
                                                                { name: "OAuth", value: 32 },
                                                                { name: "Webhooks", value: 25 }
                                                            ]
                                                        }
                                                    ]
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </main>
                    </div>
                </TabsContent>

                {/* --- NEW Empty Product Insights Tab --- */}
                <TabsContent value="product">
                    <div className="space-y-6 p-1">
                        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Product Insights Feed
                        </h3>

                    </div>
                </TabsContent>

                {/* --- NEW Empty Support Insights Tab --- */}
                <TabsContent value="support">
                    <div className="space-y-6 p-1">
                        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Support Insights Feed
                        </h3>
                        <Card className="p-6">
                            <p className="text-tremor-content italic text-center py-20">No support insights data available</p>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- NEW Empty Marketing Insights Tab --- */}
                <TabsContent value="marketing">
                    <div className="space-y-6 p-1">
                        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Marketing Insights Feed
                        </h3>
                        <Card className="p-6">
                            <p className="text-tremor-content italic text-center py-20">No marketing insights data available</p>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
} 