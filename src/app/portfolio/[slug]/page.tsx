'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronLeft, Globe, Github} from 'lucide-react';
import {useParams} from 'next/navigation';

interface ProjectImage {
    id: string;
    url: string;
    caption?: string;
}

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    technologies: string[];
    websiteUrl?: string;
    githubUrl?: string;
    images: ProjectImage[];
}

export default function ProjectPage() {
    const {slug} = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        // TODO: Fetch project data from an API
        const mockProject = {
            id: '1',
            title: 'E-Commerce Platform',
            slug: 'e-commerce-platform',
            description: 'A modern e-commerce platform built with Next.js and Stripe.',
            content: `
        <p>This e-commerce platform provides a seamless shopping experience for customers and an intuitive management interface for store owners.</p>
        
        <h3>Project Overview</h3>
        <p>The primary goal was to create a fast, responsive, and user-friendly e-commerce solution that could handle products, categories, shopping carts, and secure payments.</p>
        
        <h3>Technical Details</h3>
        <p>The front-end is built with Next.js and Tailwind CSS, focusing on performance and responsive design. The back-end uses Node.js with Express for the API, and Prisma as the ORM for database operations.</p>
        
        <p>Key features include:</p>
        <ul>
          <li>Responsive product catalog with advanced filtering</li>
          <li>User authentication and authorization</li>
          <li>Shopping cart with localStorage persistence</li>
          <li>Secure checkout process with Stripe integration</li>
          <li>Admin dashboard for product and order management</li>
          <li>Optimized images and lazy loading for performance</li>
        </ul>
        
        <h3>Challenges and Solutions</h3>
        <p>One of the main challenges was optimizing the performance of the product catalog with a large number of items. This was solved by implementing efficient pagination, image optimization, and selective loading of product details.</p>
        
        <h3>Outcome</h3>
        <p>The platform resulted in a 35% increase in conversion rate compared to the client's previous solution, with a 25% decrease in page load times and improved user engagement metrics.</p>
      `,
            technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Stripe', 'Redux'],
            websiteUrl: 'https://example-ecommerce.com',
            githubUrl: 'https://github.com/michelmany/ecommerce-platform',
            images: [
                {id: '1', url: '/images/project-1.jpg', caption: 'Homepage design showcasing featured products'},
                {
                    id: '2',
                    url: '/images/project-1-detail.jpg',
                    caption: 'Product detail page with customization options'
                },
                {id: '3', url: '/images/project-1-cart.jpg', caption: 'Shopping cart with real-time updates'},
                {
                    id: '4',
                    url: '/images/project-1-checkout.jpg',
                    caption: 'Secure checkout process with Stripe integration'
                },
                {id: '5', url: '/images/project-1-admin.jpg', caption: 'Admin dashboard for product management'}
            ]
        };

        if (mockProject.slug === slug) {
            setProject(mockProject);
            setSelectedImage(mockProject.images[0]?.url || null);
        }

        setIsLoading(false);
    }, [slug]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Project Not Found</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-8">
                        The project you are looking for does not exist or has been removed.
                    </p>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        <span>Back to Portfolio</span>
                    </Link>
                </div>

                <div className="flex flex-col gap-10">
                    <header>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            {project.title}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full"
                                >{tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {project.websiteUrl && (
                                <a
                                    href={project.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                                >
                                    <Globe className="h-4 w-4"/>
                                    <span>Visit Website</span>
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white rounded-md transition-colors"
                                >
                                    <Github className="h-4 w-4"/>
                                    <span>View Source</span>
                                </a>
                            )}
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3">
                            <div
                                className="relative aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                                {selectedImage && (
                                    <Image
                                        src={selectedImage}
                                        alt={project.title}
                                        fill
                                        style={{objectFit: 'cover'}}
                                    />
                                )}
                            </div>
                            <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                                {project.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImage(image.url)}
                                        className={`relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                                            selectedImage === image.url
                                                ? 'border-teal-600 dark:border-teal-400'
                                                : 'border-transparent'
                                        }`}
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.caption || project.title}
                                            fill
                                            style={{objectFit: 'cover'}}
                                        />
                                    </button>
                                ))}
                            </div>
                            {project.images.find(img => img.url === selectedImage)?.caption && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                    {project.images.find(img => img.url === selectedImage)?.caption}
                                </p>
                            )}
                        </div>

                        <div className="lg:col-span-2">
                            <div
                                className="prose dark:prose-invert prose-slate prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-teal-600 dark:prose-a:text-teal-400 max-w-none"
                                dangerouslySetInnerHTML={{__html: project.content}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
