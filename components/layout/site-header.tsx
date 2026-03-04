"use client"

interface SiteHeaderProps {
  onOrderClick: () => void
}

export function SiteHeader({ onOrderClick }: SiteHeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <img
          src="/kays-logo.png"
          alt="Kay's Turks"
          className="h-8 md:h-12"
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
