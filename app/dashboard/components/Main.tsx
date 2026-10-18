"use client";

import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Search, MapPin, ArrowUpRight, LocateFixed } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa";

const libraries: "places"[] = ["places"];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const boundsRef = useRef<google.maps.LatLngBounds | null>(null);

  // ✅ Use same loader everywhere
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Initialize services AFTER script loads
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();

    placesService.current = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );

    boundsRef.current = new window.google.maps.LatLngBounds(
      { lat: 28.4, lng: 76.84 },
      { lat: 28.88, lng: 77.35 },
    );
  }, [isLoaded]);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value || !autocompleteService.current) {
      setResults([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "in" },
        bounds: boundsRef.current!,
        strictBounds: true,
      },
      (predictions) => {
        setResults(predictions || []);
        setOpen(true);
      },
    );
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        router.push(
          `/dashboard/search?lat=${lat}&lng=${lng}&place=Current Location`,
        );
      },
      () => {
        alert("Location permission denied");
      },
    );
  };

  const handleSelect = (placeId: string, description: string) => {
    setQuery(description);
    setOpen(false);

    placesService.current?.getDetails({ placeId }, (place) => {
      if (!place?.geometry?.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      router.push(
        `/dashboard/search?lat=${lat}&lng=${lng}&place=${encodeURIComponent(
          description,
        )}`,
      );
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="relative mx-auto w-full max-w-6xl" ref={wrapperRef}>
      {/* Search bar */}
      <div className="flex lg:py-3 lg:px-4 items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-[0_8px_35px_-15px_rgba(0,0,0,0.16)] transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-[#111114] dark:shadow-black/20">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <FaPaperPlane className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1 py-1">
          <input
            id="property-location"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search area, market or locality"
            autoComplete="off"
            className="w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:font-normal placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500 sm:text-base"
          />
        </div>
      </div>

      {/* Location suggestions */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#111114] dark:shadow-black/40">
          <div className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[1.6px] text-zinc-400">
            Search by location
          </div>

          <button
            type="button"
            onClick={handleCurrentLocation}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-colors hover:bg-violet-50 dark:hover:bg-violet-500/10"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
              <LocateFixed className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Use my current location
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Find commercial spaces near you
              </p>
            </div>

            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-500" />
          </button>

          {results.length > 0 && (
            <>
              <div className="my-2 h-px bg-zinc-100 dark:bg-white/[0.07]" />

              <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[1.6px] text-zinc-400">
                Suggested locations
              </div>

              <div className="max-h-72 overflow-y-auto">
                {results.map((item) => (
                  <button
                    key={item.place_id}
                    type="button"
                    onClick={() =>
                      handleSelect(item.place_id, item.description)
                    }
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.05]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 group-hover:border-violet-200 group-hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:group-hover:text-violet-400">
                      <MapPin className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {item.description.split(",")[0]}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
                  </button>
                ))}
              </div>
            </>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="px-4 py-6 text-center">
              <MapPin className="mx-auto mb-2 h-6 w-6 text-zinc-400" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                No matching locations yet
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Try a market, locality or nearby area.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
