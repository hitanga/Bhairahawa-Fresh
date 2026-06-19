import React from 'react';
import { 
  Heart, Sparkles, ShieldAlert, CheckCircle2, Leaf, Star, Award, MapPin 
} from 'lucide-react';

export default function AboutView() {
  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Hub */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-110 text-emerald-600 mb-3">
            <Leaf className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2.5xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            Our Story &amp; Pledge
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Discover our heritage of honest daily commerce, direct farmer partnerships, clean modern warehouse logistics, and unwavering local community trust.
          </p>
        </div>

        {/* Narrative columns block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Signage Storefront Image (column height: 7) */}
          <div className="lg:col-span-5 h-[360px] sm:h-[480px] rounded-3xl overflow-hidden shadow-lg border border-gray-150 relative bg-emerald-50">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXzJE_Z4jlYiJnHntil4SjDUjKD-wjnk6jIG4CV2hVQwEHwDsd8NzucRXRUkWmVm-DLOUilMJteMU7laA3416rPgb198jniW-kh9K4ciiU8UuFZwNPnSMfeLAtFF2GEkhGEuVB-sn-LqzNzhdOYskja_lOVA7TCKM9AEq9tHZOYkTJ8wErgj_uk5OBlr47lVbDsc71DpAuu9yQ0k37vXZVUC3aXA8WOQ0MqzDzodYvhmZGJOQRF75" 
              alt="Bhairahawa Fresh Front Store on Aawa Road" 
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80";
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent"></div>
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-left shadow-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-850 tracking-wider">Store Location</span>
              <strong className="text-xs sm:text-sm text-gray-900 block font-bold font-sans">Aawa Road, Bhairahawa, Nepal</strong>
            </div>
          </div>

          {/* Narrative Story Details (column height: 7) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin-pulse" />
              <span>Serving Siddharthanagar Municipal</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-sans tracking-tight leading-snug">
              Bhairahawa Fresh was founded with a clean, noble local vision.
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed font-sans">
              Founded in 2018 on busy Aawa Road, we realized Nepalese households spent excessive time carrying heavy bags, bargaining in muddy wet bazaars, and buying un-sifted staples of inconsistent grain quality.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed font-sans">
              We took a firm, ground-up approach. We created partnerships with premium local rice mills, oil cold-press units in Terai, and organic farmers in Jumla to supply honest, sealed wholesale sacks on transparent terms of trade.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed font-sans">
              Today, while our catalogue hosts over 100+ standard everyday staples and household goods, we hold our founding principles sacred: clean, moisture-proof packaging, strict sifting before sunrise, uniform pricing, and rapid delivery.
            </p>

            {/* Values bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-150">
              <div className="flex items-start gap-2 text-xs text-gray-650">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>No customized margins:</strong> Everyone pays identical transparent wholesale prices.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-650">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Hand-filtered daily:</strong> Wet spices or broken rice grains are sifted out immediately.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-650">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Painless exchanges:</strong> Zero arguments if a bag doesn't meet expectation.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-650">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Support local farms:</strong> We prioritize unpolished Nepalese lentils &amp; tea.</span>
              </div>
            </div>

          </div>
        </div>

        {/* core parameters layout block */}
        <div className="bg-emerald-900 rounded-3xl p-8 sm:p-10 text-white text-center mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4.5xl font-extrabold font-sans text-amber-300">5,000+</div>
              <div className="text-xs uppercase text-emerald-100 font-bold tracking-wider font-mono">Bhairahawa Families Served</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4.5xl font-extrabold font-sans text-amber-300">105+</div>
              <div className="text-xs uppercase text-emerald-100 font-bold tracking-wider font-mono">Catalogued Staples</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4.5xl font-extrabold font-sans text-amber-300">14 Sectors</div>
              <div className="text-xs uppercase text-emerald-100 font-bold tracking-wider font-mono">Town Delivery Zones</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4.5xl font-extrabold font-sans text-amber-300">100% Genuineness</div>
              <div className="text-xs uppercase text-emerald-100 font-bold tracking-wider font-mono">Verification rate</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
