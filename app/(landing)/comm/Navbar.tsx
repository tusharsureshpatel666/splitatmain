import Link from "next/link";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-canvas/90 backdrop-blur-xl">
      <nav className="container-shell flex h-[76px] items-center justify-between">
        <Link
          href="#"
          className="flex items-center gap-2.5"
          aria-label="SplitAt home"
        >
          <div className="flex items-center gap-2">
            <Image src={"/logo.svg"} width={50} height={50} alt="hello" />
            <span className="text-lg font-bold tracking-tight">
              Splitat<span className="text-[#7957e8]">.</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href={"/dashboard"}>
            <Button
              variant={"outline"}
              size={"lg"}
              className="rounded-full hidden md:flex"
            >
              Login
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button size={"lg"} className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
