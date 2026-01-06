"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Smooth Scroller using Lenis
 * Provides buttery-smooth, luxury scrolling experience
 */
export function SmoothScroller({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with luxury "heavy" scroll feel
        const lenis = new Lenis({
            duration: 1.2, // Slightly slower for a more deliberate feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
        });

        lenisRef.current = lenis;

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
