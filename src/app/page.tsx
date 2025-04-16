import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, Github, Linkedin, Mail, FileText} from 'lucide-react';

export default function Home() {
    // TODO: This should be fetched from my API
    const featuredProjects = [
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
        }
    ];

    return (
        <div className="flex flex-col gap-16 py-8">
            {/* Hero Section */}
            <section className="py-20 px-4 text-center">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-col items-center gap-8">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden">
                            <Image
                                src="/images/profile.jpg"
                                alt="Michel Many"
                                fill
                                style={{objectFit: 'cover'}}
                                priority
                            />
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                Michel Many
                            </h1>
                            <h2 className="text-2xl md:text-3xl text-teal-600 dark:text-teal-400 mb-6">
                                Full Stack Developer
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                                I build modern, responsive, and user-friendly web applications with a focus on clean
                                code and great user experiences.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/portfolio"
                                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                                >
                                    <span>View Portfolio</span>
                                    <ArrowRight className="h-4 w-4"/>
                                </Link>
                                <Link
                                    href="/resume"
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white rounded-md transition-colors"
                                >
                                    <FileText className="h-4 w-4"/>
                                    <span>Download Resume</span>
                                </Link>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">

                            href="https://github.com/michelmany"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full text-slate-600 hover:text-teal-600 hover:bg-slate-100
                            dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                            >
                            <Github className="h-6 w-6"/>
                        </a>

                        href="https://linkedin.com/in/michelmany"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full text-slate-600 hover:text-teal-600 hover:bg-slate-100
                        dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                        >
                        <Linkedin className="h-6 w-6"/>
                    </a>

                    href="mailto:contact@michelmany.com"
                    className="p-3 rounded-full text-slate-600 hover:text-teal-600 hover:bg-slate-100
                    dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                    >
                    <Mail className="h-6 w-6"/>
                </a>
        </div>
</div>
</div>
</section>

    {/* About Section */
    }
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                    About Me
                </h2>
                <div className="prose dark:prose-invert prose-lg mx-auto">
                    <p>
                        I'm a Full Stack Developer with over 8 years of experience building web applications and digital
                        products.
                        My expertise spans across the entire development stack, from designing intuitive user interfaces
                        to
                        implementing robust backend systems.
                    </p>
                    <p>
                        I specialize in modern JavaScript frameworks like React and Next.js, paired with Node.js
                        backends
                        and various database technologies. I'm passionate about creating clean, maintainable code and
                        delivering
                        exceptional user experiences.
                    </p>
                    <p>
                        When I'm not coding, you can find me exploring new technologies, contributing to open-source
                        projects,
                        or sharing knowledge with the developer community.
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* Skills Section */
    }
    <section className="py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                    Skills & Technologies
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB',
                        'GraphQL', 'Tailwind CSS', 'Redux', 'Docker', 'AWS', 'Git', 'CI/CD', 'Responsive Design'].map((skill) => (
                        <div
                            key={skill}
                            className="p-4 text-center bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600"
                        >
                            <span className="text-slate-800 dark:text-slate-200">{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>

    {/* Featured Projects Section */
    }
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Featured Projects
                    </h2>
                    <Link
                        href="/portfolio"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                        <span>View All</span>
                        <ArrowRight className="h-4 w-4"/>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
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
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full"
                                        >
                          {tech}
                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span
                                            className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </section>

    {/* Contact Section */
    }
    <section className="py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Let's Work Together
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                    I'm currently available for freelance projects, full-time positions, and consulting opportunities.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors text-lg"
                >
                    <Mail className="h-5 w-5"/>
                    <span>Get in Touch</span>
                </Link>
            </div>
        </div>
    </section>
</div>
)
    ;
}
