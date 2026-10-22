"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Search,
  Layers3,
  Store,
  Navigation,
  ExternalLink,
  RefreshCw,
  MapPinned,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

const NearbyMap = dynamic(() => import("./nearbymap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] animate-pulse items-center justify-center rounded-3xl bg-zinc-100 dark:bg-zinc-900">
      Loading map...
    </div>
  ),
});

type NearbyPlace = {
  id?: string;
  place_id?: string;
  name?: string;
  vicinity?: string;
  formatted_address?: string;
  address?: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  geometry?: {
    location?: {
      lat: number;
      lng: number;
    };
  };
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
  photos?: { photo_reference?: string }[];
};

type StoreListAlsoProps = {
  lat: number | string;
  log: number | string;
};

const StoreListAlso = ({ lat, log }: StoreListAlsoProps) => {
  const [types, setTypes] = useState<string[]>([]);
  const [places, setPlaces] = useState<Record<string, NearbyPlace[]>>({});
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    const fetchTypes = async () => {
      try {
        const res = await axios.post("/api/storealsonearmarket");

        if (active) {
          setTypes(Array.isArray(res.data.places) ? res.data.places : []);
        }
      } catch {
        if (active) setError("Couldn't load nearby business categories.");
      } finally {
        if (active) setLoadingTypes(false);
      }
    };

    void fetchTypes();

    return () => {
      active = false;
    };
  }, []);

  const fetchNearby = async () => {
    if (lat == null || log == null || types.length === 0) return;

    const latitude = Number(lat);
    const longitude = Number(log);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    ) {
      setError("The property coordinates are invalid.");
      return;
    }

    setLoadingPlaces(true);
    setError("");

    try {
      const query = new URLSearchParams({
        lat: String(latitude),
        lng: String(longitude),
      });

      types.forEach((type) => query.append("type", type));

      const res = await axios.get(`/api/nearbyplaces?${query.toString()}`);

      setPlaces(res.data.groupedResults || {});
    } catch {
      setError("Couldn't load nearby places. Please try again.");
    } finally {
      setLoadingPlaces(false);
    }
  };

  useEffect(() => {
    if (loadingTypes || types.length === 0) return;
    void fetchNearby();
    // Fetch when coordinates or the loaded categories change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, log, types, loadingTypes]);

  const allPlaces = useMemo(() => {
    return Object.entries(places).flatMap(([category, items]) =>
      (Array.isArray(items) ? items : []).map((place) => ({
        ...place,
        category,
      })),
    );
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      const categoryMatch =
        selectedType === "all" || place.category === selectedType;

      const searchMatch = `${place.name || ""} ${
        place.vicinity || place.formatted_address || place.address || ""
      }`
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [allPlaces, selectedType, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    Object.entries(places).forEach(([category, items]) => {
      counts[category] = Array.isArray(items) ? items.length : 0;
    });

    return counts;
  }, [places]);

  return (
    <section className="min-h-screen bg-[#f8f8fb] px-3 py-6 text-zinc-950 dark:bg-[#0c0c0f] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Page header */}
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/[0.08] dark:text-violet-300">
              <MapPin size={14} />
              LOCATION INTELLIGENCE
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Explore the neighborhood
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base">
              Discover nearby businesses, understand your commercial
              surroundings, and explore the area around this property.
            </p>
          </div>

          <button
            onClick={() => void fetchNearby()}
            disabled={loadingPlaces || loadingTypes}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium transition hover:border-violet-300 hover:text-violet-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:hover:text-violet-300"
          >
            <RefreshCw
              size={16}
              className={loadingPlaces ? "animate-spin" : ""}
            />
            Refresh places
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
          <SummaryCard
            icon={<Building2 size={19} />}
            label="Nearby businesses"
            value={loadingPlaces ? "..." : allPlaces.length.toLocaleString()}
          />
          <SummaryCard
            icon={<Layers3 size={19} />}
            label="Categories"
            value={loadingTypes ? "..." : types.length.toString()}
          />
          <div className="col-span-2 lg:col-span-1">
            <SummaryCard
              icon={<MapPinned size={19} />}
              label="Property coordinates"
              value={
                Number.isFinite(Number(lat)) && Number.isFinite(Number(log))
                  ? `${Number(lat).toFixed(4)}, ${Number(log).toFixed(4)}`
                  : "Unavailable"
              }
            />
          </div>
        </div>

        {/* Map */}
        <div className="mb-7 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-[#131316]">
          <div className="flex flex-col justify-between gap-3 border-b border-zinc-200 px-5 py-4 dark:border-white/[0.08] sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                <MapPinned size={20} />
              </div>
              <div>
                <h2 className="font-semibold">Area map</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Property location and nearby places
                </p>
              </div>
            </div>

            <span className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Your property
              <span className="ml-2 h-2 w-2 rounded-full bg-emerald-500" />
              Nearby places
            </span>
          </div>

          <div className="p-2 sm:p-3">
            <NearbyMap
              lat={Number(lat)}
              lng={Number(log)}
              places={filteredPlaces}
            />
          </div>
        </div>

        {/* Place explorer */}
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Places around you
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {loadingPlaces
                ? "Finding nearby places..."
                : `${filteredPlaces.length} places found in the selected results`}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative sm:w-64">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search places..."
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04]"
              />
            </div>

            <div className="relative sm:w-56">
              <SlidersHorizontal
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-zinc-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#151518]"
              >
                <option value="all">All categories</option>
                {Object.keys(places).map((category) => (
                  <option key={category} value={category}>
                    {category} ({categoryCounts[category] || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <CategoryChip
            active={selectedType === "all"}
            onClick={() => setSelectedType("all")}
          >
            All places
          </CategoryChip>

          {Object.keys(places).map((category) => (
            <CategoryChip
              key={category}
              active={selectedType === category}
              onClick={() => setSelectedType(category)}
            >
              {category}
              <span className="ml-1.5 opacity-60">
                {categoryCounts[category] || 0}
              </span>
            </CategoryChip>
          ))}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/[0.06] dark:text-red-300"
          >
            {error}
          </div>
        )}

        {/* Place cards */}
        {loadingPlaces ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-2xl border border-zinc-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]"
              />
            ))}
          </div>
        ) : filteredPlaces.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 px-5 py-14 text-center dark:border-white/15">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500 dark:bg-white/[0.06]">
              <Store size={22} />
            </div>
            <h3 className="font-semibold">No places to show</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Try another category or search term, or refresh the nearby places
              data.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPlaces.map((place, index) => {
              const address =
                place.vicinity ||
                place.formatted_address ||
                place.address ||
                "Address unavailable";

              const key =
                place.place_id || place.id || `${place.name}-${index}`;

              const placeLat =
                place.geometry?.location?.lat ?? place.lat ?? place.latitude;

              const placeLng =
                place.geometry?.location?.lng ?? place.lng ?? place.longitude;

              const mapsUrl =
                typeof placeLat === "number" && typeof placeLng === "number"
                  ? `https://www.google.com/maps/search/?api=1&query=${placeLat},${placeLng}`
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${place.name || ""} ${address}`,
                    )}`;

              return (
                <article
                  key={key}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-950/[0.04] dark:border-white/[0.08] dark:bg-[#131316] dark:hover:border-violet-400/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-400/[0.09] dark:text-violet-300">
                      <Store size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold leading-5 text-zinc-900 dark:text-white">
                        {place.name || "Nearby business"}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        {address}
                      </p>
                    </div>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${place.name || "place"} in Google Maps`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-400/10 dark:hover:text-violet-300"
                    >
                      <ExternalLink size={17} />
                    </a>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-white/[0.07]">
                    <span className="max-w-[70%] truncate rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:bg-white/[0.05] dark:text-zinc-300">
                      {place.category}
                    </span>

                    {typeof place.rating === "number" && (
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        ★ {place.rating.toFixed(1)}
                        {typeof place.user_ratings_total === "number" && (
                          <span className="ml-1 text-xs font-normal text-zinc-400">
                            ({place.user_ratings_total})
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-6 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          Nearby place listings depend on the data returned by your location
          API. They indicate nearby destinations, not measured pedestrian
          footfall or guaranteed customer demand.
        </p>
      </div>
    </section>
  );
};

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/[0.08] dark:bg-[#131316] sm:p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
        {icon}
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 break-words text-xl font-semibold tracking-tight sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-violet-600 bg-violet-600 text-white"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-violet-400/30 dark:hover:text-violet-300"
      }`}
    >
      {children}
    </button>
  );
}

export default StoreListAlso;
