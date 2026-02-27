import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const announcements = [
  { id: "rice", text: "🎉 Aaj ka Special: Basmati Rice ₹75/kg" },
  { id: "dairy", text: "🥛 Fresh Dairy Products Daily Morning 8 AM" },
  { id: "delivery", text: "🛒 Free Home Delivery on orders above ₹500" },
  { id: "deals", text: "✨ Weekly Deals: Har Mangalwar aur Shukravar" },
];

const doubled = [
  ...announcements.map((a) => ({ ...a, copy: "a" })),
  ...announcements.map((a) => ({ ...a, copy: "b" })),
];

export function AnnouncementStrip() {
  return (
    <div className="relative overflow-hidden bg-earth text-white py-2 px-4">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 shrink-0 bg-saffron px-2 py-0.5 rounded text-xs font-display font-bold uppercase tracking-wider">
          <Sparkles size={10} />
          OFFERS
        </div>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubled.map((item) => (
              <span key={`${item.id}-${item.copy}`} className="text-sm font-body inline-flex items-center gap-2">
                {item.text}
                <span className="text-saffron-light opacity-60">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
