"use client"

import React, { useState } from "react";
import Link from "next/link";

export type NavProps = {
  className?: string;
};

export default function Nav({ className = "" }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`w-full ${className}`} dir="rtl">
      <nav className="backdrop-blur-sm bg-gradient-to-r from-green-600/90 via-green-500/85 to-emerald-500/80 shadow-lg rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo / Brand (appears visually on the right in RTL) */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 no-underline">
                <span className="sr-only">Morgi קואופרטיב</span>
                {/* compact circular mark */}
                <span className="flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-white/20 shadow-sm bg-white/10">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 3C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9z" fill="white" opacity="0.08"/>
                    <path d="M7 12c0-2.76 2.24-5 5-5v10c-2.76 0-5-2.24-5-5z" fill="white" />
                  </svg>
                </span>

                {/* full brand - hidden on mobile */}
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-white font-bold text-lg">מורגי — קואופרטיב</span>
                  <span className="text-white/80 text-xs">קונים ביחד, יוצרים ביחד</span>
                </div>
              </Link>
            </div>

            {/* Center: Nav links (hidden on small screens) */}
            <div className="hidden md:flex md:items-center md:space-x-6 md:space-x-reverse">
              <NavLink href="/products">המוצרים</NavLink>
              <NavLink href="/about">אודות</NavLink>
              <NavLink href="/how-it-works">איך זה עובד</NavLink>
              <NavLink href="/contact">צור קשר</NavLink>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white/10 hover:bg-white/20 text-white"
                >
                  כניסה למערכת
                </Link>

                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white text-green-700 shadow-md hover:scale-[1.01] transition-transform"
                >
                  הצטרפו לקואופרטיב
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="תפריט"
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40 sm:hidden"
              >
                {open ? (
                  <CloseIcon />
                ) : (
                  <MenuIcon />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`sm:hidden ${open ? "max-h-screen" : "max-h-0"} overflow-hidden transition-[max-height] duration-300`}>
          <div className="px-4 pt-4 pb-6 space-y-3">
            <MobileNavLink href="/products">המוצרים</MobileNavLink>
            <MobileNavLink href="/about">אודות</MobileNavLink>
            <MobileNavLink href="/how-it-works">איך זה עובד</MobileNavLink>
            <MobileNavLink href="/contact">צור קשר</MobileNavLink>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link href="/dashboard" className="block text-center px-3 py-2 rounded-md font-medium bg-white/10 text-white">
                כניסה
              </Link>
              <Link href="/join" className="block text-center px-3 py-2 rounded-md font-semibold bg-white text-green-700">
                הצטרפו
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/95 hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium text-white/95 bg-white/5">
      {children}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="6" width="18" height="2" rx="1" fill="white" opacity="0.9" />
      <rect x="3" y="11" width="18" height="2" rx="1" fill="white" opacity="0.7" />
      <rect x="3" y="16" width="18" height="2" rx="1" fill="white" opacity="0.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18 6L6 18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6l12 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
