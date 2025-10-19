'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* === Inline icons (inherit currentColor) === */
function ToolsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 25 25" fill="none" aria-hidden="true" {...props}>
      <rect x="6.615" y="8.975" width="11.847" height="12.118" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M15.471 2.971l6.761 3.622a2 2 0 01.506 1.982l-2.573 4.991" stroke="currentColor" strokeWidth="2" />
      <path d="M14.222 6.139l-.385-2.08a2 2 0 00-2.328-1.588L2.964 4.115A2 2 0 001.364 6.46l1.675 9.046a1.5 1.5 0 001.999 1.292" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PeopleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 25" fill="none" aria-hidden="true" {...props}>
      <path d="M10 11.093c2.209 0 4-1.791 4-4 0-2.209-1.791-4-4-4S6 4.884 6 7.093s1.791 4 4 4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.3 15.093H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 20.093a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21.092l-1.9-1.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChecklistsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 25" fill="none" aria-hidden="true" {...props}>
      <path d="M17.5 5.093a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.774 11.237c-1.003 1.12-.024 2.81.896 4.001 1.787 2.32 3.866 4.399 6.186 6.186 1.19.92 2.881.899 4.001-.104 3.028-2.708 5.873-5.614 8.516-8.698.267-.306.431-.688.47-1.093.164-1.796.503-6.97-.902-8.374-1.405-1.404-6.578-.066-8.374.099-.405.039-.787.203-1.093.47-3.084 2.643-5.99 5.488-8.698 8.516" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.789 12.46c.022-.402.134-1.135-.476-1.693-.233-.202-.504-.355-.797-.451-1.257-.443-2.8 1.039-1.708 2.396.587.73 1.04.954.996 1.782-.03.582-.602 1.191-1.356 1.423-.655.202-1.378-.065-1.835-.576-.559-.624-.502-1.212-.507-1.468" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SideNav() {
  return (
    // Thinner divider like Figma hairline
    <nav className="h-screen w-[92px] border-r-[0.5px] border-gray-200 bg-white flex flex-col items-center px-4 pt-6 pb-4">
      {/* Logo — 60×60 box to match active pill */}
      <Link href="/" aria-label="Home" className="mb-[30px]">
        <div className="h-[60px] w-[60px] flex items-center justify-center">
          <Image src="/realpeep-logo-tight.svg" alt="RealPeep" width={56} height={56} className="h-[56px] w-auto" />
        </div>
      </Link>

      {/* Primary icons */}
      <div className="flex flex-col items-center gap-6 text-gray-800">
        {/* Active (60px circle) */}
        <button className="w-[60px] h-[60px] rounded-full bg-[#00875A14] flex items-center justify-center" aria-label="Dashboard">
          <Image src="/nav-grid.svg" alt="" width={60} height={60} className="w-[60px] h-[60px]" />
        </button>

        {/* 40px buttons, 24px icons */}
        <button className="w-10 h-10 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-800" aria-label="Tools">
          <ToolsIcon className="w-6 h-6" />
        </button>

        <button className="w-10 h-10 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-800" aria-label="People">
          <PeopleIcon className="w-6 h-6" />
        </button>

        <button className="w-10 h-10 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-800" aria-label="Checklists">
          <ChecklistsIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-auto" />

      {/* Settings */}
      <button className="w-10 h-10 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-800" aria-label="Settings">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" strokeWidth="1.7" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.21 19.4l.06-.06A1.65 1.65 0 004.6 17.52a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 014.21 4.6l.06.06A1.65 1.65 0 006.09 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06A2 2 0 0119.79 4.6l-.06.06a1.65 1.65 0 00-.33 1.82 1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
