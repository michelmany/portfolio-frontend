'use client';

import ProjectForm from '../components/ProjectForm';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
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
                    Add New Project
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                    Create a new project to showcase in your portfolio
                </p>
            </div>

            <div
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <ProjectForm/>
            </div>
        </div>
    );
}
