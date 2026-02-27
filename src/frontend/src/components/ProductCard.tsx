import { motion } from "motion/react";
import { ShoppingCart, CheckCircle2, AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../hooks/useQueries";
import { ProductCategory } from "../hooks/useQueries";

const categoryColors: Record<ProductCategory, string> = {
  [ProductCategory.groceries]: "bg-amber-100 text-amber-800 border-amber-200",
  [ProductCategory.dairy]: "bg-blue-50 text-blue-700 border-blue-200",
  [ProductCategory.snacks]: "bg-orange-100 text-orange-800 border-orange-200",
  [ProductCategory.beverages]: "bg-teal-50 text-teal-700 border-teal-200",
  [ProductCategory.personalCare]: "bg-pink-50 text-pink-700 border-pink-200",
  [ProductCategory.household]: "bg-green-50 text-green-700 border-green-200",
};

const categoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.groceries]: "Groceries",
  [ProductCategory.dairy]: "Dairy",
  [ProductCategory.snacks]: "Snacks",
  [ProductCategory.beverages]: "Beverages",
  [ProductCategory.personalCare]: "Personal Care",
  [ProductCategory.household]: "Household",
};

const categoryEmoji: Record<ProductCategory, string> = {
  [ProductCategory.groceries]: "🌾",
  [ProductCategory.dairy]: "🥛",
  [ProductCategory.snacks]: "🍪",
  [ProductCategory.beverages]: "☕",
  [ProductCategory.personalCare]: "✨",
  [ProductCategory.household]: "🏠",
};

interface ProductCardProps {
  product: Product;
  inCart: boolean;
  isAdding: boolean;
  onAddToCart: (id: bigint) => void;
}

export function ProductCard({ product, inCart, isAdding, onAddToCart }: ProductCardProps) {
  const isLowStock = Number(product.stockQuantity) > 0 && Number(product.stockQuantity) <= 5;
  const outOfStock = Number(product.stockQuantity) === 0;
  const catColor = categoryColors[product.category] || "bg-muted text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className="group relative bg-card rounded-2xl border border-border shadow-card hover:shadow-warm transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Product visual header */}
      <div className="relative h-36 flex items-center justify-center overflow-hidden bg-gradient-to-br from-saffron/5 to-gold/10">
        <div className="text-5xl select-none group-hover:scale-110 transition-transform duration-300">
          {categoryEmoji[product.category]}
        </div>

        {/* Category badge */}
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-display font-bold border ${catColor}`}>
          {categoryLabels[product.category]}
        </div>

        {/* Stock indicator */}
        {outOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <span className="font-display font-bold text-destructive text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display font-bold text-foreground text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="font-body text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price + Stock row */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-bold text-earth text-xl">
            ₹{product.priceInr.toString()}
          </span>
          <div className="flex items-center gap-1">
            {outOfStock ? (
              <AlertCircle size={12} className="text-destructive" />
            ) : isLowStock ? (
              <span className="text-[10px] font-body text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                Only {product.stockQuantity.toString()} left
              </span>
            ) : (
              <div className="flex items-center gap-1 text-[10px] font-body text-green-700">
                <Package size={10} />
                <span>In Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="sm"
          disabled={outOfStock || isAdding}
          onClick={() => onAddToCart(product.id)}
          className={`w-full font-display font-bold text-sm transition-all ${
            inCart
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-saffron hover:bg-saffron/90 text-white shadow-warm"
          }`}
        >
          {inCart ? (
            <>
              <CheckCircle2 size={14} className="mr-1.5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart size={14} className="mr-1.5" />
              {isAdding ? "Adding..." : "Add to Cart"}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
