import { ContactForm } from "@/components/contact/contact-form";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    const t = useTranslations("Contact");

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Column - Visual & Info */}
            <div className="relative min-h-[50vh] lg:min-h-screen bg-slate-900 flex items-center">
                {/* Background Image */}
                <Image
                    src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=1200&q=80"
                    alt="Professional contractor consultation"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-slate-900/75" />

                {/* Content */}
                <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 md:py-16 w-full">
                    <div className="max-w-xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            {t("pageSubtitle")}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-12">
                            {t("description")}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-bronze/20 rounded-sm border border-bronze/30">
                                    <Phone className="h-6 w-6 text-bronze" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-bronze mb-1">{t("phone")}</p>
                                    <a
                                        href="https://wa.me/19145550123?text=Hola%20Skyline%20Pro,%20me%20interesa%20una%20inspección."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg text-white hover:text-bronze transition-colors"
                                    >
                                        (914) 555-0123
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-bronze/20 rounded-sm border border-bronze/30">
                                    <Mail className="h-6 w-6 text-bronze" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-bronze mb-1">{t("email")}</p>
                                    <a
                                        href="mailto:info@skylinepro.com"
                                        className="text-lg text-white hover:text-bronze transition-colors"
                                    >
                                        info@skylinepro.com
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-bronze/20 rounded-sm border border-bronze/30">
                                    <MapPin className="h-6 w-6 text-bronze" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-bronze mb-1">{t("location")}</p>
                                    <p className="text-lg text-white">{t("locationText")}</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-bronze/20 rounded-sm border border-bronze/30">
                                    <Clock className="h-6 w-6 text-bronze" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-bronze mb-1">{t("hours")}</p>
                                    <p className="text-base text-white whitespace-pre-line">{t("hoursText")}</p>
                                </div>
                            </div>
                        </div>

                        {/* Emergency CTA */}
                        <div className="mt-12 p-6 bg-red-600/20 border border-red-500/30 rounded-sm">
                            <h3 className="text-lg font-bold text-red-400 mb-2">
                                {t("emergencyTitle")}
                            </h3>
                            <p className="text-sm text-red-200 mb-4">
                                {t("emergencyText")}
                            </p>
                            <a
                                href="https://wa.me/19145550123?text=URGENTE:%20Tengo%20una%20emergencia%20en%20mi%20techo,%20necesito%20ayuda."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-sm hover:bg-red-700 transition-colors text-center"
                            >
                                {t("emergencyButton")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white flex items-center px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div className="w-full max-w-xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        {t("formTitle")}
                    </h2>
                    <p className="text-slate-600 mb-8">
                        {t("formSubtitle")}
                    </p>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
