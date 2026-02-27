import { MapPin, Phone, Clock, Mail, Heart } from "lucide-react";

const WA_LINK =
  "https://wa.me/916230082739?text=" +
  encodeURIComponent("Namaste, main Mahajan Daily Need Store se order karna chahta hoon");

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
                <span>{storeInfo?.address || "Post Office Shikroha, Distt. Bilaspur, Himachal Pradesh - 174032"}</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-white/80">
                <Phone size={16} className="text-saffron shrink-0" />
                <span>{storeInfo?.phone || "+91 62300 82739"}</span>
              </li>
              <li>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-lg font-body text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp par Order Karein
                </a>
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

          {/* Map */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-saffron-light text-base uppercase tracking-wider">
              Find Us
            </h4>
            <div className="rounded-xl overflow-hidden border border-white/10 h-48 relative">
              <iframe
                title="Shikroha Location"
                src="https://maps.google.com/maps?q=Shikroha,+Bilaspur,+Himachal+Pradesh+174032&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Shikroha,+Bilaspur,+Himachal+Pradesh+174032"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-body text-saffron hover:text-gold transition-colors"
            >
              <MapPin size={12} />
              Google Maps par dekhen
            </a>
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
