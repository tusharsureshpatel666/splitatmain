"use client";

import { useEffect, useState } from "react";
import SearchBox from "./components/Main";
import UserBussiness from "./components/userBussiness";
import ListedStore from "./findstore/ListedStore";
import ListedStoreComm from "./storeshower/page";
import { Store, Briefcase, Search } from "lucide-react";
import axios from "axios";
import { findUserById } from "@/lib/findUser";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <div className="w-full gap-3 flex flex-col max-w-6xl mx-auto">
      <SearchBox />
      <UserBussiness />
      {/* Custom Tab Bar */}

      <ListedStore />

      {/* <ListedStoreComm /> */}
    </div>
  );
}
