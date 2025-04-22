'use client';

import { RiArrowRightSLine, RiDonutChartFill } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            // This is a mock authentication - in a real app, you would call your auth API
            if (email && password) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push('/quotes/overview');
            } else {
                setError('Please enter both email and password');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mx-auto h-full max-w-[90rem]">
                <div className="flex min-h-screen flex-1 items-center">
                    <div className="mx-auto my-12 flex min-h-screen max-w-lg flex-1 flex-col justify-center px-4 sm:px-8 lg:my-0 lg:px-20">
                        <div className="mx-auto w-full sm:max-w-sm lg:max-w-full">
                            <div className="flex items-center space-x-2.5">
                                <RiDonutChartFill
                                    className="size-7 text-gray-900 dark:text-gray-50"
                                    aria-hidden="true"
                                />
                                <p className="font-medium text-gray-900 dark:text-gray-50">
                                    Company
                                </p>
                            </div>
                            <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-50">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                                Don't have an account?{' '}
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                                >
                                    Sign up
                                </a>
                            </p>
                            {error && (
                                <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="john@company.com"
                                        className="mt-2"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-900 dark:text-gray-50"
                                        >
                                            Password
                                        </Label>
                                        <a
                                            href="#"
                                            className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="mt-2"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                                <Button type="submit" className="mt-4 w-full" isLoading={isLoading} loadingText="Signing in">
                                    Sign in
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div
                        className="hidden h-full min-h-screen flex-1 border-l border-gray-200 p-8 dark:border-gray-800 lg:flex"
                        aria-label="Changelog"
                    >
                        <div className="flex w-full flex-1 items-center justify-center">
                            <div className="max-w-md">
                                <div>
                                    <h2 className="font-mono text-sm text-gray-700 dark:text-gray-300">
                                        Changelog
                                    </h2>
                                    <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                                        New ComboChart, fixed axis padding, and updated color
                                        palettes
                                    </p>
                                </div>
                                <div className="relative mt-6 h-64 max-w-[450px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/80 to-blue-400/20 p-6 shadow-lg shadow-black/10">
                                    <div className="flex h-full flex-col justify-between">
                                        <p className="text-2xl font-semibold text-white dark:text-white">
                                            Fall Release
                                        </p>
                                        <p className="text-lg text-white dark:text-white">2024</p>
                                    </div>
                                    <div
                                        className="pointer-events-none absolute left-1/2 top-0 -mt-2 -translate-x-1/2 select-none"
                                        aria-hidden="true"
                                        style={{
                                            maskImage:
                                                'radial-gradient(rgba(0, 0, 0, 1) 0%, transparent 80%)',
                                            WebkitMaskImage:
                                                'radial-gradient(rgba(0, 0, 0, 1) 0%, transparent 80%)',
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            {Array.from({ length: 20 }, (_, idx) => (
                                                <div key={`outer-${idx}`}>
                                                    <div className="flex gap-2">
                                                        {Array.from({ length: 20 }, (_, idx2) => (
                                                            <div key={`inner-${idx}-${idx2}`}>
                                                                <div className="size-7 rounded-md shadow shadow-blue-500/40 ring-1 ring-black/5 dark:shadow-blue-400/20 dark:ring-white/10" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:underline hover:underline-offset-4"
                                >
                                    Learn more
                                    <RiArrowRightSLine
                                        className="size-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 