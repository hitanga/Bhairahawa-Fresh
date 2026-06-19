import React, { useState } from 'react';
import { 
  Truck, ArrowRight, Compass, Shield, Clock, Phone, MessageSquare, ShieldCheck, MapPin, BadgePercent
} from 'lucide-react';

interface DeliveryViewProps {
  onNavigate: (view: string) => void;
}

export default function DeliveryView({ onNavigate }: DeliveryViewProps) {
  const [testOrderValue, setTestOrderValue] = useState<number>(1000);

  // Delivery calculator logic
  const isFreeStandard = testOrderValue >= 1500;
  const standardFee = isFreeStandard ? 0 : 50;
  const expressFee = 200;

  const deliveryZones = [
    { area: "Aawa Road (Store Vicinity)", standard: "Within 12 Hours", express: "20-30 Mins", status: "Active Dispatch" },
    { area: "Milanchowk", standard: "Within 12 Hours", express: "30-45 Mins", status: "Active Dispatch" },
    { area: "Devkota Chowk", standard: "Within 18 Hours", express: "35-50 Mins", status: "Active Dispatch" },
    { area: "Lumbini Road Sector", standard: "Within 24 Hours", express: "40-60 Mins", status: "Active Dispatch" },
    { area: "Bhairahawa Airport (Gautam Buddha)", standard: "Within 24 Hours", express: "45-60 Mins", status: "Active Dispatch" },
    { area: "Belhiya (Border Sector)", standard: "Within 24 Hours", express: "50-60 Mins", status: "Limited Dispatch" },
    { area: "Siddharthanagar Core Sectors", standard: "Within 12 Hours", express: "25-40 Mins", status: "Active Dispatch" },
  ];

  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Segment */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 mb-3">
            <Truck className="w-6 h-6 animate-bounce" />
          </div>
          <h1 className="text-2.5xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            Home Delivery Across Bhairahawa
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            No more heavy bags from the wet bazaar. We bring premium packaged products and fresh daily essentials directly to your home steps on your command.
          </p>
        </div>

        {/* Dynamic Interactive Delivery Estimator */}
        <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto mb-12">
          <div className="border-b border-gray-150 pb-5 mb-6 text-left">
            <h3 className="text-lg font-bold text-gray-905 font-sans flex items-center gap-2">
              <BadgePercent className="w-5 h-5 text-emerald-600" /> Interactive Fee Calculator
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Estimate your delivery charges by keying in your forecasted grocery basket total.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Input range */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-550 uppercase tracking-widest block">
                Estimated Basket Value (Rs.)
              </label>
              
              <div className="flex gap-2">
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="50"
                  className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-bold text-emerald-800 w-32 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  value={testOrderValue}
                  onChange={(e) => setTestOrderValue(Number(e.target.value))}
                />
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  className="flex-grow accent-emerald-600 self-center focus:outline-none"
                  value={testOrderValue}
                  onChange={(e) => setTestOrderValue(Number(e.target.value))}
                />
              </div>

              <div className="text-xs text-gray-400 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                🚀 <strong className="text-amber-800 font-bold">Standard Route FREE tier:</strong> Build a basket of at least <strong>Rs. 1,500</strong> to fully unlock 100% Free Shipping anywhere inside Bhairahawa!
              </div>
            </div>

            {/* Calculations Result */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200/50 space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-semibold text-gray-600">Standard Delivery</span>
                {isFreeStandard ? (
                  <span className="text-emerald-700 font-extrabold text-sm uppercase bg-emerald-50 px-2 py-0.5 rounded">FREE SHIPPING</span>
                ) : (
                  <span className="text-gray-805 font-bold">Rs. {standardFee}</span>
                )}
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-semibold text-gray-600">Express Delivery (60-Mins max)</span>
                <span className="text-amber-700 font-extrabold">Rs. {expressFee}</span>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 leading-relaxed">
                *Standard route orders are grouped and dispatched twice daily (11:00 AM &amp; 5:00 PM). Express orders are launched instantaneously on customized neighborhood logistics cycles.
              </div>
            </div>

          </div>
        </div>

        {/* Coverage Areas Hub Table */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-left mb-6">
            <h3 className="text-lg font-bold text-gray-905 font-sans flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" /> Bhairahawa Coverage Grid
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Specific local sectors with predicted standard dispatch times and express couriers availability.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-700 text-white text-xs tracking-wider uppercase font-mono font-bold">
                    <th className="px-5 py-4">Siddharthanagar Sector</th>
                    <th className="px-5 py-4">Standard Delivery Time</th>
                    <th className="px-5 py-4">Express Courier Time</th>
                    <th className="px-5 py-4 text-center">Dispatch Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {deliveryZones.map((zone, idx) => (
                    <tr key={zone.area} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-5 py-4 font-bold text-gray-900 flex items-center gap-2 text-left">
                        <MapPin className="w-3.5 h-3.5 text-gray-405 text-emerald-600 flex-shrink-0" />
                        <span>{zone.area}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-left">{zone.standard}</td>
                      <td className="px-5 py-4 text-amber-700 font-bold text-left">{zone.express}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          zone.status === 'Active Dispatch' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {zone.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Interactive core advice block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 text-left">
          <div className="bg-white p-5 rounded-2xl border border-gray-150">
            <Clock className="w-5 h-5 text-emerald-600 mb-2.5" />
            <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Morning Sifting</h5>
            <p className="text-gray-550 text-xs leading-relaxed">
              All delivery stock gets sifted at 7:00 AM daily. We never package stale ingredients.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150">
            <Shield className="w-5 h-5 text-emerald-600 mb-2.5" />
            <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Safe Transit Seals</h5>
            <p className="text-gray-550 text-xs leading-relaxed">
              We pack dry staples in heavy double-layer bags to prevent moisture infiltration during transit.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2.5" />
            <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Exchange at Gate</h5>
            <p className="text-gray-550 text-xs leading-relaxed">
              Inspect your products before accepting. Our pilots support painless doorstep returns.
            </p>
          </div>
        </div>

        {/* Large Call to action */}
        <div className="bg-emerald-900 rounded-3xl p-8 sm:p-10 text-white text-center max-w-4xl mx-auto shadow-lg shadow-emerald-950/10">
          <h3 className="text-2xl font-bold mb-2 font-sans text-amber-300">Ready to build your fresh list?</h3>
          <p className="text-sm text-emerald-100/90 mb-6 max-w-xl mx-auto">
            Place your order through our premium responsive browser catalogue right now and choose standard or express dispatch.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 bg-amber-550 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              Shop Grocery Catalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
