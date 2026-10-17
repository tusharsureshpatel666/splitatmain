import { ArrowUpRight, CalendarClock, Handshake, Search } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Explore studios, storefronts, offices, and pop-up spots that fit your goals.",
    icon: Search,
  },
  {
    number: "02",
    title: "Make it yours",
    text: "Choose the hours, days, or square footage that work for your business.",
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "Grow together",
    text: "Connect with the right people and turn underused space into opportunity.",
    icon: Handshake,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container-shell py-20 sm:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Simple by design"
          title="A better way to find your place."
          description="Commercial real estate should move at the speed of your business. We make the process clear, flexible, and human."
        />
        <a
          href="#spaces"
          className="inline-flex w-fit items-center gap-2 text-xs font-bold underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
        >
          See how it works <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map(({ number, title, text, icon: Icon }) => (
          <article
            key={number}
            className="group rounded-[22px] border border-black/[.08] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black transition group-hover:bg-purple-500">
                <Icon size={21} strokeWidth={1.6} />
              </span>
              <span className="text-xs font-semibold tracking-widest text-neutral-800">
                {number}
              </span>
            </div>
            <h3 className="mt-9 text-xl font-semibold text-black tracking-tight">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-500">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
