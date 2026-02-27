import { MapPin, Phone, Clock, Mail, Heart } from "lucide-react";

interface StoreFooterProps {
  storeInfo?: {
    name: string;
    address: string;
    phone: string;
    hours: string;
  };
}

export function StoreFooter({ storeInfo }: StoreFooterProps) {
  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer id="store-info" className="bg-earth text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/mahajan-logo-transparent.dim_400x200.png"
                alt="Mahajan Daily Need Store"
                className="h-12 w-auto object-contain brightness-150"
              />
            </div>
            <h3 className="font-display font-bold text-white text-xl">
              {storeInfo?.name || "Mahajan Daily Need Store"}
            </h3>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Aapki Har Zaroorat, Hamare Paas. Trusted by thousands of families since 1985.
              Quality products at the best prices delivered to your doorstep.
            </p>
          </div>

          {/* Store Info */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-saffron-light text-base uppercase tracking-wider">
              Store Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 font-body text-sm text-white/80">
                <MapPin size={16} className="text-saffron mt-0.5 shrink-0" />
                <span>{storeInfo?.address || "Shop No. 12, Main Bazar Road, Sadar, Delhi - 110001"}</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-white/80">
                <Phone size={16} className="text-saffron shrink-0" />
                <span>{storeInfo?.phone || "+91 98765 43210"}</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-white/80">
                <Clock size={16} className="text-saffron shrink-0" />
                <span>{storeInfo?.hours || "Monday – Sunday: 8:00 AM – 10:00 PM"}</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-white/80">
                <Mail size={16} className="text-saffron shrink-0" />
                <span>mahajan.store@example.com</span>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-saffron-light text-base uppercase tracking-wider">
              Find Us
            </h4>
            <div className="rounded-xl overflow-hidden border border-white/10 h-40 relative bg-earth-light/40 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center mx-auto">
                  <MapPin size={18} className="text-saffron" />
                </div>
                <p className="font-body text-xs text-white/60">Main Bazar Road</p>
                <p className="font-body text-xs text-white/40">Sadar, Delhi – 110001</p>
              </div>

              {/* Fake map grid lines */}
              <div className="absolute inset-0 opacity-10">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div
                    key={`row-${row}`}
                    className="absolute w-full border-t border-white"
                    style={{ top: `${row * 16.666}%` }}
                  />
                ))}
                {[1, 2, 3, 4, 5].map((col) => (
                  <div
                    key={`col-${col}`}
                    className="absolute h-full border-l border-white"
                    style={{ left: `${col * 16.666}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-white/50">
          <span>© {currentYear}. Built with <Heart size={10} className="inline text-saffron" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span className="text-white/30">
            Mahajan Daily Need Store — All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
