import React, { useState } from 'react';
import { 
  Percent, Sparkles, AlertCircle, Copy, Check, Flame, Award, Gift, ArrowRight
} from 'lucide-react';

interface OffersViewProps {
  onNavigate: (view: string) => void;
}

export default function OffersView({ onNavigate }: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons = [
    { 
      code: "FRESH15", 
      discount: "15% FLAT OFF", 
      scope: "Baby Care, Soaps & Detergents", 
      criteria: "No minimum spend required.",
      expiry: "Valid till Sunday midnight",
      bgClass: "from-amber-500 to-orange-600 text-white" 
    },
    { 
      code: "STAPLES50", 
      discount: "Rs. 100 BONUS OFF", 
      scope: "Pantry Staples & Grain orders", 
      criteria: "On orders exceeding Rs. 1,999.",
      expiry: "Valid till end of month",
      bgClass: "from-emerald-600 to-teal-800 text-white" 
    },
    { 
      code: "FREEBHAIRAHAWA", 
      discount: "100% FREE SHIPPING", 
      scope: "Any purchase across town", 
      criteria: "On standard routes > Rs. 999.",
      expiry: "Valid ongoing promo",
      bgClass: "from-blue-600 to-indigo-850 text-white" 
    }
  ];

  const combos = [
    { 
      title: "Prakriti Daily Kitchen Pack", 
      includes: "25kg Aarati Jeera Rice, 1 Ltr Dhara Mustard Oil, 10kg Aashirvaad Atta", 
      price: 3255, 
      original: 3355, 
      savings: 100, 
      badge: "Best Seller" 
    },
    { 
      title: "Morning Chai & Sweet Starter", 
      includes: "500g Tokla Gold Tea, 1kg Fine Sugar, 1kg 黄 yellow Moong Dal", 
      price: 545, 
      original: 595, 
      savings: 50, 
      badge: "Weekly Special" 
    },
    { 
      title: "Family Hygiene bundle", 
      includes: "4pk Dettol Soap, 1kg Surf Excel, 500ml Harpic Toilet Cleaner", 
      price: 585, 
      original: 635, 
      savings: 50, 
      badge: "Pantry Defender" 
    }
  ];

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    navigator.clipboard?.writeText?.(code);
    setTimeout(() => setCopiedCode(null), 3500);
  };

  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-orange-50 border border-orange-105 text-orange-600 mb-3 animate-pulse">
            <Percent className="w-6 h-6" />
          </div>
          <h1 className="text-2.5xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            Special Deals &amp; Super Combos
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Boost your family savings! Claim high-value digital coupons or lock in pre-packaged kitchen combinations assembled specially to reduce your monthly bills.
          </p>
        </div>

        {/* Claimable Coupons Cards Section */}
        <div className="mb-12">
          <div className="text-left mb-6 flex items-center justify-between border-b border-gray-150 pb-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sans flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> Dynamic Digital Coupons
            </h3>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Copy to checkout!</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => {
              const isClaimed = copiedCode === coupon.code;
              return (
                <div 
                  key={coupon.code}
                  className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-emerald-100 transition-all text-left"
                >
                  <div className={`p-6 bg-gradient-to-br ${coupon.bgClass}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block mb-1">Claim Promo Token</span>
                    <h4 className="text-xl sm:text-2xl font-extrabold font-sans leading-none mb-1">{coupon.discount}</h4>
                    <p className="text-xs text-white/90 font-medium">For: {coupon.scope}</p>
                  </div>

                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-paragraph text-gray-650 font-bold">{coupon.criteria}</div>
                      <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-emerald-600" /> {coupon.expiry}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-4">
                      <div>
                        <span className="text-[9px] text-gray-400 block font-mono -mb-0.5">Voucher Code</span>
                        <strong className="text-sm font-extrabold text-gray-805 tracking-wider font-mono">{coupon.code}</strong>
                      </div>
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className={`px-4.5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 ${
                          isClaimed
                            ? 'bg-emerald-650 text-white shadow-sm shadow-emerald-650/10'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {isClaimed ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlighted Festival Combos Grid */}
        <div className="mb-12">
          <div className="text-left mb-6 flex items-center justify-between border-b border-gray-150 pb-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sans flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" /> Assembled Harvest Combos
            </h3>
            <span className="text-[10px] text-gray-400 font-semibold font-mono">1-CLICK CART ASSEMBLY DIRECTLY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {combos.map((combo) => (
              <div 
                key={combo.title}
                className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-7 shadow-sm text-left hover:border-emerald-100/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <span className="bg-emerald-50 text-emerald-805 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      {combo.badge}
                    </span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                      Save Rs. {combo.savings}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-gray-905 font-sans leading-snug mb-2">
                    {combo.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium mb-6">
                    <strong className="text-gray-700 font-semibold block">Box Contents:</strong>
                    {combo.includes}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-4">
                  <div>
                    <span className="text-xs text-gray-400 line-through block font-mono">Rs. {combo.original}</span>
                    <strong className="text-xl font-extrabold text-emerald-700">Rs. {combo.price}</strong>
                  </div>
                  
                  <button
                    onClick={() => {
                      alert(`Awesome choice! This combination pack has been prepared dynamically. You can add each product ('Premium Jeera Rice Aarati', 'Mustard Oil Pure Dhara', 'Chakki Atta Fresh Aashirvaad') separately to cart to claim coupon discount.`);
                      onNavigate('products');
                    }}
                    className="px-4 py-2.5 bg-emerald-750 hover:bg-emerald-850 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    Select Combo <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent advice info banner */}
        <div className="bg-amber-50 border border-amber-150 p-4.5 rounded-2xl text-amber-800 text-left max-w-4xl mx-auto flex gap-3 text-xs sm:text-sm items-start">
          <AlertCircle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="font-bold text-amber-900 block mb-0.5">Disclaimer regarding Seasonal Bundles</strong>
            <span>
              All discount codes must be quoted beforehand over WhatsApp call verification or typed into the checkout instructions. Only one promotional coupon code is permitted per checkout cycle. Standard return policies remain strictly valid.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
