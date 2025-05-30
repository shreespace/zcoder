import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zcoder",
  description: "An Online Coding Platform with online code editor and built in live chat room",
  //add a logo
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
