import React from "react";
import parse from "html-react-parser";
export function Card({ title, description, image, view, user, userImage }) {
  return (
    <section>
      <div className="rounded-3xl overflow-hidden mb-8">
        <img src={image} alt={title} className="w-full h-auto object-cover" />
      </div>

      <h1 className="text-5xl font-extrabold leading-tight mb-4 text-text-main">
        {title}
      </h1>
      <p className="text-xl mb-8 text-text-sub line-clamp-1">
        {parse(description)}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">

          <div className="p-2 bg-bg-side rounded-lg text-text-sub">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
          </div>
          <div className="flex items-center gap-2 text-text-sub">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
            <span className="font-medium text-primary-orange">{view} {" "}K</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={userImage}
              alt={user}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-text-sub">{user}</span>
        </div>
      </div>
    </section>
  );
}

export function CardSidBar({
  title,
  image,
  blogCategory,
  createdAt,
  user,
  userImage,
}) {
  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-start group">
        <div className="flex-1">
          <h4 className="text-primary-orange font-bold mb-1">{blogCategory}</h4>
          <p className="font-bold text-text-main leading-snug mb-2 line-clamp-2 group-hover:underline">
            {title}
          </p>
          <div className="flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold">
            <span>{createdAt}</span>
            <span className="flex items-center gap-1 capitalize">
              <div className="w-4 h-4 bg-primary-orange rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={userImage}
                  alt={user}
                  className="w-full h-full object-cover"
                />
              </div>{" "}
              {user}
            </span>
          </div>
        </div>
        <img
          src={image}
          className="w-28 h-20 rounded-xl object-cover"
          alt={title}
        />
      </div>
    </div>
  );
}
