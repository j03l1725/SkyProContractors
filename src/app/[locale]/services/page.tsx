import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

interface ServicesPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
    const { locale } = await params;
    const t = await getTranslations("Services");
    const tPage = await getTranslations("ServicesPage");

    const services = [
        {
            title: t("roofingTitle"),
            description: t("roofingDescription"),
            features: [
                t("roofingFeature1"),
                t("roofingFeature2"),
                t("roofingFeature3"),
                t("roofingFeature4"),
            ],
            cta: t("roofingCta"),
            image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
            imageAlt: "Professional roofing installation",
        },
        {
            title: t("sidingTitle"),
            description: t("sidingDescription"),
            features: [
                t("sidingFeature1"),
                t("sidingFeature2"),
                t("sidingFeature3"),
                t("sidingFeature4"),
            ],
            cta: t("sidingCta"),
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
            imageAlt: "Modern home siding",
        },
        {
            title: t("guttersTitle"),
            description: t("guttersDescription"),
            features: [
                t("guttersFeature1"),
                t("guttersFeature2"),
                t("guttersFeature3"),
                t("guttersFeature4"),
            ],
            cta: t("guttersCta"),
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
            imageAlt: "Seamless gutter installation",
        },
        {
            title: t("insuranceTitle"),
            description: t("insuranceDescription"),
            features: [
                t("insuranceFeature1"),
                t("insuranceFeature2"),
                t("insuranceFeature3"),
                t("insuranceFeature4"),
            ],
            cta: t("insuranceCta"),
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
            imageAlt: "Insurance claims assistance",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
                    alt="Professional construction services"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                        {t("pageTitle")}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto">
                        {t("pageSubtitle")}
                    </p>
                </div>
            </div>

            {/* Services Grid - Zig-Zag Layout */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
                <div className="space-y-24 md:space-y-32">
                    {services.map((service, index) => {
                        const isEven = index % 2 === 0;
                        const serviceIds = ['roofing', 'siding', 'gutters', 'insurance'];

                        return (
                            <section
                                key={index}
                                id={serviceIds[index]}
                                className="scroll-mt-20"
                            >
                                <div
                                    className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? "lg:grid-flow-dense" : ""
                                        }`}
                                >
                                    {/* Image */}
                                    <div
                                        className={`relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg ${!isEven ? "lg:col-start-2" : ""
                                            }`}
                                    >
                                        <Image
                                            src={service.image}
                                            alt={service.imageAlt}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                            {service.title}
                                        </h2>
                                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Features List */}
                                        <ul className="space-y-3 mb-8">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <Check className="h-6 w-6 text-bronze flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Link
                                            href={`/${locale}/contact`}
                                            className="inline-block px-8 py-3 bg-bronze text-white font-semibold rounded-sm hover:bg-bronze/90 transition-colors shadow-md hover:shadow-lg"
                                        >
                                            {service.cta}
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-900 py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {tPage("bottomCtaTitle")}
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                        {tPage("bottomCtaText")}
                    </p>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-block px-8 py-3 bg-bronze text-white font-semibold rounded-sm hover:bg-bronze/90 transition-colors"
                    >
                        {tPage("bottomCtaButton")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
