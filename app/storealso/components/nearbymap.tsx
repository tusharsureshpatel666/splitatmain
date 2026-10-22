"use client";

import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

type Place = {
  name?: string;
  category?: string;
  vicinity?: string;
  formatted_address?: string;
  address?: string;
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
};

type Props = {
  lat: number;
  lng: number;
  places: Place[];
};

const propertyIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:38px;height:38px;border-radius:14px;
      background:#7c3aed;border:3px solid white;
      box-shadow:0 4px 16px #0003;
      display:flex;align-items:center;justify-content:center;
      color:white;font-size:18px;
    ">⌂</div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return null;
}

export default function NearbyMap({ lat, lng, places }: Props) {
  const validCoordinates =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180;

  if (!validCoordinates) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-zinc-100 text-sm text-zinc-500 dark:bg-white/[0.04]">
        Valid property coordinates are required to display the map.
      </div>
    );
  }

  return (
    <div className="h-[380px] overflow-hidden rounded-2xl sm:h-[480px]">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom
        className="h-full w-full"
      >
        <RecenterMap lat={lat} lng={lng} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]} icon={propertyIcon}>
          <Popup>
            <strong>Your property</strong>
          </Popup>
        </Marker>

        {places.map((place, index) => {
          const placeLat =
            place.geometry?.location?.lat ?? place.lat ?? place.latitude;

          const placeLng =
            place.geometry?.location?.lng ?? place.lng ?? place.longitude;

          if (
            typeof placeLat !== "number" ||
            typeof placeLng !== "number" ||
            !Number.isFinite(placeLat) ||
            !Number.isFinite(placeLng) ||
            Math.abs(placeLat) > 90 ||
            Math.abs(placeLng) > 180
          ) {
            return null;
          }

          return (
            <CircleMarker
              key={`${place.name || "place"}-${placeLat}-${placeLng}-${index}`}
              center={[placeLat, placeLng]}
              radius={7}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: "#10b981",
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <strong>{place.name || "Nearby place"}</strong>
                <br />
                {place.category}
                <br />
                {place.vicinity ||
                  place.formatted_address ||
                  place.address ||
                  ""}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
