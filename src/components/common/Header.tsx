"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Icon from "../ui/AppIcon"; 
import AppImage from "../ui/AppImage";

interface NavigationItem {
  name: string;
  nameBengali: string;
  href: string;
  icon: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  // Fetch real-time user data to ensure profile picture syncs even if session cookie is too large
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user")
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) setUserData(data);
        })
        .catch(err => console.error("Header user fetch failed:", err));
    } else {
      setUserData(null);
    }
  }, [status, session]);

  const displayUser = userData || session?.user;

  // Scroll Detection for Glassmorphism Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileDropdownOpen && !(event.target as Element).closest(".profile-dropdown-container")) {
        setIsProfileDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const navigationItems: NavigationItem[] = [
    {
      name: "হোম",
      nameBengali: "হোম",
      href: "/hero-gateway",
      icon: "HomeIcon",
    },
    
    {
      name: "মেনু",
      nameBengali: "মেনু",
      href: "/interactive-menu-hub",
      icon: "ClipboardDocumentListIcon",
    },{
      name: "ঐতিহ্য",
      nameBengali: "ঐতিহ্য",
      href: "/heritage-story",
      icon: "BookOpenIcon",
    },
    {
      name: "উৎকর্ষতা",
      nameBengali: "উৎকর্ষতা",
      href: "/excellence-showcase",
      icon: "StarIcon",
    },
    {
      name: "কমিউনিটি",
      nameBengali: "কমিউনিটি",
      href: "/community-gallery",
      icon: "UserGroupIcon",
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? "bg-[var(--color-background)]/80 backdrop-blur-md shadow-md border-[var(--color-border)]/50 py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* =======================
              LOGO SECTION
          ======================== */}
          <Link
            href="/hero-gateway"
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
          >
            <div className="relative w-11 h-11 drop-shadow-sm">
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
                  className="transition-colors group-hover:fill-[var(--color-secondary)]"
                />
                {/* Steam Lines (Animated) */}
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
                  className="transition-colors group-hover:stroke-[var(--color-secondary)]"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-bengali text-[var(--color-primary)] leading-none tracking-wide">
                চা ওয়ালা
              </span>
            </div>
          </Link>

          {/* =======================
              DESKTOP NAVIGATION
          ======================== */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-card)]/50 rounded-full px-4 py-1.5 border border-[var(--color-border)]/20 shadow-sm backdrop-blur-sm">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-full flex flex-col items-center justify-center group transition-all duration-300
                    ${active ? "bg-[var(--color-primary)] text-white shadow-md" : "hover:bg-[var(--color-muted)] text-[var(--color-foreground)]"}
                  `}
                >
                  <span
                    className={`text-sm font-bold font-bengali leading-none ${active ? "text-white" : "text-[var(--color-foreground)]"}`}
                  >
                    {item.nameBengali}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* =======================
              CONSOLIDATED ACTIONS (Cart, Profile, Auth)
          ======================== */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Button - Visible on all sizes */}
            <Link
              href="/order-fulfillment-center"
              className="group relative inline-flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-[var(--color-conversion)] text-white rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <Icon name="ShoppingCartIcon" size={18} className="relative z-10" />
              <span className="font-bengali font-bold relative z-10 hidden xs:inline-block">
                অর্ডার করুন
              </span>
            </Link>

            {/* Auth/Profile Section - Visible on all sizes */}
            {status === "authenticated" ? (
              <div className="relative profile-dropdown-container">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-full bg-muted/50 transition-all border border-border/50 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 overflow-hidden group-hover:bg-primary transition-all">
                    {displayUser?.image ? (
                      <AppImage src={displayUser.image} alt={displayUser.name || "User"} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="UserCircleIcon" size={24} variant="solid" />
                    )}
                  </div>
                  <span className="text-sm font-bold font-bengali text-foreground max-w-[80px] truncate hidden sm:inline-block">
                    {displayUser?.name}
                  </span>
                  <Icon name="ChevronDownIcon" size={14} className={`transition-transform duration-300 ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                       <div className="px-4 py-3 border-b border-border/30 sm:hidden">
                          <p className="text-sm font-bold font-bengali text-foreground truncate">{displayUser?.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{displayUser?.email}</p>
                       </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bengali font-bold text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                      >
                        <Icon name="UserIcon" size={18} />
                        প্রোফাইল
                      </Link>
                      {displayUser?.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-bengali font-bold text-primary hover:bg-primary/5 rounded-xl transition-all"
                        >
                          <Icon name="QueueListIcon" size={18} />
                          এডমিন ড্যাশবোর্ড
                        </Link>
                      )}
                      <hr className="my-1 border-border/50" />
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          signOut({ redirect: false });
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bengali font-bold text-destructive hover:bg-destructive/5 rounded-xl transition-all"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={18} />
                        লগআউট
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (status !== "loading" && (
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-primary font-bold font-bengali hover:bg-primary/5 rounded-full transition-all text-sm"
              >
                লগইন
              </Link>
            ))}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--color-primary)] hover:bg-[var(--color-muted)] rounded-lg transition-colors border border-border/30"
            >
              <Icon
                name={isMobileMenuOpen ? "XMarkIcon" : "Bars3Icon"}
                size={24}
              />
            </button>
          </div>
        </div>
      </div>

      {/* =======================
          MOBILE NAVIGATION MENU
      ======================== */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[var(--color-card)]/95 backdrop-blur-xl border-t border-[var(--color-border)] shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-3">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center gap-4 p-3 rounded-xl transition-all duration-200 border border-transparent
                ${
                  isActive(item.href)
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20"
                    : "hover:bg-[var(--color-muted)]"
                }
              `}
            >
              <div
                className={`p-2 rounded-lg ${isActive(item.href) ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm"}`}
              >
                <Icon name={item.icon as any} size={20} />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bengali text-lg font-bold ${isActive(item.href) ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]"}`}
                >
                  {item.nameBengali}
                </span>
              </div>
            </Link>
          ))}

          <div className="pt-2 mt-2 border-t border-[var(--color-border)]/30">
            <Link
              href="/order-fulfillment-center"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-conversion)] text-white rounded-2xl font-bold font-bengali shadow-lg active:scale-95 transition-transform"
            >
              <Icon name="ShoppingCartIcon" size={20} />
              অর্ডার শুরু করুন
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
