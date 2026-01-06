"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Contractor Hero - Full-width background image with CTAs
 * Mobile-first responsive design
 */
export function HeroContractor() {
    const t = useTranslations("HeroContractor");

    return (
        <section className="relative h-[70vh] md:h-[85vh] lg:h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=1920&q=80"
                alt="Professional roofing contractor working on residential home"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 md:space-y-8"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-bronze/20 border border-bronze/30 rounded-sm">
                            <span className="text-xs md:text-sm font-medium text-bronze tracking-wide">
                                {t("badge")}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                            {t("title")}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed">
                            {t("subtitle")}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                            <a
                                href="/contact"
                                className="w-full sm:w-auto group px-6 md:px-8 py-3 md:py-4 bg-bronze text-slate-900 font-semibold rounded-sm hover:bg-bronze/90 transition-all duration-300 hover:scale-105 text-center text-sm md:text-base"
                            >
                                {t("ctaPrimary")}
                            </a>
                            <a
                                href="https://wa.me/19145550123?text=URGENTE:%20Tengo%20una%20emergencia%20en%20mi%20techo,%20necesito%20ayuda."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-slate-900 transition-all duration-300 text-center text-sm md:text-base"
                            >
                                {t("ctaSecondary")}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
