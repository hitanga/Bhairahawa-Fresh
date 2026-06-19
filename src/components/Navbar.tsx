import React, { useState } from 'react';
import { Leaf, Menu, X, ShoppingCart, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ currentView, setCurrentView, cartCount, onOpenCart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'price-list', label: 'Price List' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'offers', label: 'Offers' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    setCurrentView(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update hash for deep link
    window.location.hash = id;
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm transition-all duration-350">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
              <Leaf className="w-6 h-6 text-emerald-600 fill-emerald-600/10 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-sans font-bold text-xl sm:text-2xl text-emerald-800 tracking-tight block">
                Bhairahawa Fresh
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest block -mt-1 font-mono">
                Prakriti Harvest
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 ${
                  currentView === link.id
                    ? 'text-emerald-700 bg-emerald-50/70 border-b-2 border-emerald-600'
                    : 'text-gray-650 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick Contact Links */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <a
                href="tel:+9779715716789"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all cursor-pointer"
                title="Call Store"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/9779715716789"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all cursor-pointer"
                title="Chat with Us"
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium flex items-center gap-2 transition-all shadow-md shadow-emerald-700/10 hover:shadow-emerald-700/20 active:scale-95 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-550 border border-white text-white text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg animate-fade-in absolute top-20 left-0 w-full shadow-lg">
          <div className="px-4 py-3 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-all ${
                  currentView === link.id
                    ? 'bg-emerald-550 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-700'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
            
            <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-400">Quick Store Contact:</span>
              <div className="flex gap-2">
                <a
                  href="tel:+9779715716789"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium text-xs flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Store
                </a>
                <a
                  href="https://wa.me/9779715716789"
                  className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium text-xs flex items-center gap-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
