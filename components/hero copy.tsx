"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

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
    const dispatchDelay = 420
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hero:brand-visible"))
      }
    }, dispatchDelay)

    return () => clearTimeout(t)
  }, [])




  return (
    <section className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center">

      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl w-full px-4 sm:px-6 lg:px-8 items-center">

        {/* Left Side - Text Content */}
        <div
          className={`flex flex-col justify-center space-y-8 transition-all duration-900 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          style={{ transitionDelay: '100ms' }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 w-fit">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
              Premium Dining Experience
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight tracking-tight">
              Savor Every <span className="text-primary">Bite</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-md font-medium">
              Discover exquisite cuisine from your favorite restaurants. Fresh, delicious meals delivered to your door with uncompromising quality.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onScrollToMenu}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Order Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-card text-foreground rounded-xl font-bold hover:bg-muted transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </Link>
          </div>

          {/* Trust Indicator */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-foreground/50 font-bold text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground/70">
              <span className="font-bold text-foreground">10K+</span> satisfied customers
            </p>
          </div>
        </div>

        {/* Right Side - Image Showcase */}
        <div
          className={`relative h-80 sm:h-[500px] lg:h-[600px] flex items-center justify-center transition-all duration-900 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Main Image Card */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden group shadow-2xl">
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
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* Floating cards - Top Left */}
            <div
              className="absolute top-6 left-6 bg-card/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-border/50 transition-all duration-700 ease-out"
              style={{
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '500ms'
              }}
            >
              <p className="text-xs text-muted-foreground font-bold tracking-widest">QUALITY</p>
              <p className="text-2xl font-black text-primary">Premium</p>
            </div>

            {/* Floating cards - Bottom Right */}
            <div
              className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-border/50 transition-all duration-700 ease-out"
              style={{
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '600ms'
              }}
            >
              <p className="text-xs text-muted-foreground font-bold tracking-widest">DELIVERY</p>
              <p className="text-2xl font-black text-accent">30 mins</p>
            </div>
          </div>

          {/* Side accent elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollToMenu}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        aria-label="Scroll to menu"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2 hover:border-primary transition-colors">
          <div className="w-1 h-2 bg-foreground/30 rounded-full" />
        </div>
      </button>
    </section>
  )
}
