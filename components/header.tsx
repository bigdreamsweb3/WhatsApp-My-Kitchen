"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface HeaderProps {
  onOrderClick: () => void
}

export function Header({ onOrderClick }: HeaderProps) {
  const [isLogoVisible, setIsLogoVisible] = useState(false)

  useEffect(() => {
    const fallback = setTimeout(() => setIsLogoVisible(true), 2500)

    const onHeroBrand = () => {
      setIsLogoVisible(true)
      clearTimeout(fallback)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("hero:brand-visible", onHeroBrand)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("hero:brand-visible", onHeroBrand)
      }
      clearTimeout(fallback)
    }
  }, [])

  return (
    <header className="absolute top-0 left-0 right-0 bg-transparent z-50">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        <Image
          src="/kays-logo.png"
          alt="Kay's Turks"
          width={120}
          height={48}
          className={`h-8 md:h-12 w-auto transition-all duration-700 ease-out ${isLogoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          priority
        />
        <button
          onClick={onOrderClick}
          className="bg-[#FF4500] hover:bg-[#FF6347] text-white font-bold px-6 py-2 md:px-8 md:py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Order Now
        </button>
      </div>
    </header>
  )
}
