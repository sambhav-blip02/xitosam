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
  Eye,
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
  description?: string;
  specifications?: Array<{ label: string; value: string }>;
  gallery?: string[];
};

const productCatalog: Product[] = [
  {
    id: "iphone-16",
    name: "Apple iPhone 16 — 128GB",
    category: "Mobiles",
    price: 114999,
    compare: 124999,
    rating: 4.9,
    reviews: 128,
    seller: "Apple World",
    city: "Kathmandu",
    delivery: "Free delivery in 2 days",
    image: "https://images.unsplash.com/photo-1592286927505-2fd0e9e3b1c9?auto=format&fit=crop&w=1000&q=85",
    badge: "Latest pick",
    tone: "#fff0e4",
    brand: "Apple",
  },
  {
    id: "galaxy-s25",
    name: "Samsung Galaxy S25 5G — 256GB",
    category: "Mobiles",
    price: 119999,
    compare: 129999,
    rating: 4.9,
    reviews: 97,
    seller: "Samsung Plaza Nepal",
    city: "Lalitpur",
    delivery: "Insured delivery in 2 days",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=85",
    badge: "Top rated",
    tone: "#f5e8f1",
    brand: "Samsung",
  },
  {
    id: "galaxy-a56",
    name: "Samsung Galaxy A56 5G — 256GB",
    category: "Mobiles",
    price: 52999,
    compare: 57999,
    rating: 4.7,
    reviews: 186,
    seller: "Mobile Hub Nepal",
    city: "Kathmandu",
    delivery: "Delivery by tomorrow",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=85",
    badge: "Best seller",
    tone: "#e8eef5",
    brand: "Samsung",
  },
  {
    id: "redmi-note-14-pro",
    name: "Redmi Note 14 Pro 5G — 256GB",
    category: "Mobiles",
    price: 39999,
    compare: 44999,
    rating: 4.7,
    reviews: 214,
    seller: "Mi Store Nepal",
    city: "Pokhara",
    delivery: "Free delivery in 2–3 days",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=85",
    badge: "Value pick",
    tone: "#fff0d8",
    brand: "Xiaomi",
  },
  {
    id: "oneplus-13r",
    name: "OnePlus 13R 5G — 256GB",
    category: "Mobiles",
    price: 69999,
    compare: 74999,
    rating: 4.8,
    reviews: 75,
    seller: "OnePlus Nepal",
    city: "Kathmandu",
    delivery: "Delivery in 2 days",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=1000&q=85",
    badge: "Fast favourite",
    tone: "#f3e9e4",
    brand: "OnePlus",
  },
  {
    id: "pixel-9a",
    name: "Google Pixel 9a 5G — 128GB",
    category: "Mobiles",
    price: 69999,
    compare: 74999,
    rating: 4.8,
    reviews: 104,
    seller: "Himalayan Gadgets",
    city: "Kathmandu",
    delivery: "Free delivery in 2 days",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85",
    badge: "Camera favourite",
    tone: "#f1e9f3",
    brand: "Google",
  },
  {
    id: "nothing-3a",
    name: "Nothing Phone (3a) 5G — 256GB",
    category: "Mobiles",
    price: 49999,
    compare: 54999,
    rating: 4.6,
    reviews: 68,
    seller: "Gadget Byte",
    city: "Bhaktapur",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1000&q=85",
    badge: "New arrival",
    tone: "#edf0f2",
    brand: "Nothing",
  },
  {
    id: "vivo-v50",
    name: "Vivo V50 5G — 256GB",
    category: "Mobiles",
    price: 59999,
    compare: 64999,
    rating: 4.7,
    reviews: 89,
    seller: "Koshi Mobile House",
    city: "Biratnagar",
    delivery: "Delivery by Friday",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=85",
    badge: "Portrait pro",
    tone: "#f7e8e4",
    brand: "Vivo",
  },
  {
    id: "oppo-reno-13",
    name: "OPPO Reno13 5G — 256GB",
    category: "Mobiles",
    price: 64999,
    compare: 69999,
    rating: 4.6,
    reviews: 73,
    seller: "Smart Cell Nepal",
    city: "Lalitpur",
    delivery: "Delivery in 2 days",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=85",
    badge: "Style edit",
    tone: "#f8e5e6",
    brand: "OPPO",
  },
  {
    id: "realme-14-pro",
    name: "realme 14 Pro+ 5G — 256GB",
    category: "Mobiles",
    price: 49999,
    compare: 55999,
    rating: 4.6,
    reviews: 91,
    seller: "Realme Official Nepal",
    city: "Kathmandu",
    delivery: "Delivery in 2–3 days",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=1000&q=85",
    badge: "Everyday favourite",
    tone: "#f1e7df",
    brand: "realme",
  },
  {
    id: "macbook-air-m4",
    name: "MacBook Air M4 — 13-inch",
    category: "Electronics",
    price: 149999,
    compare: 159999,
    rating: 4.9,
    reviews: 54,
    seller: "Byte Nepal",
    city: "Kathmandu",
    delivery: "Insured delivery · 2 days",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    badge: "Pro pick",
    tone: "#edf0f3",
    brand: "Apple",
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13 — Core Ultra 7",
    category: "Electronics",
    price: 159999,
    compare: 174999,
    rating: 4.8,
    reviews: 31,
    seller: "ITTI Nepal",
    city: "Kathmandu",
    delivery: "Insured delivery · 2–3 days",
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=1000&q=85",
    badge: "Premium laptop",
    tone: "#e8edf2",
    brand: "Dell",
  },
  {
    id: "lenovo-ideapad",
    name: "Lenovo IdeaPad Slim 5 — 14-inch",
    category: "Electronics",
    price: 89999,
    compare: 99999,
    rating: 4.7,
    reviews: 82,
    seller: "Oliz Store",
    city: "Lalitpur",
    delivery: "Free delivery in 2 days",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85",
    badge: "Work ready",
    tone: "#f0ece5",
    brand: "Lenovo",
  },
  {
    id: "asus-vivobook",
    name: "ASUS Vivobook 15 OLED — i5",
    category: "Electronics",
    price: 99999,
    compare: 109999,
    rating: 4.7,
    reviews: 65,
    seller: "Neostore Nepal",
    city: "Kathmandu",
    delivery: "Delivery in 2 days",
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1000&q=85",
    badge: "OLED display",
    tone: "#f0e8ef",
    brand: "ASUS",
  },
  {
    id: "hp-15s",
    name: "HP 15s — Ryzen 5 7530U",
    category: "Electronics",
    price: 73999,
    compare: 81999,
    rating: 4.6,
    reviews: 119,
    seller: "Generation Next",
    city: "Kathmandu",
    delivery: "Delivery by tomorrow",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
    badge: "Student favourite",
    tone: "#e9eef3",
    brand: "HP",
  },
  {
    id: "acer-aspire-5",
    name: "Acer Aspire 5 — Core i5",
    category: "Electronics",
    price: 75999,
    compare: 84999,
    rating: 4.6,
    reviews: 88,
    seller: "Evo Store",
    city: "Pokhara",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85",
    badge: "Everyday laptop",
    tone: "#f1ece5",
    brand: "Acer",
  },
  {
    id: "lenovo-loq",
    name: "Lenovo LOQ 15 — Gaming laptop",
    category: "Electronics",
    price: 139999,
    compare: 154999,
    rating: 4.8,
    reviews: 47,
    seller: "Mudita Store",
    city: "Kathmandu",
    delivery: "Insured delivery · 2 days",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1000&q=85",
    badge: "Gaming pick",
    tone: "#eee8f2",
    brand: "Lenovo",
  },
  {
    id: "msi-modern-14",
    name: "MSI Modern 14 — Core i7",
    category: "Electronics",
    price: 89999,
    compare: 99999,
    rating: 4.6,
    reviews: 39,
    seller: "Tech Studio Nepal",
    city: "Bhaktapur",
    delivery: "Delivery in 2–3 days",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    badge: "Creator choice",
    tone: "#e9edf1",
    brand: "MSI",
  },
  {
    id: "sony-xm5",
    name: "Sony WH-1000XM5 headphones",
    category: "Electronics",
    price: 39999,
    compare: 44999,
    rating: 4.8,
    reviews: 102,
    seller: "Audio House Nepal",
    city: "Lalitpur",
    delivery: "Free delivery in 2 days",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    badge: "Noise cancelling",
    tone: "#f0e6df",
    brand: "Sony",
  },
  {
    id: "dji-pocket-3",
    name: "DJI Osmo Pocket 3 Creator Combo",
    category: "Electronics",
    price: 89999,
    compare: 94999,
    rating: 4.8,
    reviews: 28,
    seller: "Frame Nepal",
    city: "Kathmandu",
    delivery: "Insured delivery · 2 days",
    image: "https://images.unsplash.com/photo-1606986628253-7d5e8d1a3a18?auto=format&fit=crop&w=1000&q=85",
    badge: "Creator gear",
    tone: "#ece8e3",
    brand: "DJI",
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
    tone: "#f3e9df",
    brand: "Thread & Loom",
  },
  {
    id: "cotton-kurta",
    name: "Handloom cotton kurta — Indigo",
    category: "Fashion",
    price: 2499,
    compare: 3299,
    rating: 4.8,
    reviews: 76,
    seller: "Kora Nepal",
    city: "Lalitpur",
    delivery: "Delivery in 2–3 days",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=85",
    badge: "Local craft",
    tone: "#e8e4f0",
    brand: "Kora",
  },
  {
    id: "puffer-vest",
    name: "Lightweight puffer vest — Rust",
    category: "Fashion",
    price: 3899,
    compare: 4999,
    rating: 4.5,
    reviews: 41,
    seller: "Peak Thread",
    city: "Pokhara",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1000&q=85",
    badge: "Winter edit",
    tone: "#f4dfd4",
    brand: "Peak Thread",
  },
  {
    id: "cloudrun-shoes",
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
    tone: "#f0ece6",
    brand: "Peak Performance",
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
    tone: "#faece8",
    brand: "Koshi Beauty",
  },
  {
    id: "sunscreen-spf50",
    name: "Mineral sunscreen SPF 50 — 50ml",
    category: "Beauty",
    price: 899,
    compare: 1199,
    rating: 4.7,
    reviews: 174,
    seller: "Glow Nepal",
    city: "Kathmandu",
    delivery: "Delivery by tomorrow",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1000&q=85",
    badge: "Daily essential",
    tone: "#fff0d8",
    brand: "Glow Nepal",
  },
  {
    id: "hair-dryer",
    name: "Ionic ceramic hair dryer",
    category: "Beauty",
    price: 2899,
    compare: 3999,
    rating: 4.5,
    reviews: 58,
    seller: "Beauty Basket",
    city: "Lalitpur",
    delivery: "Delivery in 2 days",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
    badge: "Salon at home",
    tone: "#f4e5ec",
    brand: "Beauty Basket",
  },
  {
    id: "lip-tint-set",
    name: "Nepali shade lip tint trio",
    category: "Beauty",
    price: 1499,
    compare: 1999,
    rating: 4.6,
    reviews: 93,
    seller: "Luna Beauty",
    city: "Kathmandu",
    delivery: "Free delivery over NPR 2,000",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=85",
    badge: "Giftable",
    tone: "#f8e3e5",
    brand: "Luna",
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
    brand: "Nova",
  },
  {
    id: "rice-cooker",
    name: "Himalayan smart rice cooker 1.8L",
    category: "Home & Living",
    price: 3499,
    compare: 4499,
    rating: 4.5,
    reviews: 81,
    seller: "Ghar Sansar",
    city: "Lalitpur",
    delivery: "Delivery in 2 days",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=85",
    badge: "Kitchen helper",
    tone: "#f9e8d8",
    brand: "Himalayan",
  },
  {
    id: "cordless-vacuum",
    name: "Cordless stick vacuum cleaner",
    category: "Home & Living",
    price: 8999,
    compare: 11999,
    rating: 4.6,
    reviews: 46,
    seller: "Home Lab Nepal",
    city: "Kathmandu",
    delivery: "Insured delivery · 2 days",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=85",
    badge: "Home upgrade",
    tone: "#e9eef0",
    brand: "Home Lab",
  },
  {
    id: "ceramic-dinner-set",
    name: "Stoneware dinner set — 16 piece",
    category: "Home & Living",
    price: 4999,
    compare: 6499,
    rating: 4.7,
    reviews: 67,
    seller: "Mitti & More",
    city: "Bhaktapur",
    delivery: "Careful delivery in 3 days",
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1000&q=85",
    badge: "Table edit",
    tone: "#f4e8dc",
    brand: "Mitti & More",
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
    tone: "#fff0d5",
    brand: "Everyday Mart",
  },
  {
    id: "ilam-tea",
    name: "Ilam orthodox black tea — 250g",
    category: "Grocery",
    price: 699,
    compare: 850,
    rating: 4.9,
    reviews: 131,
    seller: "Hillside Harvest",
    city: "Ilam",
    delivery: "Delivery in 2–3 days",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1000&q=85",
    badge: "From Nepal",
    tone: "#f2e7dc",
    brand: "Hillside",
  },
  {
    id: "basmati-rice",
    name: "Premium basmati rice — 5kg",
    category: "Grocery",
    price: 1099,
    compare: 1299,
    rating: 4.7,
    reviews: 88,
    seller: "Everyday Mart",
    city: "Kathmandu",
    delivery: "Same-day in Kathmandu valley",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=85",
    badge: "Pantry staple",
    tone: "#fff3dc",
    brand: "Everyday Mart",
  },
  {
    id: "organic-ghee",
    name: "Himalayan organic cow ghee — 500ml",
    category: "Grocery",
    price: 1299,
    compare: 1499,
    rating: 4.8,
    reviews: 64,
    seller: "Dhaulagiri Foods",
    city: "Baglung",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
    badge: "Small batch",
    tone: "#ffedc8",
    brand: "Dhaulagiri",
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
    tone: "#e8eff2",
    brand: "Little Mountain",
  },
  {
    id: "wooden-blocks",
    name: "Wooden building blocks — 48 piece",
    category: "Kids",
    price: 1899,
    compare: 2499,
    rating: 4.8,
    reviews: 61,
    seller: "Khelau Khelau",
    city: "Kathmandu",
    delivery: "Delivery in 2 days",
    image: "https://images.unsplash.com/photo-1594784055097-5adf2f0d6f4d?auto=format&fit=crop&w=1000&q=85",
    badge: "Screen-free fun",
    tone: "#ffe4ce",
    brand: "Khelau Khelau",
  },
  {
    id: "kids-rain-jacket",
    name: "Kids colour-block rain jacket",
    category: "Kids",
    price: 1799,
    compare: 2299,
    rating: 4.6,
    reviews: 37,
    seller: "Little Mountain",
    city: "Dharan",
    delivery: "Delivery in 3–5 days",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85",
    badge: "Monsoon ready",
    tone: "#e9e4f0",
    brand: "Little Mountain",
  },
  {
    id: "learning-tablet",
    name: "Kids learning tablet — 8-inch",
    category: "Kids",
    price: 8999,
    compare: 10999,
    rating: 4.5,
    reviews: 29,
    seller: "Gadget Byte",
    city: "Bhaktapur",
    delivery: "Insured delivery · 2 days",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=85",
    badge: "Learning pick",
    tone: "#e7edf1",
    brand: "Gadget Byte",
  },
  {
    id: "training-shoes",
    name: "TrailFlex training shoes",
    category: "Sports",
    price: 4499,
    compare: 5999,
    rating: 4.7,
    reviews: 79,
    seller: "Peak Performance",
    city: "Pokhara",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85",
    badge: "Active edit",
    tone: "#f2e4df",
    brand: "Peak Performance",
  },
  {
    id: "yoga-mat",
    name: "Cork-grip yoga mat — 6mm",
    category: "Sports",
    price: 2199,
    compare: 2999,
    rating: 4.8,
    reviews: 52,
    seller: "Move Nepal",
    city: "Lalitpur",
    delivery: "Delivery in 2–3 days",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=1000&q=85",
    badge: "Studio favourite",
    tone: "#f1e5dc",
    brand: "Move Nepal",
  },
  {
    id: "football",
    name: "KTM Street football — size 5",
    category: "Sports",
    price: 1299,
    compare: 1599,
    rating: 4.6,
    reviews: 48,
    seller: "Khelau Khelau",
    city: "Kathmandu",
    delivery: "Delivery by tomorrow",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1000&q=85",
    badge: "Weekend pick",
    tone: "#ececf2",
    brand: "Khelau Khelau",
  },
  {
    id: "trekking-poles",
    name: "Alpine trekking poles — pair",
    category: "Sports",
    price: 2999,
    compare: 3999,
    rating: 4.7,
    reviews: 35,
    seller: "Mountain Basecamp",
    city: "Pokhara",
    delivery: "Delivery in 3–4 days",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=85",
    badge: "Trail ready",
    tone: "#e8eee8",
    brand: "Mountain Basecamp",
  },
];

