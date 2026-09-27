"use client";

import React, { useState, useMemo } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Product {
  id: string;
  name: string;
  category: "Cyberwear" | "Footwear" | "Hardware" | "Accessories";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: "NEW DROP" | "BESTSELLER" | "LIMITED" | "HOT";
  description: string;
  specs: string[];
  inStock: boolean;
  accentColor: string;
  iconType: "jacket" | "shoes" | "headphones" | "bag" | "watch" | "keyboard" | "glasses" | "hoodie";
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface ToastNotification {
  id: number;
  message: string;
  type: "success" | "info" | "alert";
}

// ==========================================
// MOCK DATA: CURATED BLACK & RED COLLECTION
// ==========================================
const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "KROMA Cyber-Shell V2 Jacket",
    category: "Cyberwear",
    price: 289,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 142,
    badge: "BESTSELLER",
    description: "Matte-black waterproof ripstop shell engineered with crimson seam seals and modular magnetic tech pockets.",
    specs: ["DWR 20K Waterproof", "YKK Aquaguard Zippers", "Reflective Crimson Trim", "Breathable Mesh Lining"],
    inStock: true,
    accentColor: "#ef4444",
    iconType: "jacket",
  },
  {
    id: "prod-2",
    name: "Aero-Stride Crimson Runners",
    category: "Footwear",
    price: 195,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 98,
    badge: "NEW DROP",
    description: "Carbon-fiber plated racing sneakers with high-rebound crimson nitrogen foam cushioning for maximum velocity.",
    specs: ["Carbon Propulsion Plate", "Breathable Engineered Mesh", "Dual-density Nitrogen Sole", "Ultra-light 210g"],
    inStock: true,
    accentColor: "#dc2626",
    iconType: "shoes",
  },
  {
    id: "prod-3",
    name: "Vortex Pro ANC Headphones",
    category: "Hardware",
    price: 340,
    originalPrice: 399,
    rating: 5.0,
    reviewsCount: 215,
    badge: "LIMITED",
    description: "Flagship hybrid active noise cancelling headset clad in anodized matte black titanium with blood-red acoustic mesh.",
    specs: ["45mm Titanium Drivers", "40hr Battery with USB-C", "Custom Crimson LED ring", "Low-latency Bluetooth 5.4"],
    inStock: true,
    accentColor: "#b91c1c",
    iconType: "headphones",
  },
  {
    id: "prod-4",
    name: "Spectre Fidlock Sling Pack",
    category: "Accessories",
    price: 115,
    rating: 4.7,
    reviewsCount: 76,
    badge: "HOT",
    description: "Ultra-durable Cordura ballistic messenger sling featuring magnetic Fidlock V-buckles and concealed tech organizer.",
    specs: ["Cordura 1000D Ballistic Nylon", "Fidlock German Hardware", "Padded 11-inch Tablet Sleeve", "Quick-cinch Strap"],
    inStock: true,
    accentColor: "#ef4444",
    iconType: "bag",
  },
  {
    id: "prod-5",
    name: "Phantom-X Forged Chrono",
    category: "Hardware",
    price: 420,
    originalPrice: 480,
    rating: 4.9,
    reviewsCount: 164,
    badge: "LIMITED",
    description: "Forged carbon fiber case with sapphire crystal glass, open skeleton movement, and vivid crimson sweeping second hand.",
    specs: ["Forged Carbon 42mm Case", "Sapphire Double-AR Crystal", "100m Water Resistance", "Fluoroelastomer Red Strap"],
    inStock: true,
    accentColor: "#dc2626",
    iconType: "watch",
  },
  {
    id: "prod-6",
    name: "Onyx Modular Heavy Hoodie",
    category: "Cyberwear",
    price: 145,
    rating: 4.8,
    reviewsCount: 110,
    badge: "BESTSELLER",
    description: "Heavyweight 480 GSM French terry cotton hoodie featuring laser-cut ventilation ports and ruby metallic drawcords.",
    specs: ["480 GSM Luxury Cotton", "Reinforced Bar-tack Stitching", "Concealed Passcode Pocket", "Tailored Oversized Fit"],
    inStock: true,
    accentColor: "#ef4444",
    iconType: "hoodie",
  },
  {
    id: "prod-7",
    name: "Apex 65 Custom Mechanical Board",
    category: "Hardware",
    price: 230,
    originalPrice: 260,
    rating: 4.9,
    reviewsCount: 88,
    badge: "HOT",
    description: "CNC aluminum case anodized in deep obsidian with lubed crimson linear switches and double-shot PBT keycaps.",
    specs: ["Hot-swappable PCB", "Crimson Linear 45g Switches", "South-facing RGB Backlight", "Gasket-mounted Dampening"],
    inStock: true,
    accentColor: "#dc2626",
    iconType: "keyboard",
  },
  {
    id: "prod-8",
    name: "DarkOptix HUD Polarized Shades",
    category: "Accessories",
    price: 165,
    rating: 4.6,
    reviewsCount: 53,
    description: "Zero-glare aerodynamic sunglasses with hydrophobic crimson gradient polarized lenses and ultralight TR90 frame.",
    specs: ["UV400 Category 3 Protection", "Crimson Mirrored Polarized", "Impact Resistant Polycarbonate", "Anti-slip Silicone Grips"],
    inStock: false,
    accentColor: "#ef4444",
    iconType: "glasses",
  },
];

