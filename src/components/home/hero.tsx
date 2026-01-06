"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Hero Section - Cinematic full-screen introduction
 * Features Framer Motion stagger animations
 * Fully i18n-aware
 */
export function Hero() {
    const t = useTranslations("Hero");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.01, 0.05, 0.95],
            },
        },
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[hsl(220,10%,12%)]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(40,45%,56%)_1px,transparent_1px),linear-gradient(to_bottom,hsl(40,45%,56%)_1px,transparent_1px)] bg-[size:6rem_6rem]" />
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                <div className="max-w-5xl mx-auto text-center">
                    {/* Pretitle */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-12 bg-bronze" />
                        <span className="text-sm uppercase tracking-[0.3em] text-bronze font-medium">
                            {t("companyName")}
                        </span>
                        <div className="h-px w-12 bg-bronze" />
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-8"
                    >
                        {t("titleLine1")}
                        <br />
                        <span className="text-bronze">{t("titleLine2")}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        {t("subtitle")}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <button className="group px-8 py-4 bg-bronze text-foreground font-semibold rounded-sm hover:bg-bronze/90 transition-all duration-300 hover:scale-105">
                            {t("ctaPrimary")}
                        </button>
                        <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-sm hover:border-bronze hover:text-bronze transition-all duration-300">
                            {t("ctaSecondary")}
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-white/40 hover:text-bronze transition-colors cursor-pointer"
                >
                    <span className="text-xs uppercase tracking-widest">
                        {t("scroll")}
                    </span>
                    <ArrowDown className="h-5 w-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
