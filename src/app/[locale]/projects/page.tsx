import { getAllProjects } from "@/lib/sanity/queries";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface ProjectsPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const { locale } = await params;
    const projects = await getAllProjects();
    const t = await getTranslations("ProjectsPage");

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header with Background Image */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
                    alt="Modern architecture and construction"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <ProjectsGrid projects={projects} locale={locale} />
            </div>
        </div>
    );
}
