"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";

const questions = [
  {
    q: "What is SplitAt?",
    a: "SplitAt is a commercial-space marketplace concept that helps businesses discover spaces and helps owners make better use of underused areas, time slots, or square footage.",
  },
  {
    q: "Can I book a space for just a few hours or days?",
    a: "The goal is to support flexible arrangements—from short sessions and day bookings to recurring weekly schedules. Actual terms depend on each listing.",
  },
  {
    q: "What kinds of commercial spaces can I find?",
    a: "Examples include studios, shared offices, retail pop-ups, meeting rooms, treatment or service rooms, and other suitable commercial spaces.",
  },
  {
    q: "How do I list my commercial space?",
    a: "Start by sharing your space type, location, availability, and preferred terms. The SplitAt team can then help you prepare a listing and connect with potential users.",
  },
  {
    q: "Are listings and bookings verified?",
    a: "Before launching, establish a clear verification process for property authority, permitted use, safety, pricing, and booking terms. Only display a verification badge when those checks are complete.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="container-shell grid gap-10 py-20 text-gray-900 transition-colors duration-300 dark:text-white sm:py-28 lg:grid-cols-[.8fr_1.2fr]"
    >
      <div>
        <SectionHeading
          eyebrow="Questions, answered"
          title="A little more clarity."
          description="Have a question about finding or sharing commercial space? Start here."
        />

        <p className="mt-6 text-xs text-gray-500 dark:text-neutral-400">
          Still curious?{" "}
          <a
            href="mailto:hello@splitat.com"
            className="font-semibold text-purple-700 underline underline-offset-4 transition-colors hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
          >
            Talk to our team
          </a>
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((item, index) => {
          const isOpen = open === index;

          return (
            <div
              key={item.q}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-purple-200 bg-white shadow-sm dark:border-white/15 dark:bg-white/[.07] dark:shadow-none"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white dark:border-white/[.08] dark:bg-white/[.03] dark:hover:border-white/15 dark:hover:bg-white/[.05]"
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {item.q}
                </span>

                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 bg-purple-500 text-white dark:bg-purple-400 dark:text-ink"
                      : "bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white"
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6">
                  <p className="max-w-2xl text-sm leading-6 text-gray-600 dark:text-neutral-300">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
