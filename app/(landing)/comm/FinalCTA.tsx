import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="get-started" className="container-shell pb-16 sm:pb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-purple-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <div className="absolute -right-12 -top-28 h-80 w-80 rounded-full border border-black/10" />
        <div className="absolute -right-2 -top-16 h-60 w-60 rounded-full border border-black/10" />
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow text-white">Make your next move</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.07em] sm:text-6xl">
            Space for your
            <br />
            next big thing.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white">
            Find a place to grow—or help someone else make the most of theirs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#spaces"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-xs font-semibold text-black bg-white transition hover:bg-neutral-100"
            >
              Find a space <ArrowUpRight size={15} />
            </Link>
            <Link
              href="#owners"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3.5 text-xs font-semibold transition hover:bg-black/5"
            >
              I have a space <MoveUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
