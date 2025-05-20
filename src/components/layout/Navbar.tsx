'use client';
import React, { useEffect, useRef, useState } from "react";
import MobileMenubar, { MenuItem } from "./MobileMenubar";
import Menubar from "./Menubar";
import CartPopup from "../popups/CartPopup";
import Popup from "../popups/Popup";

export interface NavbarProps {
  logo: string;
  menu?: Array<MenuItem>;
}

const Navbar: React.FC<NavbarProps> = ({ logo, menu }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
  const cartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.href;
      if (currentPath.includes('/dashboard')) {
        setShowNavbar(false);
      }
    }
  }, []);

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (cartRef.current) {
      const rect = cartRef.current.getBoundingClientRect();
      setPopupPos({
        top: 65,
        right: 74,
      });
    }
    setPopupOpen(true);
  };

  if (!showNavbar) return null;

  return (
    <div className="flex flex-col sticky w-full drop-shadow-md justify-between items-center top-0 mx-auto z-50">
      <div className="flex md:gap-4 justify-between bg-white w-full p-5 relative">
        <div className="container mx-auto flex w-[1460px] justify-between items-center gap-2">
          <div className="flex flex-row gap-2">
            <MobileMenubar menuItems={menu} />
            <a href="/">
              <img src={logo} alt="logo" className="w-36 md:w-[122px]" />
            </a>
          </div>
          <Menubar menuItems={menu} />
          <div className="flex gap-3 items-center">
            <a href="/" className="w-10 h-10 md:w-[45px] md:h-[45px] flex items-center justify-center">
              <img src="/search.svg" className="w-8 h-8" alt="Search" />
            </a>
            <button
              ref={cartRef}
              onClick={handleCartClick}
              className="rounded-full w-10 h-10 md:w-[45px] md:h-[45px] flex items-center justify-center relative"
            >
              <img src="/cart.svg" className="w-6 h-6" alt="Cart" />
            </button>
            <a href="/admin" className="rounded-full w-10 h-10 md:w-[45px] md:h-[45px] flex items-center justify-center">
              <img src="/user.svg" className="w-6 h-6" alt="User" />
            </a>
          </div>
        </div>
        <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} position={popupPos}>
          <CartPopup onClose={() => setPopupOpen(false)} />
        </Popup>
      </div>
    </div>
  );
};

export default Navbar;
