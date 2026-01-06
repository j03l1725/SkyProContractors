import { HeroContractor } from "@/components/home/hero-contractor";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesGrid } from "@/components/home/services-grid";
import { InsuranceSection } from "@/components/home/insurance-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { getFeaturedProjects } from "@/lib/sanity/queries";

export default async function HomePage() {
    // Fetch featured projects from Sanity
    const projects = await getFeaturedProjects();

    return (
        <main>
            <HeroContractor />
            <TrustBar />
            <ServicesGrid />
            <InsuranceSection />
            <FeaturedProjects projects={projects} />
        </main>
    );
}
