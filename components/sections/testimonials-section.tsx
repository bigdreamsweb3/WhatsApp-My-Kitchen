import { testimonials } from "@/lib/data/testimonials"
import { Star } from "lucide-react"


export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-secondary text-foreground">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-balance">
          What Our Customers Say
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Join thousands of happy customers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: {
    name: string
    rating: number
    review: string
  }
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-secondary p-6 rounded-2xl shadow-xl border border-border\">
      <div className="flex mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={20} className="text-brand-gold fill-current" />
        ))}
      </div>
      <p className="text-muted-foreground mb-4 italic">
        {'"'}{testimonial.review}{'"'}
      </p>
      <p className="font-bold text-brand-orange">- {testimonial.name}</p>
    </div>
  )
}
