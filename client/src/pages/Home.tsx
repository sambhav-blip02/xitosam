import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  ArrowDownUp,
  ArrowRight,
  Globe,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Heart,
  LocateFixed,
  ListFilter,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Truck,
  UserRound,
  X,
  Zap,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compare: number;
  rating: number;
  reviews: number;
  seller: string;
  city: string;
  delivery: string;
  image: string;
  badge?: string;
  tone: string;
  brand?: string;
};

const productCatalog: Product[] = [
  {
    id: "pixel-8a",
    name: "Google Pixel 8a 5G — 128GB",
    category: "Mobiles",
    price: 56999,
    compare: 62999,
    rating: 4.8,
    reviews: 86,
    seller: "Himalayan Gadgets",
    city: "Kathmandu",
    delivery: "Free delivery in 2 days",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85",
    badge: "Top rated",
    tone: "#eaf3ef",
  },
  {
    id: "air-fryer",
    name: "Nova Digital Air Fryer 4.5L",
    category: "Home & Living",
    price: 6499,
    compare: 8999,
    rating: 4.6,
    reviews: 142,
    seller: "Ghar Sansar",
    city: "Lalitpur",
    delivery: "Delivery by tomorrow",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=85",
    badge: "Flash deal",
    tone: "#fff1df",
  },
  {
    id: "linen-shirt",
    name: "Relaxed linen shirt — Sand",
    category: "Fashion",
    price: 1899,
    compare: 2499,
    rating: 4.7,
    reviews: 59,
    seller: "Thread & Loom",
    city: "Bhaktapur",
    delivery: "Free delivery over NPR 2,000",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85",
    badge: "Made in Nepal",
    tone: "#eee9e2",
  },
  {
    id: "running-shoes",
    name: "CloudRun everyday trainers",
    category: "Fashion",
    price: 3199,
    compare: 4499,
    rating: 4.5,
    reviews: 117,
    seller: "Peak Performance",
    city: "Pokhara",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    badge: "Best seller",
    tone: "#f0eee6",
  },
  {
    id: "macbook-air",
    name: "MacBook Air M2 — 13-inch",
    category: "Electronics",
    price: 124999,
    compare: 139999,
    rating: 4.9,
    reviews: 34,
    seller: "Byte Nepal",
    city: "Kathmandu",
    delivery: "Insured delivery · 2 days",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    badge: "Verified seller",
    tone: "#e9eef1",
  },
  {
    id: "serum-set",
    name: "Daily glow skincare set",
    category: "Beauty",
    price: 2299,
    compare: 3199,
    rating: 4.6,
    reviews: 212,
    seller: "Koshi Beauty Co.",
    city: "Biratnagar",
    delivery: "Delivery by Friday",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=85",
    badge: "New arrival",
    tone: "#faece5",
  },
  {
    id: "grocery-basket",
    name: "Weekly pantry starter basket",
    category: "Grocery",
    price: 1890,
    compare: 2140,
    rating: 4.8,
    reviews: 73,
    seller: "Everyday Mart",
    city: "Kathmandu",
    delivery: "Same-day in Kathmandu valley",
    image: "https://images.unsplash.com/photo-1601598851547-4302969d4b84?auto=format&fit=crop&w=1000&q=85",
    badge: "Everyday value",
    tone: "#edf4e5",
  },
  {
    id: "school-backpack",
    name: "Trailmark school backpack 24L",
    category: "Kids",
    price: 1599,
    compare: 1999,
    rating: 4.5,
    reviews: 44,
    seller: "Little Mountain",
    city: "Dharan",
    delivery: "Delivery in 3–5 days",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    badge: "School edit",
    tone: "#e9f0f3",
  },
];

const categories = [
  { label: "Mobiles", icon: "▣", color: "#deeee7" },
  { label: "Electronics", icon: "⌁", color: "#e7edf2" },
  { label: "Fashion", icon: "✦", color: "#f7e8dc" },
  { label: "Beauty", icon: "◒", color: "#f4e4eb" },
  { label: "Home & Living", icon: "⌂", color: "#f4edda" },
  { label: "Grocery", icon: "✿", color: "#e3efd9" },
  { label: "Kids", icon: "✎", color: "#e9e5f5" },
  { label: "Sports", icon: "↗", color: "#e0eef1" },
];

const formatNpr = (value: number) => `NPR ${value.toLocaleString("en-IN")}`;
const phonePattern = /^9[678]\d{8}$/;
const copy = {
  en: {
    promo: "New here? Get NPR 150 off your first order with code",
    deliverTo: "Deliver to",
    search: "Search for products, brands and more",
    hello: "Hello",
    account: "Account",
    track: "Track order",
    bag: "Bag",
    heroKicker: "The Nepal edit",
    heroTitle: "Everything you need, delivered your way.",
    heroBody: "Discover good things from trusted sellers across Nepal — from your morning groceries to the tech you’ve been waiting for.",
    explore: "Start exploring",
    location: "Set delivery location",
    categoryKicker: "Browse the good stuff",
    categories: "Shop by category",
    shopKicker: "Curated for your day",
    popular: "Popular near you",
    filters: "Filters",
    sort: "Sort by",
    price: "Price range",
    brand: "Brand",
    allBrands: "All brands",
    profile: "My profile",
    addresses: "Saved addresses",
    wishlist: "Wishlist",
    addAddress: "Add address",
    saveAddress: "Save address",
    emptyWishlist: "Your saved products will appear here.",
  },
  ne: {
    promo: "नयाँ हुनुहुन्छ? कोड प्रयोग गरेर पहिलो अर्डरमा NPR १५० छुट",
    deliverTo: "डेलिभरी स्थान",
    search: "उत्पादन, ब्रान्ड र अन्य खोज्नुहोस्",
    hello: "नमस्ते",
    account: "खाता",
    track: "अर्डर ट्र्याक",
    bag: "झोला",
    heroKicker: "नेपाल संस्करण",
    heroTitle: "तपाईंलाई चाहिने सबै कुरा, तपाईंको ढोकासम्म।",
    heroBody: "नेपालभरका विश्वसनीय विक्रेताबाट दैनिक सामानदेखि नयाँ प्रविधिसम्म राम्रो चीजहरू खोज्नुहोस्।",
    explore: "खोजी सुरु गर्नुहोस्",
    location: "डेलिभरी स्थान छान्नुहोस्",
    categoryKicker: "राम्रो सामान खोज्नुहोस्",
    categories: "श्रेणीअनुसार किनमेल",
    shopKicker: "तपाईंको दिनका लागि",
    popular: "तपाईं नजिकका लोकप्रिय सामान",
    filters: "फिल्टर",
    sort: "क्रमबद्ध",
    price: "मूल्य दायरा",
    brand: "ब्रान्ड",
    allBrands: "सबै ब्रान्ड",
    profile: "मेरो प्रोफाइल",
    addresses: "सुरक्षित ठेगाना",
    wishlist: "मनपर्ने",
    addAddress: "ठेगाना थप्नुहोस्",
    saveAddress: "ठेगाना सुरक्षित गर्नुहोस्",
    emptyWishlist: "तपाईंले सुरक्षित गरेका उत्पादनहरू यहाँ देखिनेछन्।",
  },
} as const;

