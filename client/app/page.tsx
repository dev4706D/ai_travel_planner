"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Plane,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Compass,
  ArrowRight,
  Star,
  Users,
  Luggage,
  ChevronRight,
  CheckCircle2,
  Hotel,
  Bot,
  Coffee,
  Camera,
  Mountain,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Destination categories for interactive showcase
const destinationCategories = [
  { id: "all", label: "All Destinations" },
  { id: "culture", label: "Culture & Cities" },
  { id: "nature", label: "Nature & Alps" },
  { id: "beach", label: "Beaches & Islands" },
  { id: "adventure", label: "Adventure & Food" },
];

const featuredDestinations = [
  {
    id: "tokyo",
    title: "Tokyo & Kyoto Blossom",
    country: "Japan",
    category: "culture",
    duration: "7 Days",
    estBudget: "$1,850",
    rating: "4.98",
    reviews: "342",
    tag: "Most Popular",
    gradient: "from-rose-500/20 via-pink-500/10 to-indigo-500/20",
    borderGlow: "hover:border-rose-400/50",
    icon: Camera,
    highlights: ["Shinjuku Night Food Tour", "Fushimi Inari Sunrise", "Bullet Train Express"],
    vibe: "Culture & Cuisine",
  },
  {
    id: "amalfi",
    title: "Amalfi Coast & Capri",
    country: "Italy",
    category: "beach",
    duration: "6 Days",
    estBudget: "$2,350",
    rating: "4.96",
    reviews: "284",
    tag: "Romantic Escape",
    gradient: "from-sky-500/20 via-blue-500/10 to-emerald-500/20",
    borderGlow: "hover:border-sky-400/50",
    icon: Sun,
    highlights: ["Capri Sunset Boat Charter", "Ravello Cliffside Villas", "Limoncello Tastings"],
    vibe: "Scenic & Relaxed",
  },
  {
    id: "swiss",
    title: "Swiss Alpine Wonders",
    country: "Switzerland",
    category: "nature",
    duration: "5 Days",
    estBudget: "$2,100",
    rating: "5.0",
    reviews: "198",
    tag: "Scenic Highs",
    gradient: "from-emerald-500/20 via-teal-500/10 to-blue-500/20",
    borderGlow: "hover:border-emerald-400/50",
    icon: Mountain,
    highlights: ["Glacier 3000 Peak Walk", "Zermatt Matterhorn Views", "Lake Lucerne Cruise"],
    vibe: "Adventure & Luxury",
  },
  {
    id: "bali",
    title: "Bali Spiritual & Surf",
    country: "Indonesia",
    category: "beach",
    duration: "8 Days",
    estBudget: "$1,450",
    rating: "4.92",
    reviews: "410",
    tag: "Best Value",
    gradient: "from-amber-500/20 via-orange-500/10 to-emerald-500/20",
    borderGlow: "hover:border-amber-400/50",
    icon: Coffee,
    highlights: ["Ubud Waterfall Trek", "Cliffside Uluwatu Sunset", "Private Ricefield Villa"],
    vibe: "Relaxing & Vibrant",
  },
  {
    id: "reykjavik",
    title: "Iceland Northern Lights",
    country: "Iceland",
    category: "adventure",
    duration: "6 Days",
    estBudget: "$2,200",
    rating: "4.97",
    reviews: "175",
    tag: "Epic Bucket List",
    gradient: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
    borderGlow: "hover:border-cyan-400/50",
    icon: Sparkles,
    highlights: ["Golden Circle Geysers", "Blue Lagoon Geothermal Spa", "Ice Cave Expedition"],
    vibe: "Adventure & Wonder",
  },
  {
    id: "paris",
    title: "Parisienne Art & Cafés",
    country: "France",
    category: "culture",
    duration: "5 Days",
    estBudget: "$1,920",
    rating: "4.91",
    reviews: "320",
    tag: "Timeless Classic",
    gradient: "from-purple-500/20 via-indigo-500/10 to-pink-500/20",
    borderGlow: "hover:border-purple-400/50",
    icon: Star,
    highlights: ["Louvre VIP Evening Access", "Montmartre Hidden Bakeries", "Seine River Dinner"],
    vibe: "Art & Romance",
  },
];

