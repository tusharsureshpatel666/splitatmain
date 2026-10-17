"use client";

import Image from "next/image";

import Link from "next/link";
const stats = [
  { value: "200+", label: "Happy Customers" },
  { value: "10k+", label: "Properties For Clients" },
  { value: "16+", label: "Years of Experience" },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[480px] w-full overflow-hidden  text-white">
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      />

      <div className="mx-auto grid min-h-[480px]  grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-12">
          <div className="">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-violet-400">
              Find your perfect space
            </p>

            <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              Discover Your Dream Property with{" "}
              <span className="text-white">Estatein</span>
            </h1>

            <p className="mt-5 max-w-[470px] text-sm leading-6 text-neutral-400">
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </p>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="rounded-md border border-white/10 px-5 py-3 text-xs font-medium transition hover:border-white/30 hover:bg-white/5"
              >
                Learn More
              </Link>

              <Link
                href="/properties"
                className="rounded-md bg-violet-600 px-5 py-3 text-xs font-medium shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
              >
                Browse Properties
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-3 sm:p-4"
                >
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] leading-4 text-neutral-400 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right architectural visual */}
        <div className="relative min-h-[320px] overflow-hidden bg-[#17151f] lg:min-h-full">
          {/* Purple glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-violet-900/20" />

          <Image
            src={"/logo.svg"}
            alt="Modern glass commercial buildings"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center opacity-80"
          />

          {/* Blend image into dark design */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#101010]/70 via-transparent to-violet-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/40 via-transparent to-black/10" />

          {/* Circular badge */}

          {/* Bottom caption */}
          <div className="absolute bottom-6 left-6 right-6 z-10 sm:bottom-8 sm:left-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Spaces that inspire
            </p>
            <p className="mt-2 text-lg font-medium sm:text-xl">
              Find a place to call yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
