"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

/**
 * Insurance Section - Split layout highlighting insurance claim assistance
 * Mobile-first: Column on mobile, row on desktop
 */
export function InsuranceSection() {
    const t = useTranslations("InsuranceSection");

    const features = [
        {
            title: t("feature1Title"),
            description: t("feature1Desc"),
        },
        {
            title: t("feature2Title"),
            description: t("feature2Desc"),
        },
        {
            title: t("feature3Title"),
            description: t("feature3Desc"),
        },
    ];

    return (
        <section className="py-12 md:py-20 lg:py-28 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
                            {t("title")}
                        </h2>

                        <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed">
                            {t("description")}
                        </p>

                        {/* Features */}
                        <div className="space-y-4 mb-6 md:mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-3 md:gap-4">
                                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-bronze flex-shrink-0 mt-0.5 md:mt-1" />
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1 text-sm md:text-base">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm md:text-base">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href="#contact"
                            className="inline-block w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-bronze text-slate-900 font-semibold rounded-sm hover:bg-bronze/90 transition-all duration-300 hover:scale-105 text-center text-sm md:text-base"
                        >
                            {t("cta")}
                        </a>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-sm overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80"
                            alt="Insurance claim consultation and storm damage assessment"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
