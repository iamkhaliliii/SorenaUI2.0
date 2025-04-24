'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import CountUp from 'react-countup';

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

const valueFormatter = (number: number) => `${number}`;

const initialSum = featureRequests.reduce(
    (sum, dataPoint) => sum + (dataPoint.value || 0),
    0,
);

export function FeatureRequestStats() {
    const [values, setValues] = useState({
        start: initialSum,
        end: initialSum,
    });
    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

    const handleBarClick = (item: any) => {
        setSelectedItem(item.name);
        setValues(() => ({
            start: initialSum,
            end: item.value,
        }));
    };

    const clearSelectedItem = () => {
        setSelectedItem(undefined);
        setValues((prev) => ({
            start: prev.end,
            end: initialSum,
        }));
    };

    return (
        <>
            <div className="rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-4 mb-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Similar Requests
                </span>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    <CountUp
                        start={values.start}
                        end={values.end}
                        delay={0}
                    />
                </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-50">
                        Feature Requests
                    </p>
                    {selectedItem && (
                        <button
                            type="button"
                            onClick={clearSelectedItem}
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                            aria-label="Remove"
                        >
                            <span className="font-semibold">{selectedItem}</span>
                            <X className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" aria-hidden={true} />
                        </button>
                    )}
                </div>
                <div>
                    <BarList
                        data={featureRequests.filter(
                            (item) => !selectedItem || item.name === selectedItem,
                        )}
                        valueFormatter={valueFormatter}
                        onValueChange={(item) => handleBarClick(item)}
                    />
                </div>
            </div>
        </>
    );
} 