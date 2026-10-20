import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StoreListAlso = ({ lat, log }) => {
  const [types, setTypes] = useState([]);
  const [places, setPlaces] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 Get types
  useEffect(() => {
    const handleList = async () => {
      try {
        const res = await axios.post("/api/storealsonearmarket");
        setTypes(res.data.places || []);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };
    handleList();
  }, []);

  // 🔹 Fetch nearby places
  useEffect(() => {
    const fetchNearby = async () => {
      if (!lat || !log || types.length === 0) return;

      try {
        setLoading(true);

        const query = new URLSearchParams({
          lat,
          lng: log,
        });

        types.forEach((type) => {
          query.append("type", type);
        });

        const res = await axios.get(`/api/nearbyplaces?${query.toString()}`);
        setPlaces(res.data.groupedResults || {});
      } catch (err) {
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearby();
  }, [lat, log, types]);

  return (
    <div className="md:px-6 px-3 py-6   min-h-screen">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Nearest Market</h1>
    </div>
  );
};

export default StoreListAlso;
