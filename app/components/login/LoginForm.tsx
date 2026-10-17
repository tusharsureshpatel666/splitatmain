"use client";

import React from "react";
import Image from "next/image";
import { SignIn1 } from "./socialButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  return (
    <div className="mt-5 h-[80vh] w-full  flex items-center justify-center px-2 lg:px-6 ">
      <div className="w-full flex gap-3 flex-col max-w-sm">
        {/* Logo */}
        {/* Logo */}
        <div className="flex  justify-center mb-10">
          <Image
            src="/logo.svg"
            alt="Splitat Logo"
            width={56}
            height={56}
            priority
            className="animate"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold ">Welcome to Splitat</h1>
        </div>

        {/* Login Label */}
        <p className="text-center text-xs text-gray-500 mb-3">Log in with</p>

        {/* Google */}
        <Button
          onClick={() => SignIn1("google")}
          className="
            w-full
            h-12
            bg-black
            text-white
            dark:bg-white
            dark:text-black
            rounded-lg
            flex
            items-center
            justify-center
            gap-3
            font-medium
            text-sm
            cursor-pointer
            dark:hover:bg-gray-100
            hover:bg-gray-900
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-white/30
          "
        >
          <Image src="/Google.svg" width={20} height={20} alt="Google" />

          <span>Continue with Google</span>
        </Button>

        {/* Sign up */}
        <Link
          href={"/signin"}
          className="text-center flex items-center justify-center gap-1 text-sm text-gray-500 mt-8"
        >
          Don&apos;t have an account?{" "}
          <span className="text-gray-800 dark:text-white  cursor-pointer hover:underline">
            Sign up
          </span>
        </Link>

        {/* Terms */}
        <p className="text-center text-xs text-gray-600 mt-6 leading-relaxed">
          By continuing, you agree to Splitat&apos;s Terms of Service and
          Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