// ==========================================
// INLINE VECTOR GRAPHICS (Zero External Dependencies)
// ==========================================
function ProductGraphic({ type }: { type: Product["iconType"] }) {
  switch (type) {
    case "jacket":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M30 18 L42 28 L50 24 L58 28 L70 18 L88 36 L76 46 L74 86 L26 86 L24 46 L12 36 Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#121212" />
          <path d="M50 24 L50 86" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M36 40 L46 44 M64 40 L54 44" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="34" r="2" fill="#ef4444" />
        </svg>
      );
    case "shoes":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M12 66 C18 64 26 62 38 60 C52 58 60 48 68 34 C72 32 80 34 84 38 L86 52 C88 64 78 72 68 74 L14 74 C10 74 8 70 12 66 Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#121212" />
          <path d="M10 74 L88 74 C90 74 92 78 90 82 L84 84 L14 84 C10 84 8 80 10 74 Z" stroke="#ef4444" strokeWidth="2.5" fill="#260909" />
          <path d="M42 54 L54 42 M48 58 L60 46" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "headphones":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M22 55 C22 35 34 20 50 20 C66 20 78 35 78 55" strokeWidth="3" strokeLinecap="round" />
          <rect x="16" y="52" width="14" height="26" rx="7" strokeWidth="2" fill="#181818" stroke="#ef4444" />
          <rect x="70" y="52" width="14" height="26" rx="7" strokeWidth="2" fill="#181818" stroke="#ef4444" />
          <path d="M42 20 L58 20" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M24 38 L76 38 L70 82 L30 82 Z" strokeWidth="2.5" strokeLinejoin="round" fill="#141414" />
          <path d="M34 38 L34 26 C34 20 40 16 50 16 C60 16 66 20 66 26 L66 38" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="52" x2="76" y2="52" stroke="#ef4444" strokeWidth="2.5" />
          <circle cx="50" cy="52" r="3" fill="#ef4444" />
        </svg>
      );
    case "watch":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M40 14 L60 14 L58 28 L42 28 Z M42 72 L58 72 L60 86 L40 86 Z" fill="#ef4444" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="24" strokeWidth="2.5" fill="#121212" />
          <circle cx="50" cy="50" r="18" stroke="#333" strokeWidth="1" />
          <path d="M50 50 L50 36 M50 50 L60 50" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="2.5" fill="#ef4444" />
        </svg>
      );
    case "hoodie":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M34 20 C42 16 58 16 66 20 L86 36 L74 46 L72 84 L28 84 L26 46 L14 36 Z" strokeWidth="2.5" strokeLinejoin="round" fill="#141414" />
          <path d="M38 20 C44 26 56 26 62 20" stroke="#ef4444" strokeWidth="2.5" />
          <path d="M46 24 L46 44 M54 24 L54 40" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <rect x="36" y="58" width="28" height="16" rx="4" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );
    case "keyboard":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <rect x="16" y="30" width="68" height="42" rx="6" strokeWidth="2.5" fill="#141414" />
          <rect x="22" y="36" width="10" height="8" rx="2" fill="#ef4444" />
          <rect x="36" y="36" width="10" height="8" rx="2" fill="#262626" />
          <rect x="50" y="36" width="10" height="8" rx="2" fill="#262626" />
          <rect x="64" y="36" width="14" height="8" rx="2" fill="#262626" />
          <rect x="30" y="58" width="40" height="8" rx="2" fill="#ef4444" />
        </svg>
      );
    case "glasses":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-red-500 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
          <path d="M16 46 L26 40 L44 40 L48 56 L24 56 Z" strokeWidth="2.5" strokeLinejoin="round" fill="#ef4444" fillOpacity="0.2" />
          <path d="M84 46 L74 40 L56 40 L52 56 L76 56 Z" strokeWidth="2.5" strokeLinejoin="round" fill="#ef4444" fillOpacity="0.2" />
          <path d="M44 44 C48 42 52 42 56 44" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="46" x2="8" y2="40" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <line x1="84" y1="46" x2="92" y2="40" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

