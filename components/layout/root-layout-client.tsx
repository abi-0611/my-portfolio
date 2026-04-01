"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import { PageTransition } from "@/components/page-transition";
import { SkipToContent } from "@/components/skip-to-content";
import { ThemeProvider } from "@/components/theme/theme-provider";

const ShapeGrid = dynamic(() => import("@/components/ui/shape-grid"), {
  ssr: false,
});

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isStudioRoute) {
      html.setAttribute("data-studio-route", "true");
      body.setAttribute("data-studio-route", "true");
    } else {
      html.removeAttribute("data-studio-route");
      body.removeAttribute("data-studio-route");
    }

    return () => {
      html.removeAttribute("data-studio-route");
      body.removeAttribute("data-studio-route");
    };
  }, [isStudioRoute]);

  if (isStudioRoute) {
    return (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SkipToContent />

      {/* Fixed full-screen animated grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#271E37"
          hoverFillColor="#222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Page content — sits above the grid */}
      <div className="relative z-10 pt-28">
        <PageTransition>{children}</PageTransition>
      </div>

      {/* Global toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          },
        }}
      />
    </ThemeProvider>
  );
}
