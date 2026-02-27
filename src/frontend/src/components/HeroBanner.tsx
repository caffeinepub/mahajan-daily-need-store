import { motion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[380px] md:min-h-[480px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-banner-grocery.dim_1400x600.jpg')",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-earth/90 via-earth/75 to-earth/50" />

      {/* Decorative circles */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-saffron/20"
          style={{ boxShadow: "inset 0 0 80px oklch(0.65 0.19 48 / 0.1)" }}
        />
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-gold/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12">
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-saffron/20 border border-saffron/40 text-saffron-light rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-widest mb-4"
          >
            <Star size={10} fill="currentColor" />
            Since 1985 — Trusted by 10,000+ Families
            <Star size={10} fill="currentColor" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-3"
          >
            Aapki Har
            <span className="block text-gold"> Zaroorat</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-body text-white/80 text-base md:text-lg mb-2"
          >
            Hamare Paas
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="font-body text-white/60 text-sm md:text-base mb-6"
          >
            Your every need, with us — Fresh groceries, dairy, snacks & more at the best prices.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-6 mb-8"
          >
            {[
              { num: "500+", label: "Products" },
              { num: "₹99", label: "Min Delivery" },
              { num: "Daily", label: "Fresh Stock" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-gold text-xl">{stat.num}</div>
                <div className="font-body text-white/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex gap-3"
          >
            <Button
              className="bg-saffron hover:bg-saffron/90 text-white font-display font-bold shadow-warm-lg gap-2"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white font-display backdrop-blur-sm"
              onClick={() => document.getElementById("store-info")?.scrollIntoView({ behavior: "smooth" })}
            >
              Store Info
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
