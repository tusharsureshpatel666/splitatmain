import Link from "next/link";
import { ArrowUpRight, MapPin, MoveUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const spaces = [
  {
    name: "The Corner Studio",
    type: "Creative studio",
    location: "Rajouri Garden, Delhi",
    price: "₹800",
    unit: "/ day",
    image: "photo-1497366811353-6870744d04b2",
    tag: "Popular",
    detail: "Flexible hours",
  },
  {
    name: "Common Ground",
    type: "Shared office",
    location: "Janakpuri, Delhi",
    price: "₹450",
    unit: "/ seat / day",
    image: "photo-1497366216548-37526070297c",
    tag: "New",
    detail: "Day passes",
  },
  {
    name: "Market Lane",
    type: "Retail / pop-up",
    location: "Punjabi Bagh, Delhi",
    price: "₹1,200",
    unit: "/ day",
    image: "photo-1441986300917-64674bd600d8",
    tag: "High visibility",
    detail: "Weekend slots",
  },
];

export default function FeaturedSpaces() {
  return (
    <section id="spaces" className="bg-[#EFEFE8] py-20 sm:py-28">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Spaces worth seeing"
            title="Find a space that fits your next move."
            description="From a single afternoon to a long-term setup, discover commercial spaces designed around how you work."
            classname="text-black"
          />
          <Link
            href="#get-started"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 bg-black px-5 py-3 text-xs font-semibold transition hover:bg-lime"
          >
            Explore all spaces <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space) => (
            <article
              key={space.name}
              className="group overflow-hidden rounded-[22px] border border-black/[.07] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[1.28/1] overflow-hidden bg-neutral-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/${space.image}?auto=format&fit=crop&w=1000&q=85)`,
                  }}
                />

                <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur">
                  {space.detail}
                </span>
                <button
                  aria-label={`View ${space.name}`}
                  className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-lime transition hover:rotate-45"
                >
                  <MoveUpRight size={17} />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-neutral-400">
                  {space.type}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-black tracking-tight">
                  {space.name}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                  <MapPin size={13} /> {space.location}
                </p>
                <div className="mt-5 flex items-end justify-between border-t border-black/[.08] pt-4">
                  <p>
                    <span className="text-xl text-black  font-bold tracking-tight">
                      {space.price}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {space.unit}
                    </span>
                  </p>
                  <span className="text-[10px] font-semibold text-neutral-500">
                    Enquire now ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-[10px] leading-5 text-neutral-500">
          Sample listings for design preview. Replace prices, availability, and
          locations with verified inventory before publishing.
        </p>
      </div>
    </section>
  );
}
