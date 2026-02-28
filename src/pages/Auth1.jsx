import React from "react";
import { Icon } from "@iconify/react";
import logologo from "../assets/DailyWrite.svg"
import picture1 from "../assets/register.png"
import google from "../assets/unnamed.png"


import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

export default function RegisterForm() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFF6EF] via-white to-[#FFE9D8] font-poppins">
      {/* Back */}
      <div className="px-6 pt-6">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-[#D96B2B] hover:underline"
        >
          <Icon icon="mdi:arrow-left" className="text-lg" />
          Back to home
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-10 pt-6 lg:grid-cols-2">
        {/* Left Image */}
        <div className="order-2 flex justify-center lg:order-1">
          <img
            src={picture1}
            alt="Register"
            className="w-full max-w-xl"
          />
        </div>

        {/* Right Card */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="w-full max-w-xl rounded-2xl border border-black/5 bg-white p-6 shadow-lg">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <img
                src={logologo}
                alt="Logologo"
                className="h-14 w-14 object-contain"
              />
              <h1 className="mt-3 text-2xl font-semibold text-[#D96B2B]">
                Register
              </h1>
              <p className="mt-1 text-center text-sm text-gray-500">
                Write what in you mind with DailyWrite
              </p>
            </div>

            <form className="mt-6 space-y-4">
              {/* Username + Gender */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#D96B2B] focus:ring-2 focus:ring-[#D96B2B]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="h-11 w-full appearance-none rounded-lg border border-gray-200 px-4 pr-10 text-sm text-gray-500 outline-none focus:border-[#D96B2B] focus:ring-2 focus:ring-[#D96B2B]/20"
                    >
                      <option value="" disabled>
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <Icon
                      icon="mdi:chevron-down"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#D96B2B] focus:ring-2 focus:ring-[#D96B2B]/20"
                />
              </div>
              

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#D96B2B] focus:ring-2 focus:ring-[#D96B2B]/20"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#D96B2B] focus:ring-2 focus:ring-[#D96B2B]/20"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">Or login with</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Register Button */}
              <button
                type="button"
                className="h-11 w-full rounded-lg bg-[#D96B2B] text-sm font-semibold text-white transition hover:brightness-95"
              >
                Register
              </button>

              {/* Google Button */}
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <img
                  src={google}
                  alt="Google"
                  className="h-5 w-5"
                />
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a href="#" className="font-semibold text-[#D96B2B] hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

