import React, { useState, useEffect } from 'react';
import { 
  Store, Zap, PiggyBank, ShieldCheck, Heart, 
  ArrowRight, Check, Sparkles, Star, ChevronDown, CheckCircle2,
  Calendar, PhoneCall, Trash2, ShoppingBag, Plus, Minus, Info, ClipboardList, Map, MessageSquare,
  Leaf, Percent, ChevronLeft, ChevronRight,
  Droplets, Sprout, Coffee, Flame, Shirt, GlassWater, Baby, Home, Cookie, Wheat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { reviewsData, faqData, categoriesData } from '../data/staticData';
import { productsData } from '../data/products';

// Stunning context-rich product slides celebrating Bhairahawa Fresh catalog
const heroSlides = [
  {
    id: 1,
    tag: "WELCOME TO BHAIRAHAWA FRESH",
    title: "Everything Your Home Needs, All Under One Roof",
    highlight: "All Under One Roof",
    desc: "Fresh groceries, trusted FMCG brands, unpolished pulses, daily essentials, and baby care. Sourced directly, uniform pricing, and zero hidden markups.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpQyVfBPaX4ekjGMrchJ4IRFBtQMoNwraga1O6el-s36exdbdHizzoLgzTGtW9wTdBgC3Dx4K8WqIF-iWbIqeUE4B5LvIuAoIPolMgmfT8gJaQyjJvOWlbLAOqNlusP-Gorj0lskwJjpkJ1D1awwEquSQ_-QrH_UdlJBTb3ro1tmQZaXGfSxc1u8KtEOENK9r2PbU6KuxPYO7ZwbRQedHbssgi1n_LFXJpvp1T27vDirn2Fe9_g5Dl",
    actionText: "Shop Catalog Items",
    actionView: "products",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-md",
  },
  {
    id: 2,
    tag: "100% ORGANIC & DUST-FREE",
    title: "Crispest Green Harvests Sifted at Dawn",
    highlight: "Sifted at Dawn",
    desc: "Our team selects regional leafy greens, spinach, coriander, and seasonal veggies every morning. Sorted and clean-packed before dispatch for maximum health.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASnY88-dMiwS1n-4G6mBhxQzTVqOQTImkNC-4O3MbZIO-dPgstbN1xJmrqSiku_dHeLmOTCPqBNEoYVzoLvrQ1UjoVvrlUHYP8EjMAO4I9RcyAZ-V1H2Rib2vo_HR7n-lDSK3vO24BbEaDgk01InIO2RnXhud-yiL6c4vT-Kai7b_WDyEfnHBciixBGnuuLzk7pE-wMgzalTwYE9jmllBKnsB4i3J59I7z2cn9zT7quCtw4blvs473",
    actionText: "Shop Fresh Greens",
    actionView: "products",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-md",
  },
  {
    id: 3,
    tag: "UNPOLISHED & HIGH PROTEIN",
    title: "Raw Unpolished Grains & Pure Lentils",
    highlight: "Pure Lentils",
    desc: "High quality Masoor Dal, rich pulses, and premium grain varieties sourced directly from Terai farmers. Air-sifted, moisture-safe, and free of sand.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDImpaZOGB41ofPGYX0Wz_nr9EPAcHlaE_wRZl9l5Hfd3o_fVFlFLEx97jxxPyufJPJdMoEc3i_hFVkEDLtLtHpgwDejgKZO0ukKqbj9T-JfubfmMmTzSXBYlFtztQ2rrjCncEs_xCsir9CahzemtbX8KivsMBXhf61WUL02pTOy7t6ysoNe0jqJJdtBihoZi6KU3ZewlCkK0CENXJp7w87a1FM8eXy9e_uBUR_tBGpWRSpJ72DbZ3s",
    actionText: "Explore Pure Pulses",
    actionView: "products",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/30 backdrop-blur-md",
  },
  {
    id: 4,
    tag: "SWEET & NATURALLY RIPENED",
    title: "Handpicked Premium Fruits From Trusted Orchards",
    highlight: "Trusted Orchards",
    desc: "From crisis mountain apples to sweet tropical treats. Sourced whole, transport-padded, and packed lovingly to avoid soft-bruising or kitchen spoilage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55gdSmFBxby5EKxy5DHx24V6LvOBGf3HiT-AJdBG48ReQ4mjebGpGAiNlh0T9di-gBLOow-eGHzwEzN3AB-35pJ-Xp3OpZhcxePamsqhPen9zAc30q1HeLM_mguJ6pEYSb7_w3N3lOm_8r2ccRLwk5nTTpsZZfhI47QO-scZItcYNaOuBzbMBUAsxC0LloTuAuhW_0Qwx9qPJLfkVIds02uV_SZfzcyDzn9Vm9tUtrEaxFxUiSxa-",
    actionText: "Shop Fresh Fruits",
    actionView: "products",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-md",
  },
  {
    id: 5,
    tag: "60-MINUTE GARRISON COURIER",
    title: "Rapid Siddharthanagar Dispatch & Home Delivery",
    highlight: "Home Delivery",
    desc: "Swift, local, uniform delivery setup covering Bhairahawa. Free shipping on every order above Rs. 999 to save your household budget.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQXzJE_Z4jlYiJnHntil4SjDUjKD-wjnk6jIG4CV2hVQwEHwDsd8NzucRXRUkWmVm-DLOUilMJteMU7laA3416rPgb198jniW-kh9K4ciiU8UuFZwNPnSMfeLAtFF2GEkhGEuVB-sn-LqzNzhdOYskja_lOVA7TCKM9AEq9tHZOYkTJ8wErgj_uk5OBlr47lVbDsc71DpAuu9yQ0k37vXZVUC3aXA8WOQ0MqzDzodYvhmZGJOQRF75",
    actionText: "Verify Delivery Rates",
    actionView: "delivery",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/30 backdrop-blur-md",
  },
  {
    id: 6,
    tag: "EVERYDAY REFRESHMENT ESSENTIALS",
    title: "Rich Organic Tea, Himalayan Coffees & Fresh Dairy",
    highlight: "Himalayan Coffees",
    desc: "Kickstart your morning with pure Orthodox tea, rich Himalayan coffee blends, and fresh dairy essentials stocked and sorted at chilly shelf climates.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyhze7oQZSyhR2VlujSLeUnnjyYAXjA5f_k2lublM1vBuhYag9_M2htaDxyzNL6hxG6gKTvgMj-9YrFSiuR5GruHpFldCQ-quanzjcPOyVgppUEqYZv2cUADMdO0xqKGChp1DfF_5rsik0buHgXLc7dKY6yj846psYK3Vz_G_rqnaaqEu8XUTU5Iuu5lL4H866I4OKZdAHhXCRFHb411HL6Q43bDW7qJN3mNOZjIGcfIhp3KjgncCd",
    actionText: "Discover Hot Offers",
    actionView: "offers",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-md",
  }
];

// Custom slide motion configurations
const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
    zIndex: 1
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 80 : -80,
    zIndex: 0
  })
};

