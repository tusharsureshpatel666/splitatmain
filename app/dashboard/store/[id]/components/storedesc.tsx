"use client";

import React from "react";
import { Store, FileText } from "lucide-react";

interface StoreDescriptionProps {
  description?: string;
}

const StoreDescription = ({ description }: StoreDescriptionProps) => {
  if (!description?.trim()) return null;

  return (
    <section className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 dark:border-white/[0.08] dark:bg-[#111116]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
          <Store size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
            About this space
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Everything you need to know about this commercial property.
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200/80 pt-5 dark:border-white/[0.08]">
        <div className="flex items-start gap-3">
          <FileText size={17} className="mt-1 shrink-0 text-violet-500" />
          <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoreDescription;
