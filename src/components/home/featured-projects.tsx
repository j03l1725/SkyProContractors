"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SanityProject } from "@/sanity/schemas/project";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "@/sanity/env";
import { MapPin, Calendar } from "lucide-react";

// Image URL builder
const builder = createImageUrlBuilder({
    projectId: sanityConfig.projectId || "",
    dataset: sanityConfig.dataset,
});

function urlFor(source: any) {
    return builder.image(source);
}

interface FeaturedProjectsProps {
    projects: SanityProject[];
}

/**
 * Featured Projects Section
 * Displays latest projects with hover interactions
 * Fully i18n-aware with locale-based translations
 */
export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const t = useTranslations("FeaturedProjects");
    const tProjects = useTranslations("Projects");
    const locale = useLocale();

    // Mock data fallback with translation keys
    const mockProjects: Array<SanityProject & { titleKey?: string }> = [
        {
            _id: "mock-1",
            _type: "project",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            title: tProjects("modernResidential"),
            titleKey: "modernResidential",
            slug: { current: "modern-residential" },
            mainImage: {} as any,
            location: "Yonkers, NY",
            completionDate: "2024-12-01",
        },
        {
            _id: "mock-2",
            _type: "project",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            title: tProjects("commercialRoofing"),
            titleKey: "commercialRoofing",
            slug: { current: "commercial-roofing" },
            mainImage: {} as any,
            location: "White Plains, NY",
            completionDate: "2024-10-15",
        },
        {
            _id: "mock-3",
            _type: "project",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            title: tProjects("luxurySiding"),
            titleKey: "luxurySiding",
            slug: { current: "luxury-siding" },
            mainImage: {} as any,
            location: "Scarsdale, NY",
            completionDate: "2024-11-20",
        },
    ];

    const displayProjects = projects.length > 0 ? projects : mockProjects;

    return (
        <section className="py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-bronze" />
                        <span className="text-sm uppercase tracking-[0.3em] text-bronze font-medium">
                            {t("sectionLabel")}
                        </span>
                        <div className="h-px w-8 bg-bronze" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {displayProjects.map((project, index) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            index={index}
                            locale={locale}
                        />
                    ))}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        href={`/${locale}/projects`}
                        className="group inline-flex items-center gap-2 text-foreground font-semibold hover:text-bronze transition-colors"
                    >
                        {t("viewAll")}
                        <span className="inline-block transition-transform group-hover:translate-x-2">
                            →
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
    locale,
}: {
    project: SanityProject;
    index: number;
    locale: string;
}) {
    const t = useTranslations("FeaturedProjects");
    // Check if we have a valid Sanity image (not an empty object)
    const hasImage =
        project.mainImage &&
        sanityConfig.projectId &&
        Object.keys(project.mainImage).length > 0;

    // Format date according to locale
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale, {
            month: "long",
            year: "numeric",
        }).format(date);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
        >
            <Link href={`/${locale}/projects/${project.slug.current}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm bg-secondary">
                    {hasImage ? (
                        <Image
                            src={urlFor(project.mainImage).width(800).height(600).url()}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                            <div className="text-center">
                                <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-bronze/10 flex items-center justify-center">
                                    <svg
                                        className="h-8 w-8 text-bronze"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {t("projectPreview")}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-bronze transition-colors duration-300">
                        {project.title}
                    </h3>

                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        {project.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-bronze" />
                                <span>{project.location}</span>
                            </div>
                        )}
                        {project.completionDate && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-bronze" />
                                <span>{formatDate(project.completionDate)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
