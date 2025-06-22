// src/providers/Providers.tsx
"use client";
import React from "react";
import QueryProvider from "./QueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
