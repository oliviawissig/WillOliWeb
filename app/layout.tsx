import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WilliamTest",
  description:
    "A site made with Next.js to implement and test OpenWeb's user authentication integration",
  keywords: ["Community", "Home", "Index"],
  authors: [{ name: "William Mireles" }],
  openGraph: {
    title: "WilliamTest",
    description:
      "A site made with Next.js to implement and test OpenWeb's nonSSO to SSO migration",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=750&auto=format&fit=crop", // Must be an absolute URL
        width: 750,
        height: 500,
      },
    ],
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="flex flex-col justify-center">
          <div className="w-1/2 max-[600px]:w-11/12 m-auto mt-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
