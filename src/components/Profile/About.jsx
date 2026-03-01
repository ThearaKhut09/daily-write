import React from "react";

export default function About({fullName, email, coverUrl, createdAt , bio}) {
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
                <p className="font-bold text-(--text-primary)">{fullName}</p>
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
                  {email}
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
                <p className="font-bold text-(--text-primary)">{createdAt}</p>
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
              src={coverUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 max-w-2xl">
            {bio}
          </div>
        </div>
      </div>
    </div>
  );
}
