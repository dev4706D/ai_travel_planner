"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Luggage,
  Plus,
  RefreshCw,
  AlertCircle,
  Trash2,
  Eye,
  Sparkles,
  Compass,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TripPlan {
  id: string;
  name: string;
  destination: string;
  startingLocation: string;
  travelDatesStart: string;
  travelDatesEnd?: string;
  dateInputType: string;
  duration?: number;
  travelingWith: string;
  adults: number;
  children: number;
  ageGroups: string[];
  budget: number;
  budgetCurrency: string;
  travelStyle: string;
  budgetFlexible: boolean;
  vibes: string[];
  priorities: string[];
  interests?: string;
  rooms: number;
  pace: number[];
  beenThereBefore?: string;
  lovedPlaces?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
}

const formatCurrency = (amount: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
  };
  return `${symbols[currency] || "$"}${amount.toLocaleString()}`;
};

const formatDate = (dateString: string, inputType: string) => {
  if (inputType === "text" || !dateString) {
    return dateString || "Flexible dates";
  }
  try {
    return format(new Date(dateString), "MMM dd, yyyy");
  } catch {
    return dateString;
  }
};

const getPaceDescription = (pace: number[]) => {
  const paceValue = pace[0] || 3;
  const descriptions = {
    1: "Very relaxed",
    2: "Mostly relaxed",
    3: "Balanced",
    4: "Quite busy",
    5: "Action-packed",
  };
  return descriptions[paceValue as keyof typeof descriptions] || "Balanced";
};

export default function Plans() {
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTripPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/plans");
      const data = await response.json();

      if (data.success) {
        setTripPlans(data.tripPlans);
      } else {
        setError(data.message || "Failed to fetch trip plans");
      }
    } catch (err) {
      console.error("Error fetching trip plans:", err);
      setError("Failed to fetch trip plans");
    } finally {
      setLoading(false);
    }
  };

  const deleteTripPlan = async (planId: string) => {
    try {
      setDeletingPlanId(planId);
      const response = await fetch(`/api/plans/${planId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setTripPlans(tripPlans.filter((plan) => plan.id !== planId));
        toast.success("Trip plan deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete trip plan");
      }
    } catch (err) {
      console.error("Error deleting trip plan:", err);
      toast.error("Failed to delete trip plan");
    } finally {
      setDeletingPlanId(null);
    }
  };

  const handleDeletePlan = (planId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this trip plan? This action cannot be undone."
      )
    ) {
      deleteTripPlan(planId);
    }
  };

  useEffect(() => {
    fetchTripPlans();
  }, []);

  const filteredPlans = tripPlans.filter(
    (p) =>
      p.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.travelStyle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center mx-auto text-blue-600 animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Loading Your Journeys...</h2>
          <p className="text-sm text-muted-foreground">Gathering your AI-crafted plans from storage.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-md mx-auto text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900/60 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center mx-auto text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Error Loading Plans</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchTripPlans} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
              <Luggage className="w-3.5 h-3.5" />
              <span>Personal Itinerary Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Your Travel Plans
            </h1>
            <p className="text-sm text-muted-foreground">
              Review, explore, and manage your AI-orchestrated travel itineraries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={fetchTripPlans}
              variant="outline"
              size="sm"
              className="rounded-xl h-10 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Link href="/plan">
              <Button
                size="sm"
                className="rounded-xl h-10 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 font-semibold"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Craft New Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        {tripPlans.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by destination or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <div className="text-xs font-semibold text-muted-foreground">
              Showing {filteredPlans.length} of {tripPlans.length} itineraries
            </div>
          </div>
        )}

        {/* Trip Plans Grid or Empty State */}
        {tripPlans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl max-w-xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-amber-500/10 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center mx-auto text-blue-600 shadow-sm">
              <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">No Itineraries Yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Your passport is waiting! Tell our multi-agent AI team about your ideal vacation and get a complete day-by-day itinerary in seconds.
              </p>
            </div>
            <Link href="/plan">
              <Button
                size="lg"
                className="rounded-2xl px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 font-bold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Craft Your First Itinerary
              </Button>
            </Link>
          </motion.div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No trip plans match your search query &quot;{searchQuery}&quot;.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredPlans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Top destination header with gradient backdrop */}
                    <div className="p-6 bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-amber-500/10 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Destination</span>
                          </div>
                          <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                            {plan.destination}
                          </h3>
                          <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                            {plan.name || "Custom Journey"}
                          </div>
                        </div>

                        <Badge
                          variant="secondary"
                          className="capitalize text-[11px] font-semibold bg-white dark:bg-slate-800 shadow-xs"
                        >
                          {plan.travelStyle || "Balanced"}
                        </Badge>
                      </div>
                    </div>

                    {/* Travel Details Body */}
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                            Departure
                          </span>
                          <span className="font-semibold text-foreground truncate block mt-0.5">
                            {plan.startingLocation || "Flexible"}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                            Budget / Person
                          </span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                            {formatCurrency(plan.budget, plan.budgetCurrency)}
                          </span>
                        </div>
                      </div>

                      {/* Dates and Duration */}
                      <div className="space-y-2 text-xs text-muted-foreground pt-1">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="text-foreground font-medium">
                            {formatDate(plan.travelDatesStart, plan.dateInputType)}
                            {plan.travelDatesEnd && plan.dateInputType === "picker" && (
                              <> — {formatDate(plan.travelDatesEnd, plan.dateInputType)}</>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>
                              {plan.adults} adult{plan.adults > 1 ? "s" : ""}
                              {plan.children > 0 && `, ${plan.children} kids`}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            Pace: {getPaceDescription(plan.pace)}
                          </span>
                        </div>
                      </div>

                      {/* Vibes Badges */}
                      {plan.vibes && plan.vibes.length > 0 && (
                        <div className="pt-2">
                          <div className="flex flex-wrap gap-1">
                            {plan.vibes.slice(0, 3).map((vibe) => (
                              <Badge
                                key={vibe}
                                variant="outline"
                                className="text-[10px] capitalize bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 font-medium"
                              >
                                {vibe}
                              </Badge>
                            ))}
                            {plan.vibes.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-[10px] bg-slate-50 dark:bg-slate-800/80"
                              >
                                +{plan.vibes.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/plan/${plan.id}`} className="flex-1">
                        <Button
                          size="sm"
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          View Itinerary
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        disabled={deletingPlanId === plan.id}
                        className="rounded-xl h-9 w-9 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Delete Plan"
                      >
                        {deletingPlanId === plan.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>

                    <div className="text-[10px] text-muted-foreground text-center">
                      Saved {format(new Date(plan.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
