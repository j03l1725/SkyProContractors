"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/ui-custom/language-switcher";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", key: "home" },
    { href: "/about", key: "about" },
    { href: "/services", key: "services" },
    { href: "/projects", key: "projects" },
    { href: "/contact", key: "contact" },
] as const;

export function Header() {
    const t = useTranslations("Navigation");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo-full.png"
                            alt="Skyline Pro Contractors"
                            width={180}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover-underline-bronze"
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageSwitcher />
                        <Link href="/contact">
                            <Button
                                variant="default"
                                size="sm"
                                className="bg-foreground text-background hover:bg-foreground/90"
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                {t("getQuote")}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex md:hidden items-center space-x-2">
                        <LanguageSwitcher className="mr-2" />
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                                <SheetHeader className="text-left">
                                    <SheetTitle className="flex items-center">
                                        <Image
                                            src="/logo-full.png"
                                            alt="Skyline Pro"
                                            width={160}
                                            height={36}
                                            className="h-9 w-auto"
                                        />
                                    </SheetTitle>
                                </SheetHeader>
                                <Separator className="my-4" />
                                <nav className="flex flex-col space-y-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.key}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:pl-2"
                                        >
                                            {t(link.key)}
                                        </Link>
                                    ))}
                                </nav>
                                <Separator className="my-6" />
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <Button
                                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                                    >
                                        <Phone className="mr-2 h-4 w-4" />
                                        {t("getQuote")}
                                    </Button>
                                </Link>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
