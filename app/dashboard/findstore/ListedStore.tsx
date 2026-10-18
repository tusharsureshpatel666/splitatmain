"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { StoreCardSkeleton } from "../store/[id]/components/storeSkeleton";

const STORES_CARD_QUERY = gql`
  query StoresCard {
    stores {
      id
      title
      bannerImageUrl
      priceInr
      shareMode
    }
  }
`;

type Store = {
  id: string;
  title: string;
  bannerImageUrl?: string | null;
  priceInr: number;
  shareMode?: string | null;
};

const formatShareMode = (mode?: string | null) => {
  if (!mode) return "Flexible sharing";

  return mode
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);

export default function ListedStore() {
  const { data, loading, error } = useQuery(STORES_CARD_QUERY);
  const stores: Store[] = data?.stores ?? [];

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <StoreCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-sm text-zinc-500">
          We couldn&apos;t load commercial spaces. Please try again.
        </p>
      </div>
    );
  }

  if (!stores.length) {
    return (
      <div className="px-4 py-16 text-center">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          No spaces listed yet
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Be the first to list a space on SplitAt.
        </p>
        <Link
          href="/dashboard/addstore"
          className="mt-5 inline-flex rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          List your space
        </Link>
      </div>
    );
  }

  return (
    <section className=" py-5 ">
      {/* Section heading */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
            Find your next business space
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
            Spaces to explore
          </h2>
        </div>
      </div>

      {/* Airbnb-style listing grid */}
      <div className=" px-0 py-1 ">
        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.stores?.map((item: any) => (
            <Link
              href={`/dashboard/store/${item.id}`}
              key={item.id}
              className="group cursor-pointer mb-4"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  width={500}
                  height={500}
                  src={item.bannerImageUrl || "/placeholder.jpg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Guest Favourite Badge */}

                {/* Share Type Badge */}
                {item.shareMode && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-medium">
                    {formatShareMode(item.shareMode)}
                  </div>
                )}

                {/* Heart Icon */}
              </div>

              {/* CONTENT */}
              <div className="mt-3 space-y-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                  ₹{item.priceInr}
                  <span className="text-gray-500 font-normal"> / month</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
