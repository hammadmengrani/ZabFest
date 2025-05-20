// components/Popup.tsx
import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: { top: number; right: number };
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, position }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute z-50 w-[44%] bg-white rounded-lg shadow-lg p-4 border"
      style={{
        top: position?.top,
        right: position?.right,
      }}
    >
      {children}
    </div>
  );
};

export default Popup;
