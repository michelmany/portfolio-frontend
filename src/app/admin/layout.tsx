'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {LogOut, Menu, X, Briefcase, FileText, Github, Link as LinkIcon, User} from 'lucide-react';

export default function AdminLayout({children}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    const navItems = [
        {name: 'Dashboard', href: '/admin', icon: <Briefcase className="h-5 w-5"/>},
        {name: 'Projects', href: '/admin/projects', icon: <Briefcase className="h-5 w-5"/>},
        {name: 'Resume', href: '/admin/resume', icon: <FileText className="h-5 w-5"/>},
        {name: 'GitHub', href: '/admin/github', icon: <Github className="h-5 w-5"/>},
        {name: 'Social Links', href: '/admin/social', icon: <LinkIcon className="h-5 w-5"/>},
        {name: 'Profile', href: '/admin/profile', icon: <User className="h-5 w-5"/>},
    ];

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // The redirect will handle it
    }

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div
                        className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                        <Link href="/admin" className="text-xl font-bold text-teal-600 dark:text-teal-400">
                            Admin Panel
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
                        >
                            <X className="h-5 w-5"/>
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                                            pathname === item.href
                                                ? 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-300'
                                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                                        }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        >
                            <LogOut className="h-5 w-5"/>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-x-hidden">
                {/* Header */}
                <header className="bg-white dark:bg-slate-800 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                        </button>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                target="_blank"
                                className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
                            >
                                View Website
                            </Link>
                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                <span className="font-medium">Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
