import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroller } from "@/components/providers/smooth-scroller";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://skylineprocontractors.com'),
    title: {
        template: '%s | Skyline Pro Contractors',
        default: 'Skyline Pro Contractors | Roofing & Siding in Westchester, NY',
    },
    description:
        'Expert roofing, siding, and gutter services in Westchester County. Licensed & Insured. Emergency storm damage repairs and insurance claims assistance.',
    keywords: [
        'Roofing Westchester',
        'Siding Contractor NY',
        'Storm Damage Repair',
        'Skyline Pro',
        'Gutters Yonkers',
        'Westchester Roofing',
        'Insurance Claims Roofing',
        'Emergency Roof Repair',
        'Residential Roofing',
        'Commercial Siding',
    ],
    authors: [{ name: 'Skyline Pro Contractors' }],
    creator: 'Skyline Pro Contractors',
    publisher: 'Skyline Pro Contractors',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://skylineprocontractors.com',
        title: 'Skyline Pro | Expert Roofing & Exteriors',
        description: 'Protecting Homes in Westchester. Get a free inspection today.',
        siteName: 'Skyline Pro Contractors',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Skyline Pro | Expert Roofing & Exteriors',
        description: 'Protecting Homes in Westchester. Get a free inspection today.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    // Providing all messages to the client side
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <SmoothScroller>
                        <div className="flex min-h-screen flex-col">
                            <Header />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                    </SmoothScroller>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
