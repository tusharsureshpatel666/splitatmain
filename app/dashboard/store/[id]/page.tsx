import { getStoreById } from "@/lib/query/getstore";
import { auth } from "@/lib/auth";
import DeleteStoreButton from "./components/DeleteStore";
import ShareStore from "./components/ShareStore";
import { findUserById } from "@/lib/findUser";
import LoveStore from "./components/LoveStore";
import { MobileImageSlider } from "./components/MobileNav";
import { DesktopImageGrid } from "./components/Desktopgrid";
import OwnerButton from "./components/OwerButton";
import Heading from "../../components/heading";

import ReportDialog from "../../components/report";
import ChatPartnerButton from "../../components/ChatPartner";

import prisma from "@/lib/prisma";
import SharingType from "./components/SharingType";
import OwnerDesc from "./components/OwnerDesc";
import People from "./components/people";
import LocationMap from "./components/MapShower";
import Editbutton from "./components/Editbutton";
import Storeanyltic from "./components/Storeanyltic";
import PhoneAnyalitic from "./components/phoneAnyaltic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartBar } from "lucide-react";
import { FaChartArea } from "react-icons/fa";
import StoreDescription from "./components/storedesc";
import PeopleDesc from "./components/peopleDesc";

interface StorePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }) {
  const storeid = await params;
  const store = await getStoreById(storeid.id);

  return {
    title: `${store?.title} shared shop in ${store?.city} `,
    description: store?.desc?.slice(0, 160),
  };
}
export default async function StorePage({ params }: StorePageProps) {
  const storeId = await params;

  const userId = await auth();
  let initialLiked = false;

  if (userId) {
    const like = await prisma.storeLike.findUnique({
      where: {
        userId_storeId: {
          userId: userId.user?.id as string,
          storeId: storeId.id,
        },
      },
    });

    initialLiked = !!like;
  }

  if (!storeId) {
    return <div className="p-6">Store not found</div>;
  }

  const fetchStores = async () => {
    const store = await getStoreById(storeId.id);

    console.log(store);
    return store;
  };

  const store = await fetchStores();
  const OwerDetail = await findUserById(store?.ownerId);
  const isOwner = (await userId?.user?.id) === (await store?.ownerId);

  const allImages = [
    store?.bannerImageUrl,
    ...(store?.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl w-full space-y-6  md:mt-2 mb-[150px] lg:mb-0   lg:px-0">
      {/* ================= HEADER ================= */}
      <div className="flex  gap-4 flex-row sm:items-center items-center justify-between">
        <h1 className="text-xl  font-semibold break-words leading-tight">
          {store?.title}
        </h1>

        <div className="flex gap-4 items-center text-sm">
          <LoveStore storeId={storeId.id} initialLiked={initialLiked} />
          {isOwner && <DeleteStoreButton storeId={store?.id} />}
          <Link
            href={`/storealso/audience/${storeId.id}`}
            className="hidden md:flex"
          >
            <Button className="rounded-md" variant={"outline"}>
              <FaChartArea /> Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* ================= IMAGES ================= */}
      <MobileImageSlider images={allImages} />

      <div className="hidden md:block">
        <DesktopImageGrid
          banner={store?.bannerImageUrl || ""}
          images={store?.images.map((img) => img.url) || []}
        />
      </div>

      {/* ================= HEADER ================= */}
      <Heading
        title={`${store?.storeSize?.replace(/store/i, "size")} Store in ${store?.city}`}
        className="mb-2"
      />
      <span className="text-sm text-gray-500"></span>

      {/* ================= MAIN GRID ================= */}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        {/* LEFT CONTENT */}
        <div className="min-w-0 space-y-8 lg:col-span-2">
          {/* Owner section */}
          <section className="flex items-center justify-between gap-4 border-b border-gray-200/80 pb-6 dark:border-white/[0.08]">
            <OwnerButton
              image={OwerDetail.image || "/avatar.avif"}
              name={OwerDetail.name || ""}
              createAt={String(store?.createdAt)}
            />

            <ReportDialog />
          </section>

          {/* Store sharing method */}
          <section className="space-y-5">
            <div className="">
              <StoreDescription description={store?.desc} />
            </div>
          </section>
          <section className="space-y-5">
            <div className="">
              <PeopleDesc peopleDesc={store?.peopleDesc} />
            </div>
          </section>
        </div>

        {/* RIGHT: STICKY PRICING CARD */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_40px_-20px_rgba(0,0,0,0.16)] dark:border-white/[0.09] dark:bg-[#111116] dark:shadow-[0_12px_50px_-20px_rgba(0,0,0,0.6)]">
            {/* Price */}
            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  Space rental
                </p>

                <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-semibold tracking-[-0.045em] text-gray-950 dark:text-white">
                    ₹{Number(store?.priceInr ?? 0).toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    / month
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Listed rental price for this space
                </p>
              </div>

              {/* Subtle accent */}
              <div className="h-px bg-gradient-to-r from-violet-500/50 via-gray-200 to-transparent dark:via-white/[0.10]" />

              {/* Simple listing information */}
              <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-3.5 dark:bg-white/[0.035]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-400/[0.12] dark:text-violet-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 10h18" />
                    <path d="M5 10V6l7-3 7 3v4" />
                    <path d="M5 10v9" />
                    <path d="M19 10v9" />
                    <path d="M3 19h18" />
                    <path d="M9 19v-5h6v5" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Commercial space
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Connect with the owner to discuss sharing arrangements and
                    availability.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-1">
                {isOwner ? (
                  <Editbutton id={store?.id} />
                ) : (
                  <ChatPartnerButton storeId={store?.id} />
                )}
              </div>

              <p className="text-center text-[11px] leading-5 text-gray-500 dark:text-gray-500">
                Confirm final rental terms directly with the owner.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <LocationMap
        lat={store?.latitude}
        lng={store?.longitude}
        city={store?.city}
        state={store.state}
      />

      {/* ================= MOBILE STICKY FOOTER ================= */}
      <div
        className="
  lg:hidden
  fixed bottom-12 left-0 right-0
  border-t border-gray-200 dark:border-gray-800
  bg-white dark:bg-black
  px-4 py-3
  z-20
"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex items-end gap-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ₹{store?.priceInr}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 mb-[2px]">
              /month
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isOwner ? (
              <Editbutton />
            ) : (
              <ChatPartnerButton storeId={store?.id} />
            )}

            {!isOwner && (
              <Link href={`/storealso/audience/${storeId.id}`}>
                <Button className="rounded-md" variant={"outline"}>
                  <FaChartArea />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
