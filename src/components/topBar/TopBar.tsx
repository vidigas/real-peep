"use client";

import React from "react";
import { useNewTransactionModal } from "@/providers";
import { Button } from "@/components/Button";
import { IconPill } from "./IconPill";
import { ProfileMenu } from "./ProfileMenu";

export default function TopBar() {
  const { open } = useNewTransactionModal();

  return (
    <header className="h-20 border-b border-gray-200 bg-white flex items-center px-6">
      {/* Search (400 x 41) */}
      <div className="relative w-[400px]">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M20 20L17 17"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          placeholder="Search for transactions, clients, finances"
          className="h-[41px] w-[400px] rounded-xl pl-10 pr-3 text-body-md text-gray-600 placeholder-gray-300 border border-gray-200 outline-none focus:border-gray-300 bg-white"
        />
      </div>

      {/* Right-side actions */}
      <div className="ml-auto flex items-center gap-6">
        {/* 24px gap to icon group */}
        <Button
          hierarchy="primary"
          size="md"
          iconPosition="left"
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M7 1.167V12.833M1.167 7H12.833"
                stroke="white"
                strokeWidth="1.6667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onClick={open}
        >
          Transaction
        </Button>

        {/* Icon pills (each 48x48). 16px gaps between pills */}
        <div className="flex items-center gap-4">
          {/* Sun / Theme */}
          <IconPill
            ariaLabel="Toggle theme"
            onClick={() => console.log("Sun pressed")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <g clipPath="url(#clip0_2859_79140)">
                <path
                  d="M10 0.833V2.5M10 17.5v1.667M3.517 3.517 4.7 4.7M15.3 15.3l1.183 1.183M.833 10H2.5m15 0h1.667M3.517 16.483 4.7 15.3M15.3 4.7l1.183-1.183M14.167 10A4.167 4.167 0 1 1 5.833 10a4.167 4.167 0 0 1 8.334 0Z"
                  stroke="#1E1E1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2859_79140">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IconPill>

          {/* Bell */}
          <IconPill
            ariaLabel="Notifications"
            onClick={() => console.log("Bell pressed")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M11.442 17.5c-.147.253-.357.463-.61.609a1.665 1.665 0 0 1-1.664 0 1.667 1.667 0 0 1-.61-.61M15 6.667c0-1.327-.527-2.598-1.465-3.536A5 5 0 0 0 10 1.667a5 5 0 0 0-3.536 1.464A5 5 0 0 0 5 6.667C5 12.5 2.5 14.167 2.5 14.167h15S15 12.5 15 6.667Z"
                stroke="#344054"
                strokeWidth="1.6667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconPill>

          {/* Profile menu trigger */}
          <ProfileMenu
            trigger={
              <IconPill
                ariaLabel="Profile menu"
                onClick={() => console.log("Profile pressed")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0653 12.8512 14.2174 12.5 13.3334 12.5H6.66671C5.78265 12.5 4.93481 12.8512 4.30968 13.4763C3.68456 14.1014 3.33337 14.9493 3.33337 15.8333V17.5M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10 9.16667C8.15909 9.16667 6.66671 7.67428 6.66671 5.83333C6.66671 3.99238 8.15909 2.5 10 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z"
                    stroke="#344054"
                    strokeWidth="1.6667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconPill>
            }
          />
        </div>
      </div>
    </header>
  );
}
