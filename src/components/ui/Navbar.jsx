// src/components/ui/Navbar.jsx
import React from "react";

function Navbar({ logo, title }) {
  return (
    <nav className="bg-[#0072b8] text-white m-2.5 rounded-md w-auto h-[50px]">
      <div className="h-full px-2">
        <div className="flex items-center justify-between gap-x-[10px] h-full">
          <div className="flex items-center h-full">
            {logo && (
              <a href={logo.link} target="_blank" rel="noopener noreferrer" className="flex items-center mr-2 h-full w-[max-content]">
                <img src={logo.src} alt={logo.title} className="h-full w-auto object-contain" />
              </a>
            )}
            {/* {title && (
              <a id="logoText" className="text-white font-bold text-sm whitespace-nowrap self-center">
                {title}
              </a>
            )} */}
          </div>
          {/* Lado derecho - Buscador */}
          <div className="flex items-center bg-white border-2 border-slate-200 rounded-[4px]">
            <div className="relative">
              <input type="search" placeholder="Buscar localidad..." className="py-1 px-3 pr-8 rounded text-black text-sm w-[180px] sm:w-[220px]" spellCheck="false" autoComplete="address-level1" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
