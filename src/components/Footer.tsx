import React, { useState } from 'react';
import { Leaf, Send, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-800">
                <Leaf className="w-6 h-6 text-emerald-400 fill-emerald-400/10" />
              </div>
              <span className="font-sans font-bold text-xl text-emerald-350 tracking-tight">
                Bhairahawa Fresh
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving the families of Bhairahawa with pristine local harvesting, fresh daily produce, premium FMCG supplies, and rapid delivery right to your kitchen.
            </p>
            <div className="pt-2 text-xs text-gray-500 font-mono">
              ESTD. 2018 | Aawa Road, Nepal
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-emerald-400 text-base mb-6 uppercase tracking-wider font-mono text-xs">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('products')} 
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shop Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('price-list')} 
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Live Price Sheet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('delivery')} 
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Delivery Options
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('offers')} 
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Weekly Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Connect */}
          <div>
            <h4 className="font-semibold text-emerald-400 text-base mb-6 uppercase tracking-wider font-mono text-xs">
              Hours &amp; Connect
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              <strong className="text-gray-250 block">Operational Hours:</strong> 
              Daily: 8:00 AM - 9:00 PM (inc. Holidays)
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  Facebook: facebook.com/bhairahawafresh
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  Instagram: @bhairahawa_fresh
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Submit Support Ticket
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-semibold text-emerald-400 text-base mb-6 uppercase tracking-wider font-mono text-xs">
              Daily Updates
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Receive live wholesale pricing sheet and local discount codes directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="flex-grow rounded-xl bg-gray-800 border border-gray-700 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 text-gray-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5 animate-slide-up">
                <Sparkles className="w-3.5 h-3.5" /> Subscribed successfully! Thank you.
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div>
            &copy; 2026 Bhairahawa Fresh. All rights reserved. Registered under Nepal Commerce Board.
          </div>
          <div className="flex gap-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition-colors">Customer Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
