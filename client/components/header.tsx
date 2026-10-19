"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Compass,
  Luggage,
  Sparkles,
  User,
  LogOut,
  Menu,
  X,
  ArrowRight,
  Plane,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  }

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3 shadow-md border-b border-slate-200/60 dark:border-slate-800/60"
          : "bg-background/80 backdrop-blur-md py-4 border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-blue-600 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 dark:to-white bg-clip-text text-transparent">
                  TripCraft<span className="text-amber-500">.ai</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground -mt-1 hidden sm:block">
                  AI Travel Team
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 ml-4">
              <Link
                href="/plan"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive("/plan")
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                }`}
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                Plan Trip
              </Link>
              <Link
                href="/plans"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive("/plans")
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                }`}
              >
                <Luggage className="w-4 h-4 text-slate-500" />
                My Plans
              </Link>
              <a
                href="/#how-it-works"
                className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100/70 dark:hover:bg-slate-800/50 rounded-full transition-all duration-200"
              >
                How It Works
              </a>
              <a
                href="/#agents"
                className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100/70 dark:hover:bg-slate-800/50 rounded-full transition-all duration-200"
              >
                AI Team
              </a>
            </nav>
          </div>

          {/* Desktop Right Side / Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 pl-3 rounded-full border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                  <span className="text-xs font-medium text-foreground max-w-[120px] truncate">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-7 px-2.5 rounded-full text-xs text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full px-4"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/plan">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 rounded-full px-4 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <Plane className="w-3.5 h-3.5 mr-1.5" />
                    Craft a Trip
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 pb-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Plan Trip
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>
            <Link
              href="/plans"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <Luggage className="w-4 h-4 text-slate-500" />
                My Saved Plans
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              How It Works
            </a>
            <a
              href="/#agents"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              AI Team
            </a>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-1 flex flex-col gap-2">
              {session?.user ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {session.user.name || session.user.email}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-xs"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 px-1">
                  <Link
                    href="/auth"
                    className="flex-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full text-xs">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/plan"
                    className="flex-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white">
                      Start Planning
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
