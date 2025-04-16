'use client';

import {useState} from 'react';
import {Send, Mail, MapPin, Phone} from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            setSubmitError('There was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                    Contact Me
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 text-center max-w-3xl mx-auto">
                    I'm available for freelance projects, full-time positions, and consulting opportunities. Let's
                    discuss how I can help with your project.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}
                              className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-600">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name"
                                           className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="subject"
                                       className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message"
                                       className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div
                                                className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4"/>
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>

                                {submitSuccess && (
                                    <div
                                        className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
                                        Your message has been sent successfully. I'll get back to you as soon as
                                        possible.
                                    </div>
                                )}

                                {submitError && (
                                    <div
                                        className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
                                        {submitError}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    <div>
                        <div
                            className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-600">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:contact@michelmany.com"
                                            className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                                        >
                                            contact@michelmany.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+1234567890"
                                            className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                                        >
                                            +1 (234) 567-890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Location
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            San Francisco, CA, USA
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                    Follow Me
                                </h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://github.com/michelmany"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full text-slate-600 hover:text-teal-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/michelmany"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full text-slate-600 hover:text-teal-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com/michelmany"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full text-slate-600 hover:text-teal-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
