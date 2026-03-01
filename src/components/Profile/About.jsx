import React from "react";

export default function About() {
  return (
    <div className=" min-h-screen p-4 md:p-8 font-sans text-(--text-primary)">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
          About
        </h2>
      </div>
      <div className="max-w-4xl mx-auto bg-(--bg-primary) rounded-3xl p-8 border border-(--border-color)">
        <div className="text-left mb-10">
          <h2 className="text-2xl font-bold">
            <span className="text-(--primary-500)">Profile</span> Overview
          </h2>
          <p className="text-(--text-secondary)text-sm">
            Manage your personal and payment information
          </p>
        </div>
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              <span className="text-(--primary-500)">Basic</span> Information
            </h3>
            <button className="bg-(--primary-500) text-white px-4 py-1 rounded-md text-xs font-medium hover:bg-primary-600 transition">
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#fef3e6] bg-opacity-5 p-4 rounded-xl flex justify-between items-center border-opacity-20 hover:bg-opacity-10 transition-colors">
              <div>
                <p className="text-(--text-secondary)text-xs mb-1">Full Name</p>
                <p className="font-bold text-(--text-primary)">Saren Ratanak</p>
              </div>
              <button className="text-(--primary-500)hover:text-[var(--primary-600)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#fef3e6] bg-opacity-5 p-4 rounded-xl flex justify-between items-center border-opacity-20 hover:bg-opacity-10 transition-colors">
              <div>
                <p className="text-(--text-secondary)text-xs mb-1">Email</p>
                <p className="font-bold text-(--text-primary)">
                  much@gmail.com
                </p>
              </div>
              <button className="text-(--primary-500)hover:text-[var(--primary-600)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#fef3e6] bg-opacity-5 p-4 rounded-xl flex justify-between items-center border-opacity-20 hover:bg-opacity-10 transition-colors">
              <div>
                <p className="text-(--text-secondary)text-xs mb-1">
                  Phone Number
                </p>
                <p className="font-bold text-(--text-primary)">
                  +855 114 194 70
                </p>
              </div>
              <button className="text-(--primary-500)hover:text-[var(--primary-600)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#fef3e6] bg-opacity-5 p-4 rounded-xl flex justify-between items-center border-opacity-20 hover:bg-opacity-10 transition-colors">
              <div>
                <p className="text-(--text-secondary)text-xs mb-1">
                  Member Since
                </p>
                <p className="font-bold text-(--text-primary)">June 15, 2025</p>
              </div>
              <button className="text-(--primary-500)hover:text-[var(--primary-600)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-(--primary-500)w-full text-center">
              Biography
            </h3>
            <button className="bg-(--primary-500) text-white px-4 py-1 rounded-md text-xs font-medium hover:bg-primary-600 transition">
              Edit
            </button>
          </div>

          <div className="w-full h-48 overflow-hidden rounded-sm mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
              alt="Starry Night"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 max-w-2xl">
            <h4 className="text-2xl font-bold text-(--text-primary)">
              Saren Ratanak
            </h4>
            <p className="text-(--text-secondary)leading-relaxed">
              I'm a designer since 1998. Worked on projects for brands like
              Samsung, Viacom, BMW, Renault, Oriflame and hundreds of others.
            </p>
            <p className="text-(--text-secondary)leading-relaxed">
              A biohacker and a curious person, which led me to create a couple
              of design trends like
              <a
                href="#"
                className="text-(--primary-500)hover:text-[var(--primary-600)] underline ml-1"
              >
                https://glassmorphism.com
              </a>{" "}
              and
              <a
                href="#"
                className="text-(--primary-500)hover:text-[var(--primary-600)] underline ml-1"
              >
                https://neumorphism.com
              </a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=300"
              alt="Profile Silhouette"
              className="rounded-lg shadow-md grayscale contrast-125 border border-(--border-color)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
