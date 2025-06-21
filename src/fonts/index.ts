// src/fonts/index.ts
import localFont from "next/font/local";

export const arimoRegular = localFont({
  src: "../../public/assets/fonts/Arimo-Regular.woff2",
  variable: "--font-arimo-regular",
  display: "swap",
});

export const arimoBold = localFont({
  src: "../../public/assets/fonts/Arimo-Bold.woff2",
  variable: "--font-arimo-bold",
  display: "swap",
});
