"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/AppIcon";

interface NavigationItem {
  name: string;
  nameBengali: string;
  href: string;
  icon: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    {
      name: "Home",
      nameBengali: "হোম",
      href: "/hero-gateway",
      icon: "HomeIcon",
    },
    {
      name: "Heritage",
      nameBengali: "ঐতিহ্য",
      href: "/heritage-story",
      icon: "BookOpenIcon",
    },
    {
      name: "Menu",
      nameBengali: "মেনু",
      href: "/interactive-menu-hub",
      icon: "ClipboardDocumentListIcon",
    },
    {
      name: "Excellence",
      nameBengali: "উৎকর্ষতা",
      href: "/excellence-showcase",
      icon: "StarIcon",
    },
    {
      name: "Community",
      nameBengali: "সম্প্রদায়",
      href: "/community-gallery",
      icon: "UserGroupIcon",
    },
  ];

  const isActive = (href: string) => pathname === href;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-warm">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo Section */}
          <Link
            href="/hero-gateway"
            className="flex items-center space-x-3 cultural-transition hover:opacity-80"
          >
            <div className="relative w-10 h-10">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Tea Cup Shape */}
                <path
                  d="M8 15C8 15 8 12 10 10C12 8 15 8 15 8H25C25 8 28 8 30 10C32 12 32 15 32 15V28C32 30 30 32 28 32H12C10 32 8 30 8 28V15Z"
                  fill="var(--color-primary)"
                  className="cultural-transition"
                />
                {/* Steam Lines */}
                <path
                  d="M14 6C14 6 14 4 15 3"
                  stroke="var(--color-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-steam"
                  style={{ animationDelay: "0s" }}
                />
                <path
                  d="M20 5C20 5 20 3 21 2"
                  stroke="var(--color-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-steam"
                  style={{ animationDelay: "0.5s" }}
                />
                <path
                  d="M26 6C26 6 26 4 27 3"
                  stroke="var(--color-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-steam"
                  style={{ animationDelay: "1s" }}
                />
                {/* Handle */}
                <path
                  d="M32 18C32 18 35 18 36 20C37 22 37 24 36 26C35 28 32 28 32 28"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-bengali text-primary leading-tight">
                চাই টোকেন
              </span>
              <span className="text-xs font-heading text-muted-foreground leading-tight">
                Chai Token
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center px-4 py-2 rounded-lg cultural-transition
                  ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }
                `}
              >
                <Icon name={item.icon as any} size={20} className="mb-1" />
                <span className="text-xs font-bengali font-semibold">
                  {item.nameBengali}
                </span>
                <span className="text-xs font-heading">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Order CTA - Desktop */}
          <Link
            href="/order-fulfillment-center"
            className="hidden lg:flex items-center space-x-2 px-6 py-2.5 bg-conversion text-conversion-foreground rounded-lg font-heading font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
          >
            <Icon name="ShoppingCartIcon" size={20} />
            <span className="font-bengali">অর্ডার করুন</span>
            <span className="text-sm">Order Now</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted cultural-transition"
            aria-label="Toggle menu"
          >
            <Icon
              name={isMobileMenuOpen ? "XMarkIcon" : "Bars3Icon"}
              size={24}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg cultural-transition
                    ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <Icon name={item.icon as any} size={24} />
                  <div className="flex flex-col">
                    <span className="font-bengali font-semibold">
                      {item.nameBengali}
                    </span>
                    <span className="text-sm font-heading text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Mobile Order CTA */}
              <Link
                href="/order-fulfillment-center"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-conversion text-conversion-foreground rounded-lg font-heading font-semibold cultural-transition hover:scale-105 shadow-warm-sm mt-4"
              >
                <Icon name="ShoppingCartIcon" size={24} />
                <span className="font-bengali text-lg">অর্ডার করুন এখনই</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
