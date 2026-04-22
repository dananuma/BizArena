import { Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
}) 


export const metadata = {
  title: "BizArena | Turn Ideas Into Real Businesses",
  description: "Share business ideas, explore innovations, and collaborate with other enterpreneurs on BizArena.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${merriWeather.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       <AuthProvider>
        <Navbar/>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
} 