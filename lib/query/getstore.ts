"use server";
import prisma from "../prisma";

export async function getStoreById(id: string) {
  if (!id) {
    throw new Error("Store ID is required");
  }

  const store = await prisma.store.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      desc: true,
      country: true,
      peopleDesc: true,

      state: true,
      city: true,
      pin: true,

      storeSize: true,

      priceInr: true,

      bannerImageUrl: true,
      latitude: true,
      longitude: true,
      createdAt: true,
      ownerId: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  });
  return store;
}
