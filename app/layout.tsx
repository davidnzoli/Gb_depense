// import "./globals.css";
import { Toaster } from "sonner";

// export const metadata = { title: "App" };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="fr">
//       <body className="bg-gray-100">{children}</body>
//       <Toaster position="top-right" richColors closeButton />
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sideBar";
import NavBar from "@/components/navBar";
import { Poppins } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Gestion des depenses",
  description: "Gestion des depenses dans une entreprise de construiction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <div className="flex w-[100%] ">
          <main className="flex-grow w-[100%] items-center justify-center lg:p-6 p-0 mt-20 overflow-auto">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
