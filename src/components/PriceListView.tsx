import React, { useState, useMemo } from 'react';
import { 
  Search, ClipboardList, Info, ShoppingCart, RefreshCcw, Download, CheckCircle, SlidersHorizontal, AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { productsData } from '../data/products';

interface PriceListViewProps {
  onAddToCart: (p: Product) => void;
}

export default function PriceListView({ onAddToCart }: PriceListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Derive structural lists of unique categories
  const categories = useMemo(() => {
    const list = new Set(productsData.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter Table Items
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (showInStockOnly) {
      list = list.filter(p => p.inStock === 'In Stock');
    }

    return list;
  }, [searchTerm, selectedCategory, showInStockOnly]);

  const handleAddToCartWithMsg = (p: Product) => {
    onAddToCart(p);
    setSuccessMsg(`Added ${p.name} to Cart from Price List!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      
      {/* Toast Alert Feedback */}
      {successMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-up border border-gray-800 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-400 stroke-[3]" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full mb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Direct Wholesale Catalog Rates</span>
            </div>
            <h1 className="text-2.5xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
              Today's Live Price Sheet
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <RefreshCcw className="w-3.5 h-3.5 text-emerald-600 animate-spin-pulse" /> 
              Last refreshed: <strong className="text-gray-700">Today, 8:00 AM</strong> (Updated daily based on native market rates)
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="px-4.5 py-3 rounded-xl border border-gray-250 bg-white hover:bg-gray-50 active:scale-95 transition-all text-xs font-semibold text-gray-700 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-gray-500" /> Export / Print Sheet
            </button>
          </div>
        </div>

        {/* Informative advice banner about price transparency */}
        <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4.5 flex gap-3 text-emerald-800 mb-8 max-w-4xl text-left items-start">
          <Info className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold text-emerald-900 block mb-0.5">Bhairahawa Fresh Pricing Integrity pledge</strong>
            <span>
              Unlike standard un-cataloged bazaars, we guarantee honest transparent rates. No customized bargaining margins, no surprise changes. What you read here is exactly what gets billed inside your checkout coupon!
            </span>
          </div>
        </div>

        {/* Filter Toolbar controls */}
        <div className="bg-white p-4 rounded-2xl border border-gray-150 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          
          {/* Live Search bar */}
          <div className="relative flex-grow w-full md:w-auto">
            <input
              type="text"
              placeholder="Search specific item name (e.g. Basmati Rice, Dhara)..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-805"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown & Switces */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <select
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-205 text-xs text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>In Stock Only</span>
            </label>
          </div>

        </div>

        {/* Item count ticker */}
        <div className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-left">
          Matching Items: {filteredProducts.length} items found
        </div>

        {/* Empty State Fallback */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-150 p-10 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-emerald-600/60 mb-3 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No matching prices recorded</h3>
            <p className="text-xs text-gray-500">
              There is no current listing matching "<strong className="text-emerald-700">{searchTerm}</strong>" inside the current sheet.
            </p>
          </div>
        )}

        {/* Pricing Layout Table */}
        {filteredProducts.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-705 text-white bg-emerald-700 text-xs tracking-wider uppercase font-mono font-bold">
                    <th className="px-6 py-4.5">Pantry Product Description</th>
                    <th className="px-6 py-4.5">Brand</th>
                    <th className="px-6 py-4.5">Standard Unit</th>
                    <th className="px-6 py-4.5 text-right">Price (Rs.)</th>
                    <th className="px-6 py-4.5 text-center">In-Store Status</th>
                    <th className="px-6 py-4.5 text-center">Basket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-105">
                  {filteredProducts.map((p, idx) => (
                    <tr 
                      key={p.id}
                      className={`hover:bg-emerald-50/20 transition-colors text-xs sm:text-sm ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 text-left">
                        <div className="flex items-center gap-1.5">
                          <span>{p.name}</span>
                          {p.isPopular && (
                            <span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">
                              Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-550 font-medium text-left">{p.brand}</td>
                      <td className="px-6 py-4 text-gray-450 font-semibold text-left">{p.weight}</td>
                      <td className="px-6 py-4 text-right font-extrabold text-emerald-700 text-base font-sans">
                        Rs. {p.price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.inStock === 'In Stock' && (
                          <span className="inline-flex px-2 py-1 bg-emerald-50 text-emerald-705 text-[9px] font-bold rounded-lg uppercase tracking-wide">
                            In Stock
                          </span>
                        )}
                        {p.inStock === 'Limited Stock' && (
                          <span className="inline-flex px-2 py-1 bg-amber-50 text-amber-705 text-[9px] font-bold rounded-lg uppercase tracking-wide text-amber-700">
                            Limited
                          </span>
                        )}
                        {p.inStock === 'Out Of Stock' && (
                          <span className="inline-flex px-2 py-1 bg-red-50 text-red-705 text-[9px] font-bold rounded-lg uppercase tracking-wide text-red-650">
                            Sold Out
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.inStock !== 'Out Of Stock' ? (
                          <button
                            onClick={() => handleAddToCartWithMsg(p)}
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center mx-auto cursor-pointer"
                            title="Add item to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-semibold uppercase">Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
