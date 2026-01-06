"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("Language");

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname and add new one
        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/");
        router.push(newPath);
    };

    return (
        <div className={cn("flex items-center gap-1 text-sm", className)}>
            <button
                onClick={() => switchLocale("en")}
                className={cn(
                    "px-2 py-1 transition-colors",
                    locale === "en"
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={t("english")}
            >
                EN
            </button>
            <span className="text-muted-foreground/50">|</span>
            <button
                onClick={() => switchLocale("es")}
                className={cn(
                    "px-2 py-1 transition-colors",
                    locale === "es"
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={t("spanish")}
            >
                ES
            </button>
        </div>
    );
}
