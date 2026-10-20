"use client";

import React from "react";
import {
  Users,
  BriefcaseBusiness,
  Target,
  Sparkles,
  CheckCircle2,
  Handshake,
} from "lucide-react";

interface PeopleProps {
  idealBusinessName?: string;
  description?: string;
  requirements?: string[];
}

const People = ({
  idealBusinessName = "Complementary business",
  description = "We’re looking for a business that complements our cake shop, attracts similar customers, and creates a better shopping experience for everyone.",
  requirements = [
    "Clean and professional setup",
    "Customer-focused service",
    "Non-competing products or services",
    "Open to collaborative promotions",
  ],
}: PeopleProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/[0.09] dark:bg-[#111116]">
      {/* Subtle accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-violet-500/[0.07] blur-3xl" />

      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Users size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold tracking-tight text-gray-950 dark:text-white">
                Who we’re looking for
              </h3>

              <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                Ideal partner
              </span>
            </div>

            <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
              Find out if your business is a good fit for this space.
            </p>
          </div>
        </div>

        {/* Ideal business */}
        <div className="rounded-xl border border-violet-200/80 bg-violet-50/70 p-4 dark:border-violet-400/15 dark:bg-violet-400/[0.045]">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-violet-700 dark:text-violet-300">
            <Target size={15} />
            Ideal business type
          </div>

          <p className="mt-2 text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
            {idealBusinessName}
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        {/* Requirements */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness
              size={17}
              className="text-gray-500 dark:text-gray-400"
            />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              What makes you a good fit?
            </h4>
          </div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {requirements.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex min-w-0 items-start gap-2.5 rounded-xl border border-gray-200/80 bg-gray-50/80 px-3 py-3 text-sm leading-5 text-gray-700 transition-colors hover:border-violet-300 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-gray-300 dark:hover:border-violet-400/30"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
                />
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing message */}
        <div className="flex items-start gap-3 border-t border-gray-200/80 pt-5 dark:border-white/[0.08]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
            <Handshake size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Better together
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Let’s create a mutually beneficial partnership where both
              businesses can reach more customers and grow.
            </p>
          </div>

          <Sparkles
            size={17}
            className="ml-auto mt-1 shrink-0 text-violet-500"
          />
        </div>
      </div>
    </section>
  );
};

export default People;
