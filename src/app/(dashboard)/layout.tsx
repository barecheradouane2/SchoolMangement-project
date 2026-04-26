import Menu from "@/components/Menu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex">
      {/* left */}
      <div className=" w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
         <Link
         href="/" 
         className="flex items-center justify-center lg:justify-start gap-2"        
         >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block"> Schoolama</span>
         </Link>

        <Menu />

      </div>

      <div className=" w-[86%] md:w-[92%] lg:w-[84%]  xl:w-[86%] bg-[#f7f8fa]  ">

        <Navbar /> 

        {children}

      </div>
      
      
    </div>
  );
}
