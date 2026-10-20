"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Store,
  Coffee,
  Utensils,
  Shirt,
  BriefcaseBusiness,
  Flower2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Check,
  LoaderCircle,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const businessTypes = [
  {
    name: "Retail shop",
    description: "Clothing, accessories, gifts",
    icon: ShoppingBag,
  },
  {
    name: "Cafe or bakery",
    description: "Coffee, cakes, quick bites",
    icon: Coffee,
  },
  { name: "Restaurant", description: "Food, takeaway, dining", icon: Utensils },
  {
    name: "Office or agency",
    description: "Startup, consulting, services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Beauty and wellness",
    description: "Salon, spa, skincare",
    icon: Flower2,
  },
  { name: "Fashion", description: "Boutique, apparel, footwear", icon: Shirt },
  {
    name: "General store",
    description: "Daily essentials, convenience",
    icon: Store,
  },
  {
    name: "Something else",
    description: "I have a different business idea",
    icon: Sparkles,
  },
];

const UserBussiness = () => {
  const [bussiness, setBussiness] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [customMode, setCustomMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let active = true;

    const checkUserBussiness = async () => {
      try {
        const res = await axios.get("/api/getuserId");

        if (!active) return;

        const user = res.data;

        if (!user) {
          router.push("/signin");
          return;
        }

        if (!user.userBussinessType) {
          setOpen(true);
        } else {
          setBussiness(user.userBussinessType);
        }
      } catch (err) {
        console.error("Error checking user business:", err);
        if (active) {
          setError("We couldn't load your profile. Please try again.");
        }
      } finally {
        if (active) setChecking(false);
      }
    };

    void checkUserBussiness();

    return () => {
      active = false;
    };
  }, [router]);

  const handleSubmit = async () => {
    const value = bussiness.trim();

    if (!value) {
      setError("Please choose or enter your business type.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/userbussiness", { bussiness: value });
      setBussiness(value);
      setOpen(false);
    } catch (err) {
      console.error("Failed to save business:", err);
      setError("We couldn't save your business type. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (name: string) => {
    if (name === "Something else") {
      setBussiness("");
      setCustomMode(true);
      setError("");
      return;
    }

    setBussiness(name);
    setCustomMode(false);
    setError("");
  };

  if (checking || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="business-dialog-title"
    >
      <div className="relative flex max-h-[95dvh] w-full flex-col overflow-hidden rounded-t-[26px] border border-white/[0.1] bg-white shadow-2xl dark:bg-[#101014] sm:max-h-[min(90dvh,820px)] sm:max-w-[620px] sm:rounded-[28px]">
        {/* Ambient accent */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />

        {/* Mobile drag indicator */}
        <div className="relative flex shrink-0 justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-white/20" />
        </div>

        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-gray-200/80 px-4 py-3.5 dark:border-white/[0.07] sm:px-7 sm:py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
              <Store size={19} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-gray-950 dark:text-white">
                SplitAt
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Personalise your experience
              </p>
            </div>
          </div>

          <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/[0.08] dark:text-violet-300">
            Business setup
          </span>
        </div>

        {/* Scrollable content */}
        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-7">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/[0.08] dark:text-violet-300 sm:mb-5 sm:h-14 sm:w-14">
                <Store size={24} strokeWidth={1.7} />
              </div>

              <h2
                id="business-dialog-title"
                className="text-[23px] font-semibold tracking-[-0.04em] text-gray-950 dark:text-white sm:text-[30px]"
              >
                What business do you want to open?
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-[13px] leading-5 text-gray-500 dark:text-gray-400 sm:mt-3 sm:text-sm sm:leading-6">
                Tell us what you're planning. We'll help you explore commercial
                spaces that fit your business.
              </p>
            </div>

            <div className="mt-6 sm:mt-7">
              {!customMode ? (
                <>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 sm:text-xs">
                      Choose a business type
                    </p>
                    <span className="text-[11px] text-gray-400 sm:text-xs">
                      Select one
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {businessTypes.map((type) => {
                      const Icon = type.icon;
                      const selected = bussiness === type.name;

                      return (
                        <button
                          key={type.name}
                          type="button"
                          onClick={() => handleSelect(type.name)}
                          aria-pressed={selected}
                          className={`relative flex min-h-[96px] min-w-0 items-start gap-2.5 rounded-xl border p-3 text-left transition-all active:scale-[0.99] sm:min-h-[104px] sm:gap-3 sm:rounded-2xl sm:p-4 ${
                            selected
                              ? "border-violet-500 bg-violet-50 ring-2 ring-violet-500/15 dark:border-violet-400 dark:bg-violet-400/[0.09] dark:ring-violet-400/10"
                              : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/50 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-violet-400/40 dark:hover:bg-violet-400/[0.04]"
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl ${
                              selected
                                ? "bg-violet-600 text-white dark:bg-violet-500"
                                : "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-300"
                            }`}
                          >
                            <Icon size={17} strokeWidth={1.8} />
                          </div>

                          <div className="min-w-0 flex-1 pr-0.5 pt-0.5">
                            <p className="break-words text-[12px] font-semibold leading-4 text-gray-900 dark:text-white sm:text-sm sm:leading-5">
                              {type.name}
                            </p>
                            <p className="mt-1 break-words text-[10px] leading-[15px] text-gray-500 dark:text-gray-400 sm:text-xs sm:leading-[17px]">
                              {type.description}
                            </p>
                          </div>

                          {selected && (
                            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-white sm:right-2.5 sm:top-2.5 sm:h-5 sm:w-5 dark:bg-violet-500">
                              <Check size={11} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCustomMode(true);
                      setBussiness("");
                      setError("");
                    }}
                    className="mt-4 w-full rounded-lg py-1 text-center text-xs leading-5 text-gray-500 transition hover:text-violet-600 sm:text-sm dark:text-gray-400 dark:hover:text-violet-300"
                  >
                    Have a specific idea?{" "}
                    <span className="font-semibold text-violet-600 dark:text-violet-300">
                      Enter your own business type
                    </span>
                  </button>
                </>
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-white/[0.08] dark:bg-white/[0.025] sm:p-5">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomMode(false);
                      setBussiness("");
                      setError("");
                    }}
                    className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-300"
                  >
                    <X size={15} />
                    Back to categories
                  </button>

                  <label
                    htmlFor="business-type"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Describe your business
                  </label>

                  <Input
                    id="business-type"
                    type="text"
                    placeholder="e.g. Mobile repair shop, pet store..."
                    value={bussiness}
                    maxLength={100}
                    autoFocus
                    onChange={(e) => {
                      setBussiness(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !loading) {
                        e.preventDefault();
                        void handleSubmit();
                      }
                    }}
                    className="h-12 rounded-xl border-gray-200 bg-white px-4 text-sm dark:border-white/[0.1] dark:bg-black/20"
                  />

                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Be specific so we can better understand your needs.
                  </p>
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/[0.06] dark:text-red-300"
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky footer stays visible while content scrolls */}
        <div className="relative shrink-0 border-t border-gray-200/80 bg-white/95 px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#101014]/95 sm:px-7 sm:pb-5 sm:pt-5">
          <Button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={loading || !bussiness.trim()}
            className="h-11 w-full rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/15 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600 sm:h-12"
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 animate-spin" size={17} />
                Saving your preference...
              </>
            ) : (
              <>
                Continue to SplitAt
                <ArrowRight className="ml-2" size={17} />
              </>
            )}
          </Button>

          <p className="mt-2 text-center text-[10px] leading-4 text-gray-400 dark:text-gray-500 sm:mt-3 sm:text-[11px] sm:leading-5">
            You can explore different spaces as your business plans evolve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBussiness;
