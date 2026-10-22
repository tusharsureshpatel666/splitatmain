"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Users, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  peopleDesc: string;
  maxLines?: number;
};

const PeopleDesc = ({ peopleDesc, maxLines = 3 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!peopleDesc?.trim()) return null;

  const isLong = peopleDesc.trim().length > 120;

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white dark:border-white/[0.08] dark:bg-[#111116]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/[0.07]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
          <Users size={19} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold tracking-tight text-gray-950 dark:text-white">
            Who we're looking for
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Find the right people to share your space
          </p>
        </div>

        <Sparkles size={17} className="shrink-0 text-violet-400" />
      </div>

      {/* Description */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-300">
            Ideal match
          </span>
        </div>

        <div
          className={clsx(
            "whitespace-pre-line break-words text-sm leading-7 text-gray-600 dark:text-gray-300",
            !expanded && isLong && "line-clamp-[" + maxLines + "]",
          )}
        >
          {`Finding for ${peopleDesc.trim()}`}
        </div>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-300 dark:hover:text-violet-200"
          >
            {expanded ? (
              <>
                Show less
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                Read more
                <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default PeopleDesc;
