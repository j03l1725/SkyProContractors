import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Shield, Award, MapPin, ChevronDown } from "lucide-react";

interface AboutPageProps {
    params: Promise<{ locale: string }>;
}

// FAQ Accordion Component (Client-side alternative without shadcn)
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    return (
        <details className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-bronze transition-colors">
            <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-slate-900 list-none">
                <span>{question}</span>
                <ChevronDown className="h-5 w-5 text-bronze transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">{answer}</p>
        </details>
    );
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { locale } = await params;
    const t = await getTranslations("About");

    const stats = [
        {
            icon: MapPin,
            title: t("stat1Title"),
            text: t("stat1Text"),
        },
        {
            icon: Shield,
            title: t("stat2Title"),
            text: t("stat2Text"),
        },
        {
            icon: Award,
            title: t("stat3Title"),
            text: t("stat3Text"),
        },
    ];

    const faqs = [
        { question: t("faqQ1"), answer: t("faqA1") },
        { question: t("faqQ2"), answer: t("faqA2") },
        { question: t("faqQ3"), answer: t("faqA3") },
        { question: t("faqQ4"), answer: t("faqA4") },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Background */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
                    alt="Professional construction team"
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

            {/* Our Story - Split Screen */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                            alt="Construction team at work"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right: Story Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            {t("storyTitle")}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            {t("storyText")}
                        </p>

                        {/* Founder Quote */}
                        <div className="border-l-4 border-bronze pl-6 py-4 bg-bronze/5 rounded-r-lg">
                            <p className="text-xl italic text-slate-700 mb-2">
                                "{t("founderQuote")}"
                            </p>
                            <p className="text-sm text-bronze font-semibold">
                                {t("founderName")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values / Why Choose Us */}
            <div className="bg-slate-100 py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                        {t("valuesTitle")}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-bronze/10 rounded-full mb-6">
                                        <Icon className="h-10 w-10 text-bronze" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                                        {stat.title}
                                    </h3>
                                    <p className="text-slate-600">
                                        {stat.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                    {t("faqTitle")}
                </h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Location Section with Map */}
            <div className="bg-white py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                        {t("locationTitle")}
                    </h2>

                    <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 max-w-6xl mx-auto">
                        {/* Map */}
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48306.67472365289!2d-73.93184646682128!3d40.94639739572978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2ec1736637303%3A0xcba78b3036aee714!2sYonkers%2C%20NY!5e0!3m2!1sen!2sus!4v1709664552467!5m2!1sen!2sus"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Westchester County Location"
                            />
                        </div>

                        {/* Address & Hours */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-6 h-fit">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-bronze" />
                                    {t("locationTitle")}
                                </h3>
                                <p className="text-slate-600 font-medium">
                                    {t("locationAddress")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    Business Hours
                                </h3>
                                <p className="text-slate-600 whitespace-pre-line">
                                    {t("locationHours")}
                                </p>
                            </div>

                            <Link
                                href={`/${locale}/contact`}
                                className="block w-full px-6 py-3 bg-bronze text-white font-semibold text-center rounded-sm hover:bg-bronze/90 transition-colors"
                            >
                                {t("ctaButton")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="bg-bronze/5 py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            {t("ctaTitle")}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 mb-8">
                            {t("ctaText")}
                        </p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-block px-8 py-4 bg-bronze text-white font-semibold text-lg rounded-sm hover:bg-bronze/90 transition-colors shadow-lg hover:shadow-xl"
                        >
                            {t("ctaButton")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
