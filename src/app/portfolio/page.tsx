'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    images: { url: string }[];
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch projects from an API
        const mockProjects = [
            {
                id: '1',
                title: 'E-Commerce Platform',
                slug: 'e-commerce-platform',
                description: 'A modern e-commerce platform built with Next.js and Stripe.',
                technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'Prisma'],
                images: [{url: '/images/project-1.jpg'}]
            },
            {
                id: '2',
                title: 'Health & Fitness App',
                slug: 'health-fitness-app',
                description: 'A mobile application for tracking health and fitness goals.',
                technologies: ['React Native', 'Firebase', 'Redux'],
                images: [{url: '/images/project-2.jpg'}]
            },
            {
                id: '3',
                title: 'Financial Dashboard',
                slug: 'financial-dashboard',
                description: 'Interactive dashboard for visualizing financial data.',
                technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
                images: [{url: '/images/project-3.jpg'}]
            },
            {
                id: '4',
                title: 'Social Media Platform',
                slug: 'social-media-platform',
                description: 'A full-featured social media platform with real-time chat.',
                technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
                images: [{url: '/images/project-4.jpg'}]
            },
            {
                id: '5',
                title: 'Content Management System',
                slug: 'content-management-system',
                description: 'Custom CMS for digital content with advanced editor capabilities.',
                technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
                images: [{url: '/images/project-5.jpg'}]
            },
            {
                id: '6',
                title: 'Task Management App',
                slug: 'task-management-app',
                description: 'Productivity app for managing tasks, projects, and team collaboration.',
                technologies: ['Vue.js', 'Vuex', 'Node.js', 'MongoDB'],
                images: [{url: '/images/project-6.jpg'}]
            }
        ];

        setProjects(mockProjects);
        setIsLoading(false);
    }, []);

    // Get unique technologies from all projects
    const allTechnologies = ['all', ...new Set(projects.flatMap(p => p.technologies))];

    // Filter projects based on selected technology
    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.technologies.includes(filter));

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                    My Portfolio
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 text-center max-w-3xl mx-auto">
                    A collection of my recent projects showcasing my skills and experience in web development.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {allTechnologies.map((tech) => (
                        <button
                            key={tech}
                            onClick={() => setFilter(tech)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                filter === tech
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                            }`}
                        >
                            {tech === 'all' ? 'All Projects' : tech}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/portfolio/${project.slug}`}
                                className="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-600"
                            >
                                <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-600">
                                    <Image
                                        src={project.images[0]?.url || '/images/placeholder.jpg'}
                                        alt={project.title}
                                        fill
                                        style={{objectFit: 'cover'}}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {filteredProjects.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            No projects found with the selected filter.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
