import { motion } from "motion/react";
import {
  ShoppingBasket,
  Milk,
  Cookie,
  Coffee,
  Sparkles,
  Home,
  LayoutGrid,
} from "lucide-react";
import { ProductCategory } from "../hooks/useQueries";

export type CategoryFilter = "all" | ProductCategory;

interface CategoryTabsProps {
  active: CategoryFilter;
  onChange: (cat: CategoryFilter) => void;
}

const categories: { id: CategoryFilter; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: ProductCategory.groceries, label: "Groceries", icon: ShoppingBasket },
  { id: ProductCategory.dairy, label: "Dairy", icon: Milk },
  { id: ProductCategory.snacks, label: "Snacks", icon: Cookie },
  { id: ProductCategory.beverages, label: "Beverages", icon: Coffee },
  { id: ProductCategory.personalCare, label: "Personal Care", icon: Sparkles },
  { id: ProductCategory.household, label: "Household", icon: Home },
];

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex gap-2 min-w-max">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-display font-semibold transition-all
                ${isActive
                  ? "bg-saffron text-white shadow-warm"
                  : "bg-card text-foreground hover:bg-saffron/10 hover:text-saffron border border-border"
                }
              `}
            >
              <Icon size={15} />
              <span>{cat.label}</span>
              {isActive && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute inset-0 rounded-xl bg-saffron -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
