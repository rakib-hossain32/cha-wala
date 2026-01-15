"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && (session?.user as any)?.role !== 'admin')) {
      router.push("/hero-gateway");
    }
  }, [status, session, router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (status === "loading" || !session || (session?.user as any)?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    { name: "ড্যাশবোর্ড", href: "/admin", icon: "HomeIcon" },
    { name: "অর্ডার ম্যানেজমেন্ট", href: "/admin/orders", icon: "QueueListIcon" },
    { name: "মেনু আইটেম", href: "/admin/menu", icon: "ClipboardDocumentListIcon" },
    { name: "রিভিউ মডারেশন", href: "/admin/reviews", icon: "ChatBubbleBottomCenterTextIcon" },
    { name: "ইউজার লিস্ট", href: "/admin/users", icon: "UserGroupIcon" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF6] flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border/50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Icon name="QueueListIcon" size={24} />
            </div>
            <span className="text-xl font-black font-bengali text-primary">এডমিন প্যানেল</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bengali font-bold group ${
                    isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <Icon name={item.icon as any} size={20} className={`${isActive ? "" : "group-hover:scale-110"} transition-transform`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <Link 
            href="/hero-gateway"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-all font-bengali font-bold border-t border-border/50 pt-6"
          >
            <Icon name="ArrowLeftIcon" size={20} />
            ওয়েবসাইটে ফিরুন
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 border-b border-border/50 bg-white/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="Bars3Icon" size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold font-bengali text-foreground line-clamp-1">{session.user?.name}</p>
              <p className="text-[10px] text-muted-foreground font-heading uppercase tracking-wider">এডমিনিস্ট্রেটর</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5">
               <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary transition-all overflow-hidden">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Admin" className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="UserCircleIcon" size={24} variant="solid" />
                  )}
                </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
