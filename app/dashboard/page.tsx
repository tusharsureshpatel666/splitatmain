"use client";

import { useState } from "react";
import SearchBox from "./components/Main";
import UserBussiness from "./components/userBussiness";
import ListedStore from "./findstore/ListedStore";
import ListedStoreComm from "./storeshower/page";
import { Store, Briefcase, Search } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <div className="w-full gap-3 flex flex-col max-w-6xl mx-auto">
      <SearchBox />

      {/* Custom Tab Bar */}

      <ListedStore />

      {/* <ListedStoreComm /> */}
    </div>
  );
}
