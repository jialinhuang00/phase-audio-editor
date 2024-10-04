import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "@/app/globals.css";

const merriweather = Merriweather({
  subsets: [],
  weight: ["300", "400", "700"],
});
export const metadata: Metadata = {
  title: "Phase Audio Editor | jialinhuang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/fav.svg"></link>
      </head>
      <body className={merriweather.className}>{children}</body>
    </html>
  );
}
