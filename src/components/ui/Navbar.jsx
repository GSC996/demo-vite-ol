// src/components/ui/Navbar.jsx
import React from "react";

function Navbar({ logo, title, onMenuClick }) {
  return (
    <nav className="bg-[#0072b8] text-white p-2 flex items-center justify-between">
      <div className="flex items-center">
        {logo && (
          <a href={logo.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <img src={logo.src} alt={logo.title} className="h-8" />
          </a>
        )}
      </div>

      <div className="flex items-center">
        <div className="relative mr-4 w-64">
          <input type="text" placeholder="Buscar..." className="w-full rounded py-1 px-3 text-black" />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <button onClick={onMenuClick} className="bg-[#005087] hover:bg-[#003d64] p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
