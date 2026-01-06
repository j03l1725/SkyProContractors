"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SanityProject } from "@/sanity/schemas/project";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const builder = client ? createImageUrlBuilder(client) : null;

function urlFor(source: any) {
    if (!builder) throw new Error("Sanity client not configured");
    return builder.image(source);
}

interface ProjectsGridProps {
    projects: SanityProject[];
    locale: string;
}

export function ProjectsGrid({ projects, locale }: ProjectsGridProps) {
    const t = useTranslations("ProjectsPage");
    const [activeFilter, setActiveFilter] = useState("all");

    // Get unique categories from all projects (DEFENSIVE)
    const allCategories = projects.reduce((acc, project) => {
        // Verify categories exists and is an array
        if (Array.isArray(project.categories)) {
            project.categories.forEach((cat) => {
                // If cat is a string (direct from query)
                if (typeof cat === "string" && !acc.includes(cat)) {
                    acc.push(cat);
                }
                // If cat is an object and not null
                else if (cat && cat.title && !acc.includes(cat.title)) {
                    acc.push(cat.title);
                }
            });
        }
        return acc;
    }, [] as string[]);

    // Filter projects based on active filter (DEFENSIVE)
    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter((project) => {
            // Return false if project has no categories
            if (!Array.isArray(project.categories)) return false;

            // Check if any category matches the filter
            return project.categories.some((cat) => {
                if (typeof cat === "string") return cat === activeFilter;
                return cat?.title === activeFilter;
            });
        });

    const filterButtons = [
        { key: "all", label: t("filterAll") },
        ...allCategories.map((category) => ({
            key: category,
            label: category,
        })),
    ];

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
                {filterButtons.map((filter) => (
                    <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`px-6 py-2.5 text-sm md:text-base font-medium rounded-sm transition-all duration-300 ${activeFilter === filter.key
                                ? "bg-bronze text-white shadow-lg scale-105"
                                : "bg-transparent text-slate-600 hover:text-bronze hover:scale-105"
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link
                            href={`/${locale}/projects/${project.slug.current}`}
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                    {project.mainImage ? (
                                        <Image
                                            src={urlFor(project.mainImage).width(800).height(600).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Categories */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {Array.isArray(project.categories) && project.categories.map((cat: any, idx: number) => {
                                            // If category is null, skip it
                                            if (!cat) return null;

                                            // Determine title (can be string or object)
                                            const title = typeof cat === 'string' ? cat : cat.title;

                                            // If no title, skip
                                            if (!title) return null;

                                            return (
                                                <span
                                                    key={idx}
                                                    className="text-xs font-semibold px-3 py-1 bg-bronze/10 text-bronze rounded-full"
                                                >
                                                    {title}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-bronze transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Meta Data */}
                                    <div className="flex flex-col gap-2 mb-4">
                                        {project.location && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <MapPin className="h-4 w-4" />
                                                <span>{project.location}</span>
                                            </div>
                                        )}
                                        {project.completionDate && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(project.completionDate).getFullYear()}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* View Project Link */}
                                    <div className="flex items-center gap-2 text-bronze font-medium text-sm group-hover:gap-3 transition-all">
                                        <span>View Project</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-slate-500 text-lg">
                        No projects found in this category
                    </p>
                </div>
            )}
        </div>
    );
}
