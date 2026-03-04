import { Star } from "lucide-react"
import { testimonials } from "../../lib/data/testimonials"

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-balance">
          What Our Customers Say
        </h2>
        <p className="text-center text-neutral-400 mb-12 text-lg">
          Join thousands of happy customers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-[#FFD700] fill-current"
                  />
                ))}
              </div>
              <p className="text-neutral-300 mb-4 italic">
                {'"'}{testimonial.review}{'"'}
              </p>
              <p className="font-bold text-[#FF4500]">
                {"- "}{testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
