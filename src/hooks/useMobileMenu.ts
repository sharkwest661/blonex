// hooks/useMobileMenu.ts
import { useState, useCallback, useEffect } from "react";

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close menu on route change (if using Next.js router)
  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu();
    };

    // If using Next.js router
    if (typeof window !== "undefined") {
      const router = require("next/router").default;
      router.events.on("routeChangeStart", handleRouteChange);
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [closeMenu]);

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};
