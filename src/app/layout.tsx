import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";
import { Inter } from "next/font/google";
import { NewTransactionProvider } from "@/providers/newTransaction";

export const metadata: Metadata = {
  title: "RealPeep",
  description: "Transactions",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full font-sans`}>
      <body className="h-full text-body-text antialiased">
        <NewTransactionProvider>
          <div className="min-h-screen flex">
            {/* Left rail */}
            <SideNav />

            {/* Main column */}
            <div className="flex-1 flex flex-col">
              <TopBar />
              {/* Canvas background is Figma exact #F7F8FA */}
              <main className="flex-1 bg-[#F7F8FA]">{children}</main>
            </div>
          </div>
        </NewTransactionProvider>
      </body>
    </html>
  );
}
