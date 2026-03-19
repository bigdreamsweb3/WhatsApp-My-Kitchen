"use client"

import { Check } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface HeroProps {
  onScrollToMenu: () => void
}

// Restored your original floating items (almost 1:1 from first code, minor mobile safety)
const floatingImages = [
  // 1. Fries basket – left side (exactly like your image)
  {
    src: "hero/fries-basket.png",

    alt: "Crispy fries in metal basket",
    className:
      "left-[-7%] md:left-[6%] bottom-[28%] md:bottom-[32%] w-43 sm:w-50 md:w-60 -rotate-[8deg] z-20",
  },

  // 2. Small sauce bowl above fries – top-leftish
  {
    src: "/hero/sauce-bowl-top.png",
    alt: "Creamy dipping sauce",

    className:
      "left-[3%] md:left-[20%] top-[32%] md:top-[23%] w-20 sm:w-24 md:w-28 rotate-6 z-30",
  },

  // 3. Glazed wings stack – right side (exactly like your image)
  {
    src: "/hero/wings-stack.png",
    alt: "Stack of juicy glazed chicken wings",
    className:
      "right-[-6%] md:right-[8%] bottom-[28%] md:bottom-[26%] w-44 sm:w-52 md:w-66 rotate-[7deg] z-20",
  },

  // 4. Chicken tenders / strips at bottom center
  // {
  //   // src: "/hero/chicken-tenders.png",
  //   // alt: "Golden chicken tenders",
  //   src: "hero/kays-fried-chicken-wings.png",
  //   alt: "Crispy chicken wings",
  //   className:
  //     "block md:hidden top-[26%] right-[8%] md:right-[18%] w-24 sm:w-28 md:w-36 rotate-6 z-30",
  // },

  // 5. Bottom sauce bowl in front of tenders
  // {
  //   src: "hero/kays-bufallo-wing-sauce.png",
  //   alt: "Signature dipping sauce",
  //   className:
  //     "bottom-[18%] left-1/2 translate-x-[45%] md:translate-x-1/2 w-20 sm:w-24 md:w-28 z-30",
  // },
]

export function Hero({ onScrollToMenu }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const dispatchDelay = 420
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hero:brand-visible"))
      }
    }, dispatchDelay)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative h-screen flex flex-col justify-end items-center overflow-hidden bg-brand-green text-white">

      {/* Centered background image – your original sizing & centering */}
      <div
        className={`absolute inset-0 bg-no-repeat will-change-transform bg-[length:100%_auto] md:bg-[length:80%_auto] bg-center transition-all duration-800 ease-out -translate-y-10 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        style={{ backgroundImage: "url('/kays-5.jpg')" }}
      />

      {/* Top-left brand image – restored original */}
      <div
        className={`absolute top-0 left-0 mt-5 transform-gpu will-change-transform transition-all duration-900 ease-out -translate-y-[20%] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        style={{ transitionDelay: "220ms" }}
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

      {/* Floating food images – your original positions restored */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingImages.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className={`absolute rounded-2xl overflow-hidden transition-all duration-700 ease-out ${img.className} ${isVisible
              ? `opacity-90 scale-100 animate-hero-float-${i % 1}`
              : "opacity-0 translate-y-8 scale-90"
              }`}
            style={{
              transitionDelay: `${150 + i * 120}ms`,
              filter: "saturate(1.12) contrast(1.05) drop-shadow(0 25px 20px rgba(0,0,0,0.38))",
              transformOrigin: "center center",
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

      {/* Freshly Made ribbon – kept top-right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-40">
        <div className="bg-brand-green-dark/90 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-full shadow-lg flex items-center gap-2 border border-brand-gold/30 gap-2">
          <span>Freshly Made</span>
          <Check className="w-4 h-4 bg-brand-green rounded-full text-white" />
        </div>
      </div>

      {/* Content moved LOWER to avoid covering central logo/text */}
      <div className="relative z-30 text-center px-6 pb-28 md:pb-36">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          style={{ transitionDelay: "400ms" }}
        >
          <button
            onClick={onScrollToMenu}
            className="inline-block px-10 py-5 bg-brand-button hover:bg-brand-button-hover text-brand-green font-bold text-xl sm:text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4"
          >
            ORDER NOW
          </button>

          <p className="text-lg sm:text-2xl md:text-3xl font-medium italic text-brand-button-text tracking-wide drop-shadow-md">
            Crispy Fries & Juicy Wings
          </p>
        </div>
      </div>

      {/* Triple chevron scroll indicator – absolute bottom, no layout impact */}
      <button
        onClick={onScrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 text-white opacity-80 hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll down to menu"
      >
        <div className="flex flex-col items-center animate-bounce-slow">
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-8 h-8 md:w-10 md:h-10 -mt-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-8 h-8 md:w-10 md:h-10 -mt-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>
    </section>
  )
}