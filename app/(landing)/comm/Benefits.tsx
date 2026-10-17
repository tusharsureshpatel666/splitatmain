import { ArrowUpRight, Building2, Clock3, Coins, Layers3 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const benefits = [
  {
    icon: Coins,
    title: "Make every square foot count",
    text: "Monetize idle rooms, spare storefront hours, and unused work areas.",
  },
  {
    icon: Clock3,
    title: "Flexible on purpose",
    text: "Book by the hour, day, weekend, or a schedule that fits your operation.",
  },
  {
    icon: Layers3,
    title: "Share without the hassle",
    text: "Find the right fit for your space, audience, and business needs.",
  },
];

export default function Benefits() {
  return (
    <section id="owners" className="container-shell py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-[26px] bg-[#d8d8ce]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-5 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime">
                <Building2 size={20} className="text-black" />
              </span>
              <div>
                <p className="text-sm font-bold text-black">
                  Have space to share?
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Turn your underused commercial space into a new revenue
                  stream.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="For owners and operators"
            title="Your space has more potential."
            description="A room that sits empty after 6 pm. A storefront with quiet weekdays. A studio with open slots. Put that space to work."
          />
          <div className="mt-8 space-y-5">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 border-b border-black/10 pb-5 text-white last:border-0"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/10 text-black bg-white">
                  <Icon size={19} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-6 text-neutral-500">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#get-started"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-xs font-semibold text-white transition bg-purple-600 hover:bg-purple-700"
          >
            List your space <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
