"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface HeroProps {
  onScrollToMenu: () => void
}

const floatingImages = [
  {
    src: "/hero/fries-basket.png",
    alt: "Crispy fries in metal basket",
    className:
      "left-[-7%] bottom-[28%] z-20 w-43 -rotate-[8deg] sm:w-50 md:left-[6%] md:bottom-[32%] md:w-60",
  },
  {
    src: "/hero/sauce-bowl-top.png",
    alt: "Creamy dipping sauce",
    className:
      "left-[3%] top-[32%] z-30 w-20 rotate-6 sm:w-24 md:left-[20%] md:top-[23%] md:w-28",
  },
  {
    src: "/hero/wings-stack.png",
    alt: "Stack of juicy glazed chicken wings",
    className:
      "right-[-6%] bottom-[28%] z-20 w-44 rotate-[7deg] sm:w-52 md:right-[8%] md:bottom-[26%] md:w-66",
  },
]

export function Hero({ onScrollToMenu }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const timeoutId = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hero:brand-visible"))
      }
    }, 420)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section className="relative flex h-[670px] flex-col items-center justify-end overflow-hidden bg-brand-green text-white md:h-screen">
      <div
        className={`absolute inset-0 -translate-y-10 bg-center bg-no-repeat bg-[length:100%_auto] transition-all duration-800 ease-out will-change-transform md:bg-[length:80%_auto] ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ backgroundImage: "url('/kays-5.jpg')" }}
      />

      <div
        className={`absolute left-0 top-0 mt-5 -translate-y-[20%] transform-gpu transition-all duration-900 ease-out will-change-transform ${
          isVisible ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
        style={{ transitionDelay: "220ms" }}
      >
        <Image
          src="/kays-gm.jpg"
          alt="Kay's Turks"
          width={280}
          height={280}
          className="h-[220px] w-auto md:h-[280px]"
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

      <div className="absolute inset-0 pointer-events-none">
        {floatingImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute overflow-hidden rounded-2xl transition-all duration-700 ease-out ${image.className} ${
              isVisible
                ? `scale-100 opacity-90 animate-hero-float-${index % 3}`
                : "translate-y-8 scale-90 opacity-0"
            }`}
            style={{
              transitionDelay: `${150 + index * 120}ms`,
              filter:
                "saturate(1.12) contrast(1.05) drop-shadow(0 25px 20px rgba(0,0,0,0.38))",
              transformOrigin: "center center",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative z-30 px-6 pb-28 text-center md:pb-36">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <button
            onClick={onScrollToMenu}
            className="mb-4 inline-block rounded-full bg-brand-button px-10 py-5 text-xl font-bold text-brand-green shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-brand-button-hover sm:text-2xl"
          >
            ORDER NOW
          </button>

          <p className="text-lg font-medium italic tracking-wide text-brand-button-text drop-shadow-md sm:text-2xl md:text-3xl">
            Crispy Fries & Juicy Wings
          </p>
        </div>
      </div>

      <button
        onClick={onScrollToMenu}
        className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-white opacity-80 transition-opacity duration-300 hover:opacity-100"
        aria-label="Scroll down to menu"
      >
        <div className="flex flex-col items-center">
          {[0, 300, 600].map((delay) => (
            <svg
              key={delay}
              className="h-8 w-8 animate-arrow-wave md:h-10 md:w-10"
              style={{ animationDelay: `${delay}ms`, marginTop: delay === 0 ? 0 : -20 }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          ))}
        </div>
      </button>
    </section>
  )
}
