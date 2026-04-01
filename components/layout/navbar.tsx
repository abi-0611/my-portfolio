"use client";

import { useRouter, usePathname } from "next/navigation";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { NavItem } from "@/components/ui/spotlight-navbar";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const activeIndex = navItems.findIndex((item) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  });

  const handleItemClick = (item: NavItem) => {
    router.push(item.href);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 px-4">
      <div className="flex items-center gap-4">
        <SpotlightNavbar
          items={navItems}
          onItemClick={handleItemClick}
          defaultActiveIndex={activeIndex >= 0 ? activeIndex : 0}
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
