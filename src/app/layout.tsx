import { AppStateProvider } from "@/context/AppStateContext";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Cheevi | Password generator",
  description: "Password generator ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastContainer />
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