// Icons
function ShoppingBagIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function HeartIcon({ className = "w-5 h-5", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4", filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} fill={filled ? "#ef4444" : "none"} stroke="#ef4444" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function CloseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function TrashIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function TruckIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h4l3 3v5h-2m-8 0a2 2 0 104 0m-8 0a2 2 0 11-4 0m12 0a2 2 0 104 0m-4 0a2 2 0 11-4 0" />
    </svg>
  );
}

function ZapIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function PresentationShopPage() {
  // State Management
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1, selectedSize: "L", selectedColor: "Stealth Black" },
    { product: PRODUCTS[2], quantity: 1, selectedColor: "Crimson Red" },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>(["prod-1", "prod-5"]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Toast dispatch
  const showToast = (message: string, type: "success" | "info" | "alert" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Categories
  const categories = ["All", "Cyberwear", "Footwear", "Hardware", "Accessories"];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Cart Helpers
  const addToCart = (product: Product, size = "M", color = "Black") => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    showToast(`Added "${product.name}" to cart`, "success");
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast("Item removed from cart", "info");
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prev.filter((itemId) => itemId !== id);
      } else {
        showToast("Saved to Wishlist", "success");
        return [...prev, id];
      }
    });
  };

  // Pricing
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "RED20" || couponCode.toUpperCase() === "DEMO") {
      setDiscountPercent(20);
      showToast("Coupon Applied: 20% OFF", "success");
    } else {
      showToast("Invalid promo code. Try 'RED20'", "alert");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutSuccess(true);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* ======================================================== */}
      {/* 1. PRESENTATION BAR / DEMO CONTROL HEADER */}
      {/* ======================================================== */}
      <aside aria-label="Presentation controls" className="bg-neutral-950 border-b border-red-950/40 px-4 py-2 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-white font-semibold tracking-wider">SENIOR DEV SHOWCASE</span>
            <span className="text-neutral-600">|</span>
            <span className="text-red-400 hidden sm:inline">Theme: Obsidian Black &amp; Crimson Red</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="#catalog" className="hover:text-red-400 transition-colors">Catalog ({PRODUCTS.length})</a>
            <a href="#features" className="hover:text-red-400 transition-colors">Specs &amp; Pillars</a>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-300">Promo Code: <strong className="text-red-400 font-bold bg-neutral-900 px-1.5 py-0.5 rounded border border-red-900/40">RED20</strong></span>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. NAVBAR */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <span className="text-white font-black text-xl tracking-tighter">K</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white">
                KROMA<span className="text-red-500">.</span>RED
              </span>
              <span className="block text-[10px] tracking-widest text-neutral-500 uppercase -mt-1 font-mono">
                Advanced Cyber Gear
              </span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search jackets, runners, hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
              />
              <span className="absolute left-3.5 top-2.5 text-neutral-500">
                <SearchIcon className="w-4 h-4" />
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-neutral-500 hover:text-white"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions: Wishlist & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast(`Wishlist contains ${wishlist.length} item(s)`, "info")}
              className="relative p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-red-400 hover:border-red-500/40 transition"
              title="Wishlist"
            >
              <HeartIcon className="w-5 h-5" filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_28px_rgba(239,68,68,0.5)] active:scale-95"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-black/40 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
            />
            <span className="absolute left-3 top-2.5 text-neutral-500">
              <SearchIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. HERO SHOWCASE SECTION */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 py-16 sm:py-24">
        {/* Glowing Background Radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/50 text-red-400 text-xs font-mono tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                AUTUMN / WINTER 2026 // LIMITED RELEASE
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                DARK MINIMALISM. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-600">
                  PRECISION APPAREL.
                </span>
              </h1>

              <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Engineered for urban operators and tech creators. High-performance silhouettes built with stealth black composites and striking crimson architecture.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#catalog"
                  className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-sm tracking-wide transition-all shadow-[0_0_24px_rgba(239,68,68,0.35)] hover:scale-105 active:scale-95"
                >
                  Explore Collection
                </a>
                <button
                  onClick={() => {
                    const featured = PRODUCTS[0];
                    setQuickViewProduct(featured);
                  }}
                  className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-red-500/40 text-neutral-200 rounded-xl font-medium text-sm transition"
                >
                  Featured Highlight: Cyber-Shell V2
                </button>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-bold text-white font-mono">100%</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Weatherproof</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500 font-mono">4.9/5</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Client Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono">&lt; 24h</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Priority Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Hero Graphic */}
            <div className="lg:col-span-5">
              <div className="relative group mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-red-600/50 rounded-2xl p-6 transition-all duration-300 shadow-2xl">
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[11px] font-black uppercase px-2.5 py-1 rounded tracking-wider">
                  HERO PIECE
                </div>

                <div className="h-64 sm:h-72 w-full flex items-center justify-center bg-black/60 rounded-xl border border-neutral-800/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-red-600/10 to-transparent"></div>
                  <ProductGraphic type="jacket" />
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">KROMA Cyber-Shell V2</h3>
                      <p className="text-xs text-neutral-400">Triple-layer ballistic fabric • Crimson seams</p>
                    </div>
                    <span className="text-xl font-mono font-bold text-red-500">$289</span>
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      onClick={() => addToCart(PRODUCTS[0], "L", "Matte Black")}
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium text-xs transition"
                    >
                      Instant Buy
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(PRODUCTS[0])}
                      className="px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs transition"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. KEY VALUE PILLARS */}
      {/* ======================================================== */}
      <section id="features" className="py-10 bg-neutral-950/60 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="p-2.5 rounded-lg bg-red-950/50 text-red-500 border border-red-900/40">
                <TruckIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Zero Latency Delivery</h4>
                <p className="text-xs text-neutral-400 mt-1">Complimentary worldwide insured courier on orders over $200.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="p-2.5 rounded-lg bg-red-950/50 text-red-500 border border-red-900/40">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Military Grade Durability</h4>
                <p className="text-xs text-neutral-400 mt-1">Reinforced Cordura &amp; carbon composites backed by lifetime warranty.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="p-2.5 rounded-lg bg-red-950/50 text-red-500 border border-red-900/40">
                <ZapIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Instant 30-Day Returns</h4>
                <p className="text-xs text-neutral-400 mt-1">Seamless exchanges with contactless pre-printed return labels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. PRODUCT CATALOG */}
      {/* ======================================================== */}
      <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-1">
              // CURRENT DROPS
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Tactical &amp; Cyber Collection
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Showing {filteredProducts.length} items designed with zero compromises.
            </p>
          </div>

          {/* Category Tabs & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-red-600 transition"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-950 rounded-2xl border border-neutral-800 mt-8">
            <div className="text-neutral-600 text-5xl mb-3">⊘</div>
            <h3 className="text-lg font-bold text-white">No products match your criteria</h3>
            <p className="text-sm text-neutral-500 mt-1">Try resetting your search query or selecting &quot;All&quot; categories.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-500 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-red-600/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_0_24px_rgba(239,68,68,0.15)]"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase rounded bg-red-600 text-white shadow-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-neutral-700/60 text-neutral-400 hover:text-red-500 transition active:scale-90"
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <HeartIcon className="w-4 h-4" filled={isWishlisted} />
                  </button>

                  {/* Graphic Illustration */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="h-56 bg-neutral-900/60 flex items-center justify-center cursor-pointer relative overflow-hidden group-hover:bg-neutral-900 transition-colors"
                  >
                    <ProductGraphic type={product.iconType} />
                    <span className="absolute bottom-2 text-[11px] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-2 py-0.5 rounded border border-neutral-700 font-mono">
                      Click for Quick View
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                        <span className="font-mono uppercase text-[10px] text-red-400">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-3.5 h-3.5" />
                          <span className="text-neutral-300 font-medium">{product.rating}</span>
                          <span className="text-neutral-600">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="font-bold text-white text-base hover:text-red-400 cursor-pointer transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-neutral-900 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold font-mono text-white">
                          ${product.price}
                        </div>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through font-mono">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                          product.inStock
                            ? "bg-neutral-900 border border-neutral-700 hover:border-red-500 hover:bg-red-600 text-white"
                            : "bg-neutral-900/50 border border-neutral-800 text-neutral-600 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingBagIcon className="w-3.5 h-3.5" />
                        {product.inStock ? "Add" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 6. SLIDE-OVER CART DRAWER */}
      {/* ======================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
              {/* Drawer Header */}
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
                  <h3 className="text-lg font-bold tracking-tight text-white uppercase">Your Bag</h3>
                  <span className="text-xs font-mono text-neutral-400">({totalCartCount} items)</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
                      <ShoppingBagIcon className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-white">Your bag is currently empty</h4>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                      Explore our high-performance apparel and hardware drops to get started.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-3 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80"
                    >
                      <div className="w-20 h-20 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-center p-2 flex-shrink-0">
                        <ProductGraphic type={item.product.iconType} />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                            <div className="text-[11px] text-neutral-400 space-x-2 mt-0.5">
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 transition"
                            title="Remove item"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-950">
                            <button
                              onClick={() => updateCartQty(item.product.id, -1)}
                              className="px-2 py-0.5 text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs font-mono"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.product.id, 1)}
                              className="px-2 py-0.5 text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs font-mono"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-mono font-bold text-red-500">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Calculation */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
                  {/* Coupon Form */}
                  <form onSubmit={applyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo (try RED20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-red-400">
                        <span>Discount ({discountPercent}%)</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-mono text-white">
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                      <span>Total Amount</span>
                      <span className="font-mono text-red-500">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95"
                  >
                    Proceed to Encrypted Checkout
                  </button>
                  <p className="text-[10px] text-center text-neutral-500 font-mono">
                    256-Bit Encrypted • Fast Express Dispatch
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. QUICK-VIEW PRODUCT MODAL */}
      {/* ======================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          />

          <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white rounded-lg bg-black/60 hover:bg-neutral-800 transition"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Graphic Panel */}
              <div className="h-64 md:h-full bg-neutral-900/80 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800">
                <div className="w-48 h-48">
                  <ProductGraphic type={quickViewProduct.iconType} />
                </div>
              </div>

              {/* Information Panel */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-red-950 text-red-400 border border-red-800/40 rounded">
                      {quickViewProduct.category}
                    </span>
                    <div className="flex items-center text-xs text-neutral-400">
                      <StarIcon className="w-3.5 h-3.5" />
                      <span className="ml-1 text-white font-medium">{quickViewProduct.rating}</span>
                      <span className="ml-1 text-neutral-600">({quickViewProduct.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white">{quickViewProduct.name}</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Specs List */}
                  <div className="mt-4 pt-3 border-t border-neutral-900 space-y-1.5">
                    <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      Technical Specifications:
                    </div>
                    {quickViewProduct.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-black font-mono text-red-500">
                      ${quickViewProduct.price}
                    </div>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through font-mono">
                        ${quickViewProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    >
                      Add to Bag
                    </button>
                    <button
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-red-400 rounded-xl transition"
                    >
                      <HeartIcon className="w-5 h-5" filled={wishlist.includes(quickViewProduct.id)} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. CHECKOUT SUCCESS MODAL */}
      {/* ======================================================== */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-neutral-950 border border-red-600/40 rounded-2xl p-8 text-center space-y-5 z-10 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-600 text-red-400 flex items-center justify-center mx-auto">
              <ShieldCheckIcon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-red-500 uppercase tracking-widest">// ORDER CONFIRMED</span>
              <h3 className="text-2xl font-black text-white">Payment Authorized</h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto pt-2">
                Order <strong className="text-white font-mono">#KR-88291</strong> has been queued for zero-latency fulfillment. Dispatch notification sent via SMS.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Status:</span>
                <span className="text-red-400 font-bold">READY FOR DISPATCH</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Carrier:</span>
                <span className="text-white">Red-Line Priority Air</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutSuccess(false)}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              Return to Catalog
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. INTERACTIVE FLOATING TOASTS */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-medium transition-all transform duration-300 animate-in slide-in-from-bottom-2 ${
              toast.type === "alert"
                ? "bg-red-950 text-red-200 border-red-700"
                : toast.type === "info"
                ? "bg-neutral-900 text-neutral-200 border-neutral-700"
                : "bg-neutral-900 text-white border-red-600/50 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 10. MODERN FOOTER */}
      {/* ======================================================== */}
      <footer className="mt-20 border-t border-neutral-800 bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white font-black text-xs">
                  K
                </div>
                <span className="font-bold tracking-wider text-white">KROMA.RED</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Modern stealth apparel and tactical everyday carry hardware. Built with relentless attention to detail.
              </p>
            </div>

            {/* Links 1 */}
            <div>
              <h5 className="text-xs font-mono uppercase text-red-500 tracking-wider mb-3">Navigation</h5>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#catalog" className="hover:text-white transition">New Releases</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Cyberwear Outershells</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Footwear &amp; Runners</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Hardware &amp; Gadgets</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h5 className="text-xs font-mono uppercase text-red-500 tracking-wider mb-3">Client Services</h5>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><span className="hover:text-white transition cursor-pointer" onClick={() => showToast("Encrypted Courier active", "info")}>Global Tracking</span></li>
                <li><span className="hover:text-white transition cursor-pointer" onClick={() => showToast("30-Day Return Portal ready", "info")}>Warranty &amp; Repairs</span></li>
                <li><span className="hover:text-white transition cursor-pointer" onClick={() => showToast("VIP Concierge online 24/7", "info")}>Concierge Support</span></li>
                <li><span className="hover:text-white transition cursor-pointer" onClick={() => showToast("Sizing Chart: True to Size", "info")}>Fitment Guide</span></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase text-red-500 tracking-wider">Priority Access</h5>
              <p className="text-xs text-neutral-400">Receive private drop codes prior to public release.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="operator@network.com"
                  className="w-full bg-neutral-900 border border-neutral-800 text-xs px-3 py-2 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
                />
                <button
                  onClick={() => showToast("Subscribed to Drop Alerts", "success")}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500">
            <p>&copy; 2026 KROMA INDUSTRIES. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-3 sm:mt-0 font-mono">
              <span className="text-red-500">SYSTEM STATUS: OPTIMAL</span>
              <span>•</span>
              <span>PRESENTATION READY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
