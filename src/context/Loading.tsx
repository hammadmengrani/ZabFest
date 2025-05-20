"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (loading: boolean) => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true); // Show loader when route starts changing
    setTimeout(() => setLoading(false), 500); // Ensure smooth transition
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <FullScreenLoader />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

const FullScreenLoader = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center">
      <div>
        <img src="/loader.svg" alt="Loading..." className="" />
      </div>
    </div>
  );
};
