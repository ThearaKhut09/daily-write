
import React from "react";
import logo from "../assets/DailyWrite.svg"
import picture from "../assets/Signup-cuate.png"
import google from "../assets/unnamed.png"
import { Icon } from "@iconify/react";

export default function LoginFormLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF7F3] to-[#F6EFE8]">
      {/* Optional Poppins (remove if you already add it in your project) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        html, body { font-family: Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
      `}</style>

      <div >
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

        <div className="grid items-center gap-10 lg:grid-cols-2 mx-auto max-w-6xl px-4 py-10">
          {/* LEFT: LOGIN CARD */}
          <div className="w-full">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-8 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="mb-6 flex flex-col items-center text-center">
                {/* Logo slot (YOU put image) */}
                <div className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF3EA]">
                  {/* Replace src with your own logo path */}
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-10 w-10 object-contain"
                    draggable="false"
                  />
                </div>

                <h1 className="text-xl font-semibold text-[#D8732E]">Login</h1>
                <p className="mt-1 max-w-xs text-sm text-black/50">
                  If you already a member, easily log in now.
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black/70">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#D8732E]/60 focus:ring-4 focus:ring-[#D8732E]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black/70">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#D8732E]/60 focus:ring-4 focus:ring-[#D8732E]/10"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-black/40 hover:text-black/60"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative py-2">
                  <div className="h-px w-full bg-black/10" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-black/40">
                    Or login with
                  </span>
                </div>

                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[#D8732E] text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(216,115,46,0.8)] transition hover:brightness-105 active:brightness-95"
                >
                  Login
                </button>
                

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

                <p className="pt-2 text-center text-xs text-black/50">
                  Do not have an account?{" "}
                  <a href="#" className="font-semibold text-[#D8732E] hover:opacity-80">
                    Register
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT: HERO IMAGE SLOT (YOU put image) */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-white/30 blur-2xl" />
              {/* Replace src with your own picture path */}
              <img
                src={picture}
                alt="Login illustration"
                className="relative w-full max-w-[680px] select-none object-contain"
                draggable="false"
              />
            </div>
          </div>

          {/* Mobile hero */}
          <div className="lg:hidden">
            <div className="mt-2 overflow-hidden rounded-2xl border border-black/5 bg-white/40 p-4">
              <img
                src="/images/your-hero.png"
                alt="Login illustration"
                className="w-full object-contain"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