const categoryStyles: Record<string, {
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBg: string;
  hoverBorder: string;
  hoverShadow: string;
  iconBg: string;
  iconColor: string;
  hoverIconBg: string;
  hoverIconColor: string;
}> = {
  "Rice": {
    color: "text-emerald-800",
    bgColor: "bg-emerald-50/60",
    borderColor: "border-emerald-100",
    hoverBg: "hover:bg-emerald-600",
    hoverBorder: "hover:border-emerald-600",
    hoverShadow: "hover:shadow-emerald-600/20",
    iconBg: "bg-emerald-150/80",
    iconColor: "text-emerald-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Flour": {
    color: "text-amber-800",
    bgColor: "bg-amber-50/60",
    borderColor: "border-amber-100",
    hoverBg: "hover:bg-amber-600",
    hoverBorder: "hover:border-amber-600",
    hoverShadow: "hover:shadow-amber-600/20",
    iconBg: "bg-amber-150/80",
    iconColor: "text-amber-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Oils": {
    color: "text-yellow-800",
    bgColor: "bg-yellow-50/60",
    borderColor: "border-yellow-100",
    hoverBg: "hover:bg-yellow-500",
    hoverBorder: "hover:border-yellow-500",
    hoverShadow: "hover:shadow-yellow-500/20",
    iconBg: "bg-yellow-150/85",
    iconColor: "text-yellow-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Pulses": {
    color: "text-teal-800",
    bgColor: "bg-teal-50/60",
    borderColor: "border-teal-100",
    hoverBg: "hover:bg-teal-600",
    hoverBorder: "hover:border-teal-600",
    hoverShadow: "hover:shadow-teal-600/20",
    iconBg: "bg-teal-150/80",
    iconColor: "text-teal-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Sugar/Salt": {
    color: "text-sky-850",
    bgColor: "bg-sky-50/60",
    borderColor: "border-sky-100",
    hoverBg: "hover:bg-sky-600",
    hoverBorder: "hover:border-sky-600",
    hoverShadow: "hover:shadow-sky-600/20",
    iconBg: "bg-sky-150/80",
    iconColor: "text-sky-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Tea/Coffee": {
    color: "text-amber-900",
    bgColor: "bg-orange-50/60",
    borderColor: "border-orange-100",
    hoverBg: "hover:bg-orange-600",
    hoverBorder: "hover:border-orange-600",
    hoverShadow: "hover:shadow-orange-600/20",
    iconBg: "bg-orange-150/80",
    iconColor: "text-orange-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Spices": {
    color: "text-red-800",
    bgColor: "bg-red-50/60",
    borderColor: "border-red-100",
    hoverBg: "hover:bg-red-600",
    hoverBorder: "hover:border-red-600",
    hoverShadow: "hover:shadow-red-600/20",
    iconBg: "bg-red-150/80",
    iconColor: "text-red-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Soap": {
    color: "text-indigo-805",
    bgColor: "bg-indigo-50/60",
    borderColor: "border-indigo-100",
    hoverBg: "hover:bg-indigo-600",
    hoverBorder: "hover:border-indigo-600",
    hoverShadow: "hover:shadow-indigo-600/20",
    iconBg: "bg-indigo-150/80",
    iconColor: "text-indigo-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Detergent": {
    color: "text-blue-805",
    bgColor: "bg-blue-50/60",
    borderColor: "border-blue-100",
    hoverBg: "hover:bg-blue-600",
    hoverBorder: "hover:border-blue-600",
    hoverShadow: "hover:shadow-blue-600/20",
    iconBg: "bg-blue-150/80",
    iconColor: "text-blue-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Personal Care": {
    color: "text-purple-800",
    bgColor: "bg-purple-50/60",
    borderColor: "border-purple-100",
    hoverBg: "hover:bg-purple-600",
    hoverBorder: "hover:border-purple-600",
    hoverShadow: "hover:shadow-purple-600/20",
    iconBg: "bg-purple-150/80",
    iconColor: "text-purple-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Snacks": {
    color: "text-rose-800",
    bgColor: "bg-rose-50/60",
    borderColor: "border-rose-100",
    hoverBg: "hover:bg-rose-600",
    hoverBorder: "hover:border-rose-600",
    hoverShadow: "hover:shadow-rose-600/20",
    iconBg: "bg-rose-150/80",
    iconColor: "text-rose-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Beverages": {
    color: "text-cyan-805",
    bgColor: "bg-cyan-50/60",
    borderColor: "border-cyan-100",
    hoverBg: "hover:bg-cyan-600",
    hoverBorder: "hover:border-cyan-600",
    hoverShadow: "hover:shadow-cyan-600/20",
    iconBg: "bg-cyan-150/80",
    iconColor: "text-cyan-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Baby Care": {
    color: "text-pink-800",
    bgColor: "bg-pink-50/60",
    borderColor: "border-pink-100",
    hoverBg: "hover:bg-pink-600",
    hoverBorder: "hover:border-pink-600",
    hoverShadow: "hover:shadow-pink-600/20",
    iconBg: "bg-pink-150/80",
    iconColor: "text-pink-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  },
  "Household": {
    color: "text-stone-800",
    bgColor: "bg-stone-50/60",
    borderColor: "border-stone-200",
    hoverBg: "hover:bg-stone-700",
    hoverBorder: "hover:border-stone-700",
    hoverShadow: "hover:shadow-stone-700/20",
    iconBg: "bg-stone-150/80",
    iconColor: "text-stone-700",
    hoverIconBg: "group-hover:bg-white/20",
    hoverIconColor: "group-hover:text-white"
  }
};

const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'Rice':
      return <Wheat className="w-5 h-5 transition-transform duration-300" />;
    case 'Flour':
      return <Wheat className="w-5 h-5 opacity-80 transition-transform duration-300" />;
    case 'Oils':
      return <Droplets className="w-5 h-5 transition-transform duration-300" />;
    case 'Pulses':
      return <Sprout className="w-5 h-5 transition-transform duration-300" />;
    case 'Sugar/Salt':
      return <Cookie className="w-5 h-5 transition-transform duration-300" />;
    case 'Tea/Coffee':
      return <Coffee className="w-5 h-5 transition-transform duration-300" />;
    case 'Spices':
      return <Flame className="w-5 h-5 transition-transform duration-300" />;
    case 'Soap':
      return <Sparkles className="w-5 h-5 transition-transform duration-300" />;
    case 'Detergent':
      return <Shirt className="w-5 h-5 transition-transform duration-300" />;
    case 'Personal Care':
      return <Heart className="w-5 h-5 transition-transform duration-300" fill="currentColor" />;
    case 'Snacks':
      return <Cookie className="w-5 h-5 transition-transform duration-300" />;
    case 'Beverages':
      return <GlassWater className="w-5 h-5 transition-transform duration-300" />;
    case 'Baby Care':
      return <Baby className="w-5 h-5 transition-transform duration-300" />;
    case 'Household':
      return <Home className="w-5 h-5 transition-transform duration-300" />;
    default:
      return <Sparkles className="w-5 h-5 transition-transform duration-300" />;
  }
};

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function HomeView({ onNavigate, onAddToCart }: HomeViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const topCategories = categoriesData.slice(0, 7);

  const handleAddToCartWithMsg = (p: Product) => {
    onAddToCart(p);
    setSuccessMsg(`Added ${p.name} to your basket!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const popularFour = productsData.filter(p => p.isPopular).slice(0, 4);

  // Navigation functions
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Autoplay function that resets interval automatically upon manual clicks
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const activeSlide = heroSlides[currentSlide];

  // Title highlight parser helper
  const renderTitle = (title: string, highlight: string) => {
    if (!highlight) {
      return <span className="text-white drop-shadow-sm">{title}</span>;
    }
    const index = title.indexOf(highlight);
    if (index === -1) {
      return <span className="text-white drop-shadow-sm">{title}</span>;
    }
    const part1 = title.substring(0, index);
    const part2 = title.substring(index + highlight.length);
    return (
      <>
        <span className="text-white drop-shadow-sm">{part1}</span>
        <span className="text-amber-300 bg-amber-500/20 border border-amber-400/20 px-2 lg:px-3 py-0.5 rounded-2xl whitespace-nowrap inline-block mx-1">
          {highlight}
        </span>
        <span className="text-white drop-shadow-sm">{part2}</span>
      </>
    );
  };

  return (
    <div className="relative overflow-x-hidden">
      
      {/* Toast Alert for Instant Feedback */}
      {successMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-gray-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-slide-up border border-gray-805 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[3]" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Hero Section Carousel */}
      <section className="group relative min-h-[580px] lg:h-[640px] bg-gray-950 flex items-center overflow-hidden select-none">
        
        {/* Animated Carousel Slides */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 220, damping: 26 },
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0 w-full h-full flex items-center"
          >
            {/* Background Full-Width Image Container */}
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-700 brightness-[0.82] saturate-[1.1]" 
                style={{ backgroundImage: `url('${activeSlide.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"></div>
            </div>

            {/* Content Box */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <div className="max-w-2xl text-left bg-transparent">
                
                {/* Tag Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border ${activeSlide.badgeClass}`}
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-450" />
                  <span>{activeSlide.tag}</span>
                </motion.div>

                {/* Animated Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.15] mb-5 text-white drop-shadow-md"
                >
                  {renderTitle(activeSlide.title, activeSlide.highlight)}
                </motion.h1>

                {/* Animated Description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="font-sans text-base sm:text-lg text-gray-200/95 max-w-xl mb-8 leading-relaxed drop-shadow-sm"
                >
                  {activeSlide.desc}
                </motion.p>

                {/* Styled Buttons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex flex-wrap gap-3.5 mb-10"
                >
                  <button
                    onClick={() => onNavigate(activeSlide.actionView)}
                    className="bg-emerald-600 hover:bg-emerald-550 active:scale-95 text-white font-bold px-7 py-4 rounded-xl text-sm tracking-wide shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center gap-1 font-sans"
                  >
                    {activeSlide.actionText} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('price-list')}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md active:scale-95 font-bold px-7 py-3.5 rounded-xl text-sm transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                  >
                    <ClipboardList className="w-4 h-4 text-emerald-400" /> View Today's Prices
                  </button>
                </motion.div>

                {/* Quick trust metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-gray-200 font-medium text-xs font-sans"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>100% Quality Produce</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>Wholesale Rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>60 Mins Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>100+ Catalog Items</span>
                  </div>
                </motion.div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Floating Chevrons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-35 p-3 rounded-full bg-black/30 hover:bg-black/55 text-white border border-white/10 backdrop-blur-sm shadow-md transition-all active:scale-90 cursor-pointer flex items-center justify-center opacity-70 lg:opacity-0 group-hover:lg:opacity-100 duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-35 p-3 rounded-full bg-black/30 hover:bg-black/55 text-white border border-white/10 backdrop-blur-sm shadow-md transition-all active:scale-90 cursor-pointer flex items-center justify-center opacity-70 lg:opacity-0 group-hover:lg:opacity-100 duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Slide indicators progress dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-35 flex items-center gap-2 bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide 
                  ? 'w-6 bg-emerald-400' 
                  : 'w-2 bg-white/35 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* Trust Blocks */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5 font-sans">Beloved Local Store</h3>
                <p className="text-gray-550 text-xs leading-relaxed">
                  Proudly serving the families, cafes &amp; restaurants across Bhairahawa with care.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5 font-sans">Express Dispatch</h3>
                <p className="text-gray-550 text-xs leading-relaxed">
                  Quick neighborhood couriers deliver your basket safely within 60 minutes.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                <PiggyBank className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5 font-sans">Affordable Direct pricing</h3>
                <p className="text-gray-550 text-xs leading-relaxed">
                  No hidden retail margins. We guarantee genuine pricing cheaper than standard storefronts.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5 font-sans">Strictest Hygiene Check</h3>
                <p className="text-gray-550 text-xs leading-relaxed">
                  We hand-filter every bag. Only neat, well-packaged, long-shelf goods make it onto our list.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Shoppable Categories Bar */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
              Shop By Nature's Categories
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 font-medium">
              Explore meticulously curated sectors to stock up your pantry and look after your home.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categoriesData.map((cat, idx) => {
              const style = categoryStyles[cat.name] || {
                color: "text-emerald-800",
                bgColor: "bg-emerald-50/60",
                borderColor: "border-emerald-100",
                hoverBg: "hover:bg-emerald-600",
                hoverBorder: "hover:border-emerald-600",
                hoverShadow: "hover:shadow-emerald-600/20",
                iconBg: "bg-emerald-150/80",
                iconColor: "text-emerald-700",
                hoverIconBg: "group-hover:bg-white/20",
                hoverIconColor: "group-hover:text-white"
              };
              return (
                <motion.div
                  key={cat.name}
                  onClick={() => onNavigate('products')}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: idx * 0.03, 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15 
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.04,
                    transition: { type: "spring", stiffness: 350, damping: 14 }
                  }}
                  whileTap={{ scale: 0.96 }}
                  className={`group p-5 rounded-2xl border ${style.borderColor} ${style.bgColor} shadow-sm cursor-pointer ${style.hoverBg} ${style.hoverBorder} ${style.hoverShadow} transition-all duration-300 text-center relative overflow-hidden flex flex-col justify-between h-[135px]`}
                >
                  <div className={`w-12 h-12 ${style.iconBg} ${style.hoverIconBg} ${style.iconColor} ${style.hoverIconColor} rounded-xl mb-2 mx-auto flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110`}>
                    {getCategoryIcon(cat.name)}
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className={`font-bold text-sm ${style.color} group-hover:text-white transition-colors duration-300 block leading-tight truncate w-full`}>
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-300 text-white/95 mt-0.5 font-bold flex items-center gap-0.5">
                      Shop <ArrowRight className="w-2.5 h-2.5 animate-pulse" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('products')}
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-all inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              Examine All 14 Categories Catalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured / Popular Products Grid (First 4) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">Prakriti Handpicks</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans mb-1">
                Today's Featured Hot products
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                Most popular kitchen needs and daily solutions selected by families in Bhairahawa.
              </p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-all flex items-center gap-1 text-left cursor-pointer group"
            >
              See Detailed 100+ Catalog 
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFour.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                
                {/* Product Image Box */}
                <div className="relative aspect-square w-full bg-emerald-50/10 p-4 flex items-center justify-center overflow-hidden border-b border-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.inStock === 'Limited Stock' && (
                    <span className="absolute top-4 left-4 bg-amber-550 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Limited Stock
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5 font-mono">
                    {product.brand}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base mb-1 truncate group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mb-4">
                    Pristine Weight: {product.weight}
                  </p>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <div>
                      <span className="text-[10px] text-gray-400 block -mb-0.5">Today's Rate</span>
                      <span className="text-lg font-extrabold text-emerald-700">Rs. {product.price}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCartWithMsg(product)}
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      Add +
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Detailed Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
              Why Customers Love Bhairahawa Fresh?
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              We leverage strong direct rural connections and clean modern packaging workflows to maintain consistent excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl mb-4 flex items-center justify-center mx-auto">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-950 text-sm mb-2 font-sans">Direct Wholesale Pricing</h4>
              <p className="text-gray-550 text-xs leading-relaxed">
                We bridge the gap directly from Nepalese mills and packaging units to bring you standard rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl mb-4 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-950 text-sm mb-2 font-sans">Untouched Freshness</h4>
              <p className="text-gray-550 text-xs leading-relaxed">
                Hygiene is our highest directive. Bags are filtered, vacuum checked, and handled with gloves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl mb-4 flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-950 text-sm mb-2 font-sans">60 Max Mins Delivery</h4>
              <p className="text-gray-550 text-xs leading-relaxed">
                Our in-house delivery pilots know the optimal shortcuts of Bhairahawa town for flash dispatch.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl mb-4 flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-950 text-sm mb-2 font-sans">Satisfaction Guarantee</h4>
              <p className="text-gray-555 text-xs leading-relaxed">
                Not fully satisfied with the grain size or freshness of the oil? Simple replacement policy applies!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Festive / Weekly Offer callouts */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden text-white flex flex-col lg:flex-row items-center gap-8 shadow-xl shadow-emerald-950/10">
            
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
              <Leaf className="w-96 h-96 text-white stroke-[0.5]" />
            </div>

            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-850 text-emerald-350 text-xs font-bold px-3 py-1 mb-4 rounded-full border border-emerald-800">
                <Percent className="w-3.5 h-3.5 fill-emerald-350/10" /> Today's Exclusive Bundles
              </div>
              <h3 className="text-2.5xl sm:text-4xl font-extrabold font-sans leading-tight mb-4">
                Grand Festival Combo Pack: <br />
                Get 1 Kg Sugar Free with 25 Kg Rice!
              </h3>
              <p className="text-emerald-100/80 text-sm mb-8 max-w-xl">
                We're celebrating the harvest season by offering custom kitchen rewards. Claim your promo coupon directly, or let our delivery pilot bundle your products right now.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => onNavigate('offers')}
                  className="px-6 py-3.5 bg-amber-550 hover:bg-amber-600 text-white font-bold text-sm rounded-xl tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Explore Weekly Offers
                </button>
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold text-sm rounded-xl border border-emerald-700 transition-all active:scale-95 cursor-pointer"
                >
                  Browse Products
                </button>
              </div>
            </div>

            <div className="w-full lg:max-w-sm flex-shrink-0 z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-left">
                <div className="text-xs uppercase tracking-widest text-emerald-350 font-bold font-mono mb-2">Claim Code inside Card</div>
                <div className="text-3xl font-extrabold mb-1 font-mono text-amber-400">FRESH15</div>
                <div className="text-xs text-white/85 mb-4">Get 15% flat off on Baby Care, soaps and Detergents catalog items during checkout.</div>
                
                <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                  <span className="text-white/60">Validity: Today Only!</span>
                  <button 
                    onClick={() => { alert('Discount Code FRESH15 compiled successfully! Copy this code to apply at Checkout.'); }}
                    className="px-3 py-1 bg-white hover:bg-gray-100 text-emerald-800 rounded-lg font-bold hover:scale-105 transition-all cursor-pointer"
                  >
                    Claim Coupon
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Story / About Banner Snippet */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative bg-emerald-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXzJE_Z4jlYiJnHntil4SjDUjKD-wjnk6jIG4CV2hVQwEHwDsd8NzucRXRUkWmVm-DLOUilMJteMU7laA3416rPgb198jniW-kh9K4ciiU8UuFZwNPnSMfeLAtFF2GEkhGEuVB-sn-LqzNzhdOYskja_lOVA7TCKM9AEq9tHZOYkTJ8wErgj_uk5OBlr47lVbDsc71DpAuu9yQ0k37vXZVUC3aXA8WOQ0MqzDzodYvhmZGJOQRF75" 
                alt="Bhairahawa Fresh Aawa Road Store"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-emerald-950/10"></div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">Our Heritage</span>
              <h2 className="text-2xl sm:text-3.5xl font-bold text-gray-900 tracking-tight font-sans mb-5 leading-tight">
                Serving the Heart of Bhairahawa Since 2018
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Bhairahawa Fresh started on beautiful Aawa Road with a simple localized goal: to provide Nepalese households with pristine, thoroughly sifted quality staples and unpolished local items without dealing with overcrowded bazaars.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Today, we have expanded to serve over 5,000 families across Bhairahawa, offering a beautiful digital shopping experience and quick deliveries, but keeping our warm community-first attitude fully intact.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl border border-gray-150">
                  <div className="text-2xl font-extrabold text-emerald-700 font-mono">5k+</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-450 mt-1">Families Served</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-150">
                  <div className="text-2xl font-extrabold text-emerald-700 font-mono">100+</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-450 mt-1">Staples items</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-150">
                  <div className="text-2xl font-extrabold text-emerald-700 font-mono">60 Min</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-450 mt-1">Avg Dispatch</div>
                </div>
              </div>

              <div className="mt-8 text-left">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Read Our Full Story
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials Slider/Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">Customer Reviews</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
              What Bhairahawa Residents Say
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              We focus on building customer trust by being completely transparent under every metric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsData.map((rev) => (
              <div 
                key={rev.name}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-650 text-sm italic leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-150">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    {rev.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{rev.name}</h5>
                    <span className="text-[10px] text-gray-450 uppercase font-mono tracking-widest">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Find answers to standard localized queries about route coverage, pricing updates, and WhatsApp dispatching.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full px-6 py-4.5 flex justify-between items-center text-left hover:bg-emerald-50/20 text-gray-900 font-bold text-sm tracking-tight transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed pt-1 select-text border-t border-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
