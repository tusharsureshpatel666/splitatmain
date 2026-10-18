"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Check, Sparkles } from "lucide-react";
import { SignIn1 } from "./socialButton";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  return (
    <main className=" bg-[#faf9f7]  text-[#17151d] transition-colors duration-300 dark:bg-[#09090d] dark:text-[#f5f3fa]">
      <div className="grid h-screen overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101015] sm:min-h-[calc(100vh-40px)] lg:grid-cols-[1.05fr_0.95fr] lg:rounded-3xl">
        {/* LEFT: Brand panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#f0edff] p-10 dark:bg-[#171322] lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-28 top-24 h-80 w-80 rounded-full border border-[#c9bdf9]/70 dark:border-[#8d70e8]/20" />
          <div className="pointer-events-none absolute -right-12 top-40 h-64 w-64 rounded-full border border-[#c9bdf9]/70 dark:border-[#8d70e8]/20" />
          <div className="pointer-events-none absolute -right-4 top-52 h-48 w-48 rounded-full bg-[#ddd4ff]/60 blur-2xl dark:bg-[#7957e8]/10" />

          {/* Brand */}
          <Link
            href="/"
            className="relative z-10 flex w-fit items-center gap-3"
          >
            <Image
              src="/logo.svg"
              alt="SplitAt"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-bold tracking-tight text-[#17151d] dark:text-white">
              splitat<span className="text-[#7855e8]">.</span>
            </span>
          </Link>

          {/* Main message */}
          <div className="relative z-10 my-14 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8cef9] bg-white/70 px-3.5 py-2 text-xs font-medium text-[#6545c4] dark:border-[#8d70e8]/30 dark:bg-white/[0.04] dark:text-[#c4b3ff]">
              <Sparkles size={14} />A smarter way to share space
            </div>

            <h1 className="max-w-lg text-5xl font-semibold leading-[1.12] tracking-[-0.055em] text-[#17151d] dark:text-white xl:text-6xl">
              Your next big idea needs{" "}
              <span className="text-[#7957e8] dark:text-[#ad96ff]">
                the right space.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#696477] dark:text-[#aaa3ba]">
              Discover commercial spaces, connect with the right people, and
              make every square foot work harder.
            </p>

            <div className="mt-9 flex flex-col gap-4">
              {[
                "Find spaces that fit your business",
                "Share rent without sharing your vision",
                "Make flexible spaces work for you",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#7957e8] dark:bg-[#292239] dark:text-[#c4b3ff]">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium text-[#4f4960] dark:text-[#d1cadd]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom card */}
          <div className="relative z-10 rounded-2xl border border-white/80 bg-white/70 p-5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#827b94] dark:text-[#a9a0bf]">
                  Built around your business
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-[#24202e] dark:text-white">
                  More possibilities. Less overhead.
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ede7ff] text-[#7957e8] dark:bg-[#29213d] dark:text-[#c4b3ff]">
                <Building2 size={21} />
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-6 text-xs text-[#8b849c] dark:text-[#8e879e]">
            © {new Date().getFullYear()} SplitAt. Built for what's next.
          </p>
        </section>

        {/* RIGHT: Authentication */}
        <section className="flex min-h-[calc(100vh-48px)] flex-col justify-between px-5 py-7 transition-colors sm:px-10 sm:py-10 lg:min-h-0 lg:px-12 xl:px-20">
          {/* Header */}
          <div className="flex items-center justify-between lg:justify-end">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <Image
                src="/logo.svg"
                alt="SplitAt"
                width={34}
                height={34}
                priority
              />
              <span className="text-lg font-bold tracking-tight">
                splitat<span className="text-[#7957e8]">.</span>
              </span>
            </Link>

            <Link
              href="/"
              className="hidden items-center gap-1 text-sm text-[#817b8d] transition hover:text-[#7957e8] dark:text-[#a49cb4] dark:hover:text-[#b7a3ff] lg:inline-flex"
            >
              Back to home <ArrowUpRight size={15} />
            </Link>

            <Link
              href="/"
              className="text-sm text-[#817b8d] hover:text-[#7957e8] dark:text-[#a49cb4] dark:hover:text-[#b7a3ff] lg:hidden"
            >
              Home
            </Link>
          </div>

          {/* Login form */}
          <div className="mx-auto w-full max-w-[390px] py-12 lg:py-16">
            <div className="mb-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e7e1fb] bg-[#f4f0ff] text-[#7957e8] dark:border-[#8d70e8]/25 dark:bg-[#211a30] dark:text-[#c4b3ff]">
                <Building2 size={22} strokeWidth={1.8} />
              </div>

              <p className="mb-3 text-sm font-medium text-[#7957e8] dark:text-[#b7a3ff]">
                Welcome back
              </p>

              <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.045em] text-[#17151d] dark:text-white sm:text-4xl">
                Sign in to SplitAt
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#817b8d] dark:text-[#a49cb2]">
                Your next space is just a sign-in away.
              </p>
            </div>

            {/* Google */}
            <div className="gap-3 flex items-center justify-center flex-col">
              <Button
                type="button"
                variant="outline"
                onClick={() => SignIn1("google")}
                className="h-[52px] w-full rounded-xl border-[#e7e4ec] bg-white text-sm font-semibold text-[#24212b] shadow-sm transition-all duration-200 hover:border-[#c9b9ff] hover:bg-[#faf8ff] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#9274ef] focus-visible:ring-offset-2 dark:border-white/[0.12] dark:bg-[#19191f] dark:text-white dark:hover:border-[#8d70e8]/60 dark:hover:bg-[#211c2c] dark:focus-visible:ring-offset-[#101015]"
              >
                <Image
                  src="/Google.svg"
                  width={20}
                  height={20}
                  alt=""
                  aria-hidden="true"
                />
                Continue with Google
              </Button>
            </div>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#eeebf2] dark:bg-white/[0.09]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#a19bab] dark:text-[#81798f]">
                Simple. Secure. Seamless.
              </span>
              <div className="h-px flex-1 bg-[#eeebf2] dark:bg-white/[0.09]" />
            </div>

            {/* Sign up */}

            {/* Trust note */}
            <div className="mt-7 flex items-start gap-3 rounded-xl bg-[#f8f7fa] p-4 dark:bg-white/[0.035]">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#7957e8] shadow-sm dark:bg-[#24212d] dark:text-[#c4b3ff] dark:shadow-none">
                <Check size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#393440] dark:text-[#e8e3f0]">
                  Your business, your space
                </p>
                <p className="mt-1 text-xs leading-5 text-[#8b8495] dark:text-[#a099ad]">
                  Sign in securely to continue exploring opportunities with
                  SplitAt.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#f0edf3] pt-5 text-center dark:border-white/[0.08] sm:flex-row">
            <p className="text-[11px] text-[#a19bab] dark:text-[#8e879e]">
              © {new Date().getFullYear()} SplitAt
            </p>

            <div className="flex items-center gap-5 text-[11px] text-[#8b8495] dark:text-[#a49cb4]">
              <Link
                href="/terms"
                className="transition hover:text-[#7957e8] dark:hover:text-[#b7a3ff]"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="transition hover:text-[#7957e8] dark:hover:text-[#b7a3ff]"
              >
                Privacy Policy
              </Link>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default LoginForm;
