import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  MapPin,
  Search,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="container-shell relative grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1">
            <span className="h-2 w-2 rounded-full bg-[#94B34B]" />
            <span className="text-[11px] font-semibold tracking-wide  text-neutral-700">
              A smarter way to use commercial space
            </span>
          </div>

          <h1 className="max-w-[660px] text-[clamp(3.2rem,6.6vw,6.1rem)] font-semibold leading-[.94] tracking-[-.085em]">
            Great spaces.
            <br />
            <span className="relative inline-block">
              Better <span className="relative z-10">together.</span>
              <span className="absolute bottom-[5%] left-0 -z-0 h-[23%] w-full -rotate-1 rounded-sm bg-purple-500" />
            </span>
          </h1>

          <p className="mt-7 max-w-[490px] text-[15px] leading-7 text-neutral-600 sm:text-base">
            Find your next business location—or earn more from the space you
            already have. Split rent, time, and opportunity on your terms.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 rounded-full bg-purple-500 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-700"
            >
              Explore spaces <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-gray-400  px-6 py-4 text-sm font-semibold transition hover:bg-gray05"
            >
              List your space <ArrowDownRight size={16} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-neutral-600">
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#7D963A]" /> Flexible terms
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#7D963A]" /> Verified listings
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#7D963A]" /> Built for business
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
          <div className="absolute -right-8 -top-10 h-48 w-48 rounded-full bg-purple-500/50 blur-3xl" />
          <div className="relative aspect-[.91/1] overflow-hidden rounded-[28px] bg-[#d4d4c9] shadow-soft sm:aspect-[1.02/1]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/5" />
            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[.15em] text-white backdrop-blur-md">
              Space for what&apos;s next
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-neutral-500">
                    Featured workspace
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight text-black sm:text-xl">
                    The Corner Studio
                  </h2>
                  <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin size={12} /> West Delhi, New Delhi
                  </p>
                </div>
                <div className="rounded-xl bg-lime px-3 py-2 text-right">
                  <p className="text-[9px] text-black  font-semibold uppercase tracking-wide">
                    From
                  </p>
                  <p className="text-base font-bold text-black ">
                    ₹8000
                    <span className="text-[10px] text-black  font-medium">
                      /month
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
                <div className="flex -space-x-2">
                  {[
                    "photo-1534528741775-53994a69daeb",
                    "photo-1500648767791-00dcc994a43e",
                    "photo-1506794778202-cad84cf45f1d",
                  ].map((id) => (
                    <div
                      key={id}
                      className="h-7 w-7 rounded-full border-2 border-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=80)`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-medium text-neutral-500">
                  Flexible bookings · 4.9/5 rating
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -left-5 top-[27%] hidden items-center gap-3 rounded-2xl border border-black/5 bg-white p-3.5 shadow-soft sm:flex lg:-left-12">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-400">
              <Search size={18} className="text-white" />
            </span>
            <span>
              <span className="block text-xs font-bold text-gray-900 ">
                Find your fit
              </span>
              <span className="mt-1 block text-[10px] text-neutral-500">
                Space that suits your schedule
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="container-shell relative pb-8">
        <div className="flex items-center justify-between border-t border-black/10 pt-5 text-[10px] font-bold uppercase tracking-[.17em] text-neutral-400">
          <span>Space is better shared</span>
          <span>Discover · Share · Grow</span>
        </div>
      </div>
    </section>
  );
}
