'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {X, Upload, Plus, ChevronUp, ChevronDown} from 'lucide-react';

interface ProjectImage {
    id: string;
    url: string;
    caption?: string;
    order: number;
}

interface Project {
    id?: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    technologies: string[];
    websiteUrl?: string;
    githubUrl?: string;
    featured: boolean;
    images: ProjectImage[];
}

interface ProjectFormProps {
    project?: Project;
    isEditing?: boolean;
}

export default function ProjectForm({project, isEditing = false}: ProjectFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Project>({
        title: '',
        slug: '',
        description: '',
        content: '',
        technologies: [],
        websiteUrl: '',
        githubUrl: '',
        featured: false,
        images: []
    });
    const [technology, setTechnology] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageCaption, setImageCaption] = useState('');

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData(prev => ({...prev, [name]: checked}));
    };

    const handleSlugGeneration = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');
        setFormData(prev => ({...prev, slug}));
    };

    const addTechnology = () => {
        if (technology.trim() && !formData.technologies.includes(technology.trim())) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, technology.trim()]
            }));
            setTechnology('');
        }
    };

    const removeTechnology = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t !== tech)
        }));
    };

    const addImage = () => {
        if (imageUrl.trim()) {
            const newImage: ProjectImage = {
                id: Date.now().toString(),
                url: imageUrl.trim(),
                caption: imageCaption.trim() || undefined,
                order: formData.images.length
            };

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, newImage]
            }));

            setImageUrl('');
            setImageCaption('');
        }
    };

    const removeImage = (id: string) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img.id !== id)
        }));
    };

    const moveImage = (id: string, direction: 'up' | 'down') => {
        const imageIndex = formData.images.findIndex(img => img.id === id);
        if (
            (direction === 'up' && imageIndex === 0) ||
            (direction === 'down' && imageIndex === formData.images.length - 1)
        ) {
            return;
        }

        const newImages = [...formData.images];
        const swapIndex = direction === 'up' ? imageIndex - 1 : imageIndex + 1;

        // Swap the images
        [newImages[imageIndex], newImages[swapIndex]] = [newImages[swapIndex], newImages[imageIndex]];

        // Update order values
        newImages.forEach((img, index) => {
            img.order = index;
        });

        setFormData(prev => ({...prev, images: newImages}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Todo: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Redirect to projects list
            router.push('/admin/projects');
        } catch (error) {
            setSubmitError('An error occurred while saving the project');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {submitError && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
                    {submitError}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Title *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Slug *
                        </label>
                        <div className="flex gap-2">
                            <input
                                id="slug"
                                name="slug"
                                type="text"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                            />
                            <button
                                type="button"
                                onClick={handleSlugGeneration}
                                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white rounded-md transition-colors flex-shrink-0"
                            >
                                Generate
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Used in the URL: https://yourdomain.com/portfolio/{formData.slug || 'your-project-slug'}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="description"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                        ></textarea>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            A short description of the project (used in project cards)
                        </p>
                    </div>

                    <div>
                        <label htmlFor="content"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Content *
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={10}
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                            placeholder="Supports basic HTML tags for formatting"
                        ></textarea>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            The main content of the project (supports HTML formatting)
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="technologies"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Technologies *
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                id="technology-input"
                                type="text"
                                value={technology}
                                onChange={(e) => setTechnology(e.target.value)}
                                placeholder="Add a technology"
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTechnology();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={addTechnology}
                                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white rounded-md transition-colors flex-shrink-0"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.technologies.map((tech) => (
                                <div
                                    key={tech}
                                    className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full"
                                >
                                    <span>{tech}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTechnology(tech)}
                                        className="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                                    >
                                        <X className="h-3 w-3"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {formData.technologies.length === 0 && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Add at least one technology
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="websiteUrl"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Website URL
                        </label>
                        <input
                            id="websiteUrl"
                            name="websiteUrl"
                            type="url"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                            placeholder="https://example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="githubUrl"
                               className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            GitHub URL
                        </label>
                        <input
                            id="githubUrl"
                            name="githubUrl"
                            type="url"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                            placeholder="https://github.com/username/repo"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="featured"
                            name="featured"
                            type="checkbox"
                            checked={formData.featured}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Featured project (shown on homepage)
                        </label>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Project Images
                        </h3>
                        <div className="space-y-4">
                            <div className="border border-slate-300 dark:border-slate-600 rounded-md p-4">
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor="imageUrl"
                                               className="block text-sm text-slate-700 dark:text-slate-300 mb-1">
                                            Image URL *
                                        </label>
                                        <input
                                            id="imageUrl"
                                            type="text"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="imageCaption"
                                               className="block text-sm text-slate-700 dark:text-slate-300 mb-1">
                                            Caption (optional)
                                        </label>
                                        <input
                                            id="imageCaption"
                                            type="text"
                                            value={imageCaption}
                                            onChange={(e) => setImageCaption(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                            placeholder="Image description"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addImage}
                                        disabled={!imageUrl.trim()}
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors ${
                                            !imageUrl.trim() ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <Plus className="h-4 w-4"/>
                                        <span>Add Image</span>
                                    </button>
                                </div>
                            </div>

                            {formData.images.length > 0 ? (
                                <div
                                    className="border border-slate-300 dark:border-slate-600 rounded-md divide-y divide-slate-300 dark:divide-slate-600">
                                    {formData.images.map((image, index) => (
                                        <div key={image.id} className="p-4 flex items-start gap-4">
                                            <div
                                                className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded flex-shrink-0 relative overflow-hidden">
                                                <img
                                                    src={image.url}
                                                    alt={image.caption || `Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm text-slate-900 dark:text-white break-words">
                                                    {image.url}
                                                </p>
                                                {image.caption && (
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                        {image.caption}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(image.id, 'up')}
                                                    disabled={index === 0}
                                                    className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${
                                                        index === 0 ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400'
                                                    }`}
                                                >
                                                    <ChevronUp className="h-4 w-4"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(image.id, 'down')}
                                                    disabled={index === formData.images.length - 1}
                                                    className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${
                                                        index === formData.images.length - 1 ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400'
                                                    }`}
                                                >
                                                    <ChevronDown className="h-4 w-4"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(image.id)}
                                                    className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <X className="h-4 w-4"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="border border-dashed border-slate-300 dark:border-slate-600 rounded-md p-6 text-center">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        No images added yet. Add at least one image for your project.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push('/admin/projects')}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white rounded-md transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
                        </div>
                    ) : (
                        <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
                    )}
                </button>
            </div>
        </form>
    );
}
