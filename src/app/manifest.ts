import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EBC OCR - Convert Khmer & English Documents to Text",
    short_name: "EBC OCR",
    description:
      "Turn any image or PDF into editable Khmer and English text—quickly, accurately, and securely. No account needed.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1B75BC",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

