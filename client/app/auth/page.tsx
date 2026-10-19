"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Compass, Sparkles, ArrowRight, Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  function handleInputChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to sign in");
        return;
      }

      toast.success("Welcome back! Redirecting to your dashboard...");
      router.push("/plan");
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to create account");
        return;
      }

      toast.success("Account created successfully! Redirecting...");
      router.push("/plan");
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden">
          <CardHeader className="space-y-3 text-center pb-4 pt-8 bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/25">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                TripCraft<span className="text-amber-500">.ai</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                Access your autonomous travel agent team and saved journeys
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-2">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-slate-100 dark:bg-slate-800 mb-6">
                <TabsTrigger
                  value="signin"
                  className="rounded-xl text-xs font-semibold py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-xl text-xs font-semibold py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                >
                  Create Account
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-11 rounded-xl text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      className="h-11 rounded-xl text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-transform hover:scale-[1.01]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Explorer"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-11 rounded-xl text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="signup-email"
                      className="text-xs font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Email Address
                    </label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-11 rounded-xl text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="signup-password"
                      className="text-xs font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      Create Password
                    </label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      className="h-11 rounded-xl text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-transform hover:scale-[1.01]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <Sparkles className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <Link
                href="/plan"
                className="text-xs text-muted-foreground hover:text-blue-600 transition-colors inline-flex items-center gap-1"
              >
                <span>Continue without signing in</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
