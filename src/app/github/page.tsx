'use client';

import {useEffect, useState} from 'react';
import {Star, GitFork, ExternalLink} from 'lucide-react';

interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
    created_at: string;
    updated_at: string;
}

export default function GithubPage() {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // TODO: Fetch repos from GitHub API
        const mockRepos = [
            {
                id: 1,
                name: 'portfolio-website',
                description: 'My personal portfolio website built with Next.js and Tailwind CSS',
                html_url: 'https://github.com/michelmany/portfolio-website',
                stargazers_count: 15,
                forks_count: 5,
                language: 'TypeScript',
                topics: ['nextjs', 'tailwindcss', 'portfolio', 'react'],
                created_at: '2023-01-15T10:30:00Z',
                updated_at: '2023-04-20T14:45:00Z'
            },
            {
                id: 2,
                name: 'e-commerce-platform',
                description: 'A full-featured e-commerce platform with Stripe integration',
                html_url: 'https://github.com/michelmany/e-commerce-platform',
                stargazers_count: 32,
                forks_count: 12,
                language: 'JavaScript',
                topics: ['ecommerce', 'nextjs', 'stripe', 'react'],
                created_at: '2022-07-08T09:15:00Z',
                updated_at: '2023-03-12T18:30:00Z'
            },
            {
                id: 3,
                name: 'task-management-app',
                description: 'A task management application with team collaboration features',
                html_url: 'https://github.com/michelmany/task-management-app',
                stargazers_count: 24,
                forks_count: 8,
                language: 'TypeScript',
                topics: ['vue', 'node', 'mongodb', 'task-management'],
                created_at: '2022-03-22T15:45:00Z',
                updated_at: '2023-01-05T11:20:00Z'
            },
            {
                id: 4,
                name: 'content-management-system',
                description: 'Custom CMS with headless architecture',
                html_url: 'https://github.com/michelmany/content-management-system',
                stargazers_count: 18,
                forks_count: 6,
                language: 'TypeScript',
                topics: ['cms', 'nextjs', 'graphql', 'prisma'],
                created_at: '2022-09-10T08:00:00Z',
                updated_at: '2023-02-28T16:30:00Z'
            },
            {
                id: 5,
                name: 'finance-dashboard',
                description: 'Interactive dashboard for visualizing financial data',
                html_url: 'https://github.com/michelmany/finance-dashboard',
                stargazers_count: 27,
                forks_count: 9,
                language: 'JavaScript',
                topics: ['react', 'd3js', 'dashboard', 'finance'],
                created_at: '2022-05-15T12:30:00Z',
                updated_at: '2023-03-05T09:45:00Z'
            },
            {
                id: 6,
                name: 'health-fitness-app',
                description: 'Mobile app for tracking health and fitness goals',
                html_url: 'https://github.com/michelmany/health-fitness-app',
                stargazers_count: 21,
                forks_count: 7,
                language: 'JavaScript',
                topics: ['react-native', 'fitness', 'mobile', 'firebase'],
                created_at: '2022-11-08T14:20:00Z',
                updated_at: '2023-04-10T10:15:00Z'
            }
        ];

        setRepos(mockRepos);
        setIsLoading(false);
    }, []);

    // Get all languages from repos
    const languages = ['all', ...new Set(repos.map(repo => repo.language))];

    // Filter repos based on selected language
    const filteredRepos = filter === 'all'
        ? repos
        : repos.filter(repo => repo.language === filter);

    // Format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                    GitHub Projects
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 text-center max-w-3xl mx-auto">
                    A selection of my open-source projects and contributions on GitHub.
                </p>

                {/* Filter by language */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {languages.map((language) => (
                        <button
                            key={language}
                            onClick={() => setFilter(language)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                filter === language
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                            }`}
                        >
                            {language === 'all' ? 'All Languages' : language}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-red-600 dark:text-red-400 mb-4">
                            {error}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                            Please try again later or check out my profile directly on GitHub.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredRepos.map((repo) => (
                            <div
                                key={repo.id}
                                className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md border border-slate-200 dark:border-slate-600 p-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {repo.name}
                                    </h3>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                                        aria-label={`View ${repo.name} on GitHub`}
                                    >
                                        <ExternalLink className="h-5 w-5"/>
                                    </a>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                                    {repo.description || 'No description available'}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {repo.topics.map((topic) => (
                                        <span
                                            key={topic}
                                            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4"/>
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork className="h-4 w-4"/>
                                            <span>{repo.forks_count}</span>
                                        </div>
                                        {repo.language && (
                                            <div className="flex items-center gap-1">
                                                <span className={`w-3 h-3 rounded-full ${
                                                    repo.language === 'TypeScript' ? 'bg-blue-500' :
                                                        repo.language === 'JavaScript' ? 'bg-yellow-400' :
                                                            'bg-gray-400'
                                                }`}></span>
                                                <span>{repo.language}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <span>Updated {formatDate(repo.updated_at)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredRepos.length === 0 && !isLoading && !error && (
                    <div className="text-center py-12">
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            No repositories found with the selected language.
                        </p>
                    </div>
                )}

                <div className="text-center mt-12">
                    <a
                        href="https://github.com/michelmany"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-md transition-colors"
                    >
                        <span>View All Repositories</span>
                        <ExternalLink className="h-4 w-4"/>
                    </a>
                </div>
            </div>
        </div>
    );
}