// AI Agent Team details
const aiAgents = [
  {
    role: "Flight & Transit Strategist",
    badge: "Air Route Agent",
    description: "Scans hundreds of flights across price, layover comfort, baggage policies, and arrival time logic.",
    icon: Plane,
    color: "from-blue-600 to-cyan-500",
    bgLight: "bg-blue-50 dark:bg-blue-950/50",
    stat: "40+ Airlines Compared",
  },
  {
    role: "Stay & Boutique Concierge",
    badge: "Lodging Agent",
    description: "Evaluates verified guest ratings, neighborhood safety, walking distance to landmarks, and amenities.",
    icon: Hotel,
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 dark:bg-amber-950/50",
    stat: "Verified Ratings 8.5+",
  },
  {
    role: "Local Insider & Hidden Gems",
    badge: "Experience Agent",
    description: "Uncovers secret viewpoints, authentic food alleys, cultural customs, and avoids overcrowded tourist traps.",
    icon: Compass,
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/50",
    stat: "Curated Local POIs",
  },
  {
    role: "Budget & Pacing Optimizer",
    badge: "Finance & Logistics",
    description: "Maintains budget allocations, factors in realistic travel transitions, prevents burnout, and ensures smooth days.",
    icon: DollarSign,
    color: "from-purple-600 to-indigo-500",
    bgLight: "bg-purple-50 dark:bg-purple-950/50",
    stat: "Zero Budget Surprises",
  },
];

