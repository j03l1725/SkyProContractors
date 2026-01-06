import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug } from '@/lib/sanity/queries';
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityConfig } from '@/sanity/env';
import { ArrowLeft, MapPin, Calendar, Tag } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

// Image URL builder
const builder = createImageUrlBuilder({
    projectId: sanityConfig.projectId || '',
    dataset: sanityConfig.dataset,
});

function urlFor(source: any) {
    return builder.image(source);
}

interface ProjectPageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Skyline Pro Contractors`,
        description: project.location || 'Construction project by Skyline Pro',
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { locale, slug } = await params;
    const project = await getProjectBySlug(slug);
    const t = await getTranslations('ProjectDetail');

    if (!project) {
        notFound();
    }

    const hasImage =
        project.mainImage &&
        sanityConfig.projectId &&
        Object.keys(project.mainImage).length > 0;

    const hasGallery = project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Image */}
            {hasImage && (
                <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
                    <Image
                        src={urlFor(project.mainImage).width(1920).height(1080).url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute inset-0 flex items-end">
                        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                                {project.title}
                            </h1>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                {/* Back Button */}
                <Link
                    href={`/${locale}/projects`}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-bronze transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{t('backToProjects')}</span>
                </Link>

                {/* Project Info Bar */}
                <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-12 pb-8 border-b border-slate-200">
                    {project.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-bronze" />
                            <span className="text-lg text-slate-700">{project.location}</span>
                        </div>
                    )}
                    {project.completionDate && (
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-bronze" />
                            <span className="text-lg text-slate-700">
                                {new Date(project.completionDate).toLocaleDateString(locale, {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    )}
                    {project.categories && project.categories.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-bronze" />
                            <div className="flex flex-wrap gap-2">
                                {project.categories.map((category, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-bronze/10 text-bronze text-sm font-medium rounded-full"
                                    >
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
                    {/* Left Column - Description & Gallery */}
                    <div className="space-y-12">
                        {/* Description */}
                        {project.description && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                                    {t('projectOverview')}
                                </h2>
                                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-bronze">
                                    <p className="whitespace-pre-wrap">{project.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {hasGallery && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                                    {t('projectGallery')}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                    {project.gallery?.map((image: any, index: number) => (
                                        <div
                                            key={index}
                                            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300"
                                        >
                                            <Image
                                                src={urlFor(image).width(800).height(600).url()}
                                                alt={image.alt || `${project.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Fallback: Show mainImage if no gallery */}
                        {!hasGallery && hasImage && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                                    {t('projectImage')}
                                </h2>
                                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src={urlFor(project.mainImage).width(1200).height(675).url()}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Project Stats/Details */}
                    <div className="space-y-8">
                        {/* Project Details Card */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">
                                {t('projectDetails')}
                            </h3>

                            <div className="space-y-4">
                                {project.location && (
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">{t('location')}</p>
                                        <p className="text-base font-medium text-slate-900">{project.location}</p>
                                    </div>
                                )}

                                {project.completionDate && (
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">{t('completed')}</p>
                                        <p className="text-base font-medium text-slate-900">
                                            {new Date(project.completionDate).toLocaleDateString(locale, {
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                )}

                                {project.categories && project.categories.length > 0 && (
                                    <div>
                                        <p className="text-sm text-slate-500 mb-2">{t('services')}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.categories.map((category, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-bronze/10 text-bronze text-sm font-medium rounded-full"
                                                >
                                                    {category.title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-bronze/5 p-8 rounded-lg border border-bronze/20">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {t('ctaTitle')}
                            </h3>
                            <p className="text-slate-600 mb-6">
                                {t('ctaText')}
                            </p>
                            <Link
                                href={`/${locale}/contact`}
                                className="block w-full px-6 py-3 bg-bronze text-white font-semibold text-center rounded-sm hover:bg-bronze/90 transition-colors"
                            >
                                {t('ctaButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
