'use client';

import {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Link from 'next/link';
import {ChevronLeft} from 'lucide-react';
import ProjectForm from '../../components/ProjectForm';

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    technologies: string[];
    websiteUrl?: string;
    githubUrl?: string;
    featured: boolean;
    images: {
        id: string;
        url: string;
        caption?: string;
        order: number;
    }[];
}

export default function EditProjectPage() {
    const {id} = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Todo: Fetch project data from an API
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
            featured: true,
            images: [
                {
                    id: '1',
                    url: '/images/project-1.jpg',
                    caption: 'Homepage design showcasing featured products',
                    order: 0
                },
                {
                    id: '2',
                    url: '/images/project-1-detail.jpg',
                    caption: 'Product detail page with customization options',
                    order: 1
                },
                {id: '3', url: '/images/project-1-cart.jpg', caption: 'Shopping cart with real-time updates', order: 2},
                {
                    id: '4',
                    url: '/images/project-1-checkout.jpg',
                    caption: 'Secure checkout process with Stripe integration',
                    order: 3
                },
                {
                    id: '5',
                    url: '/images/project-1-admin.jpg',
                    caption: 'Admin dashboard for product management',
                    order: 4
                }
            ]
        };

        // Check if the ID matches our mock project
        if (id === '1') {
            setProject(mockProject);
        } else {
            setError('Project not found');
        }

        setIsLoading(false);
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="space-y-8">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                            <ChevronLeft className="h-4 w-4"/>
                            <span>Back to Projects</span>
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Error
                    </h1>
                    <p className="text-red-600 dark:text-red-400">
                        {error || 'Failed to load project'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        <span>Back to Projects</span>
                    </Link>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    Edit Project
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                    Update project details and content
                </p>
            </div>

            <div
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <ProjectForm project={project} isEditing={true}/>
            </div>
        </div>
    );
}
