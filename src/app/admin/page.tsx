'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {Briefcase, FileText, Github, Users, Link as LinkIcon, ArrowRight} from 'lucide-react';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        projects: 0,
        resumes: 0,
        github: 0,
        socialLinks: 0
    });

    useEffect(() => {
        // Todo: Fetch stats from API
        setStats({
            projects: 6,
            resumes: 2,
            github: 6,
            socialLinks: 4
        });
    }, []);

    const statCards = [
        {
            title: 'Projects',
            value: stats.projects,
            icon: <Briefcase className="h-6 w-6"/>,
            href: '/admin/projects',
            color: 'bg-blue-500'
        },
        {
            title: 'Resumes',
            value: stats.resumes,
            icon: <FileText className="h-6 w-6"/>,
            href: '/admin/resume',
            color: 'bg-green-500'
        },
        {
            title: 'Github Repos',
            value: stats.github,
            icon: <Github className="h-6 w-6"/>,
            href: '/admin/github',
            color: 'bg-purple-500'
        },
        {
            title: 'Social Links',
            value: stats.socialLinks,
            icon: <LinkIcon className="h-6 w-6"/>,
            href: '/admin/social',
            color: 'bg-orange-500'
        }
    ];

    const recentActivities = [
        {
            id: 1,
            action: 'Added new project',
            item: 'E-Commerce Platform',
            date: '2 hours ago'
        },
        {
            id: 2,
            action: 'Updated resume',
            item: 'Michel Many - Full Stack Developer Resume',
            date: '1 day ago'
        },
        {
            id: 3,
            action: 'Added GitHub repository',
            item: 'content-management-system',
            date: '3 days ago'
        },
        {
            id: 4,
            action: 'Updated project',
            item: 'Health & Fitness App',
            date: '1 week ago'
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    Welcome to your portfolio admin panel
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${card.color} text-white`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    {card.title}
                                </p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {card.value}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                        Recent Activity
                    </h2>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="p-4 sm:px-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {activity.action}
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {activity.item}
                                    </p>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-500">
                                    {activity.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <Link
                        href="/admin/activity"
                        className="flex items-center justify-center gap-1 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                        <span>View All Activity</span>
                        <ArrowRight className="h-4 w-4"/>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <Link
                            href="/admin/projects/new"
                            className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Briefcase className="h-5 w-5 text-teal-600 dark:text-teal-400"/>
                                <span className="text-slate-800 dark:text-slate-200">Add New Project</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-500 dark:text-slate-400"/>
                        </Link>
                        <Link
                            href="/admin/resume/new"
                            className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400"/>
                                <span className="text-slate-800 dark:text-slate-200">Upload Resume</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-500 dark:text-slate-400"/>
                        </Link>
                        <Link
                            href="/admin/social/new"
                            className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <LinkIcon className="h-5 w-5 text-teal-600 dark:text-teal-400"/>
                                <span className="text-slate-800 dark:text-slate-200">Add Social Link</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-500 dark:text-slate-400"/>
                        </Link>
                    </div>
                </div>

                <div
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                        System Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">API Status</span>
                            <span
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                            Operational
                          </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Database</span>
                            <span
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                            Connected
                          </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Last Backup</span>
                            <span className="text-slate-900 dark:text-white">
                            2 days ago
                          </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Storage Usage</span>
                            <span className="text-slate-900 dark:text-white">
                            125 MB / 1 GB
                          </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
