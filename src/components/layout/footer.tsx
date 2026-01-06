"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const t = useTranslations("Footer");
    const tServices = useTranslations("Services");
    const tNav = useTranslations("Navigation");

    const services = [
        { key: "roofing", href: "/services#roofing" },
        { key: "siding", href: "/services#siding" },
        { key: "gutters", href: "/services#gutters" },
        { key: "insurance", href: "/services#insurance" },
    ] as const;

    return (
        <footer className="bg-[hsl(220,10%,12%)] text-white/90">
            {/* Main Footer */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
                    {/* Column 1: Logo & Description */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold tracking-tight">
                                SKYLINE <span className="text-bronze">PRO</span>
                            </span>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                            {t("description")}
                        </p>
                        <p className="text-bronze font-medium text-sm tracking-wide">
                            {t("tagline")}
                        </p>
                    </div>

                    {/* Column 2: Services */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            {t("servicesTitle")}
                        </h3>
                        <nav className="flex flex-col space-y-2">
                            {services.map((service) => (
                                <Link
                                    key={service.key}
                                    href={service.href}
                                    className="text-sm text-white/60 hover:text-bronze transition-colors"
                                >
                                    {t(service.key)}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            {t("contactTitle")}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm text-white/60">
                                <MapPin className="h-4 w-4 text-bronze flex-shrink-0" />
                                <span>{t("address")}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-white/60">
                                <Phone className="h-4 w-4 text-bronze flex-shrink-0" />
                                <a
                                    href="https://wa.me/19145550123?text=Hola%20Skyline%20Pro,%20me%20interesa%20una%20inspección."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-bronze transition-colors"
                                >
                                    {t("phone")}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-white/60">
                                <Mail className="h-4 w-4 text-bronze flex-shrink-0" />
                                <a
                                    href={`mailto:${t("email")}`}
                                    className="hover:text-bronze transition-colors"
                                >
                                    {t("email")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-white/50">
                            {t("copyright")}
                        </p>
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/privacy"
                                className="text-xs text-white/50 hover:text-white/80 transition-colors"
                            >
                                {t("privacy")}
                            </Link>
                            <Link
                                href="/terms"
                                className="text-xs text-white/50 hover:text-white/80 transition-colors"
                            >
                                {t("terms")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
