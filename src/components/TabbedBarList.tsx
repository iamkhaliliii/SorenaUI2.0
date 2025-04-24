'use client';

import { useState } from 'react';
import { BarList } from './BarList';

const featureRequests = [
    {
        name: 'Emoji Reactions',
        value: 24,
    },
    {
        name: 'Media Sharing',
        value: 18,
    },
    {
        name: 'Message Threading',
        value: 12,
    },
    {
        name: 'Read Receipts',
        value: 7,
    },
    {
        name: 'Voice Messages',
        value: 5,
    },
];

const requestSources = [
    {
        name: 'Bettermode',
        value: 32,
    },
    {
        name: 'G2',
        value: 24,
    },
    {
        name: 'X',
        value: 18,
    },
    {
        name: 'Intercom',
        value: 15,
    },
    {
        name: 'Support Tickets',
        value: 11,
    },
];

const tabs = [
    {
        name: 'Features',
        data: featureRequests,
    },
    {
        name: 'Sources',
        data: requestSources,
    },
];

const valueFormatter = (number: number) => `${number}`;

export function TabbedBarList() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-50">
                    Request Analytics
                </p>
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-md p-0.5">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(index)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === index
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-2">
                <BarList
                    data={tabs[activeTab].data}
                    valueFormatter={valueFormatter}
                    className="mt-2"
                />
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                    <span>Data collected from {tabs[activeTab].name === 'Features' ? 'user feedback' : 'platform analytics'}</span>
                    <span className="text-gray-400 dark:text-gray-500">Last 30 days</span>
                </p>
            </div>
        </div>
    );
} 