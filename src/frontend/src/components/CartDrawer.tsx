import { AnimatePresence, motion } from "motion/react";
import { X, ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { Product, CartItem } from "../hooks/useQueries";
import { useAddToCart, useRemoveFromCart, useClearCart } from "../hooks/useQueries";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
}

export function CartDrawer({ isOpen, onClose, cartItems, products }: CartDrawerProps) {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const cartWithDetails = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }));

  const total = cartWithDetails.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + Number(item.product.priceInr) * Number(item.quantity);
  }, 0);

  const handleIncrement = (productId: bigint) => {
    addToCart.mutate(productId);
  };

  const handleDecrement = (productId: bigint, currentQty: bigint) => {
    if (Number(currentQty) <= 1) {
      removeFromCart.mutate(productId);
    } else {
      // Re-add is the only way to increment; for decrement we remove and re-add (n-1) times
      // Since backend only has addToCart and removeFromCart, we remove the item entirely
      removeFromCart.mutate(productId);
    }
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully! 🎉", {
      description: "Aapka order receive ho gaya. Delivery mein 30-45 minutes lagenge.",
    });
    clearCart.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-earth/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[400px] bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-saffron flex items-center justify-center">
                  <ShoppingCart size={15} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground text-base">Your Cart</h2>
                  <p className="text-xs text-muted-foreground font-body">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearCart.mutate(undefined)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs font-body"
                  >
                    Clear All
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1">
              {cartWithDetails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 px-6">
                  <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center">
                    <ShoppingBag size={28} className="text-saffron/50" />
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-foreground mb-1">Cart is empty</p>
                    <p className="text-sm text-muted-foreground font-body">
                      Kuch products add karein cart mein
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-saffron text-saffron hover:bg-saffron hover:text-white font-display"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {cartWithDetails.map((item) => {
                      if (!item.product) return null;
                      return (
                        <motion.div
                          key={item.productId.toString()}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          layout
                          className="flex items-center gap-3 bg-card rounded-xl border border-border p-3"
                        >
                          {/* Product visual */}
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-saffron/10 to-gold/15 flex items-center justify-center text-2xl shrink-0">
                            {getCategoryEmoji(item.product.category)}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-semibold text-sm text-foreground leading-tight truncate">
                              {item.product.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground">
                              ₹{item.product.priceInr.toString()} each
                            </p>
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border-saffron/30 text-saffron hover:bg-saffron hover:text-white"
                              onClick={() => handleDecrement(item.productId, item.quantity)}
                            >
                              <Minus size={11} />
                            </Button>
                            <span className="font-display font-bold text-sm w-5 text-center">
                              {item.quantity.toString()}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border-saffron/30 text-saffron hover:bg-saffron hover:text-white"
                              onClick={() => handleIncrement(item.productId)}
                            >
                              <Plus size={11} />
                            </Button>
                          </div>

                          {/* Subtotal + remove */}
                          <div className="text-right shrink-0 ml-1">
                            <p className="font-display font-bold text-sm text-earth">
                              ₹{(Number(item.product.priceInr) * Number(item.quantity)).toLocaleString("en-IN")}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart.mutate(item.productId)}
                              className="text-destructive/60 hover:text-destructive mt-0.5"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </ScrollArea>

            {/* Footer with totals */}
            {cartWithDetails.length > 0 && (
              <div className="border-t border-border bg-card px-5 py-4 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600">{total >= 500 ? "FREE" : "₹50"}</span>
                  </div>
                  {total < 500 && (
                    <p className="text-xs text-amber-600 font-body">
                      ₹{500 - total} more for free delivery!
                    </p>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-display font-bold text-lg">
                  <span>Total</span>
                  <span className="text-earth">
                    ₹{(total + (total >= 500 ? 0 : 50)).toLocaleString("en-IN")}
                  </span>
                </div>
                <Button
                  className="w-full bg-saffron hover:bg-saffron/90 text-white font-display font-bold shadow-warm gap-2"
                  onClick={handleCheckout}
                  disabled={clearCart.isPending}
                >
                  {clearCart.isPending ? "Placing Order..." : "Checkout"}
                  <ArrowRight size={16} />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    groceries: "🌾",
    dairy: "🥛",
    snacks: "🍪",
    beverages: "☕",
    personalCare: "✨",
    household: "🏠",
  };
  return map[category] ?? "📦";
}
