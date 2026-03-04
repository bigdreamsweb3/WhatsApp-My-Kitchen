import { Phone, Instagram, MapPin } from "lucide-react"
import {
  WHATSAPP_BASE_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  LOCATION,
} from "../../lib/constants"

export function ContactSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-foreground text-balance">
          Get In Touch
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            WhatsApp Us
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#E1306C] to-[#C13584] hover:from-[#C13584] hover:to-[#833AB4] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Instagram size={20} />
            Follow Us
          </a>
        </div>

        <div className="space-y-3 text-muted-foreground">
          <p className="flex items-center justify-center gap-2 text-lg">
            <Phone size={20} className="text-[#FF4500]" />
            {PHONE_DISPLAY}
          </p>
          <p className="flex items-center justify-center gap-2 text-lg">
            <MapPin size={20} className="text-[#FF4500]" />
            {LOCATION}
          </p>
        </div>
      </div>
    </section>
  )
}
