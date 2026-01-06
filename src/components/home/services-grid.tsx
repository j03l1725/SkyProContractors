"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Home, Layers, Droplets, Wrench } from "lucide-react";

/**
 * Services Grid - 4 main service offerings
 * Mobile-first: 1 column mobile, 2 tablet, 4 desktop
 */
export function ServicesGrid() {
    const t = useTranslations("ServicesGrid");

    const services = [
        {
            icon: Home,
            title: t("roofing.title"),
            items: [
                t("roofing.items.0"),
                t("roofing.items.1"),
                t("roofing.items.2"),
                t("roofing.items.3"),
            ],
        },
        {
            icon: Layers,
            title: t("siding.title"),
            items: [
                t("siding.items.0"),
                t("siding.items.1"),
                t("siding.items.2"),
                t("siding.items.3"),
            ],
        },
        {
            icon: Droplets,
            title: t("gutters.title"),
            items: [
                t("gutters.items.0"),
                t("gutters.items.1"),
                t("gutters.items.2"),
                t("gutters.items.3"),
            ],
        },
        {
            icon: Wrench,
            title: t("repairs.title"),
            items: [
                t("repairs.items.0"),
                t("repairs.items.1"),
                t("repairs.items.2"),
                t("repairs.items.3"),
            ],
        },
    ];

    return (
        <section className="py-12 md:py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-6 md:p-8 bg-white border border-slate-200 rounded-sm hover:shadow-xl hover:border-bronze transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="mb-4 md:mb-6">
                                <div className="inline-flex p-3 md:p-4 bg-bronze/10 rounded-sm group-hover:bg-bronze/20 transition-colors">
                                    <service.icon className="h-6 w-6 md:h-8 md:w-8 text-bronze" />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">
                                {service.title}
                            </h3>

                            {/* Items */}
                            <ul className="space-y-2">
                                {service.items.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="flex items-start gap-2 text-slate-600"
                                    >
                                        <span className="text-bronze mt-1 flex-shrink-0">•</span>
                                        <span className="text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
