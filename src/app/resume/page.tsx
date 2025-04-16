'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Download} from 'lucide-react';

interface Resume {
    id: string;
    title: string;
    fileUrl: string;
}

export default function ResumePage() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch resume data from an API
        const mockResume = {
            id: '1',
            title: 'Michel Many - Full Stack Developer Resume',
            fileUrl: '/resume/michel-many-resume.pdf'
        };

        setResume(mockResume);
        setIsLoading(false);
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                    My Resume
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 text-center">
                    Download my resume to learn more about my skills, experience, and education.
                </p>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                    </div>
                ) : resume ? (
                    <div className="flex flex-col items-center gap-8">
                        <div
                            className="relative w-full bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
                            <div className="h-[800px] w-full relative">
                                <iframe
                                    src={`${resume.fileUrl}#view=Fit`}
                                    className="absolute inset-0 w-full h-full"
                                    title="Resume Preview"
                                />
                            </div>
                        </div>

                        <a
                            href={resume.fileUrl}
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white
                            rounded-md transition-colors"
                        >
                            <Download className="h-5 w-5"/>
                            <span>Download Resume</span>
                        </a>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            Resume file not found.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                        >
                            <span>Contact me to request my resume</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
