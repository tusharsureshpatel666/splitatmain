"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PhoneModal() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    const checkPhone = async () => {
      try {
        const res = await axios.get("/api/phone/phonecheck");

        if (active && !res.data.phone) {
          setOpen(true);
        }
      } catch {
        if (active) setOpen(true);
      } finally {
        if (active) setChecking(false);
      }
    };

    void checkPhone();

    return () => {
      active = false;
    };
  }, []);

  const validatePhone = (value: string) => {
    if (!/^[6-9]\d{9}$/.test(value)) {
      return "Enter a valid 10-digit Indian mobile number.";
    }

    return "";
  };

  const handleSubmit = async () => {
    const validationError = validatePhone(phone);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/savephoneno", { phone });

      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to save your number. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  if (checking || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-0 backdrop-blur-md sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-modal-title"
    >
      <div className="relative max-h-[95dvh] w-full max-w-[440px] overflow-y-auto rounded-t-[28px] border border-white/10 bg-white shadow-2xl dark:bg-[#111114] sm:rounded-[28px]">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />

        {/* Header */}

        {/* Main content */}
        <div className="relative px-5 pb-7 pt-7 sm:px-7 sm:pb-8 sm:pt-8">
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <div className="mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/[0.09] dark:text-violet-300">
              <Phone size={29} strokeWidth={1.7} />
            </div>

            <h2
              id="phone-modal-title"
              className="text-[26px] font-semibold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-[30px]"
            >
              Add your phone number
            </h2>

            <p className="mt-2 max-w-[310px] text-xs leading-6 text-zinc-500 dark:text-zinc-400">
              Keep your SplitAt account connected. We’ll use your number for
              important account updates.
            </p>
          </div>

          {/* Form */}
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit();
            }}
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Mobile number
                </label>

                <span className="text-xs text-zinc-400">Required</span>
              </div>

              <div className="flex h-14 items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-within:bg-white/[0.06]">
                <span className="mr-3 text-xl" aria-hidden="true">
                  🇮🇳
                </span>

                <span className="border-r border-zinc-200 pr-3 text-sm font-semibold text-zinc-800 dark:border-white/15 dark:text-zinc-200">
                  +91
                </span>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  value={phone}
                  maxLength={10}
                  required
                  aria-invalid={!!error}
                  aria-describedby={error ? "phone-error" : "phone-hint"}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setError("");
                  }}
                  className="ml-3 min-w-0 flex-1 bg-transparent text-base font-medium tracking-wide text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-600"
                />

                {phone.length === 10 && !validatePhone(phone) && (
                  <CheckCircle2 size={19} className="text-emerald-500" />
                )}
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <p
                  id="phone-hint"
                  className="text-xs text-zinc-500 dark:text-zinc-400"
                >
                  Enter your 10-digit mobile number
                </p>

                <span className="shrink-0 text-xs tabular-nums text-zinc-400">
                  {phone.length}/10
                </span>
              </div>
            </div>

            {error && (
              <p
                id="phone-error"
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/[0.07] dark:text-red-300"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="h-14 w-full rounded-2xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 animate-spin" size={18} />
                  Saving your number...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2" size={17} />
                </>
              )}
            </Button>
          </form>

          {/* Privacy note */}
          <div className="mt-6 border-t border-zinc-200/80 pt-5 dark:border-white/[0.08]">
            <p className="text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              Your contact details are used for important SplitAt account
              updates. You can update your number later in your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