export default function Home() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Kathmandu, Bagmati");
  const [cartOpen, setCartOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(Boolean(user));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ne">("en");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<"addresses" | "wishlist">("addresses");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [selectedBrand, setSelectedBrand] = useState("All brands");
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([
    { id: "home", label: "Home", recipient: "Riya Shrestha", phone: "9841234567", address: "Bakhundole, Lalitpur", city: "Lalitpur", province: "Bagmati", isDefault: true },
    { id: "office", label: "Work", recipient: "Riya Shrestha", phone: "9841234567", address: "New Baneshwor, Kathmandu", city: "Kathmandu", province: "Bagmati", isDefault: false },
  ]);
  const [addressDraft, setAddressDraft] = useState({ label: "Home", address: "", city: "Kathmandu", province: "Bagmati" });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const t = copy[language];

  const apiProducts = trpc.marketplace.products.useQuery({}, { retry: false, staleTime: 120000 });
  const locationsQuery = trpc.marketplace.locations.useQuery(undefined, { retry: false, staleTime: 600000 });
  const products = useMemo(() => {
    const remote = apiProducts.data?.filter(item => item.product && item.seller).map(item => ({
      id: String(item.product.id),
      name: item.product.name,
      category: item.product.category,
      price: item.product.priceNpr,
      compare: item.product.compareAtNpr ?? item.product.priceNpr,
      rating: item.product.rating / 10,
      reviews: item.product.reviewCount,
      seller: item.seller?.name ?? "xitosam seller",
      city: item.seller?.city ?? "Nepal",
      delivery: item.product.deliveryLabel,
      image: item.product.imageUrl,
      tone: "#edf2ed",
    } as Product));
    return remote?.length ? remote : productCatalog;
  }, [apiProducts.data]);
  const brands = useMemo(() => ["All brands", ...Array.from(new Set(products.map(product => product.brand ?? product.seller.split(" ")[0])))], [products]);
  const filteredProducts = useMemo(() => {
    const categoryProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);
    const filtered = categoryProducts.filter(product => {
      const brand = product.brand ?? product.seller.split(" ")[0];
      return product.price >= minPrice && product.price <= maxPrice && (selectedBrand === "All brands" || brand === selectedBrand);
    });
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, minPrice, maxPrice, selectedBrand, sortBy]);
  const cartItems = products.filter(product => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);

  const addToCart = (product: Product) => {
    setCart(current => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    toast.success(`${product.name.split(" — ")[0]} added to your bag`, { description: "Ready when you are." });
  };
  const toggleFavorite = (product: Product) => {
    setFavorites(current => current.includes(product.id) ? current.filter(id => id !== product.id) : [...current, product.id]);
  };
  const continueLogin = () => {
    if (!phonePattern.test(phone)) {
      toast.error("Please enter a valid Nepali mobile number", { description: "Example: 9841234567" });
      return;
    }
    setLoginStep("otp");
    toast.success("OTP sent", { description: `A 6-digit code was sent to +977 ${phone}` });
  };
  const saveDraftAddress = () => {
    if (!addressDraft.address.trim()) {
      toast.error(language === "ne" ? "ठेगाना लेख्नुहोस्" : "Enter an address first");
      return;
    }
    setSavedAddresses(current => [...current, { ...addressDraft, id: `${Date.now()}`, recipient: "Riya Shrestha", phone: phone || "9841234567", isDefault: false }]);
    setAddressDraft({ label: "Home", address: "", city: "Kathmandu", province: "Bagmati" });
    setShowAddressForm(false);
    toast.success(language === "ne" ? "ठेगाना सुरक्षित भयो" : "Address saved");
  };
  const verifyLogin = () => {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP to continue");
      return;
    }
    setLoggedIn(true);
    setLoginOpen(false);
    setLoginStep("phone");
    toast.success("You’re in — welcome to xitosam", { description: "Your account is ready for checkout and tracking." });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f1] text-[#173b2d]">
      <div className="hidden bg-[#f29a3d] px-4 py-2 text-center text-xs font-bold tracking-[0.04em] text-[#2d1c0b] sm:block">
        <span>{t.promo} </span><span className="rounded-full bg-[#173b2d] px-2 py-1 text-[#fff8eb]">NAMASTE150</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#e1e5de]/80 bg-[#f7f6f1]/95 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center gap-3 lg:gap-7">
          <button className="mr-1 flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to xitosam home">
            <div className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[#12372a] text-xl font-black text-[#f8a14a] shadow-[4px_4px_0_#f29a3d]">x</div>
            <div className="hidden text-left sm:block">
              <div className="font-display text-[23px] font-extrabold leading-none tracking-[-0.07em] text-[#12372a]">xitosam</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#708277]">made for Nepal</div>
            </div>
          </button>

          <button onClick={() => setLocationOpen(true)} className="hidden shrink-0 items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[#edf0e9] md:flex" aria-label="Choose delivery location">
            <MapPin className="h-[19px] w-[19px] text-[#f29a3d]" strokeWidth={2.5} />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#76837b]">{t.deliverTo}</div>
              <div className="flex items-center gap-1 text-[12px] font-bold text-[#173b2d]">{selectedLocation} <ChevronDown className="h-3 w-3" /></div>
            </div>
          </button>

          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#86958c]" />
            <input className="h-11 w-full rounded-2xl border border-[#dfe5dd] bg-white pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[#f29a3d] focus:ring-4 focus:ring-[#f29a3d]/10" placeholder={t.search} onKeyDown={event => event.key === "Enter" && toast.info("Search is ready to connect to your full catalog.")} />
          </div>

          <button onClick={() => setLanguage(current => current === "en" ? "ne" : "en")} className="hidden items-center gap-1 rounded-xl border border-[#dfe5dd] bg-white px-2.5 py-2 text-[10px] font-black uppercase tracking-[0.08em] hover:border-[#f29a3d] sm:flex" aria-label="Switch language"><Globe className="h-3.5 w-3.5 text-[#d67b2c]" /><span className={language === "en" ? "text-[#173b2d]" : "text-[#8b978e]"}>EN</span><span className="text-[#b5beb7]">/</span><span className={language === "ne" ? "text-[#173b2d]" : "text-[#8b978e]"}>ने</span></button>
          <div className="hidden items-center gap-1 lg:flex">
            <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-[#edf0e9]" onClick={() => { if (loggedIn) setProfileOpen(true); else { setLoginStep("phone"); setLoginOpen(true); } }}>
              <UserRound className="h-[19px] w-[19px]" />
              <div><div className="text-[10px] text-[#76837b]">{t.hello}, {loggedIn ? "Riya" : (language === "ne" ? "त्यहाँ" : "there")}</div><div className="flex items-center gap-1 text-xs font-bold">{t.account} <ChevronDown className="h-3 w-3" /></div></div>
            </button>
            <button onClick={() => setTrackOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-[#edf0e9]" aria-label="Track orders"><PackageCheck className="h-5 w-5" /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#f29a3d]" /></button>
            <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-[#edf0e9]" aria-label="Open cart"><ShoppingCart className="h-5 w-5" />{cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#f29a3d] px-1 text-[10px] font-black text-[#2d1c0b]">{cartCount}</span>}</button>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-xl hover:bg-[#edf0e9] lg:hidden" onClick={() => setMobileMenuOpen(current => !current)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
        </div>
        {mobileMenuOpen && <div className="container flex flex-wrap items-center gap-3 border-t border-[#e1e5de] py-3 lg:hidden"><button onClick={() => setLanguage(current => current === "en" ? "ne" : "en")} className="rounded-xl border border-[#dfe5dd] bg-white px-3 py-2 text-xs font-black">EN / ने</button><button onClick={() => setLocationOpen(true)} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold"><MapPin className="h-4 w-4 text-[#f29a3d]" />{selectedLocation}</button><button onClick={() => setLoginOpen(true)} className="rounded-xl bg-[#12372a] px-3 py-2 text-xs font-bold text-white">{loggedIn ? t.profile : (language === "ne" ? "साइन इन" : "Sign in")}</button><button onClick={() => setTrackOpen(true)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold">{t.track}</button><button onClick={() => setCartOpen(true)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold">{t.bag} ({cartCount})</button></div>}
      </header>

      <main>
        <section className="container pt-4 sm:pt-6">
          <div className="hero-grid relative isolate min-h-[420px] overflow-hidden rounded-[30px] p-6 text-[#fff8eb] sm:p-10 lg:min-h-[454px] lg:p-14">
            <div className="dotted-grid absolute inset-0 -z-10 opacity-35" />
            <div className="absolute -right-32 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#ffffff]/10 bg-[#ffffff]/[0.03]" />
            <div className="absolute -bottom-48 right-[29%] -z-10 h-[390px] w-[390px] rounded-full border border-[#ffffff]/10" />
            <div className="relative z-10 max-w-[570px]">
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#cde4d7]"><span className="rounded-full bg-[#f29a3d] px-3 py-1.5 text-[#2d1c0b]">{t.heroKicker}</span><span>·</span><span>New season, new finds</span></div>
              <h1 className="font-display max-w-[560px] text-[42px] font-extrabold leading-[1.04] tracking-[-0.06em] sm:text-[57px]">{language === "ne" ? <>तपाईंलाई चाहिने सबै कुरा,<br /><span className="text-[#f5ac60]">तपाईंको ढोकासम्म।</span></> : <>Everything you need,<br /><span className="text-[#f5ac60]">delivered your way.</span></>}</h1>
              <p className="mt-5 max-w-[445px] text-[15px] leading-7 text-[#d2e3d8] sm:text-base">{t.heroBody}</p>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center gap-3 rounded-xl bg-[#f29a3d] px-5 py-3.5 text-sm font-extrabold text-[#2d1c0b] shadow-[0_9px_0_#c96f20] hover:bg-[#ffad59]"><span>{t.explore}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button><button onClick={() => setLocationOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/15"><LocateFixed className="h-4 w-4 text-[#f5ac60]" />{t.location}</button></div>
              <div className="mt-10 flex items-center gap-4 text-xs text-[#c8ded1]"><div className="flex -space-x-2"><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#173e30] bg-[#e6bc94] text-[10px] font-bold text-[#573920]">RM</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#173e30] bg-[#b7d0c1] text-[10px] font-bold text-[#234a36]">AS</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#173e30] bg-[#e2a36d] text-[10px] font-bold text-[#573920]">PK</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#173e30] bg-[#f4c46d] text-[10px] font-bold text-[#573920]">+</span></div><span><strong className="text-white">3,500+</strong> local sellers already on xitosam</span></div>
            </div>
            <div className="absolute bottom-4 right-5 hidden h-[385px] w-[500px] lg:block">
              <div className="absolute left-0 top-12 h-[235px] w-[178px] rotate-[-8deg] overflow-hidden rounded-[23px] border-8 border-[#fff8eb]/80 bg-[#d9e9e0] shadow-2xl"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85" className="h-full w-full object-cover" alt="Laptop" /></div>
              <div className="absolute left-[125px] top-2 z-10 h-[280px] w-[188px] rotate-[7deg] overflow-hidden rounded-[23px] border-8 border-[#fff8eb]/80 bg-[#f6d6bc] shadow-2xl"><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=85" className="h-full w-full object-cover" alt="Phone" /></div>
              <div className="absolute right-0 top-16 h-[230px] w-[175px] rotate-[14deg] overflow-hidden rounded-[23px] border-8 border-[#fff8eb]/80 bg-[#f0e4c7] shadow-2xl"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85" className="h-full w-full object-cover" alt="Shoes" /></div>
              <div className="absolute bottom-0 left-[145px] z-20 flex items-center gap-2 rounded-2xl bg-[#fff8eb] px-4 py-3 text-[#173b2d] shadow-xl"><ShieldCheck className="h-5 w-5 text-[#f29a3d]" /><div><div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#76837b]">Every order</div><div className="text-xs font-extrabold">Buyer protected</div></div></div>
            </div>
          </div>
        </section>

        <section className="container py-8 sm:py-10">
          <div className="mb-4 flex items-end justify-between"><div><p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">{t.categoryKicker}</p><h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">{t.categories}</h2></div><button className="hidden items-center gap-1 text-xs font-extrabold text-[#c46d24] sm:flex" onClick={() => { setSelectedCategory("All"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>View all <ArrowRight className="h-3.5 w-3.5" /></button></div>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">{categories.map(category => <button key={category.label} onClick={() => { setSelectedCategory(category.label); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className={`group flex min-w-[102px] flex-col items-center gap-2 rounded-2xl border bg-white px-3 py-4 transition-all hover:-translate-y-1 hover:shadow-md sm:min-w-[130px] ${selectedCategory === category.label ? "border-[#f29a3d] shadow-[0_0_0_3px_rgba(242,154,61,.15)]" : "border-[#e7e9e2]"}`}><span className="grid h-12 w-12 place-items-center rounded-2xl text-[27px] font-bold" style={{ backgroundColor: category.color }}>{category.icon}</span><span className="whitespace-nowrap text-xs font-bold">{category.label}</span></button>)}</div>
        </section>

        <section className="container pb-10">
          <div className="grid gap-4 md:grid-cols-[1.65fr_1fr_1fr]">
            <div className="relative min-h-[208px] overflow-hidden rounded-[24px] bg-[#e0ece4] p-6 sm:p-8"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.7),transparent_28%),linear-gradient(135deg,transparent_36%,rgba(255,255,255,.6))]" /><div className="relative z-10 max-w-[280px]"><span className="rounded-full bg-[#12372a] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#f8f2e6]">Fresh on xitosam</span><h3 className="font-display mt-4 text-2xl font-extrabold leading-tight tracking-[-0.05em]">The everyday upgrade edit.</h3><p className="mt-2 text-xs leading-5 text-[#5c7467]">Little things that make home feel easier, calmer and a bit more you.</p><button onClick={() => { setSelectedCategory("Home & Living"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#d27629]">Shop home <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="absolute -bottom-10 right-[-10px] h-[180px] w-[180px] rounded-full bg-[#c7ddce]" /><div className="absolute bottom-2 right-10 h-[138px] w-[92px] rotate-[16deg] overflow-hidden rounded-[50%] border-4 border-white/70 shadow-lg"><img src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=500&q=85" alt="Home product" className="h-full w-full object-cover" /></div></div>
            <div className="relative overflow-hidden rounded-[24px] bg-[#f4e4cf] p-6"><div className="relative z-10"><div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#af641f]"><Zap className="h-3 w-3" /> Flash deals</div><h3 className="font-display mt-4 max-w-[180px] text-xl font-extrabold leading-tight tracking-[-0.05em]">Up to 40% off today</h3><button onClick={() => { setSelectedCategory("All"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 inline-flex items-center gap-1 text-xs font-extrabold text-[#c06c24]">See deals <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-[#f7c87e]" /><div className="absolute bottom-1 right-4 h-24 w-20 rotate-[13deg] overflow-hidden rounded-xl border-4 border-white/70 shadow-lg"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=85" alt="Deal shoes" className="h-full w-full object-cover" /></div></div>
            <div className="relative overflow-hidden rounded-[24px] bg-[#dedfe9] p-6"><div className="relative z-10"><div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#5e637e]"><Sparkles className="h-3 w-3" /> Seller spotlight</div><h3 className="font-display mt-4 max-w-[180px] text-xl font-extrabold leading-tight tracking-[-0.05em]">Made by Nepal, for Nepal</h3><button onClick={() => toast.info("Seller stories are coming soon.")} className="mt-6 inline-flex items-center gap-1 text-xs font-extrabold text-[#60678c]">Meet the sellers <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-[#c4c8dc]" /><div className="absolute bottom-1 right-4 h-24 w-20 rotate-[-10deg] overflow-hidden rounded-xl border-4 border-white/70 shadow-lg"><img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=85" alt="Seller product" className="h-full w-full object-cover" /></div></div>
          </div>
        </section>

        <section id="shop" className="border-y border-[#e1e5de] bg-[#fbfaf7] py-10 sm:py-12">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">{t.shopKicker}</p><h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">{t.popular}</h2><p className="mt-2 text-sm text-[#718076]">Handpicked by our local team · delivery to {selectedLocation.split(",")[0]}</p></div><div className="flex items-center gap-2"><button className="grid h-9 w-9 place-items-center rounded-full border border-[#e1e5de] bg-white hover:border-[#f29a3d]"><ChevronLeft className="h-4 w-4" /></button><button className="grid h-9 w-9 place-items-center rounded-full border border-[#e1e5de] bg-white hover:border-[#f29a3d]"><ChevronRight className="h-4 w-4" /></button></div></div>
            <div className="hide-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2"><button onClick={() => setSelectedCategory("All")} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold ${selectedCategory === "All" ? "bg-[#12372a] text-white" : "border border-[#dfe5dd] bg-white text-[#5d6f64]"}`}>{language === "ne" ? "सबै" : "All finds"}</button>{categories.map(category => <button key={category.label} onClick={() => setSelectedCategory(category.label)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold ${selectedCategory === category.label ? "bg-[#12372a] text-white" : "border border-[#dfe5dd] bg-white text-[#5d6f64]"}`}>{category.label}</button>)}</div>
            <div className="mt-5 rounded-2xl border border-[#e5e8e1] bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-3"><button onClick={() => setFiltersOpen(current => !current)} className="inline-flex items-center gap-2 rounded-xl bg-[#f2f3ed] px-3 py-2 text-xs font-extrabold"><SlidersHorizontal className="h-4 w-4 text-[#d67b2c]" />{t.filters}<span className="rounded-full bg-[#f29a3d] px-1.5 py-0.5 text-[9px] text-[#2d1c0b]">{(minPrice > 0 ? 1 : 0) + (maxPrice < 150000 ? 1 : 0) + (selectedBrand !== "All brands" ? 1 : 0)}</span></button><div className="flex items-center gap-2 text-xs"><ArrowDownUp className="h-3.5 w-3.5 text-[#8b978e]" /><span className="font-bold text-[#718076]">{t.sort}</span><select value={sortBy} onChange={event => setSortBy(event.target.value)} className="rounded-xl border border-[#dfe5dd] bg-white px-3 py-2 text-xs font-extrabold outline-none"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>{filtersOpen && <div className="mt-4 grid gap-5 border-t border-[#edf0e9] pt-4 md:grid-cols-[1.2fr_1fr]"><div><div className="mb-2 flex items-center justify-between text-xs font-extrabold"><span>{t.price}</span><span className="text-[#d67b2c]">{formatNpr(minPrice)} — {formatNpr(maxPrice)}</span></div><div className="grid gap-2"><input type="range" min="0" max="150000" step="500" value={minPrice} onChange={event => setMinPrice(Math.min(Number(event.target.value), maxPrice - 500))} className="w-full accent-[#12372a]" /><input type="range" min="500" max="150000" step="500" value={maxPrice} onChange={event => setMaxPrice(Math.max(Number(event.target.value), minPrice + 500))} className="w-full accent-[#f29a3d]" /></div></div><div><div className="mb-2 text-xs font-extrabold">{t.brand}</div><div className="flex flex-wrap gap-2">{brands.map(brand => <button key={brand} onClick={() => setSelectedBrand(brand)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${selectedBrand === brand ? "bg-[#12372a] text-white" : "bg-[#f2f3ed] text-[#5d6f64]"}`}>{brand === "All brands" ? t.allBrands : brand}</button>)}</div></div></div>}</div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filteredProducts.map((product, index) => <article key={product.id} className="group relative overflow-hidden rounded-[20px] border border-[#e5e8e1] bg-white p-2.5 card-shadow transition-all hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${index * 45}ms` }}><div className="relative aspect-[.92] overflow-hidden rounded-[15px]" style={{ backgroundColor: product.tone }}><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-[#173b2d] backdrop-blur-sm">{product.badge ?? "xitosam pick"}</div><button onClick={() => toggleFavorite(product)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#718076] backdrop-blur-sm hover:text-[#c84b3d]" aria-label="Add to wishlist"><Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-[#c84b3d] text-[#c84b3d]" : ""}`} /></button><button onClick={() => addToCart(product)} className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-[#f29a3d] text-[#2d1c0b] opacity-0 shadow-md transition-opacity group-hover:opacity-100" aria-label="Add to cart"><ShoppingBag className="h-4 w-4" /></button></div><div className="px-1 pb-1 pt-3"><div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-[#718076]"><Star className="h-3 w-3 fill-[#f29a3d] text-[#f29a3d]" />{product.rating} <span className="font-medium text-[#9aa49d]">({product.reviews})</span></div><h3 className="line-clamp-2 min-h-[38px] text-[12px] font-extrabold leading-[1.35] text-[#173b2d] sm:text-[13px]">{product.name}</h3><div className="mt-2 flex items-baseline gap-2"><span className="text-sm font-black text-[#173b2d]">{formatNpr(product.price)}</span><span className="text-[10px] text-[#9ca79f] line-through">{formatNpr(product.compare)}</span></div><div className="mt-2 flex items-center gap-1 text-[10px] text-[#7b887f]"><Truck className="h-3 w-3 text-[#d67b2c]" /> <span className="truncate">{product.delivery}</span></div><div className="mt-2 hidden items-center gap-1 text-[10px] text-[#6f7d73] sm:flex"><BadgeCheck className="h-3 w-3 text-[#4c9b6d]" /> {product.seller} · {product.city}</div></div></article>)}</div>
            {!filteredProducts.length && <div className="rounded-2xl border border-dashed border-[#dfe5dd] bg-white p-12 text-center text-sm text-[#718076]">No products in this category yet. Try another edit.</div>}
          </div>
        </section>

        <section className="container py-10 sm:py-14"><div className="rounded-[28px] bg-[#f0eadc] p-6 sm:p-9"><div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center"><div><p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#bf6e28]">Why xitosam?</p><h2 className="font-display max-w-[500px] text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-4xl">A better way to shop across Nepal.</h2><p className="mt-4 max-w-[510px] text-sm leading-6 text-[#68776d]">Small sellers get a bigger storefront. You get more choice, fair prices, and delivery updates that actually make sense.</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#435a4c]">✓ Verified sellers</span><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#435a4c]">✓ Easy returns</span><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#435a4c]">✓ Cash on delivery</span></div></div><div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"><div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#dcecdf] text-[#347653]"><ShieldCheck className="h-5 w-5" /></div><div><div className="text-sm font-extrabold">Buyer protection</div><div className="mt-0.5 text-xs text-[#77847b]">Your order, our promise.</div></div></div><div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f9e2c6] text-[#bc6a27]"><Truck className="h-5 w-5" /></div><div><div className="text-sm font-extrabold">Doorstep delivery</div><div className="mt-0.5 text-xs text-[#77847b]">From Kathmandu to Karnali.</div></div></div><div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6e2f3] text-[#6b5a9d]"><CircleHelp className="h-5 w-5" /></div><div><div className="text-sm font-extrabold">Human support</div><div className="mt-0.5 text-xs text-[#77847b]">We’re here when you need us.</div></div></div></div></div></div></section>
      </main>

      <footer className="bg-[#12372a] px-4 py-10 text-[#cfe0d4] sm:py-14"><div className="container"><div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f29a3d] text-xl font-black text-[#2d1c0b]">x</div><div className="font-display text-2xl font-extrabold tracking-[-0.07em] text-white">xitosam</div></div><p className="mt-4 max-w-[260px] text-sm leading-6 text-[#a9c1b1]">Nepal’s everyday marketplace — thoughtful products from sellers you can trust.</p><div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#f5ac60]"><span className="h-2 w-2 rounded-full bg-[#f29a3d]" /> Made for every corner of Nepal</div></div><div><div className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-white">Shop</div><div className="space-y-3 text-sm text-[#a9c1b1]"><button onClick={() => setSelectedCategory("Mobiles")} className="block hover:text-white">Mobiles & electronics</button><button onClick={() => setSelectedCategory("Fashion")} className="block hover:text-white">Fashion & beauty</button><button onClick={() => setSelectedCategory("Grocery")} className="block hover:text-white">Grocery & home</button></div></div><div><div className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-white">Customer care</div><div className="space-y-3 text-sm text-[#a9c1b1]"><button onClick={() => setTrackOpen(true)} className="block hover:text-white">Track my order</button><button onClick={() => toast.info("Returns are available within 7 days on eligible items.")} className="block hover:text-white">Returns & refunds</button><button onClick={() => toast.info("Support chat is coming soon.")} className="block hover:text-white">Help center</button></div></div><div><div className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-white">For sellers</div><p className="text-sm leading-6 text-[#a9c1b1]">Turn your local store into a Nepal-wide storefront.</p><button onClick={() => toast.success("Seller onboarding interest noted.", { description: "We’ll reach out when the partner portal is ready." })} className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#f5ac60]">Become a seller <ArrowRight className="h-3 w-3" /></button></div></div><div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[11px] text-[#91ac9c]"><span>© 2026 xitosam · Built for Nepal</span><span>Privacy · Terms · Seller promise</span></div></div></footer>


      {profileOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#10271e]/50 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[28px] bg-[#fffdf7] p-5 shadow-2xl sm:p-8"><button onClick={() => setProfileOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f1f2ec] text-[#617067]" aria-label="Close profile"><X className="h-4 w-4" /></button><div className="flex flex-wrap items-start justify-between gap-4 pr-10"><div className="flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#12372a] text-2xl font-black text-[#f29a3d]">RS</div><div><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">{t.profile}</p><h2 className="font-display mt-1 text-3xl font-extrabold tracking-[-0.05em]">Riya Shrestha</h2><p className="mt-1 text-xs text-[#7b887f]">9841234567 · Kathmandu, Nepal</p></div></div><div className="rounded-2xl bg-[#e0ece4] px-3 py-2 text-[10px] font-extrabold text-[#387857]"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" /> Buyer protected</div></div><div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl bg-[#f2f3ed] p-1"><button onClick={() => setProfileTab("addresses")} className={`rounded-xl px-3 py-2.5 text-xs font-extrabold ${profileTab === "addresses" ? "bg-white text-[#173b2d] shadow-sm" : "text-[#718076]"}`}><MapPin className="mr-1 inline h-3.5 w-3.5" />{t.addresses}</button><button onClick={() => setProfileTab("wishlist")} className={`rounded-xl px-3 py-2.5 text-xs font-extrabold ${profileTab === "wishlist" ? "bg-white text-[#173b2d] shadow-sm" : "text-[#718076]"}`}><Heart className="mr-1 inline h-3.5 w-3.5" />{t.wishlist} <span className="ml-1 rounded-full bg-[#f29a3d] px-1.5 py-0.5 text-[9px] text-[#2d1c0b]">{favorites.length}</span></button></div>{profileTab === "addresses" ? <div className="mt-6"><div className="mb-3 flex items-center justify-between"><div><h3 className="font-display text-lg font-extrabold">{t.addresses}</h3><p className="mt-1 text-xs text-[#7b887f]">Manage where your xitosam parcels should arrive.</p></div><button onClick={() => setShowAddressForm(current => !current)} className="inline-flex items-center gap-1 rounded-xl bg-[#12372a] px-3 py-2 text-xs font-extrabold text-white"><Plus className="h-3.5 w-3.5" />{t.addAddress}</button></div>{showAddressForm && <div className="mb-4 grid gap-3 rounded-2xl border border-[#e5e8e1] bg-white p-4 sm:grid-cols-2"><input value={addressDraft.label} onChange={event => setAddressDraft(current => ({ ...current, label: event.target.value }))} placeholder="Label (Home / Work)" className="rounded-xl border border-[#dfe5dd] px-3 py-2.5 text-xs outline-none focus:border-[#f29a3d]" /><input value={addressDraft.city} onChange={event => setAddressDraft(current => ({ ...current, city: event.target.value }))} placeholder="City" className="rounded-xl border border-[#dfe5dd] px-3 py-2.5 text-xs outline-none focus:border-[#f29a3d]" /><input value={addressDraft.address} onChange={event => setAddressDraft(current => ({ ...current, address: event.target.value }))} placeholder="Street, area and landmark" className="rounded-xl border border-[#dfe5dd] px-3 py-2.5 text-xs outline-none focus:border-[#f29a3d] sm:col-span-2" /><button onClick={saveDraftAddress} className="rounded-xl bg-[#f29a3d] px-3 py-2.5 text-xs font-extrabold text-[#2d1c0b] sm:col-span-2">{t.saveAddress}</button></div>}<div className="grid gap-3 sm:grid-cols-2">{savedAddresses.map(address => <div key={address.id} className="rounded-2xl border border-[#e5e8e1] bg-white p-4"><div className="flex items-start justify-between"><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f8e3ca] text-[#c16f29]"><MapPin className="h-4 w-4" /></div><div><div className="text-sm font-extrabold">{address.label}</div><div className="text-[10px] text-[#7b887f]">{address.recipient}</div></div></div>{address.isDefault && <span className="rounded-full bg-[#deeee7] px-2 py-1 text-[9px] font-black text-[#3c7c59]">Default</span>}</div><p className="mt-4 text-xs leading-5 text-[#64736a]">{address.address}, {address.city}<br />{address.province} · {address.phone}</p><div className="mt-4 flex gap-3 text-[10px] font-extrabold text-[#bf6e28]"><button onClick={() => setSavedAddresses(current => current.map(item => ({ ...item, isDefault: item.id === address.id })))}>Make default</button><button onClick={() => setSavedAddresses(current => current.filter(item => item.id !== address.id))} className="text-[#b15c52]"><Trash2 className="mr-1 inline h-3 w-3" />Remove</button></div></div>)}</div></div> : <div className="mt-6"><div className="mb-3"><h3 className="font-display text-lg font-extrabold">{t.wishlist}</h3><p className="mt-1 text-xs text-[#7b887f]">Keep an eye on products you want to come back to.</p></div>{favorites.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{products.filter(product => favorites.includes(product.id)).map(product => <div key={product.id} className="overflow-hidden rounded-2xl border border-[#e5e8e1] bg-white p-2"><img src={product.image} alt={product.name} className="aspect-square w-full rounded-xl object-cover" /><div className="p-2"><div className="line-clamp-2 text-xs font-extrabold">{product.name}</div><div className="mt-2 text-xs font-black">{formatNpr(product.price)}</div><button onClick={() => addToCart(product)} className="mt-3 w-full rounded-lg bg-[#f2f3ed] py-2 text-[10px] font-extrabold">Add to bag</button></div></div>)}</div> : <div className="rounded-2xl border border-dashed border-[#dfe5dd] bg-white p-10 text-center"><Heart className="mx-auto h-7 w-7 text-[#d67b2c]" /><p className="mt-3 text-sm font-extrabold">{t.emptyWishlist}</p><button onClick={() => { setProfileOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 rounded-xl bg-[#f29a3d] px-4 py-2.5 text-xs font-extrabold text-[#2d1c0b]">{t.explore}</button></div>}</div>}</div></div>}

      {loginOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#10271e]/50 p-4 backdrop-blur-sm"><div className="relative w-full max-w-[430px] rounded-[28px] bg-[#fffdf7] p-6 shadow-2xl sm:p-8"><button onClick={() => setLoginOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f1f2ec] text-[#617067]" aria-label="Close login"><X className="h-4 w-4" /></button><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#12372a] text-2xl font-black text-[#f29a3d]">x</div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">{loginStep === "phone" ? "Welcome to xitosam" : "One quick check"}</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">{loginStep === "phone" ? "Your Nepal-first account." : "Enter your OTP."}</h2><p className="mt-3 text-sm leading-6 text-[#748179]">{loginStep === "phone" ? "Sign in with your Nepali mobile number to save addresses, track deliveries and checkout faster." : `We sent a 6-digit code to +977 ${phone}.`}</p>{loginStep === "phone" ? <div className="mt-7"><label className="mb-2 block text-xs font-extrabold text-[#486053]">Nepali mobile number</label><div className="flex overflow-hidden rounded-xl border border-[#dfe5dd] bg-white focus-within:border-[#f29a3d] focus-within:ring-4 focus-within:ring-[#f29a3d]/10"><div className="flex items-center gap-1 border-r border-[#e7ebe5] px-3 text-sm font-bold text-[#617067]">+977 <ChevronDown className="h-3 w-3" /></div><input autoFocus inputMode="numeric" maxLength={10} value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, ""))} onKeyDown={event => event.key === "Enter" && continueLogin()} placeholder="98XXXXXXXX" className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" /></div><p className="mt-2 text-[11px] text-[#8b978e]">We’ll send a one-time password. No spam, promise.</p><Button onClick={continueLogin} className="mt-6 h-12 w-full rounded-xl bg-[#12372a] font-extrabold text-white hover:bg-[#1a4a37]">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button></div> : <div className="mt-7"><label className="mb-2 block text-xs font-extrabold text-[#486053]">6-digit OTP</label><input autoFocus inputMode="numeric" maxLength={6} value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ""))} onKeyDown={event => event.key === "Enter" && verifyLogin()} placeholder="· · · · · ·" className="h-14 w-full rounded-xl border border-[#dfe5dd] bg-white px-4 text-center text-2xl font-black tracking-[0.35em] outline-none focus:border-[#f29a3d] focus:ring-4 focus:ring-[#f29a3d]/10" /><Button onClick={verifyLogin} className="mt-6 h-12 w-full rounded-xl bg-[#12372a] font-extrabold text-white hover:bg-[#1a4a37]">Verify & enter <ArrowRight className="ml-2 h-4 w-4" /></Button><button onClick={() => setLoginStep("phone")} className="mt-4 w-full text-center text-xs font-bold text-[#bf6e28]">Use a different number</button></div>}<div className="mt-7 flex items-center justify-center gap-2 text-[10px] font-bold text-[#8b978e]"><ShieldCheck className="h-3.5 w-3.5 text-[#5f9e73]" /> Your number stays private</div></div></div>}

      {locationOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#10271e]/50 p-4 backdrop-blur-sm"><div className="relative w-full max-w-[480px] rounded-[28px] bg-[#fffdf7] p-6 shadow-2xl sm:p-8"><button onClick={() => setLocationOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f1f2ec] text-[#617067]" aria-label="Close location picker"><X className="h-4 w-4" /></button><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f8e3ca] text-[#c16f29]"><MapPin className="h-6 w-6" /></div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">Delivery that fits your day</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">Where should we deliver?</h2><p className="mt-3 text-sm leading-6 text-[#748179]">We’ll show availability, delivery dates and nearby sellers for your area.</p><div className="mt-6 grid gap-2 sm:grid-cols-2">{(locationsQuery.data ?? [{ province: "Bagmati", cities: ["Kathmandu", "Lalitpur", "Bhaktapur"] }, { province: "Gandaki", cities: ["Pokhara", "Baglung"] }, { province: "Lumbini", cities: ["Butwal", "Bhairahawa"] }]).flatMap(location => location.cities.map(city => ({ city, province: location.province }))).slice(0, 9).map(location => <button key={`${location.city}-${location.province}`} onClick={() => { setSelectedLocation(`${location.city}, ${location.province}`); setLocationOpen(false); toast.success(`Delivering to ${location.city}`, { description: "Your feed is now personalized." }); }} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors hover:border-[#f29a3d] hover:bg-[#fff8eb] ${selectedLocation.startsWith(location.city) ? "border-[#f29a3d] bg-[#fff8eb]" : "border-[#e5e8e1] bg-white"}`}><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#f29a3d]" />{location.city}</span><span className="text-[10px] font-semibold text-[#85928a]">{location.province}</span></button>)}</div><div className="mt-6 rounded-xl bg-[#f2f3ed] p-3 text-xs leading-5 text-[#718076]"><strong className="text-[#173b2d]">Tip:</strong> Availability can vary by seller. We’ll always show the earliest delivery date before you pay.</div></div></div>}

      {cartOpen && <div className="fixed inset-0 z-50 bg-[#10271e]/40 backdrop-blur-sm"><div className="absolute right-0 top-0 h-full w-full max-w-[430px] overflow-y-auto bg-[#fffdf7] p-5 shadow-2xl sm:p-7"><div className="flex items-center justify-between"><div><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">Your bag · {cartCount} item{cartCount === 1 ? "" : "s"}</p><h2 className="font-display mt-1 text-3xl font-extrabold tracking-[-0.05em]">Ready to go?</h2></div><button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#f1f2ec]" aria-label="Close cart"><X className="h-4 w-4" /></button></div>{cartItems.length ? <><div className="mt-7 space-y-3">{cartItems.map(product => <div key={product.id} className="flex gap-3 rounded-2xl border border-[#e5e8e1] bg-white p-3"><img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h3 className="line-clamp-2 text-xs font-extrabold leading-5">{product.name}</h3><div className="mt-1 text-sm font-black">{formatNpr(product.price)}</div><div className="mt-2 flex items-center gap-2"><button onClick={() => setCart(current => ({ ...current, [product.id]: Math.max(0, (current[product.id] ?? 1) - 1) }))} className="grid h-6 w-6 place-items-center rounded-md bg-[#f1f2ec] text-sm font-bold">−</button><span className="w-4 text-center text-xs font-bold">{cart[product.id]}</span><button onClick={() => addToCart(product)} className="grid h-6 w-6 place-items-center rounded-md bg-[#f1f2ec] text-sm font-bold">+</button></div></div></div>)}</div><div className="mt-7 rounded-2xl bg-[#f2f3ed] p-4 text-sm"><div className="flex justify-between text-[#718076]"><span>Subtotal</span><span>{formatNpr(cartTotal)}</span></div><div className="mt-2 flex justify-between text-[#718076]"><span>Delivery</span><span className="font-bold text-[#4d9469]">Calculated at checkout</span></div><div className="mt-4 flex justify-between border-t border-[#dfe5dd] pt-4 text-base font-black"><span>Estimated total</span><span>{formatNpr(cartTotal)}</span></div></div><Button onClick={() => { setCartOpen(false); if (!loggedIn) setLoginOpen(true); else toast.success("Checkout flow ready", { description: "Connect your payment and COD provider next." }); }} className="mt-5 h-12 w-full rounded-xl bg-[#12372a] font-extrabold text-white hover:bg-[#1a4a37]">Continue to checkout <ArrowRight className="ml-2 h-4 w-4" /></Button><p className="mt-3 text-center text-[10px] text-[#8b978e]">Cash on delivery available in eligible locations</p></> : <div className="mt-20 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#f2eee3]"><ShoppingBag className="h-8 w-8 text-[#d67b2c]" /></div><h3 className="font-display mt-5 text-xl font-extrabold">Your bag is waiting</h3><p className="mt-2 text-sm text-[#77847b]">Add a few good things and they’ll show up here.</p><button onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 rounded-xl bg-[#f29a3d] px-5 py-3 text-xs font-extrabold text-[#2d1c0b]">Explore products</button></div>}</div></div>}

      {trackOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#10271e]/50 p-4 backdrop-blur-sm"><div className="relative w-full max-w-[510px] rounded-[28px] bg-[#fffdf7] p-6 shadow-2xl sm:p-8"><button onClick={() => setTrackOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f1f2ec] text-[#617067]" aria-label="Close tracking"><X className="h-4 w-4" /></button><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#deeee7] text-[#387857]"><Truck className="h-6 w-6" /></div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#d67b2c]">Order tracking</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">Know where it is.</h2><p className="mt-3 text-sm leading-6 text-[#748179]">A clean view of your order journey, from a seller’s shelf to your doorstep.</p><div className="mt-7 rounded-2xl border border-[#e5e8e1] bg-white p-4"><div className="flex items-center justify-between"><div><div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8b978e]">Latest order</div><div className="mt-1 text-sm font-black">{cartItems[0]?.name ?? "Your next xitosam order"}</div></div><span className="rounded-full bg-[#deeee7] px-2.5 py-1 text-[10px] font-black text-[#3c7c59]">On the way</span></div><div className="relative mt-8"><div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-[#d7e8dc]" /><div className="absolute left-4 top-4 h-1 w-[66%] rounded-full bg-[#4c9b6d]" /><div className="relative flex justify-between"><div className="grid justify-items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#4c9b6d] text-white"><PackageCheck className="h-4 w-4" /></span><span className="text-[10px] font-bold">Confirmed</span></div><div className="grid justify-items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#4c9b6d] text-white"><Truck className="h-4 w-4" /></span><span className="text-[10px] font-bold">On the way</span></div><div className="grid justify-items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#d7e8dc] bg-white text-[#a7b6ab]"><MapPin className="h-4 w-4" /></span><span className="text-[10px] font-bold text-[#8b978e]">Delivered</span></div></div></div><div className="mt-7 flex items-center gap-2 rounded-xl bg-[#f2f3ed] p-3 text-xs text-[#718076]"><Clock3 className="h-4 w-4 text-[#d67b2c]" /> Estimated arrival: <strong className="text-[#173b2d]">Tomorrow, 11 AM – 2 PM</strong></div></div><button onClick={() => toast.info("Tracking search is ready for your order ID.")} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#dfe5dd] text-xs font-extrabold hover:border-[#f29a3d]"><Search className="h-4 w-4" /> Track with order ID</button><p className="mt-4 flex items-center justify-center gap-1 text-[10px] text-[#8b978e]"><Phone className="h-3 w-3" /> SMS updates are available after sign in</p></div></div>}
    </div>
  );
}
