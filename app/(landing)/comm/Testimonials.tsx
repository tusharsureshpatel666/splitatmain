import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

const reviews = [
  {
    quote:
      "We needed a small space for weekend workshops—not a five-year lease. SplitAt helped us find a place that made sense for our budget.",
    name: "Aarav Mehta",
    role: "Creative workshop founder",
    initials: "AM",
  },
  {
    quote:
      "Our studio used to sit empty two days a week. Sharing those slots has helped us use the space better without changing our core business.",
    name: "Nisha Kapoor",
    role: "Studio owner",
    initials: "NK",
  },
  {
    quote:
      "The flexibility is the big difference. We could test a new neighbourhood before committing to a permanent storefront.",
    name: "Rohan Batra",
    role: "Independent retailer",
    initials: "RB",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 dark:bg-black py-20 text-gray-900 transition-colors duration-300 dark:bg-ink dark:text-white sm:py-28">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Good spaces. Good stories."
            title="Built around real business needs."
            description="Flexible space is not just about square footage. It is about what you can do with it."
          />

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
            <span className="flex gap-0.5 text-yellow-500">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={13} fill="currentColor" />
              ))}
            </span>
            Designed for better workdays
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="rounded-[22px] border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:border-purple-200 hover:shadow-md dark:border-white/10 dark:bg-white/[.045] dark:shadow-none dark:hover:bg-white/[.075] dark:hover:border-white/20 sm:p-7"
            >
              <Quote
                size={22}
                className="text-purple-600 dark:text-purple-300"
              />

              <p className="mt-5 min-h-[120px] text-[14px] leading-7 text-gray-600 dark:text-white/80">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-gray-200 pt-5 dark:border-white/10">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-100 text-xs font-bold text-purple-800 dark:bg-purple-400 dark:text-ink">
                  {review.initials}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {review.name}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-500 dark:text-white/45">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-[10px] text-gray-400 dark:text-white/40">
          Illustrative testimonials for layout preview. Replace with genuine
          customer reviews before launch.
        </p>
      </div>
    </section>
  );
}
