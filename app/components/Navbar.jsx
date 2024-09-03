"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const initialIndex =
      pathname === '/' ? 0 :
      pathname.startsWith('/dashboard') ? 1 :  // This includes both `/dashboard` and `/dashboard/device-1`
      pathname === '/ai-assistant' ? 2 :
      pathname === '/market' ? 3 : 4;
    setActiveIndex(initialIndex);
  }, [pathname]);  

  useEffect(() => {
    if (menuRef.current) {
      const menuItems = menuRef.current.children;
      const activeItem = menuItems[activeIndex];
      const sliderWidth = 40; // Fixed width for the slider
      const sliderOffset = activeItem.offsetLeft + (activeItem.clientWidth / 2) - (sliderWidth / 2);
      setIndicatorStyle({
        left: `${sliderOffset}px`,
        width: `${sliderWidth}px`,
        height: '5px',  // Adjusted height for better visibility
      });
    }
  }, [activeIndex]);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <header className="fixed z-30 w-full md:w-[500px] md:rounded-xl bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl backdrop-blur-lg hover:shadow-3xl transition-shadow duration-300">
      <nav className="relative flex sm:justify-around items-center p-3 rounded-lg bg-white/20 backdrop-blur-md shadow-xl">
        <div
          className="absolute bottom-0 h-4 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out rounded-full"
          style={{ ...indicatorStyle, transition: 'all 0.5s ease' }}
        />
        <ul ref={menuRef} className="flex space-x-4 w-full justify-around items-center">
          <li>
            <Link
              href="/"
              onClick={() => handleMenuClick(0)}
              className={`flex flex-col items-center text-gray-900 dark:text-gray-100 transition-all duration-200 transform ${
                activeIndex === 0 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-home text-3xl"></i>
              <span className="text-xs font-medium mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              onClick={() => handleMenuClick(1)}
              className={`flex flex-col items-center text-gray-900 dark:text-gray-100 transition-all duration-200 transform ${
                activeIndex === 1 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-dashboard text-3xl"></i>
              <span className="text-xs font-medium mt-1">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/ai-assistant"
              onClick={() => handleMenuClick(2)}
              className={`flex flex-col items-center text-gray-900 dark:text-gray-100 transition-all duration-200 transform ${
                activeIndex === 2 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-message-square-dots text-3xl"></i>
              <span className="text-xs font-medium mt-1">Assistant</span>
            </Link>
          </li>
          <li>
            <Link
              href="/market"
              onClick={() => handleMenuClick(3)}
              className={`flex flex-col items-center text-gray-900 dark:text-gray-100 transition-all duration-200 transform ${
                activeIndex === 3 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-store text-3xl"></i>
              <span className="text-xs font-medium mt-1">Market</span>
            </Link>
          </li>
          <li>
            <Link
              href="/auth"
              onClick={() => handleMenuClick(4)}
              className={`flex flex-col items-center text-gray-900 dark:text-gray-100 transition-all duration-200 transform ${
                activeIndex === 4 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-user-rectangle text-3xl"></i>
              <span className="text-xs font-medium mt-1">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