// FAQs
const faqs = [
  {
    question: "How does the AI Multi-Agent team plan my trip?",
    answer: "Unlike single-prompt chat bots, TripCraft AI deploys specialized autonomous agents in parallel. One agent searches and validates flight routes; another curates verified hotels within your target budget; a third maps geographic attractions to prevent unnecessary backtracking; and the master coordinator synchronizes everything into an actionable day-by-day itinerary.",
  },
  {
    question: "Can I customize the plan after it's generated?",
    answer: "Yes! Every trip plan is saved to your account. You can explore the detailed day breakdown, view alternate flight times, examine hotel amenities, and regenerate or tweak specific preferences anytime.",
  },
  {
    question: "How accurate are the estimated prices and budgets?",
    answer: "The agents estimate current market prices across real flight corridors, average seasonal hotel rates, and typical food/activity expenses for your chosen travel style (Backpacker, Balanced, or Luxury).",
  },
  {
    question: "Is TripCraft AI free to use?",
    answer: "Yes, you can craft comprehensive, multi-day itineraries for any destination across the globe without paying a dime.",
  },
];

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  // const badgesRef = useRef<HTMLDivElement>(null);
  // const ctaBoxRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [quickInput, setQuickInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // GSAP Hero Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline and badges
      gsap.from(".gsap-fade-in", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Subtle continuous floating for hero preview cards
      gsap.to(".gsap-float-1", {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".gsap-float-2", {
        y: 12,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // Animate stats counter indicators
      gsap.from(".gsap-stat", {
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.4,
        ease: "back.out(1.5)",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const filteredDestinations =
    activeCategory === "all"
      ? featuredDestinations
      : featuredDestinations.filter((d) => d.category === activeCategory);

  function handleQuickStart(e: React.FormEvent) {
    e.preventDefault();
    if (quickInput.trim()) {
      router.push(`/plan?dest=${encodeURIComponent(quickInput.trim())}`);
    } else {
      router.push("/plan");
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" ref={heroRef}>
      {/* Dynamic Background Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-400/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 -left-48 w-96 h-96 bg-amber-400/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="gsap-fade-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: "8s" }} />
              <span>Next-Gen Multi-Agent Travel Engine</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="hidden sm:inline-block text-muted-foreground font-normal">v2.0 Orchestrator</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="gsap-fade-in text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]"
            >
              Your Dream Trip,{" "}
              <span className="gradient-text">Masterfully Crafted</span> by AI Agents.
            </h1>

            {/* Subtext */}
            <p className="gsap-fade-in text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stop juggling dozens of tabs, price aggregators, and disjointed reviews. Tell us where you want to go—our specialized AI agents coordinate flights, boutique stays, daily rhythms, and budget in seconds.
            </p>

            {/* Quick Interactive Prompt Bar */}
            <div className="gsap-fade-in pt-2">
              <form
                onSubmit={handleQuickStart}
                className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto lg:mx-0"
              >
                <div className="flex-1 flex items-center gap-3 px-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Where to? (e.g., 7 days in Tokyo, Rome with kids...)"
                    className="w-full bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md shadow-blue-500/25 px-6 font-semibold"
                >
                  <span>Build Itinerary</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Popular quick jump tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3.5 text-xs text-muted-foreground">
                <span className="font-medium">Trending:</span>
                {["Tokyo 🌸", "Santorini ☀️", "Swiss Alps 🏔️", "Bali 🌴", "Paris 🥐"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const cleanDest = tag.split(" ")[0];
                      setQuickInput(cleanDest);
                      router.push(`/plan?dest=${encodeURIComponent(cleanDest)}`);
                    }}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Social proof trust metrics */}
            <div className="gsap-fade-in pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="gsap-stat">
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">50k+</div>
                <div className="text-xs text-muted-foreground">Trips Orchestrated</div>
              </div>
              <div className="gsap-stat">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">4.9 / 5</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center lg:justify-start gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  Traveler Score
                </div>
              </div>
              <div className="gsap-stat">
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">4 AI</div>
                <div className="text-xs text-muted-foreground">Specialist Agents</div>
              </div>
            </div>
          </div>

          {/* Hero Right: Live Interactive Card Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Visual glow backdrop */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Central Main Featured Card */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-slate-950/60 space-y-5">
              {/* Card Header with Destination image simulation */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-700 via-indigo-600 to-rose-500 p-5 flex flex-col justify-between text-white shadow-inner">
                <div className="flex justify-between items-start">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-0 font-medium text-xs">
                    Tokyo & Kyoto Experience
                  </Badge>
                  <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>4.98</span>
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold">7-Day Cherry Blossom Journey</div>
                  <div className="text-xs text-white/80 flex items-center gap-2 mt-1">
                    <Calendar className="w-3.5 h-3.5" /> Apr 10 - Apr 17
                    <span>•</span>
                    <Users className="w-3.5 h-3.5" /> 2 Travelers
                  </div>
                </div>
              </div>

              {/* Multi-Agent Action Timeline Preview */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  AI Orchestration Status
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <Plane className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Flight Route Optimized</div>
                        <div className="text-[11px] text-muted-foreground">Direct ANA Nonstop · Best Fare</div>
                      </div>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">$840</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                        <Hotel className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Boutique Ryokan Secured</div>
                        <div className="text-[11px] text-muted-foreground">Kyoto Gion District · Onsen bath</div>
                      </div>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">4.9★</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Secret Ramen & Temple Walk</div>
                        <div className="text-[11px] text-muted-foreground">Curated by Experience Agent</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-purple-600 border-purple-300">
                      Hidden Gem
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Button inside card */}
              <Link href="/plan?dest=Tokyo" className="block pt-1">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-xl">
                  <span>Explore Sample Itinerary</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Floating Satellite Card 1: Amalfi Coast */}
            <div className="gsap-float-1 hidden sm:flex absolute -bottom-6 -left-8 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-300/40 dark:shadow-slate-950/60 items-center gap-3 w-56 z-10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Sun className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-foreground truncate">Amalfi Sunset Tour</div>
                <div className="text-[11px] text-muted-foreground">Positano & Capri</div>
                <div className="text-[11px] text-emerald-600 font-semibold">$2,350 total · 6 days</div>
              </div>
            </div>

            {/* Floating Satellite Card 2: AI Multi-Agent indicator */}
            <div className="gsap-float-2 hidden sm:flex absolute -top-5 -right-6 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-300/40 dark:shadow-slate-950/60 items-center gap-2.5 z-10">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div className="text-xs font-semibold text-foreground">
                4 Agents Synchronized
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50/70 dark:bg-slate-950/50 border-y border-slate-200/70 dark:border-slate-800/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50">
              Intelligent Workflow
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              How TripCraft AI Works in 3 Simple Steps
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              We eliminated the 30-tab headache. Here is how your travel vision turns into a ready-to-book master plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-blue-600">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-800">01</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Share Your Dream</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enter your destination, dates, traveler group (solo, couple, family), budget style, and desired vibes (relaxing, foodie, cultural, adventure).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Takes 60 seconds <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-blue-200/70 dark:border-blue-900/70 shadow-md shadow-blue-500/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                Autonomous Magic
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600">
                    <Bot className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-extrabold text-blue-200 dark:text-blue-900">02</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Agents Deliberate</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Autonomous agents query real flight paths, inspect verified hotel reviews, sequence activities by location to avoid zigzagging, and balance daily pace.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                4 Specialized Agents working in parallel <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60 flex items-center justify-center text-amber-500">
                    <Luggage className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-800">03</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Live Master Plan</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Receive a complete morning, afternoon, and evening schedule with flight booking codes, curated stays, budget charts, and insider travel tips.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-amber-600 flex items-center gap-1">
                Saved & Exportable anytime <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Multi-Agent Team Showcase Section */}
      <section id="agents" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 text-xs px-3 py-1">
            Behind The Scenes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Meet Your Personal AI Travel Council
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Instead of a generic chatbot hallucinating fake recommendations, each task is delegated to an expert agent equipped with dedicated evaluation criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiAgents.map((agent, idx) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${agent.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-semibold">
                      {agent.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">{agent.role}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground">Performance:</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {agent.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Destinations with Category Filter */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/50 mb-3">
                Curated Inspiration
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Trending Destinations Crafted by AI
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
                Explore hand-crafted sample itineraries. Click any destination to pre-fill the wizard and personalize it to your own travel dates.
              </p>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs self-start">
              {destinationCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    activeCategory === cat.id
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((dest) => {
                const Icon = dest.icon;
                return (
                  <motion.div
                    key={dest.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl ${dest.borderGlow} transition-all duration-300 overflow-hidden flex flex-col justify-between`}
                  >
                    <div>
                      {/* Visual top banner */}
                      <div className={`p-6 bg-gradient-to-br ${dest.gradient} border-b border-slate-100 dark:border-slate-800`}>
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-white/90 dark:bg-slate-900/90 text-foreground border-0 shadow-xs font-semibold text-xs">
                            {dest.tag}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs font-bold text-foreground bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-full shadow-xs">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{dest.rating}</span>
                            <span className="text-muted-foreground font-normal">({dest.reviews})</span>
                          </div>
                        </div>

                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{dest.title}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-600" />
                              <span>{dest.country}</span>
                              <span>•</span>
                              <span>{dest.duration}</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-blue-600">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-muted-foreground">Estimated Budget:</span>
                          <span className="font-bold text-foreground text-sm">{dest.estBudget}</span>
                        </div>

                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                            Key Agent Highlights
                          </div>
                          <ul className="space-y-1.5 text-xs text-muted-foreground">
                            {dest.highlights.map((h) => (
                              <li key={h} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="p-6 pt-0">
                      <Link href={`/plan?dest=${encodeURIComponent(dest.country)}`}>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold text-xs transition-all duration-200"
                        >
                          <span>Plan {dest.title.split(" ")[0]} Trip</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/50">
            Got Questions?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base">
            Everything you need to know about TripCraft AI and how our agents build your travel plans.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-foreground text-base hover:text-blue-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs transition-transform duration-300 ${
                      isOpen ? "rotate-90 text-blue-600" : ""
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* High-Impact Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white p-8 sm:p-14 text-center shadow-2xl shadow-blue-500/20">
          {/* Decorative mesh rings */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge className="bg-white/20 text-white backdrop-blur-md border-0 text-xs px-3 py-1 font-semibold">
              Ready When You Are
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Craft Your Next Escape in 60 Seconds
            </h2>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Experience the future of stress-free travel planning. Generate flights, accommodations, activities, and budget breakdowns tailored just for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/plan" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 font-bold px-8 py-6 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105"
                >
                  <Plane className="w-5 h-5 mr-2" />
                  Start Planning Free
                </Button>
              </Link>
              <Link href="/plans" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6 py-6 rounded-2xl backdrop-blur-md"
                >
                  <Luggage className="w-5 h-5 mr-2" />
                  View Saved Plans
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Multi-Agent Generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
