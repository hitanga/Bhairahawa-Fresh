import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import PriceListView from './components/PriceListView';
import DeliveryView from './components/DeliveryView';
import OffersView from './components/OffersView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import { Product, CartItem } from './types';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Deep Link Routing Synchronization with URL Hash Change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'products', 'price-list', 'delivery', 'offers', 'about', 'contact'];
      if (hash && validViews.includes(hash)) {
        setCurrentView(hash);
      }
    };

    // Listen to changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial verification
    handleHashChange();

    // Scroll to top checking
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto scroll to top on any view transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Switch Case View Renderer
  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsView onAddToCart={handleAddToCart} />;
      case 'price-list':
        return <PriceListView onAddToCart={handleAddToCart} />;
      case 'delivery':
        return <DeliveryView onNavigate={(view) => { setCurrentView(view); window.location.hash = view; }} />;
      case 'offers':
        return <OffersView onNavigate={(view) => { setCurrentView(view); window.location.hash = view; }} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'home':
      default:
        return (
          <HomeView
            onNavigate={(view) => {
              setCurrentView(view);
              window.location.hash = view;
            }}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans select-none antialiased scroll-smooth">
      
      {/* Sticky Premium Glassmorphism Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Dynamic Viewport Frame */}
      <main className="flex-grow animate-fade-in">
        {renderView()}
      </main>

      {/* Slide-out Interactive Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Bottom Footer Brand Hub */}
      <Footer onNavigate={(view) => { setCurrentView(view); window.location.hash = view; }} />

      {/* Floating Interactive Conversion Elements */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-30">
        
        {/* Scroll on Top button */}
        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="w-11 h-11 bg-white hover:bg-emerald-50 text-emerald-700 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all cursor-pointer active:scale-90"
            title="Scroll back to Top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* WhatsApp Fast Live Assistance bubble float */}
        <a
          href="https://wa.me/9779802345678?text=Hello%20Bhairahawa%20Fresh%2C%20I%20have%20a%20question%20regarding%20daily%20staples%20availabilty..."
          className="w-14 h-14 bg-amber-550 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer duration-300"
          title="Direct WhatsApp Chat"
          target="_blank"
          rel="noreferrer"
        >
          <MessageSquare className="w-7 h-7 fill-white/10 text-white" />
        </a>

      </div>

    </div>
  );
}
