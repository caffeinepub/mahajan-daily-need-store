import { ShoppingCart, Phone, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-warm-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Store Name */}
          <div className="flex items-center gap-3">
            <motion.img
              src="/assets/generated/mahajan-logo-transparent.dim_400x200.png"
              alt="Mahajan Daily Need Store"
              className="h-10 md:h-14 w-auto object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg md:text-xl text-earth leading-tight">
                Mahajan Daily Need Store
              </h1>
              <p className="text-xs text-muted-foreground font-body">
                Aapki Har Zaroorat, Hamare Paas
              </p>
            </div>
          </div>

          {/* Quick Info — hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-earth-light font-body">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-saffron" />
              <span>8 AM – 10 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={13} className="text-saffron" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-saffron" />
              <span>Main Bazar, Delhi</span>
            </div>
          </div>

          {/* Cart Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onCartOpen}
              variant="default"
              className="relative bg-saffron hover:bg-saffron/90 text-white font-display font-bold shadow-warm gap-2"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-earth text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                >
                  {cartCount}
                </motion.span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