const categories = [
  { label: "Mobiles", icon: "▣", color: "#ffe7d2" },
  { label: "Electronics", icon: "⌁", color: "#e9edf2" },
  { label: "Fashion", icon: "✦", color: "#f9e5d7" },
  { label: "Beauty", icon: "◒", color: "#f5e3eb" },
  { label: "Home & Living", icon: "⌂", color: "#fff0d4" },
  { label: "Grocery", icon: "✿", color: "#ffe8d2" },
  { label: "Kids", icon: "✎", color: "#ece4f3" },
  { label: "Sports", icon: "↗", color: "#e6eef1" },
];

const categoryGallery: Record<string, string[]> = {
  Mobiles: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1592286927505-2fd0e9e3b1c9?auto=format&fit=crop&w=1000&q=85",
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=85",
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=85",
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=85",
  ],
  "Home & Living": [
    "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=85",
  ],
  Grocery: [
    "https://images.unsplash.com/photo-1601598851547-4302969d4b84?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1000&q=85",
  ],
  Kids: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=85",
  ],
  Sports: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=1000&q=85",
  ],
};

const getProductDetails = (product: Product) => {
  const categorySpecs: Record<string, Array<{ label: string; value: string }>> = {
    Mobiles: [
      { label: "Network", value: "5G ready · Dual SIM" },
      { label: "Display", value: "AMOLED · 120Hz" },
      { label: "Warranty", value: "1 year official warranty" },
    ],
    Electronics: [
      { label: "Use case", value: "Work, study & everyday productivity" },
      { label: "Condition", value: "Brand new · sealed pack" },
      { label: "Warranty", value: "1 year seller warranty" },
    ],
    Fashion: [
      { label: "Material", value: "Premium blended fabric" },
      { label: "Fit", value: "Comfort fit · true to size" },
      { label: "Care", value: "Machine wash cold" },
    ],
    Beauty: [
      { label: "Skin type", value: "Suitable for everyday use" },
      { label: "Formula", value: "Dermatologically tested" },
      { label: "Origin", value: "Authentic, sealed product" },
    ],
    "Home & Living": [
      { label: "Material", value: "Durable everyday construction" },
      { label: "Use", value: "Made for Nepali homes" },
      { label: "Support", value: "Seller support included" },
    ],
    Grocery: [
      { label: "Quality", value: "Freshly packed" },
      { label: "Storage", value: "Store in a cool, dry place" },
      { label: "Sourcing", value: "Trusted Nepal sellers" },
    ],
    Kids: [
      { label: "Age guide", value: "Designed for growing kids" },
      { label: "Safety", value: "Child-friendly materials" },
      { label: "Use", value: "Play, learn & explore" },
    ],
    Sports: [
      { label: "Activity", value: "Training, travel & weekend play" },
      { label: "Build", value: "Comfortable, durable finish" },
      { label: "Fit guide", value: "Check seller size notes" },
    ],
  };
  return {
    description: `${product.name} is a carefully selected ${product.category.toLowerCase()} find from ${product.seller}. Enjoy dependable quality, clear delivery updates and buyer protection on every xitosam order.`,
    specifications: [
      { label: "Brand", value: product.brand ?? product.seller.split(" ")[0] },
      ...(categorySpecs[product.category] ?? []),
      { label: "Delivery", value: product.delivery },
    ],
    gallery: [product.image, ...(categoryGallery[product.category] ?? [])].filter((image, index, images) => images.indexOf(image) === index).slice(0, 3),
  };
};

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "processing" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<"esewa" | "khalti" | "card" | "cod">("esewa");
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
      tone: "#fff0e4",
    } as Product));
    const remoteNames = new Set((remote ?? []).map(product => product.name));
    return [...(remote ?? []), ...productCatalog.filter(product => !remoteNames.has(product.name))];
  }, [apiProducts.data]);
  const brands = useMemo(() => ["All brands", ...Array.from(new Set(products.map(product => product.brand ?? product.seller.split(" ")[0])))], [products]);
  const filteredProducts = useMemo(() => {
    const categoryProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const filtered = categoryProducts.filter(product => {
      const brand = product.brand ?? product.seller.split(" ")[0];
      const searchableText = [product.name, product.category, brand, product.seller, product.city].join(" ").toLowerCase();
      return (!normalizedSearch || searchableText.includes(normalizedSearch)) && product.price >= minPrice && product.price <= maxPrice && (selectedBrand === "All brands" || brand === selectedBrand);
    });
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, selectedBrand, sortBy]);
  const cartItems = products.filter(product => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);

  const addToCart = (product: Product) => {
    setCart(current => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    toast.success(`${product.name.split(" — ")[0]} added to your bag`, { description: "Ready when you are." });
  };
  const updateCartQuantity = (product: Product, quantity: number) => {
    setCart(current => {
      const next = { ...current };
      if (quantity <= 0) delete next[product.id];
      else next[product.id] = quantity;
      return next;
    });
  };
  const openCheckout = () => {
    if (!cartItems.length) {
      toast.error("Your bag is empty", { description: "Add a product before checkout." });
      return;
    }
    setCartOpen(false);
    setCheckoutStep("details");
    setCheckoutOpen(true);
  };
  const simulatePayment = () => {
    setCheckoutStep("processing");
    window.setTimeout(() => setCheckoutStep("success"), 900);
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
    <div className="min-h-screen bg-[#fff8f0] text-[#4a241b]">
      <div className="hidden bg-[#f59a44] px-4 py-2 text-center text-xs font-bold tracking-[0.04em] text-[#4a241b] sm:block">
        <span>{t.promo} </span><span className="rounded-full bg-[#4a241b] px-2 py-1 text-[#fff7ed]">NAMASTE150</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#eadfd8]/80 bg-[#fff8f0]/95 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center gap-3 lg:gap-7">
          <button className="mr-1 flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to xitosam home">
            <div className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[#4a241b] text-xl font-black text-[#f8a14a] shadow-[4px_4px_0_#f59a44]">x</div>
            <div className="hidden text-left sm:block">
              <div className="font-display text-[23px] font-extrabold leading-none tracking-[-0.07em] text-[#4a241b]">xitosam</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8b746b]">made for Nepal</div>
            </div>
          </button>

          <button onClick={() => setLocationOpen(true)} className="hidden shrink-0 items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[#fff0e2] md:flex" aria-label="Choose delivery location">
            <MapPin className="h-[19px] w-[19px] text-[#f59a44]" strokeWidth={2.5} />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#76837b]">{t.deliverTo}</div>
              <div className="flex items-center gap-1 text-[12px] font-bold text-[#4a241b]">{selectedLocation} <ChevronDown className="h-3 w-3" /></div>
            </div>
          </button>

          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#86958c]" />
            <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="h-11 w-full rounded-2xl border border-[#eaded7] bg-white pl-11 pr-10 text-sm font-medium outline-none transition focus:border-[#f59a44] focus:ring-4 focus:ring-[#f59a44]/10" placeholder={t.search} aria-label="Search the catalog" />{searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#f8eee5] text-[#8e756c]" aria-label="Clear search"><X className="h-3.5 w-3.5" /></button>}
          </div>

          <button onClick={() => setLanguage(current => current === "en" ? "ne" : "en")} className="hidden items-center gap-1 rounded-xl border border-[#eaded7] bg-white px-2.5 py-2 text-[10px] font-black uppercase tracking-[0.08em] hover:border-[#f59a44] sm:flex" aria-label="Switch language"><Globe className="h-3.5 w-3.5 text-[#cf6d2d]" /><span className={language === "en" ? "text-[#4a241b]" : "text-[#8b978e]"}>EN</span><span className="text-[#b5beb7]">/</span><span className={language === "ne" ? "text-[#4a241b]" : "text-[#8b978e]"}>ने</span></button>
          <div className="hidden items-center gap-1 lg:flex">
            <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-[#fff0e2]" onClick={() => { if (loggedIn) setProfileOpen(true); else { setLoginStep("phone"); setLoginOpen(true); } }}>
              <UserRound className="h-[19px] w-[19px]" />
              <div><div className="text-[10px] text-[#76837b]">{t.hello}, {loggedIn ? "Riya" : (language === "ne" ? "त्यहाँ" : "there")}</div><div className="flex items-center gap-1 text-xs font-bold">{t.account} <ChevronDown className="h-3 w-3" /></div></div>
            </button>
            <button onClick={() => setTrackOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-[#fff0e2]" aria-label="Track orders"><PackageCheck className="h-5 w-5" /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#f59a44]" /></button>
            <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-[#fff0e2]" aria-label="Open cart"><ShoppingCart className="h-5 w-5" />{cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#f59a44] px-1 text-[10px] font-black text-[#4a241b]">{cartCount}</span>}</button>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-xl hover:bg-[#fff0e2] lg:hidden" onClick={() => setMobileMenuOpen(current => !current)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
        </div>
        {mobileMenuOpen && <div className="container flex flex-wrap items-center gap-3 border-t border-[#eadfd8] py-3 lg:hidden"><button onClick={() => setLanguage(current => current === "en" ? "ne" : "en")} className="rounded-xl border border-[#eaded7] bg-white px-3 py-2 text-xs font-black">EN / ने</button><button onClick={() => setLocationOpen(true)} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold"><MapPin className="h-4 w-4 text-[#f59a44]" />{selectedLocation}</button><button onClick={() => setLoginOpen(true)} className="rounded-xl bg-[#4a241b] px-3 py-2 text-xs font-bold text-white">{loggedIn ? t.profile : (language === "ne" ? "साइन इन" : "Sign in")}</button><button onClick={() => setTrackOpen(true)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold">{t.track}</button><button onClick={() => setCartOpen(true)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold">{t.bag} ({cartCount})</button></div>}
      </header>

      <main>
        <section className="container pt-4 sm:pt-6">
          <div className="hero-grid relative isolate min-h-[420px] overflow-hidden rounded-[30px] p-6 text-[#fff7ed] sm:p-10 lg:min-h-[454px] lg:p-14">
            <div className="dotted-grid absolute inset-0 -z-10 opacity-35" />
            <div className="absolute -right-32 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#ffffff]/10 bg-[#ffffff]/[0.03]" />
            <div className="absolute -bottom-48 right-[29%] -z-10 h-[390px] w-[390px] rounded-full border border-[#ffffff]/10" />
            <div className="relative z-10 max-w-[570px]">
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#f0c8a7]"><span className="rounded-full bg-[#f59a44] px-3 py-1.5 text-[#4a241b]">{t.heroKicker}</span><span>·</span><span>New season, new finds</span></div>
              <h1 className="font-display max-w-[560px] text-[42px] font-extrabold leading-[1.04] tracking-[-0.06em] sm:text-[57px]">{language === "ne" ? <>तपाईंलाई चाहिने सबै कुरा,<br /><span className="text-[#ffbf74]">तपाईंको ढोकासम्म।</span></> : <>Everything you need,<br /><span className="text-[#ffbf74]">delivered your way.</span></>}</h1>
              <p className="mt-5 max-w-[445px] text-[15px] leading-7 text-[#f7d9c0] sm:text-base">{t.heroBody}</p>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center gap-3 rounded-xl bg-[#f59a44] px-5 py-3.5 text-sm font-extrabold text-[#4a241b] shadow-[0_9px_0_#c96f20] hover:bg-[#ffad59]"><span>{t.explore}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button><button onClick={() => setLocationOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/15"><LocateFixed className="h-4 w-4 text-[#ffbf74]" />{t.location}</button></div>
              <div className="mt-10 flex items-center gap-4 text-xs text-[#f1d2bc]"><div className="flex -space-x-2"><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#5b2c25] bg-[#e6bc94] text-[10px] font-bold text-[#573920]">RM</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#5b2c25] bg-[#b7d0c1] text-[10px] font-bold text-[#234a36]">AS</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#5b2c25] bg-[#e2a36d] text-[10px] font-bold text-[#573920]">PK</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#5b2c25] bg-[#f4c46d] text-[10px] font-bold text-[#573920]">+</span></div><span><strong className="text-white">3,500+</strong> local sellers already on xitosam</span></div>
            </div>
            <div className="absolute bottom-4 right-5 hidden h-[385px] w-[500px] lg:block">
              <div className="absolute left-0 top-12 h-[235px] w-[178px] rotate-[-8deg] overflow-hidden rounded-[23px] border-8 border-[#fff7ed]/80 bg-[#ffe6d5] shadow-2xl"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85" className="h-full w-full object-cover" alt="Laptop" /></div>
              <div className="absolute left-[125px] top-2 z-10 h-[280px] w-[188px] rotate-[7deg] overflow-hidden rounded-[23px] border-8 border-[#fff7ed]/80 bg-[#ffd9b5] shadow-2xl"><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=85" className="h-full w-full object-cover" alt="Phone" /></div>
              <div className="absolute right-0 top-16 h-[230px] w-[175px] rotate-[14deg] overflow-hidden rounded-[23px] border-8 border-[#fff7ed]/80 bg-[#ffecce] shadow-2xl"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85" className="h-full w-full object-cover" alt="Shoes" /></div>
              <div className="absolute bottom-0 left-[145px] z-20 flex items-center gap-2 rounded-2xl bg-[#fff7ed] px-4 py-3 text-[#4a241b] shadow-xl"><ShieldCheck className="h-5 w-5 text-[#f59a44]" /><div><div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#76837b]">Every order</div><div className="text-xs font-extrabold">Buyer protected</div></div></div>
            </div>
          </div>
        </section>

        <section className="container py-8 sm:py-10">
          <div className="mb-4 flex items-end justify-between"><div><p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">{t.categoryKicker}</p><h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">{t.categories}</h2></div><button className="hidden items-center gap-1 text-xs font-extrabold text-[#c46d2c] sm:flex" onClick={() => { setSelectedCategory("All"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>View all <ArrowRight className="h-3.5 w-3.5" /></button></div>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">{categories.map(category => <button key={category.label} onClick={() => { setSelectedCategory(category.label); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className={`group flex min-w-[102px] flex-col items-center gap-2 rounded-2xl border bg-white px-3 py-4 transition-all hover:-translate-y-1 hover:shadow-md sm:min-w-[130px] ${selectedCategory === category.label ? "border-[#f59a44] shadow-[0_0_0_3px_rgba(242,154,61,.15)]" : "border-[#e7e9e2]"}`}><span className="grid h-12 w-12 place-items-center rounded-2xl text-[27px] font-bold" style={{ backgroundColor: category.color }}>{category.icon}</span><span className="whitespace-nowrap text-xs font-bold">{category.label}</span></button>)}</div>
        </section>

        <section className="container pb-10">
          <div className="grid gap-4 md:grid-cols-[1.65fr_1fr_1fr]">
            <div className="relative min-h-[208px] overflow-hidden rounded-[24px] bg-[#ffe9d4] p-6 sm:p-8"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.7),transparent_28%),linear-gradient(135deg,transparent_36%,rgba(255,255,255,.6))]" /><div className="relative z-10 max-w-[280px]"><span className="rounded-full bg-[#4a241b] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#f8f2e6]">Fresh on xitosam</span><h3 className="font-display mt-4 text-2xl font-extrabold leading-tight tracking-[-0.05em]">The everyday upgrade edit.</h3><p className="mt-2 text-xs leading-5 text-[#5c7467]">Little things that make home feel easier, calmer and a bit more you.</p><button onClick={() => { setSelectedCategory("Home & Living"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#d27629]">Shop home <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="absolute -bottom-10 right-[-10px] h-[180px] w-[180px] rounded-full bg-[#f8cfaa]" /><div className="absolute bottom-2 right-10 h-[138px] w-[92px] rotate-[16deg] overflow-hidden rounded-[50%] border-4 border-white/70 shadow-lg"><img src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=500&q=85" alt="Home product" className="h-full w-full object-cover" /></div></div>
            <div className="relative overflow-hidden rounded-[24px] bg-[#ffe2c2] p-6"><div className="relative z-10"><div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#af641f]"><Zap className="h-3 w-3" /> Flash deals</div><h3 className="font-display mt-4 max-w-[180px] text-xl font-extrabold leading-tight tracking-[-0.05em]">Up to 40% off today</h3><button onClick={() => { setSelectedCategory("All"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 inline-flex items-center gap-1 text-xs font-extrabold text-[#c06c24]">See deals <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-[#ffbd77]" /><div className="absolute bottom-1 right-4 h-24 w-20 rotate-[13deg] overflow-hidden rounded-xl border-4 border-white/70 shadow-lg"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=85" alt="Deal shoes" className="h-full w-full object-cover" /></div></div>
            <div className="relative overflow-hidden rounded-[24px] bg-[#eee4ed] p-6"><div className="relative z-10"><div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#795e77]"><Sparkles className="h-3 w-3" /> Seller spotlight</div><h3 className="font-display mt-4 max-w-[180px] text-xl font-extrabold leading-tight tracking-[-0.05em]">Made by Nepal, for Nepal</h3><button onClick={() => toast.info("Seller stories are coming soon.")} className="mt-6 inline-flex items-center gap-1 text-xs font-extrabold text-[#795e77]">Meet the sellers <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-[#dcc9dc]" /><div className="absolute bottom-1 right-4 h-24 w-20 rotate-[-10deg] overflow-hidden rounded-xl border-4 border-white/70 shadow-lg"><img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=85" alt="Seller product" className="h-full w-full object-cover" /></div></div>
          </div>
        </section>

        <section id="shop" className="border-y border-[#eadfd8] bg-[#fffaf5] py-10 sm:py-12">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">{t.shopKicker}</p><h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">{t.popular}</h2><p className="mt-2 text-sm text-[#8e756c]">Handpicked by our local team · delivery to {selectedLocation.split(",")[0]}</p></div><div className="flex items-center gap-2"><button className="grid h-9 w-9 place-items-center rounded-full border border-[#eadfd8] bg-white hover:border-[#f59a44]"><ChevronLeft className="h-4 w-4" /></button><button className="grid h-9 w-9 place-items-center rounded-full border border-[#eadfd8] bg-white hover:border-[#f59a44]"><ChevronRight className="h-4 w-4" /></button></div></div>
            <div className="hide-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2"><button onClick={() => setSelectedCategory("All")} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold ${selectedCategory === "All" ? "bg-[#4a241b] text-white" : "border border-[#eaded7] bg-white text-[#80655d]"}`}>{language === "ne" ? "सबै" : "All finds"}</button>{categories.map(category => <button key={category.label} onClick={() => setSelectedCategory(category.label)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold ${selectedCategory === category.label ? "bg-[#4a241b] text-white" : "border border-[#eaded7] bg-white text-[#80655d]"}`}>{category.label}</button>)}</div>
            <div className="mt-5 rounded-[24px] border border-[#eadfd8] bg-white p-4 shadow-[0_10px_30px_rgba(111,62,44,.06)] sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#cf6d2d]"><Search className="h-3.5 w-3.5" /> Search the full catalog</div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#cf6d2d]" />
                    <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="h-12 w-full rounded-2xl border border-[#eadfd7] bg-[#fffaf5] pl-12 pr-11 text-sm font-bold outline-none transition focus:border-[#f59a44] focus:ring-4 focus:ring-[#f59a44]/10" placeholder="Try ‘Samsung’, ‘laptop’, or ‘under NPR 50,000’" aria-label="Search mobiles, laptops and more" />
                    {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-[#ffe7d2] text-[#ba5e35]" aria-label="Clear catalog search"><X className="h-3.5 w-3.5" /></button>}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs lg:pt-5"><span className="rounded-full bg-[#fff0e2] px-3 py-2 font-extrabold text-[#ba5e35]">{filteredProducts.length} finds</span><button onClick={() => { setSearchQuery(""); setSelectedBrand("All brands"); setMinPrice(0); setMaxPrice(150000); setSortBy("featured"); }} className="rounded-xl border border-[#eadfd7] px-3 py-2 font-extrabold text-[#80655d] hover:border-[#f59a44]">Reset</button></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-extrabold text-[#80655d]"><span className="mr-1 self-center text-[#927d74]">Popular:</span>{["Samsung", "Apple", "Lenovo", "laptop"].map(query => <button key={query} onClick={() => setSearchQuery(query)} className="rounded-full bg-[#f8eee5] px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-[#ffe7d2]">{query}</button>)}</div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#fff0e2] pt-4"><button onClick={() => setFiltersOpen(current => !current)} className="inline-flex items-center gap-2 rounded-xl bg-[#f8eee5] px-3 py-2 text-xs font-extrabold"><SlidersHorizontal className="h-4 w-4 text-[#cf6d2d]" />{t.filters}<span className="rounded-full bg-[#f59a44] px-1.5 py-0.5 text-[9px] text-[#4a241b]">{(minPrice > 0 ? 1 : 0) + (maxPrice < 150000 ? 1 : 0) + (selectedBrand !== "All brands" ? 1 : 0)}</span></button><div className="flex items-center gap-2 text-xs"><ArrowDownUp className="h-3.5 w-3.5 text-[#8b978e]" /><span className="font-bold text-[#8e756c]">{t.sort}</span><select value={sortBy} onChange={event => setSortBy(event.target.value)} className="rounded-xl border border-[#eaded7] bg-white px-3 py-2 text-xs font-extrabold outline-none"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>
              {filtersOpen && <div className="mt-4 grid gap-5 border-t border-[#fff0e2] pt-4 md:grid-cols-[1.2fr_1fr]"><div><div className="mb-2 flex items-center justify-between text-xs font-extrabold"><span>{t.price}</span><span className="text-[#cf6d2d]">{formatNpr(minPrice)} — {formatNpr(maxPrice)}</span></div><div className="grid gap-2"><input type="range" min="0" max="150000" step="500" value={minPrice} onChange={event => setMinPrice(Math.min(Number(event.target.value), maxPrice - 500))} className="w-full accent-[#4a241b]" /><input type="range" min="500" max="150000" step="500" value={maxPrice} onChange={event => setMaxPrice(Math.max(Number(event.target.value), minPrice + 500))} className="w-full accent-[#f59a44]" /></div></div><div><div className="mb-2 text-xs font-extrabold">{t.brand}</div><div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto pr-1">{brands.map(brand => <button key={brand} onClick={() => setSelectedBrand(brand)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${selectedBrand === brand ? "bg-[#4a241b] text-white" : "bg-[#f8eee5] text-[#80655d]"}`}>{brand === "All brands" ? t.allBrands : brand}</button>)}</div></div></div>}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filteredProducts.map((product, index) => <article key={product.id} onClick={() => setSelectedProduct(product)} className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#eadfd8] bg-white p-2.5 card-shadow transition-all duration-300 hover:-translate-y-2 hover:border-[#f3c29c] hover:shadow-[0_18px_40px_rgba(111,62,44,.14)]" style={{ animationDelay: `${index * 45}ms` }}><div className="relative aspect-[.92] overflow-hidden rounded-[15px]" style={{ backgroundColor: product.tone }}><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#4a241b]/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" /><div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-[#4a241b] backdrop-blur-sm">{product.badge ?? "xitosam pick"}</div><button onClick={event => { event.stopPropagation(); toggleFavorite(product); }} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#8e756c] backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:text-[#c84b3d]" aria-label="Add to wishlist"><Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-[#c84b3d] text-[#c84b3d]" : ""}`} /></button><div className="absolute bottom-2 left-2 right-2 flex translate-y-2 items-center justify-between gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"><button onClick={event => { event.stopPropagation(); setSelectedProduct(product); }} className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-black text-[#4a241b] shadow-md backdrop-blur-sm"><Eye className="h-3.5 w-3.5" /> Quick view</button><button onClick={event => { event.stopPropagation(); addToCart(product); setCartOpen(true); }} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f59a44] text-[#4a241b] shadow-md transition-transform hover:scale-105" aria-label="Add to cart"><ShoppingBag className="h-4 w-4" /></button></div></div><div className="px-1 pb-1 pt-3"><div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-[#8e756c]"><Star className="h-3 w-3 fill-[#f59a44] text-[#f59a44]" />{product.rating} <span className="font-medium text-[#b1a097]">({product.reviews})</span></div><h3 className="line-clamp-2 min-h-[38px] text-[12px] font-extrabold leading-[1.35] text-[#4a241b] sm:text-[13px]">{product.name}</h3><div className="mt-2 flex items-baseline gap-2"><span className="text-sm font-black text-[#4a241b]">{formatNpr(product.price)}</span><span className="text-[10px] text-[#9ca79f] line-through">{formatNpr(product.compare)}</span></div><div className="mt-2 flex items-center gap-1 text-[10px] text-[#927d74]"><Truck className="h-3 w-3 text-[#cf6d2d]" /> <span className="truncate">{product.delivery}</span></div><div className="mt-2 hidden items-center gap-1 text-[10px] text-[#6f7d73] sm:flex"><BadgeCheck className="h-3 w-3 text-[#df7e3d]" /> {product.seller} · {product.city}</div></div></article>)}</div>
            {!filteredProducts.length && <div className="rounded-2xl border border-dashed border-[#eaded7] bg-white p-12 text-center text-sm text-[#8e756c]">No products in this category yet. Try another edit.</div>}
          </div>
        </section>

        <section className="container py-10 sm:py-14"><div className="rounded-[28px] bg-[#f0eadc] p-6 sm:p-9"><div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center"><div><p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#c86c2c]">Why xitosam?</p><h2 className="font-display max-w-[500px] text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-4xl">A better way to shop across Nepal.</h2><p className="mt-4 max-w-[510px] text-sm leading-6 text-[#68776d]">Small sellers get a bigger storefront. You get more choice, fair prices, and delivery updates that actually make sense.</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#435a4c]">✓ Verified sellers</span><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#435a4c]">✓ Easy returns</span><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#435a4c]">✓ Cash on delivery</span></div></div><div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"><div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffe7d5] text-[#c56a35]"><ShieldCheck className="h-5 w-5" /></div><div><div className="text-sm font-extrabold">Buyer protection</div><div className="mt-0.5 text-xs text-[#77847b]">Your order, our promise.</div></div></div><div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffe1c1] text-[#bc6a27]"><Truck className="h-5 w-5" /></div><div><div className="text-sm font-extrabold">Doorstep delivery</div><div className="mt-0.5 text-xs text-[#77847b]">From Kathmandu to Karnali.</div></div></div><div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6e2f3] text-[#6b5a9d]"><CircleHelp className="h-5 w-5" /></div><div><div className="text-sm font-extrabold">Human support</div><div className="mt-0.5 text-xs text-[#77847b]">We’re here when you need us.</div></div></div></div></div></div></section>
      </main>

      <footer className="bg-[#4a241b] px-4 py-10 text-[#f3d3c0] sm:py-14"><div className="container"><div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f59a44] text-xl font-black text-[#4a241b]">x</div><div className="font-display text-2xl font-extrabold tracking-[-0.07em] text-white">xitosam</div></div><p className="mt-4 max-w-[260px] text-sm leading-6 text-[#d5b4a5]">Nepal’s everyday marketplace — thoughtful products from sellers you can trust.</p><div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#ffbf74]"><span className="h-2 w-2 rounded-full bg-[#f59a44]" /> Made for every corner of Nepal</div></div><div><div className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-white">Shop</div><div className="space-y-3 text-sm text-[#d5b4a5]"><button onClick={() => setSelectedCategory("Mobiles")} className="block hover:text-white">Mobiles & electronics</button><button onClick={() => setSelectedCategory("Fashion")} className="block hover:text-white">Fashion & beauty</button><button onClick={() => setSelectedCategory("Grocery")} className="block hover:text-white">Grocery & home</button></div></div><div><div className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-white">Customer care</div><div className="space-y-3 text-sm text-[#d5b4a5]"><button onClick={() => setTrackOpen(true)} className="block hover:text-white">Track my order</button><button onClick={() => toast.info("Returns are available within 7 days on eligible items.")} className="block hover:text-white">Returns & refunds</button><button onClick={() => toast.info("Support chat is coming soon.")} className="block hover:text-white">Help center</button></div></div><div><div className="mb-4 text-xs font-black uppercase tracking-[0.15em] text-white">For sellers</div><p className="text-sm leading-6 text-[#d5b4a5]">Turn your local store into a Nepal-wide storefront.</p><button onClick={() => toast.success("Seller onboarding interest noted.", { description: "We’ll reach out when the partner portal is ready." })} className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#ffbf74]">Become a seller <ArrowRight className="h-3 w-3" /></button></div></div><div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[11px] text-[#d1a89a]"><span>© 2026 xitosam · Built for Nepal</span><span>Privacy · Terms · Seller promise</span></div></div></footer>


      {profileOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#351c1c]/50 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[28px] bg-[#fffaf4] p-5 shadow-2xl sm:p-8"><button onClick={() => setProfileOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#fff0e5] text-[#8a746a]" aria-label="Close profile"><X className="h-4 w-4" /></button><div className="flex flex-wrap items-start justify-between gap-4 pr-10"><div className="flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#4a241b] text-2xl font-black text-[#f59a44]">RS</div><div><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">{t.profile}</p><h2 className="font-display mt-1 text-3xl font-extrabold tracking-[-0.05em]">Riya Shrestha</h2><p className="mt-1 text-xs text-[#927d74]">9841234567 · Kathmandu, Nepal</p></div></div><div className="rounded-2xl bg-[#ffe9d4] px-3 py-2 text-[10px] font-extrabold text-[#ba5e35]"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" /> Buyer protected</div></div><div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl bg-[#f8eee5] p-1"><button onClick={() => setProfileTab("addresses")} className={`rounded-xl px-3 py-2.5 text-xs font-extrabold ${profileTab === "addresses" ? "bg-white text-[#4a241b] shadow-sm" : "text-[#8e756c]"}`}><MapPin className="mr-1 inline h-3.5 w-3.5" />{t.addresses}</button><button onClick={() => setProfileTab("wishlist")} className={`rounded-xl px-3 py-2.5 text-xs font-extrabold ${profileTab === "wishlist" ? "bg-white text-[#4a241b] shadow-sm" : "text-[#8e756c]"}`}><Heart className="mr-1 inline h-3.5 w-3.5" />{t.wishlist} <span className="ml-1 rounded-full bg-[#f59a44] px-1.5 py-0.5 text-[9px] text-[#4a241b]">{favorites.length}</span></button></div>{profileTab === "addresses" ? <div className="mt-6"><div className="mb-3 flex items-center justify-between"><div><h3 className="font-display text-lg font-extrabold">{t.addresses}</h3><p className="mt-1 text-xs text-[#927d74]">Manage where your xitosam parcels should arrive.</p></div><button onClick={() => setShowAddressForm(current => !current)} className="inline-flex items-center gap-1 rounded-xl bg-[#4a241b] px-3 py-2 text-xs font-extrabold text-white"><Plus className="h-3.5 w-3.5" />{t.addAddress}</button></div>{showAddressForm && <div className="mb-4 grid gap-3 rounded-2xl border border-[#eadfd8] bg-white p-4 sm:grid-cols-2"><input value={addressDraft.label} onChange={event => setAddressDraft(current => ({ ...current, label: event.target.value }))} placeholder="Label (Home / Work)" className="rounded-xl border border-[#eaded7] px-3 py-2.5 text-xs outline-none focus:border-[#f59a44]" /><input value={addressDraft.city} onChange={event => setAddressDraft(current => ({ ...current, city: event.target.value }))} placeholder="City" className="rounded-xl border border-[#eaded7] px-3 py-2.5 text-xs outline-none focus:border-[#f59a44]" /><input value={addressDraft.address} onChange={event => setAddressDraft(current => ({ ...current, address: event.target.value }))} placeholder="Street, area and landmark" className="rounded-xl border border-[#eaded7] px-3 py-2.5 text-xs outline-none focus:border-[#f59a44] sm:col-span-2" /><button onClick={saveDraftAddress} className="rounded-xl bg-[#f59a44] px-3 py-2.5 text-xs font-extrabold text-[#4a241b] sm:col-span-2">{t.saveAddress}</button></div>}<div className="grid gap-3 sm:grid-cols-2">{savedAddresses.map(address => <div key={address.id} className="rounded-2xl border border-[#eadfd8] bg-white p-4"><div className="flex items-start justify-between"><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffe6cf] text-[#c16f29]"><MapPin className="h-4 w-4" /></div><div><div className="text-sm font-extrabold">{address.label}</div><div className="text-[10px] text-[#927d74]">{address.recipient}</div></div></div>{address.isDefault && <span className="rounded-full bg-[#ffe7d2] px-2 py-1 text-[9px] font-black text-[#b96039]">Default</span>}</div><p className="mt-4 text-xs leading-5 text-[#64736a]">{address.address}, {address.city}<br />{address.province} · {address.phone}</p><div className="mt-4 flex gap-3 text-[10px] font-extrabold text-[#c86c2c]"><button onClick={() => setSavedAddresses(current => current.map(item => ({ ...item, isDefault: item.id === address.id })))}>Make default</button><button onClick={() => setSavedAddresses(current => current.filter(item => item.id !== address.id))} className="text-[#b5574b]"><Trash2 className="mr-1 inline h-3 w-3" />Remove</button></div></div>)}</div></div> : <div className="mt-6"><div className="mb-3"><h3 className="font-display text-lg font-extrabold">{t.wishlist}</h3><p className="mt-1 text-xs text-[#927d74]">Keep an eye on products you want to come back to.</p></div>{favorites.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{products.filter(product => favorites.includes(product.id)).map(product => <div key={product.id} className="overflow-hidden rounded-2xl border border-[#eadfd8] bg-white p-2"><img src={product.image} alt={product.name} className="aspect-square w-full rounded-xl object-cover" /><div className="p-2"><div className="line-clamp-2 text-xs font-extrabold">{product.name}</div><div className="mt-2 text-xs font-black">{formatNpr(product.price)}</div><button onClick={() => addToCart(product)} className="mt-3 w-full rounded-lg bg-[#f8eee5] py-2 text-[10px] font-extrabold">Add to bag</button></div></div>)}</div> : <div className="rounded-2xl border border-dashed border-[#eaded7] bg-white p-10 text-center"><Heart className="mx-auto h-7 w-7 text-[#cf6d2d]" /><p className="mt-3 text-sm font-extrabold">{t.emptyWishlist}</p><button onClick={() => { setProfileOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 rounded-xl bg-[#f59a44] px-4 py-2.5 text-xs font-extrabold text-[#4a241b]">{t.explore}</button></div>}</div>}</div></div>}

      {loginOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#351c1c]/50 p-4 backdrop-blur-sm"><div className="relative w-full max-w-[430px] rounded-[28px] bg-[#fffaf4] p-6 shadow-2xl sm:p-8"><button onClick={() => setLoginOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#fff0e5] text-[#8a746a]" aria-label="Close login"><X className="h-4 w-4" /></button><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4a241b] text-2xl font-black text-[#f59a44]">x</div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">{loginStep === "phone" ? "Welcome to xitosam" : "One quick check"}</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">{loginStep === "phone" ? "Your Nepal-first account." : "Enter your OTP."}</h2><p className="mt-3 text-sm leading-6 text-[#748179]">{loginStep === "phone" ? "Sign in with your Nepali mobile number to save addresses, track deliveries and checkout faster." : `We sent a 6-digit code to +977 ${phone}.`}</p>{loginStep === "phone" ? <div className="mt-7"><label className="mb-2 block text-xs font-extrabold text-[#486053]">Nepali mobile number</label><div className="flex overflow-hidden rounded-xl border border-[#eaded7] bg-white focus-within:border-[#f59a44] focus-within:ring-4 focus-within:ring-[#f59a44]/10"><div className="flex items-center gap-1 border-r border-[#e7ebe5] px-3 text-sm font-bold text-[#8a746a]">+977 <ChevronDown className="h-3 w-3" /></div><input autoFocus inputMode="numeric" maxLength={10} value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, ""))} onKeyDown={event => event.key === "Enter" && continueLogin()} placeholder="98XXXXXXXX" className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" /></div><p className="mt-2 text-[11px] text-[#8b978e]">We’ll send a one-time password. No spam, promise.</p><Button onClick={continueLogin} className="mt-6 h-12 w-full rounded-xl bg-[#4a241b] font-extrabold text-white hover:bg-[#1a4a37]">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button></div> : <div className="mt-7"><label className="mb-2 block text-xs font-extrabold text-[#486053]">6-digit OTP</label><input autoFocus inputMode="numeric" maxLength={6} value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ""))} onKeyDown={event => event.key === "Enter" && verifyLogin()} placeholder="· · · · · ·" className="h-14 w-full rounded-xl border border-[#eaded7] bg-white px-4 text-center text-2xl font-black tracking-[0.35em] outline-none focus:border-[#f59a44] focus:ring-4 focus:ring-[#f59a44]/10" /><Button onClick={verifyLogin} className="mt-6 h-12 w-full rounded-xl bg-[#4a241b] font-extrabold text-white hover:bg-[#1a4a37]">Verify & enter <ArrowRight className="ml-2 h-4 w-4" /></Button><button onClick={() => setLoginStep("phone")} className="mt-4 w-full text-center text-xs font-bold text-[#c86c2c]">Use a different number</button></div>}<div className="mt-7 flex items-center justify-center gap-2 text-[10px] font-bold text-[#8b978e]"><ShieldCheck className="h-3.5 w-3.5 text-[#5f9e73]" /> Your number stays private</div></div></div>}

      {locationOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#351c1c]/50 p-4 backdrop-blur-sm"><div className="relative w-full max-w-[480px] rounded-[28px] bg-[#fffaf4] p-6 shadow-2xl sm:p-8"><button onClick={() => setLocationOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#fff0e5] text-[#8a746a]" aria-label="Close location picker"><X className="h-4 w-4" /></button><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffe6cf] text-[#c16f29]"><MapPin className="h-6 w-6" /></div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">Delivery that fits your day</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">Where should we deliver?</h2><p className="mt-3 text-sm leading-6 text-[#748179]">We’ll show availability, delivery dates and nearby sellers for your area.</p><div className="mt-6 grid gap-2 sm:grid-cols-2">{(locationsQuery.data ?? [{ province: "Bagmati", cities: ["Kathmandu", "Lalitpur", "Bhaktapur"] }, { province: "Gandaki", cities: ["Pokhara", "Baglung"] }, { province: "Lumbini", cities: ["Butwal", "Bhairahawa"] }]).flatMap(location => location.cities.map(city => ({ city, province: location.province }))).slice(0, 9).map(location => <button key={`${location.city}-${location.province}`} onClick={() => { setSelectedLocation(`${location.city}, ${location.province}`); setLocationOpen(false); toast.success(`Delivering to ${location.city}`, { description: "Your feed is now personalized." }); }} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors hover:border-[#f59a44] hover:bg-[#fff7ed] ${selectedLocation.startsWith(location.city) ? "border-[#f59a44] bg-[#fff7ed]" : "border-[#eadfd8] bg-white"}`}><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#f59a44]" />{location.city}</span><span className="text-[10px] font-semibold text-[#85928a]">{location.province}</span></button>)}</div><div className="mt-6 rounded-xl bg-[#f8eee5] p-3 text-xs leading-5 text-[#8e756c]"><strong className="text-[#4a241b]">Tip:</strong> Availability can vary by seller. We’ll always show the earliest delivery date before you pay.</div></div></div>}

      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${cartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setCartOpen(false)} aria-hidden={!cartOpen}>
        <div className="absolute inset-0 bg-[#351c1c]/40 backdrop-blur-sm" />
        <div onClick={event => event.stopPropagation()} className={`absolute right-0 top-0 h-full w-full max-w-[430px] overflow-y-auto bg-[#fffaf4] p-5 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:p-7 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between"><div><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">Your bag · {cartCount} item{cartCount === 1 ? "" : "s"}</p><h2 className="font-display mt-1 text-3xl font-extrabold tracking-[-0.05em]">Ready to go?</h2></div><button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#fff0e5] transition-transform hover:rotate-90" aria-label="Close cart"><X className="h-4 w-4" /></button></div>
          {cartItems.length ? <><div className="mt-7 space-y-3">{cartItems.map(product => <div key={product.id} className="flex gap-3 rounded-2xl border border-[#eadfd8] bg-white p-3"><img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h3 className="line-clamp-2 text-xs font-extrabold leading-5">{product.name}</h3><div className="mt-1 text-sm font-black">{formatNpr(product.price)}</div><div className="mt-2 flex items-center gap-2"><button onClick={() => updateCartQuantity(product, (cart[product.id] ?? 1) - 1)} className="grid h-7 w-7 place-items-center rounded-lg bg-[#fff0e5] text-sm font-bold transition-transform hover:scale-105">−</button><span className="w-4 text-center text-xs font-bold">{cart[product.id]}</span><button onClick={() => addToCart(product)} className="grid h-7 w-7 place-items-center rounded-lg bg-[#fff0e5] text-sm font-bold transition-transform hover:scale-105">+</button><button onClick={() => updateCartQuantity(product, 0)} className="ml-auto text-[10px] font-extrabold text-[#b5574b] hover:underline">Remove</button></div></div></div>)}</div><div className="mt-7 rounded-2xl bg-[#f8eee5] p-4 text-sm"><div className="flex justify-between text-[#8e756c]"><span>Subtotal</span><span>{formatNpr(cartTotal)}</span></div><div className="mt-2 flex justify-between text-[#8e756c]"><span>Delivery</span><span className="font-bold text-[#ba5e35]">Calculated at checkout</span></div><div className="mt-4 flex justify-between border-t border-[#eaded7] pt-4 text-base font-black"><span>Estimated total</span><span>{formatNpr(cartTotal)}</span></div></div><Button onClick={openCheckout} className="mt-5 h-12 w-full rounded-xl bg-[#4a241b] font-extrabold text-white hover:bg-[#6d3529]">Continue to checkout <ArrowRight className="ml-2 h-4 w-4" /></Button><p className="mt-3 text-center text-[10px] text-[#8b978e]">Cash on delivery available in eligible locations</p></> : <div className="mt-20 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#f2eee3]"><ShoppingBag className="h-8 w-8 text-[#cf6d2d]" /></div><h3 className="font-display mt-5 text-xl font-extrabold">Your bag is waiting</h3><p className="mt-2 text-sm text-[#77847b]">Add a few good things and they’ll show up here.</p><button onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 rounded-xl bg-[#f59a44] px-5 py-3 text-xs font-extrabold text-[#4a241b]">Explore products</button></div>}
        </div>
      </div>

      {selectedProduct && <div className="fixed inset-0 z-[55] grid place-items-center bg-[#351c1c]/55 p-4 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}><div onClick={event => event.stopPropagation()} className="relative max-h-[92vh] w-full max-w-[900px] overflow-y-auto rounded-[30px] bg-[#fffaf4] p-4 shadow-2xl sm:p-7"><button onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#8a746a] shadow-sm transition-transform hover:rotate-90" aria-label="Close product quick view"><X className="h-4 w-4" /></button><div className="grid gap-7 lg:grid-cols-[1.02fr_1fr] lg:items-start"><div><div className="grid grid-cols-3 gap-2">{getProductDetails(selectedProduct).gallery.map((image, index) => <button key={image} onClick={() => setSelectedProduct(current => current ? { ...current, image } : current)} className={`overflow-hidden rounded-2xl border-2 ${index === 0 ? "border-[#f59a44]" : "border-transparent"}`}><img src={image} alt={`${selectedProduct.name} view ${index + 1}`} className="aspect-square w-full object-cover" /></button>)}</div><div className="mt-3 overflow-hidden rounded-[24px]" style={{ backgroundColor: selectedProduct.tone }}><img src={selectedProduct.image} alt={selectedProduct.name} className="aspect-square max-h-[460px] w-full object-cover" /></div></div><div className="pt-2 sm:pt-5"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#ffe7d2] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#ba5e35]">{selectedProduct.badge ?? "xitosam pick"}</span><span className="flex items-center gap-1 text-xs font-bold text-[#8e756c]"><Star className="h-3.5 w-3.5 fill-[#f59a44] text-[#f59a44]" /> {selectedProduct.rating} · {selectedProduct.reviews} reviews</span></div><h2 className="font-display mt-4 pr-10 text-3xl font-extrabold leading-tight tracking-[-0.05em] text-[#4a241b] sm:text-4xl">{selectedProduct.name}</h2><p className="mt-3 text-sm leading-6 text-[#8e756c]">{getProductDetails(selectedProduct).description}</p><div className="mt-5 flex items-baseline gap-3"><span className="text-2xl font-black text-[#4a241b]">{formatNpr(selectedProduct.price)}</span><span className="text-sm text-[#b1a097] line-through">{formatNpr(selectedProduct.compare)}</span></div><div className="mt-6 grid gap-2 rounded-2xl bg-[#fff0e2] p-4 sm:grid-cols-2">{getProductDetails(selectedProduct).specifications.map(spec => <div key={spec.label}><div className="text-[10px] font-black uppercase tracking-[0.1em] text-[#ba5e35]">{spec.label}</div><div className="mt-1 text-xs font-bold text-[#60443a]">{spec.value}</div></div>)}</div><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setCartOpen(true); }} className="h-12 flex-1 rounded-xl bg-[#f59a44] px-5 font-extrabold text-[#4a241b] shadow-[0_5px_0_#d77a2f] hover:bg-[#ffad59]">Buy now <ArrowRight className="ml-2 h-4 w-4" /></Button><button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="h-12 rounded-xl border border-[#eadfd7] bg-white px-5 text-xs font-extrabold text-[#4a241b] hover:border-[#f59a44]">Add to bag</button></div><div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#8e756c]"><Truck className="h-4 w-4 text-[#cf6d2d]" /> {selectedProduct.delivery}<span className="mx-1 text-[#d7bbae]">·</span><BadgeCheck className="h-4 w-4 text-[#df7e3d]" /> Seller verified</div></div></div></div></div>}
      {checkoutOpen && <div className="fixed inset-0 z-[60] grid place-items-center bg-[#351c1c]/60 p-4 backdrop-blur-sm" onClick={() => checkoutStep !== "processing" && setCheckoutOpen(false)}><div onClick={event => event.stopPropagation()} className="relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-[30px] bg-[#fffaf4] p-5 shadow-2xl sm:p-8"><button onClick={() => checkoutStep !== "processing" && setCheckoutOpen(false)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#fff0e5] text-[#8a746a] transition-transform hover:rotate-90 disabled:opacity-40" aria-label="Close checkout" disabled={checkoutStep === "processing"}><X className="h-4 w-4" /></button>{checkoutStep === "success" ? <div className="py-8 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#ffe7d2] text-[#ba5e35]"><BadgeCheck className="h-8 w-8" /></div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">Demo payment approved</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">Your order is on its way.</h2><p className="mx-auto mt-3 max-w-[380px] text-sm leading-6 text-[#8e756c]">This simulated checkout shows the handoff to a Nepal payment gateway. No real money was moved.</p><div className="mx-auto mt-6 max-w-[360px] rounded-2xl bg-[#fff0e2] p-4 text-left text-xs"><div className="flex justify-between"><span className="text-[#8e756c]">Payment reference</span><strong className="text-[#4a241b]">XIT-DEMO-{new Date().getFullYear()}</strong></div><div className="mt-2 flex justify-between"><span className="text-[#8e756c]">Paid with</span><strong className="capitalize text-[#4a241b]">{paymentMethod === "cod" ? "Cash on delivery" : paymentMethod}</strong></div><div className="mt-2 flex justify-between border-t border-[#eadfd7] pt-2"><span className="text-[#8e756c]">Total</span><strong className="text-[#4a241b]">{formatNpr(cartTotal)}</strong></div></div><Button onClick={() => { setCheckoutOpen(false); setCart({}); }} className="mt-7 h-12 w-full max-w-[360px] rounded-xl bg-[#4a241b] font-extrabold text-white hover:bg-[#6d3529]">Done <ArrowRight className="ml-2 h-4 w-4" /></Button></div> : checkoutStep === "processing" ? <div className="grid min-h-[360px] place-items-center py-10 text-center"><div><div className="mx-auto grid h-16 w-16 animate-pulse place-items-center rounded-full bg-[#ffe7d2] text-[#ba5e35]"><ShieldCheck className="h-8 w-8" /></div><h2 className="font-display mt-6 text-2xl font-extrabold">Connecting securely…</h2><p className="mt-2 text-sm text-[#8e756c]">Simulating {paymentMethod === "cod" ? "cash-on-delivery confirmation" : `${paymentMethod} gateway`} response.</p></div></div> : <><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">Secure checkout · demo mode</p><h2 className="font-display mt-2 pr-12 text-3xl font-extrabold tracking-[-0.05em]">Choose how to pay.</h2><p className="mt-3 text-sm leading-6 text-[#8e756c]">Select a payment method to preview the complete checkout handoff. This is a simulation only.</p><div className="mt-6 rounded-2xl bg-[#fff0e2] p-4"><div className="flex items-center justify-between text-xs"><span className="font-extrabold text-[#4a241b]">Order summary</span><span className="font-black text-[#4a241b]">{cartCount} item{cartCount === 1 ? "" : "s"}</span></div><div className="mt-3 space-y-2">{cartItems.slice(0, 3).map(product => <div key={product.id} className="flex justify-between gap-3 text-xs"><span className="truncate text-[#8e756c]">{product.name} × {cart[product.id]}</span><span className="shrink-0 font-bold text-[#4a241b]">{formatNpr(product.price * (cart[product.id] ?? 0))}</span></div>)}</div><div className="mt-3 flex justify-between border-t border-[#eadfd7] pt-3 text-sm font-black"><span>Total</span><span>{formatNpr(cartTotal)}</span></div></div><div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">{(["esewa", "khalti", "card", "cod"] as const).map(method => <button key={method} onClick={() => setPaymentMethod(method)} className={`rounded-2xl border px-3 py-3 text-left transition-all hover:-translate-y-0.5 ${paymentMethod === method ? "border-[#f59a44] bg-[#ffe7d2] shadow-[0_0_0_3px_rgba(245,154,68,.16)]" : "border-[#eadfd7] bg-white"}`}><div className="text-xs font-black capitalize text-[#4a241b]">{method === "cod" ? "Cash on delivery" : method}</div><div className="mt-1 text-[10px] text-[#8e756c]">{method === "cod" ? "Pay at door" : "Demo gateway"}</div></button>)}</div><div className="mt-6 flex items-center gap-2 rounded-xl border border-[#eadfd7] bg-white px-3 py-3 text-xs text-[#8e756c]"><ShieldCheck className="h-4 w-4 shrink-0 text-[#df7e3d]" /> Protected by xitosam buyer promise</div><Button onClick={simulatePayment} className="mt-6 h-12 w-full rounded-xl bg-[#f59a44] font-extrabold text-[#4a241b] shadow-[0_5px_0_#d77a2f] hover:bg-[#ffad59]">{paymentMethod === "cod" ? "Confirm cash on delivery" : `Pay with ${paymentMethod}`} <ArrowRight className="ml-2 h-4 w-4" /></Button></>}</div></div>}

      {trackOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#351c1c]/50 p-4 backdrop-blur-sm"><div className="relative w-full max-w-[510px] rounded-[28px] bg-[#fffaf4] p-6 shadow-2xl sm:p-8"><button onClick={() => setTrackOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#fff0e5] text-[#8a746a]" aria-label="Close tracking"><X className="h-4 w-4" /></button><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffe7d2] text-[#ba5e35]"><Truck className="h-6 w-6" /></div><p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#cf6d2d]">Order tracking</p><h2 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em]">Know where it is.</h2><p className="mt-3 text-sm leading-6 text-[#748179]">A clean view of your order journey, from a seller’s shelf to your doorstep.</p><div className="mt-7 rounded-2xl border border-[#eadfd8] bg-white p-4"><div className="flex items-center justify-between"><div><div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8b978e]">Latest order</div><div className="mt-1 text-sm font-black">{cartItems[0]?.name ?? "Your next xitosam order"}</div></div><span className="rounded-full bg-[#ffe7d2] px-2.5 py-1 text-[10px] font-black text-[#b96039]">On the way</span></div><div className="relative mt-8"><div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-[#d7e8dc]" /><div className="absolute left-4 top-4 h-1 w-[66%] rounded-full bg-[#df7e3d]" /><div className="relative flex justify-between"><div className="grid justify-items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#df7e3d] text-white"><PackageCheck className="h-4 w-4" /></span><span className="text-[10px] font-bold">Confirmed</span></div><div className="grid justify-items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#df7e3d] text-white"><Truck className="h-4 w-4" /></span><span className="text-[10px] font-bold">On the way</span></div><div className="grid justify-items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#d7e8dc] bg-white text-[#a7b6ab]"><MapPin className="h-4 w-4" /></span><span className="text-[10px] font-bold text-[#8b978e]">Delivered</span></div></div></div><div className="mt-7 flex items-center gap-2 rounded-xl bg-[#f8eee5] p-3 text-xs text-[#8e756c]"><Clock3 className="h-4 w-4 text-[#cf6d2d]" /> Estimated arrival: <strong className="text-[#4a241b]">Tomorrow, 11 AM – 2 PM</strong></div></div><button onClick={() => toast.info("Tracking search is ready for your order ID.")} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#eaded7] text-xs font-extrabold hover:border-[#f59a44]"><Search className="h-4 w-4" /> Track with order ID</button><p className="mt-4 flex items-center justify-center gap-1 text-[10px] text-[#8b978e]"><Phone className="h-3 w-3" /> SMS updates are available after sign in</p></div></div>}
    </div>
  );
}
