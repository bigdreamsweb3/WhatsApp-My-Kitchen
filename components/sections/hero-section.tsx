"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface HeroProps {
  onScrollToMenu: () => void
}

const floatingImages = [
  // {
  //   src: "/kays-fried-chicken-wings.png",
  //   alt: "Crispy chicken wings",
  //   className: "top-[6%] left-[3%] w-28 md:w-40 -rotate-12",
  // },
  {
    src: "hero/kays-fries.png",
    alt: "Golden french fries",
    className: "top-[22%] md:top-[18%] right-[8%] w-28 md:w-36 rotate-6 transform-gpu will-change-transform z-30",
    //  className="absolute w-24 md:w-32  transform rotate-12 opacity-95"

    //  className: "top-[18%] right-[12%] w-24 md:w-36 rotate-12",
  },

  // 
  {
    src: "hero/kays-bufallo-wing-sauce.png",
    alt: "Signature dipping sauce",
    className:
      "top-[43%] md:top-[48%] right-[6%] md:right-[14%] w-20 md:w-28 rotate-3 -translate-y-1/2 transform-gpu will-change-transform z-20",
  },

  // Bottom-Left
  {
    src: "hero/kays-fried-chicken-wings.png",
    alt: "Crispy chicken wings",
    className: "bottom-[18%] left-[6%] md:left-[10%] w-32 md:w-48 -rotate-6 transform-gpu will-change-transform z-30",
  },

  // Bottom-Right
  // {
  //   src: "hero/kays-fried-chicken-wings.png",
  //   alt: "Crispy chicken wings",
  //   className: "bottom-[26%] md:bottom-[18%] right-[6%] md:right-[8%] w-28 md:w-44 rotate-6 transform-gpu will-change-transform z-20",
  // },

  // 
  // {
  //   src: "/kays-fried-chicken-wings.png",
  //   alt: "Crispy chicken wings",
  //   className:
  //     "top-[42%] left-[1%] md:left-[2%] w-24 md:w-36 -rotate-3 -translate-y-1/2",
  // },

  // 

]

export function Hero({ onScrollToMenu }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Notify other components (like the header) after the hero's entrance
    const dispatchDelay = 420 // ms, slightly after the brand image transition
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hero:brand-visible"))
      }
    }, dispatchDelay)

    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0F7948]">

      {/* Background image */}
      <div
        className={`absolute inset-0 bg-no-repeat will-change-transform bg-[length:100%_auto] md:bg-[length:80%_auto] bg-center transition-all duration-800 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ backgroundImage: "url('/kays-5.jpg')" }}
      />

      {/* Top-left brand image */}
      <div
        className={`absolute top-0 left-0 mt-5 transform-gpu will-change-transform transition-all duration-900 ease-out -translate-y-[20%] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        style={{ transitionDelay: '220ms' }}
      >
        <Image
          src="/kays-gm.jpg"
          alt="Kay's Turks"
          width={280}
          height={280}
          className="h-[220px] md:h-[280px] w-auto"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 80%, transparent 100%), linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 90%, transparent 100%), linear-gradient(to right, black 0%, black 5%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
      </div>

      {/* Floating food images */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingImages.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className={`absolute rounded-2xl overflow-hidden transition-all duration-700 ease-out ${img.className
              } ${isVisible
                ? `opacity-90 scale-100 animate-hero-float-${i % 3}`
                : "opacity-0 translate-y-8 scale-90"
              }`}
            style={{
              transitionDelay: `${150 + i * 120}ms`,
              filter:
                "saturate(1.12) contrast(1.05) drop-shadow(0 25px 20px rgba(0,0,0,0.38))",
              transformOrigin: 'center center',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollToMenu}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll to menu"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </button>
    </section>
  )
}