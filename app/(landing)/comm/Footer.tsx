import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Explore: [
    { label: "Browse spaces", href: "#spaces" },
    { label: "How it works", href: "#how-it-works" },
    { label: "For space owners", href: "#owners" },
  ],
  Company: [
    { label: "About SplitAt", href: "#about" },
    { label: "FAQs", href: "#faq" },
    { label: "Contact", href: "mailto:hello@splitat.com" },
  ],
  Legal: [
    { label: "Privacy policy", href: "#privacy" },
    { label: "Terms of use", href: "#terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="">
      <div className="container-shell py-12 sm:py-16">
        <div className="grid gap-10 border-b border-black/10 pb-10 md:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image src={"/logo.svg"} width={50} height={50} alt="hello" />
              <h1 className="text-2xl font-semibold">Splitat</h1>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
              Commercial space, reimagined. Find your fit, share what you have,
              and make every square foot count.
            </p>
            <a
              href="mailto:hello@splitat.com"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold"
            >
              hello@splitat.com <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-[10px] font-bold uppercase tracking-[.16em] text-neutral-400">
                  {title}
                </h3>
                <ul className="mt-5 ">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-neutral-600 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] text-neutral-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SplitAt. All rights reserved.</p>
          <p>Built for the businesses building what&apos;s next.</p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-8 w-8 place-items-center rounded-full border border-black/10 transition hover:bg-white"
            >
              <Instagram size={14} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="grid h-8 w-8 place-items-center rounded-full border border-black/10 transition hover:bg-white"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
