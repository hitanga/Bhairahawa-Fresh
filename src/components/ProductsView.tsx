import React, { useState, useMemo } from 'react';
import { 
  Search, Eye, ShoppingCart, Percent, AlertCircle, Heart, Star, Sparkles, Filter, SlidersHorizontal, CheckCircle
} from 'lucide-react';
import { Product } from '../types';
import { productsData } from '../data/products';
import { categoriesData } from '../data/staticData';

interface ProductsViewProps {
  onAddToCart: (p: Product) => void;
}

export default function ProductsView({ onAddToCart }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Search query match
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Category Match
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sorting Modes
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular-first') {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  // Display Slicing based on "Show More" state and default 16 products
  const displayProducts = useMemo(() => {
    if (isShowingAll) {
      return filteredProducts;
    }
    // "show first most popular 16 products as default"
    // Let's filter the products. It is safest to slice the first 16 items of the filtered list.
    return filteredProducts.slice(0, 16);
  }, [filteredProducts, isShowingAll]);

  const handleAddToCartWithMsg = (p: Product) => {
    onAddToCart(p);
    setSuccessMsg(`Added '${p.name}' to Basket!`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    // Reset Show more toggles to let users easily see segmented defaults
    setIsShowingAll(false);
  };

  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      
      {/* Toast Alert Feedback */}
      {successMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-up border border-gray-800 text-xs sm:text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-400 stroke-[3]" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="bg-emerald-850 rounded-3xl p-6 sm:p-10 text-white mb-10 relative overflow-hidden shadow-xl shadow-emerald-900/5">
          <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-5 pointer-events-none">
            <span className="text-[200px] font-bold font-mono">100+</span>
          </div>
          <div className="max-w-xl relative sely-text text-left">
            <span className="bg-amber-550/30 text-amber-300 font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md mb-2 inline-block">
              Bhairahawa Local Logistics
            </span>
            <h1 className="text-2.5xl sm:text-4xl font-extrabold font-sans tracking-tight mb-2">
              Browse Pantry &amp; Staples
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Find unpolished lentils, premium long grain rice, locally cold-pressed mustard oil, hygiene essentials, and baby care formulas instantly.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-150 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Dynamic search input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search product, category, or brand..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white text-sm transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-805"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort selection dropdown */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort By:
            </span>
            <select
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-semibold"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Standard Catalog</option>
              <option value="popular-first">Most Popular first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Categories Chip bar */}
        <div className="mb-8">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2.5">Segment by Category</span>
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-thin">
            <button
              onClick={() => handleCategorySelect('All')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all scroll-snap-align cursor-pointer border ${
                selectedCategory === 'All'
                  ? 'bg-emerald-650 text-white border-emerald-600 shadow-sm shadow-emerald-650/10'
                  : 'bg-white border-gray-200 text-gray-650 hover:bg-gray-50'
              }`}
            >
              All Categories ({productsData.length})
            </button>
            {categoriesData.map((cat) => {
              const count = productsData.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all scroll-snap-align cursor-pointer border ${
                    selectedCategory === cat.name
                      ? 'bg-emerald-650 text-white border-emerald-600 shadow-sm shadow-emerald-650/10'
                      : 'bg-white border-gray-200 text-gray-650 hover:bg-gray-50'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Header feedback info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {searchTerm || selectedCategory !== 'All' ? 'Filter results' : 'Standard catalog'} &bull; 
            Showing {displayProducts.length} of {filteredProducts.length} Products Available
          </div>
          
          {!isShowingAll && filteredProducts.length > 16 && (
            <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Popular default view (16 items)
            </span>
          )}
        </div>

        {/* Empty Search Result Fallback */}
        {displayProducts.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-emerald-600/70 mb-4 mx-auto border border-gray-100">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No products match your search</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              We couldn't find matches for "<strong className="text-emerald-700">{searchTerm}</strong>" inside our '{selectedCategory}' catalog category. Try checking your spelling or selecting 'All Categories'.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Product Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((p) => (
            <div 
              key={p.id}
              className="bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-xl hover:shadow-emerald-100/5 hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between group"
            >
              
              {/* Image Area with category tag */}
              <div className="relative aspect-square w-full p-4 bg-emerald-50/10 flex items-center justify-center border-b border-gray-50">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                
                {p.inStock === 'Limited Stock' && (
                  <span className="absolute top-4 left-4 bg-amber-550 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Limited
                  </span>
                )}
                {p.inStock === 'Out Of Stock' && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">
                      Out of stock
                    </span>
                  </div>
                )}
                
                {p.isPopular && (
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Popular
                  </span>
                )}
              </div>

              {/* Product Info Description */}
              <div className="p-5">
                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-0.5">
                  {p.brand}
                </div>
                <h3 className="font-semibold text-gray-905 text-base truncate mb-1 text-left group-hover:text-emerald-700 transition-colors">
                  {p.name}
                </h3>
                <div className="text-xs text-gray-500 mb-4 font-medium flex items-center justify-between">
                  <span>Packet size: {p.weight}</span>
                  <span className="text-emerald-800 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 rounded-md uppercase font-mono">
                    {p.category}
                  </span>
                </div>

                {p.description && (
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4 line-clamp-2 h-8 text-left">
                    {p.description}
                  </p>
                )}

                {/* Pricing + Add Section */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
                  <div>
                    <span className="text-[9px] text-gray-400 block -mb-1">Present Rate</span>
                    <span className="text-lg font-extrabold text-emerald-700 font-sans">Rs. {p.price}</span>
                  </div>
                  
                  {p.inStock !== 'Out Of Stock' ? (
                    <button
                      onClick={() => handleAddToCartWithMsg(p)}
                      className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/15 active:scale-90 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add +
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-semibold rounded-xl cursor-not-allowed"
                    >
                      Hold
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* "Show more" button in product page */}
        {!isShowingAll && filteredProducts.length > displayProducts.length && (
          <div className="mt-12 text-center pb-8">
            <div className="text-xs text-gray-400 font-semibold mb-3">
              Explore the remaining {filteredProducts.length - displayProducts.length} pantry items from our catalog!
            </div>
            
            <button
              onClick={() => setIsShowingAll(true)}
              className="bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center gap-2 group"
            >
              Show more products 
              <span className="group-hover:translate-y-0.5 transition-transform font-bold">&darr;</span>
            </button>
          </div>
        )}

        {isShowingAll && filteredProducts.length > 16 && (
          <div className="mt-12 text-center pb-8 border-t border-gray-150 pt-8">
            <div className="text-xs text-gray-400 font-semibold mb-4 text-center">
              You are viewing our exhaustive, full catalog of {productsData.length} products.
            </div>
            <button
              onClick={() => {
                setIsShowingAll(false);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              Show Less (Collapse catalog)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
