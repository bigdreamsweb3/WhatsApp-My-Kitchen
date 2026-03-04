"use client"

import { useCallback } from "react"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
// import { MenuSection } from "@/components/menu-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { CartButton } from "@/components/cart-button"
import { CartSidebar } from "@/components/cart-sidebar"
import { MenuSection } from "@/components/sections/menu-section"




export default function HomePage() {
  const {
    cart,
    isCartOpen,
    checkoutForm,
    total,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    handleCheckout,
    buyNow,
    openCart,
    closeCart,
    updateCheckoutField,
  } = useCart()

  const scrollToMenu = useCallback(() => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onOrderClick={scrollToMenu} />
      <Hero onScrollToMenu={scrollToMenu} />

      <CartButton itemCount={itemCount} onClick={openCart} />

      <main>
        <MenuSection onAddToCart={addToCart} onBuyNow={buyNow} />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <SiteFooter />

      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        total={total}
        checkoutForm={checkoutForm}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        onUpdateField={updateCheckoutField}
      />
    </div>
  )
}
