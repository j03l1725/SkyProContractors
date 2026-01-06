"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, FileText, Hammer, MapPin } from "lucide-react";

/**
 * Trust Bar - Displays key trust factors
 * Mobile-first: 2 columns on mobile, 4 on desktop
 */
export function TrustBar() {
    const t = useTranslations("TrustBar");

    const features = [
        {
            icon: ShieldCheck,
            label: t("licensed"),
        },
        {
            icon: FileText,
            label: t("estimates"),
        },
        {
            icon: Hammer,
            label: t("workmanship"),
        },
        {
            icon: MapPin,
            label: t("local"),
        },
    ];

    return (
        <section className="bg-slate-50 border-y border-slate-200 py-6 md:py-8 lg:py-12">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center gap-2 md:gap-3"
                        >
                            <feature.icon className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-bronze flex-shrink-0" />
                            <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-900">
                                {feature.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
