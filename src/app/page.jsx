"use client";

import { useSession } from "next-auth/react";
import Header from "../components/common/Header.jsx";
import Image from "next/image";
import GridSection from "./Grid/Grid.jsx";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <Header />

      {/* Imagen principal */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
        src="/bgg.jpg" 
        alt="bg"
        width={2000}
        height={328}
        />
      </div>

      {/* Sección de productos */}
      <GridSection />
    </div>
  );
}
