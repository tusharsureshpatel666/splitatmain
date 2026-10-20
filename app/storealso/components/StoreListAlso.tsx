"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type NearbyPlace = {
  place_id?: string;
  id?: string;
  name?: string;
  vicinity?: string;
  address?: string;
  formatted_address?: string;
  rating?: number;
  distance?: string | number;
  photoUrl?: string;
  imageUrl?: string;
  types?: string[];
};

type StoreListAlsoProps = {
  lat: number | string;
  log: number | string;
};

export default function StoreListAlso({ lat, log }: StoreListAlsoProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [places, setPlaces] = useState<Record<string, NearbyPlace[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch nearby market categories
  useEffect(() => {
    const handleList = async () => {
      try {
        const res = await axios.post("/api/storealsonearmarket");
        setTypes(res.data.places || []);
      } catch (err) {
        console.error("Error fetching types:", err);
        setError("Unable to load nearby market categories.");
        setLoading(false);
      }
    };

    handleList();
  }, []);

  // Fetch places for every category
  useEffect(() => {
    if (lat === "" || log === "" || lat == null || log == null) {
      setLoading(false);
      return;
    }

    if (types.length === 0) return;

    let cancelled = false;

    const fetchNearby = async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams({
          lat: String(lat),
          lng: String(log),
        });

        types.forEach((type) => query.append("type", type));

        const res = await axios.get(`/api/nearbyplaces?${query.toString()}`);

        if (!cancelled) {
          setPlaces(res.data.groupedResults || {});
        }
      } catch (err) {
        console.error("Error fetching nearby places:", err);

        if (!cancelled) {
          setError("Unable to load nearby places. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchNearby();

    return () => {
      cancelled = true;
    };
  }, [lat, log, types]);

  const categories = Object.entries(places).filter(
    ([, items]) => Array.isArray(items) && items.length > 0,
  );

  const formatCategory = (category: string) =>
    category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 md:px-8">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-7xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
          Explore the neighborhood
        </p>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Nearby Market
            </h1>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Discover businesses and useful places around this property.
            </p>
          </div>

          {!loading && categories.length > 0 && (
            <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium">
              {categories.reduce((total, [, items]) => total + items.length, 0)}{" "}
              places found
            </span>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-4 h-5 w-2/3 rounded bg-gray-200" />
              <div className="mb-3 h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-1/2 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
          <button
            onClick={() => setTypes((current) => [...current])}
            className="ml-3 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && categories.length === 0 && (
        <div className="mx-auto max-w-7xl rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
            <span>⌖</span>
          </div>
          <h2 className="text-xl font-semibold">No nearby places found</h2>
          <p className="mt-2 text-sm text-gray-500">
            Try another property location or check your nearby places API.
          </p>
        </div>
      )}

      {/* All categories and their places */}
      {!loading && !error && categories.length > 0 && (
        <div className="mx-auto max-w-7xl space-y-10">
          {categories.map(([category, items]) => (
            <section key={category}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold md:text-2xl">
                  {formatCategory(category)}
                </h2>

                <span className="rounded-lg bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                  {items.length} places
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((place, index) => {
                  const address =
                    place.vicinity || place.formatted_address || place.address;

                  return (
                    <article
                      key={
                        place.place_id ||
                        place.id ||
                        `${category}-${place.name}-${index}`
                      }
                      className="group rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50"
                    >
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                          <span className="text-xl">⌖</span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-semibold leading-6 text-gray-900">
                            {place.name || "Unnamed place"}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-purple-600">
                            {formatCategory(category)}
                          </p>
                        </div>
                      </div>

                      {address && (
                        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
                          {address}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 text-sm">
                        {place.rating != null && (
                          <span className="flex items-center gap-1 font-medium text-gray-700">
                            <span className="text-amber-500">★</span>
                            {place.rating}
                          </span>
                        )}

                        {place.distance != null && (
                          <span className="text-gray-500">
                            {typeof place.distance === "number"
                              ? `${place.distance.toFixed(1)} km`
                              : place.distance}
                          </span>
                        )}

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${place.name || ""} ${address || ""}`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto font-semibold text-purple-600 transition hover:text-purple-800"
                        >
                          View map ↗
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
