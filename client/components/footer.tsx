import { Compass, Send, MapPin, Github, Twitter, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-blue-600 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 dark:to-white bg-clip-text text-transparent">
                TripCraft<span className="text-amber-500">.ai</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your autonomous AI travel agent team. We research, compare, and harmonize flights, hotels, unique activities, and budgets into one seamless, unforgettable itinerary.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-Agent Engine Online</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/plan" className="hover:text-blue-600 transition-colors">
                  Create Trip Plan
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-blue-600 transition-colors">
                  Saved Itineraries
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-blue-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#agents" className="hover:text-blue-600 transition-colors">
                  AI Agent Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Trending Escapes
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/plan?dest=Tokyo" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link href="/plan?dest=Santorini" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Santorini, Greece
                </Link>
              </li>
              <li>
                <Link href="/plan?dest=Swiss+Alps" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Swiss Alps, Switzerland
                </Link>
              </li>
              <li>
                <Link href="/plan?dest=Bali" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-500" /> Bali, Indonesia
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Inspired / Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Travel Intelligence
            </h4>
            <p className="text-xs text-muted-foreground">
              Get AI-curated flight drops and secret destination guides directly in your inbox.
            </p>
            <div className="flex gap-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Button size="sm" className="px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 pt-2 text-muted-foreground">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} TripCraft AI. Designed for modern global explorers.</p>
          <div className="flex items-center gap-2">
            <span>Orchestrated with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
            <span>by</span>
            <a
              href="https://x.com/mtwn105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
