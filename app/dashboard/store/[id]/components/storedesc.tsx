"use client";

import React from "react";
import { Store, FileText, Sparkles } from "lucide-react";

interface StoreDescriptionProps {
  description?: string;
}

const StoreDescription = ({ description }: StoreDescriptionProps) => {
  if (!description?.trim()) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white dark:border-white/[0.08] dark:bg-[#111116]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-7 dark:border-white/[0.07]">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
          <Store size={21} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
            About this space
          </h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Get to know the space before you book.
          </p>
        </div>

        <Sparkles
          size={18}
          className="shrink-0 text-violet-400"
          strokeWidth={1.7}
        />
      </div>

      {/* Description */}
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="mb-4 flex items-center gap-2">
          <FileText
            size={16}
            className="text-violet-600 dark:text-violet-400"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
            Space overview
          </span>
        </div>

        <p className="whitespace-pre-line break-words text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
};

export default StoreDescription;
