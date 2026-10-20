"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  CarFront,
  Snowflake,
  Coffee,
  BriefcaseBusiness,
  Store,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const property = {
  id: "sp-1024",
  title: "The Corner Studio",
  category: "Retail & Commercial Space",
  address: "Rajouri Garden, West Delhi, New Delhi",
  price: 25000,
  priceUnit: "month",
  deposit: 50000,
  area: 850,
  areaUnit: "sq ft",
  floor: "Ground floor",
  furnishing: "Semi-furnished",
  propertyType: "Retail showroom",
  availability: "Available now",
  leaseType: "Flexible",
  description:
    "A thoughtfully designed commercial space in a well-connected West Delhi neighbourhood. Ideal for a boutique, studio, consultancy, showroom, or growing local business. The open layout gives you the flexibility to design the space around your business needs. Contact the owner to discuss rental terms, shared-space options, and availability.",
  owner: {
    name: "Aarav Sharma",
    role: "Property owner",
    since: "Member since 2025",
    verified: true,
    response: "Usually responds within a few hours",
    initials: "AS",
  },
  features: [
    { label: "High street visibility", icon: Store },
    { label: "Flexible rental terms", icon: CalendarCheck },
    { label: "Air conditioning", icon: Snowflake },
    { label: "Wi-Fi available", icon: Wifi },
    { label: "Parking nearby", icon: CarFront },
    { label: "Pantry access", icon: Coffee },
  ],
  suitableFor: [
    "Retail store",
    "Boutique",
    "Salon or studio",
    "Consultancy",
    "Pop-up shop",
    "Service business",
  ],
  images: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1000&q=85",
  ],
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function PropertyDetailsPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const changeImage = (direction: number) => {
    setActiveImage(
      (current) =>
        (current + direction + property.images.length) % property.images.length,
    );
  };

  const shareProperty = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} on SplitAt`,
          url,
        });
      } catch {
        // Sharing cancelled or unavailable.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this property link:", url);
    }
  };

  const contactOwner = (method: "phone" | "message") => {
    const subject = encodeURIComponent(
      `Enquiry about ${property.title} (${property.id})`,
    );
    const body = encodeURIComponent(
      `Hi, I'm interested in ${property.title} in ${property.address}. Please share availability and rental details.`,
    );

    if (method === "message") {
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } else {
      // Replace with the actual owner's phone number.
      window.alert(
        "Connect this button to the owner's verified phone number or your enquiry API.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#09090d] text-[#f5f3fa]">
      <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-5 sm:px-6 lg:px-10 lg:pb-12">
        {/* Navigation */}
        <header className="mb-7 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#aaa3b8] transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to spaces
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareProperty}
              className="border-white/10 bg-white/[0.03] text-[#ded8e9] hover:bg-white/[0.08] hover:text-white"
            >
              {copied ? <Check size={15} /> : <Share2 size={15} />}
              <span className="hidden sm:inline">
                {copied ? "Copied" : "Share"}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSaved(!saved)}
              aria-label={saved ? "Remove from saved spaces" : "Save space"}
              className={`border-white/10 bg-white/[0.03] hover:bg-white/[0.08] ${
                saved ? "text-violet-300" : "text-[#ded8e9]"
              }`}
            >
              <Heart size={16} fill={saved ? "currentColor" : "none"} />
              <span className="hidden sm:inline">
                {saved ? "Saved" : "Save"}
              </span>
            </Button>
          </div>
        </header>

        {/* Title */}
        <section className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1 text-xs font-medium text-violet-300">
                {property.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {property.availability}
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-[42px]">
              {property.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-[#a49cb4]">
              <MapPin size={16} className="shrink-0 text-violet-300" />
              {property.address}
            </p>
          </div>

          <div className="flex items-end gap-2 md:flex-col md:items-end">
            <p className="text-3xl font-semibold tracking-tight text-white">
              {money(property.price)}
              <span className="text-sm font-normal text-[#9991a8]">
                /{property.priceUnit}
              </span>
            </p>
            <p className="text-xs text-[#928ba0]">
              {money(property.price * 12)} / year at the listed monthly rate
            </p>
          </div>
        </section>

        {/* Photo gallery */}
        <section className="relative mb-9 grid grid-cols-1 gap-2 overflow-hidden rounded-2xl md:grid-cols-[1.55fr_1fr]">
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            className="group relative block aspect-[4/3] overflow-hidden bg-[#17151e] text-left md:aspect-auto md:min-h-[420px]"
            aria-label="Open property photo gallery"
          >
            <Image
              src={property.images[0]}
              alt={`${property.title} main photograph`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/45 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
              <Maximize2 size={14} />
              View gallery
            </span>
          </button>

          <div className="hidden grid-cols-2 grid-rows-2 gap-2 md:grid">
            {property.images.slice(1, 5).map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => {
                  setActiveImage(index + 1);
                  setGalleryOpen(true);
                }}
                className="group relative min-h-0 overflow-hidden bg-[#17151e]"
                aria-label={`View property photograph ${index + 2}`}
              >
                <Image
                  src={image}
                  alt={`${property.title} photograph ${index + 2}`}
                  fill
                  sizes="(max-width: 1200px) 25vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {index === 3 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-medium text-white">
                    + View all photos
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Main content + enquiry sidebar */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_350px] xl:gap-14">
          <div className="min-w-0 space-y-10">
            {/* Key details */}
            <section>
              <SectionHeading
                title="Property overview"
                subtitle="The essential details at a glance."
              />

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat
                  icon={Maximize2}
                  label="Built-up area"
                  value={`${property.area} sq ft`}
                />
                <Stat
                  icon={Building2}
                  label="Property type"
                  value={property.propertyType}
                />
                <Stat icon={Building2} label="Floor" value={property.floor} />
                <Stat
                  icon={CalendarDays}
                  label="Rental terms"
                  value={property.leaseType}
                />
              </div>
            </section>

            <Divider />

            {/* Description */}
            <section>
              <SectionHeading
                title="About this space"
                subtitle="Get to know the property."
              />

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#b3acbf]">
                {property.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Detail label="Furnishing" value={property.furnishing} />
                <Detail label="Availability" value={property.availability} />
                <Detail label="Space ID" value={property.id} />
                <Detail label="Lease type" value={property.leaseType} />
              </div>
            </section>

            <Divider />

            {/* Amenities */}
            <section>
              <SectionHeading
                title="Amenities & features"
                subtitle="Facilities available at this property."
              />

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    <Icon size={18} className="shrink-0 text-violet-300" />
                    <span className="text-sm text-[#d5cfdf]">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* Suitable businesses */}
            <section>
              <SectionHeading
                title="Who is this space for?"
                subtitle="Business types that may suit the layout."
              />

              <div className="mt-5 flex flex-wrap gap-2">
                {property.suitableFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3.5 py-2 text-sm text-[#c6bfd3]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <Divider />

            {/* Location */}
            <section>
              <SectionHeading
                title="Location"
                subtitle="Explore the neighbourhood before you enquire."
              />

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121117]">
                <div className="flex min-h-44 flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.12),_transparent_65%)] px-5 py-8 text-center">
                  <MapPin size={26} className="text-violet-300" />
                  <p className="mt-3 font-medium text-white">
                    {property.address}
                  </p>
                  <p className="mt-2 text-xs text-[#91899e]">
                    Exact location can be shared by the property owner.
                  </p>
                </div>

                <div className="border-t border-white/[0.07] p-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200"
                  >
                    Explore on Google Maps
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </section>

            <Divider />

            {/* Owner details */}
            <section>
              <SectionHeading
                title="Listed by"
                subtitle="Know who you are contacting."
              />

              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/[0.12] text-lg font-semibold text-violet-200">
                    {property.owner.initials}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {property.owner.name}
                      </h3>
                      {property.owner.verified && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                          <ShieldCheck size={14} />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#a39bb0]">
                      {property.owner.role} · {property.owner.since}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#91899e]">
                      <Clock3 size={13} />
                      {property.owner.response}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => contactOwner("message")}
                  className="border-white/10 bg-transparent text-white hover:bg-white/[0.06] hover:text-white"
                >
                  <MessageCircle size={16} />
                  Contact owner
                </Button>
              </div>
            </section>
          </div>

          {/* Enquiry sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-white/[0.09] bg-[#121117] p-6 shadow-2xl shadow-black/20">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9990aa]">
                Rental price
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {money(property.price)}
                <span className="text-sm font-normal text-[#9990aa]">
                  /month
                </span>
              </p>

              <div className="mt-5 space-y-3 border-y border-white/[0.08] py-5">
                <PriceRow label="Monthly rent" value={money(property.price)} />
                <PriceRow
                  label="Security deposit"
                  value={money(property.deposit)}
                />
                <PriceRow label="Area" value={`${property.area} sq ft`} />
                <PriceRow
                  label="Price per sq ft / month"
                  value={money(property.price / property.area)}
                />
              </div>

              <div className="mt-5 rounded-xl border border-violet-400/15 bg-violet-400/[0.06] p-3.5">
                <div className="flex items-start gap-2.5">
                  <Sparkles
                    size={17}
                    className="mt-0.5 shrink-0 text-violet-300"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Interested in this space?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#a59db5]">
                      Ask about availability, flexible terms, and shared-space
                      options.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => contactOwner("message")}
                className="mt-5 h-12 w-full rounded-xl bg-violet-500 font-semibold text-white hover:bg-violet-400"
              >
                <MessageCircle size={17} />
                Send an enquiry
              </Button>

              <Button
                variant="outline"
                onClick={() => contactOwner("phone")}
                className="mt-3 h-12 w-full rounded-xl border-white/10 bg-transparent text-white hover:bg-white/[0.06] hover:text-white"
              >
                <Phone size={16} />
                Request a callback
              </Button>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#898195]">
                Confirm the final rent, deposit, additional charges, and terms
                directly with the owner.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile enquiry bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.09] bg-[#0e0d13]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">
              {money(property.price)}
              <span className="text-xs font-normal text-[#9990aa]">/mo</span>
            </p>
            <p className="text-xs text-[#9990aa]">
              Deposit {money(property.deposit)}
            </p>
          </div>
          <Button
            onClick={() => contactOwner("message")}
            className="h-11 shrink-0 rounded-xl bg-violet-500 px-5 font-semibold text-white hover:bg-violet-400"
          >
            Enquire now
          </Button>
        </div>
      </div>

      {/* Fullscreen photo viewer */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
        >
          <button
            type="button"
            onClick={() => setGalleryOpen(false)}
            className="absolute right-5 top-5 z-10 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white hover:bg-white/[0.12]"
          >
            Close ✕
          </button>

          <button
            type="button"
            onClick={() => changeImage(-1)}
            aria-label="Previous image"
            className="absolute left-3 z-10 rounded-full border border-white/15 bg-black/40 p-3 text-white hover:bg-white/10 sm:left-8"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative h-[65vh] w-full max-w-5xl sm:h-[75vh]">
            <Image
              src={property.images[activeImage]}
              alt={`${property.title}, photo ${activeImage + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => changeImage(1)}
            aria-label="Next image"
            className="absolute right-3 z-10 rounded-full border border-white/15 bg-black/40 p-3 text-white hover:bg-white/10 sm:right-8"
          >
            <ChevronRight size={24} />
          </button>

          <p className="absolute bottom-5 text-sm text-white/70">
            {activeImage + 1} / {property.images.length}
          </p>
        </div>
      )}
    </main>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[#91899e]">{subtitle}</p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/[0.07]" />;
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
      <Icon size={19} className="mb-4 text-violet-300" />
      <p className="text-xs text-[#91899e]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#eee9f6]">
        {value}
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-3">
      <span className="text-sm text-[#91899e]">{label}</span>
      <span className="text-right text-sm font-medium text-[#e5dfed]">
        {value}
      </span>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-[#a19aae]">{label}</span>
      <span className="text-right font-medium text-[#eee9f6]">{value}</span>
    </div>
  );
}
