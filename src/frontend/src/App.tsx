import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { AnnouncementStrip } from "./components/AnnouncementStrip";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { CategoryTabs, type CategoryFilter } from "./components/CategoryTabs";
import { ProductCard } from "./components/ProductCard";
import { ProductSkeleton } from "./components/ProductSkeleton";
import { CartDrawer } from "./components/CartDrawer";
import { StoreFooter } from "./components/StoreFooter";
import { WhatsAppButton } from "./components/WhatsAppButton";
import {
  useAllProducts,
  useCart,
  useAddToCart,
  useStoreInfo,
  useInitializeProducts,
  ProductCategory,
} from "./hooks/useQueries";
import { useActor } from "./hooks/useActor";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [initialized, setInitialized] = useState(false);

  const { actor, isFetching: actorLoading } = useActor();
  const initProducts = useInitializeProducts();
  const productsQuery = useAllProducts();
  const cartQuery = useCart();
  const addToCart = useAddToCart();
  const storeInfo = useStoreInfo();

  const initProductsMutate = initProducts.mutate;
  const refetchProducts = productsQuery.refetch;

  // Initialize products once when actor is ready
  // If products already exist, init will fail (trap) but we still refetch to show them
  useEffect(() => {
    if (actor && !actorLoading && !initialized) {
      setInitialized(true);
      // First try to fetch existing products
      refetchProducts().then((result) => {
        // If no products found, try to initialize
        if (!result.data || result.data.length === 0) {
          initProductsMutate(undefined, {
            onSettled: () => {
              refetchProducts();
            },
          });
        }
      });
    }
  }, [actor, actorLoading, initialized, initProductsMutate, refetchProducts]);

  const products = productsQuery.data ?? [];
  const cartItems = cartQuery.data ?? [];

  // Cart item ids for quick lookup
  const cartProductIds = useMemo(
    () => new Set(cartItems.map((item) => item.productId.toString())),
    [cartItems]
  );

  // Filter products client-side
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const term = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [products, activeCategory, search]);

  const isLoading = productsQuery.isLoading || actorLoading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-right" richColors />

      {/* Announcement Strip */}
      <AnnouncementStrip />

      {/* Header */}
      <Header
        cartCount={cartItems.length}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        products={products}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Products section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-7"
          >
            <div className="flex items-center gap-3 mb-1.5">
              <div className="h-0.5 w-8 bg-saffron rounded-full" />
              <span className="font-display text-saffron text-sm font-bold uppercase tracking-widest">
                Fresh Stock Daily
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-earth">
              Our Products
            </h2>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative mb-6"
          >
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Kuch search karein... (e.g., Atta, Milk, Biscuits)"
              className="pl-10 pr-10 h-12 bg-card border-border rounded-xl font-body text-sm focus-visible:ring-saffron"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={15} />
              </button>
            )}
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-8"
          >
            <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }, (_, i) => `sk-${i}`).map((key) => (
                <ProductSkeleton key={key} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-xl text-earth mb-2">
                {search ? `"${search}" nahi mila` : "Koi product nahi mila"}
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                {search
                  ? "Koi aur search term try karein"
                  : "Is category mein abhi koi product nahi hai"}
              </p>
            </motion.div>
          ) : (
            <>
              <p className="font-body text-sm text-muted-foreground mb-4">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} mile
              </p>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.04 },
                  },
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    inCart={cartProductIds.has(product.id.toString())}
                    isAdding={addToCart.isPending}
                    onAddToCart={(id) => {
                      addToCart.mutate(id, {
                        onSuccess: () => {
                          // cart will refetch
                        },
                      });
                    }}
                  />
                ))}
              </motion.div>
            </>
          )}
        </section>

        {/* Features Strip */}
        <section className="bg-saffron/8 border-y border-saffron/15 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🚚", title: "Free Delivery", desc: "Orders above ₹500" },
                { icon: "🌱", title: "Fresh Daily", desc: "Farm to doorstep" },
                { icon: "💰", title: "Best Prices", desc: "Market competitive" },
                { icon: "⭐", title: "Trusted Quality", desc: "Since 1985" },
              ].map((feat) => (
                <motion.div
                  key={feat.title}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="text-3xl">{feat.icon}</div>
                  <div>
                    <p className="font-display font-bold text-earth text-sm">{feat.title}</p>
                    <p className="font-body text-muted-foreground text-xs">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <StoreFooter storeInfo={storeInfo.data} />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
