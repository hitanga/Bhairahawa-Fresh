import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Check, ShoppingBag, Send, AlertCircle, ShoppingCart, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryMode, setDeliveryMode] = useState<'Standard' | 'Express'>('Standard');
  const [deliverySlot, setDeliverySlot] = useState<string>('Morning Slot (7:00 AM - 10:00 AM)');
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState<string>('');
  const [savedDeliveryCharge, setSavedDeliveryCharge] = useState(0);
  const [savedGrandTotal, setSavedGrandTotal] = useState(0);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryCharge = deliveryMode === 'Express' ? 200 : (subtotal >= 1500 || subtotal === 0 ? 0 : 50);
  const grandTotal = subtotal + deliveryCharge;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setFetchingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });
        setFetchingLocation(false);
        if (!custAddress) {
          setCustAddress(`GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        } else if (!custAddress.includes('GPS:')) {
          setCustAddress((prev) => `${prev} (GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)})`);
        }
      },
      (error) => {
        setFetchingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied. Please enable location popups.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable on your device.');
            break;
          case error.TIMEOUT:
            setLocationError('GPS lookup timed out. Please retry.');
            break;
          default:
            setLocationError('Error fetching location.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || !custAddress) {
      alert('Please fill out all standard checkout fields to facilitate dispatch.');
      return;
    }

    if (isOrdered && lastWhatsappUrl) {
      window.open(lastWhatsappUrl, '_blank');
      return;
    }

    const genOrderId = 'BF-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(genOrderId);
    setSavedDeliveryCharge(deliveryCharge);
    setSavedGrandTotal(grandTotal);

    // Build the WhatsApp message representing the orders
    let orderText = `*BHAIRAHAWA FRESH ORDER [${genOrderId}]*\n`;
    orderText += `--------------------------------------\n`;
    orderText += `*Name:* ${custName}\n`;
    orderText += `*Phone:* ${custPhone}\n`;
    orderText += `*Address:* ${custAddress}\n`;
    if (coords) {
      orderText += `*Google Maps Link:* https://www.google.com/maps?q=${coords.lat},${coords.lng}\n`;
    }
    orderText += `*Shipping:* ${deliveryMode} Delivery\n`;
    orderText += `*Preferred Slot:* ${deliverySlot}\n`;
    orderText += `--------------------------------------\n`;
    
    cartItems.forEach(item => {
      orderText += `• ${item.product.name} (${item.product.brand}) - ${item.product.weight} x ${item.quantity} = Rs. ${item.product.price * item.quantity}\n`;
    });
    
    orderText += `--------------------------------------\n`;
    orderText += `*Subtotal:* Rs. ${subtotal}\n`;
    orderText += `*Delivery Fee:* Rs. ${deliveryCharge}\n`;
    orderText += `*Grand Total:* *Rs. ${grandTotal}*\n\n`;
    orderText += `Please dispatch my order promptly. Thank you!`;

    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/9779715716789?text=${encodedText}`;

    setLastWhatsappUrl(whatsappUrl);

    // Open WhatsApp link
    window.open(whatsappUrl, '_blank');

    // Clear the cart immediately so the main layout/drawer is cleared for any subsequent items
    onClearCart();

    // Display localized order status screen inside modal
    setIsOrdered(true);
  };

  const handleReset = () => {
    onClearCart();
    setIsOrdered(false);
    setCustName('');
    setCustPhone('');
    setCustAddress('');
    setCoords(null);
    setLastWhatsappUrl('');
    setSavedDeliveryCharge(0);
    setSavedGrandTotal(0);
    setLocationError(null);
    setDeliveryMode('Standard');
    setDeliverySlot('Morning Slot (7:00 AM - 10:00 AM)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop filter blur */}
        <div 
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
          onClick={isOrdered ? handleReset : onClose}
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
              
              {/* Header Segment */}
              <div className="px-4 py-6 sm:px-6 bg-emerald-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-350" />
                  <h2 className="text-lg font-bold font-sans" id="slide-over-title">Your Fresh Cart</h2>
                </div>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="rounded-md bg-emerald-800 p-1 text-emerald-100 hover:text-white hover:bg-emerald-900 transition-colors focus:outline-none cursor-pointer"
                    onClick={isOrdered ? handleReset : onClose}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {isOrdered ? (
                /* Order Success View */
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center bg-emerald-50/50">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">Order Dispatched to WhatsApp!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your order <strong className="text-emerald-700 font-mono">{orderId}</strong> has been compiled. We've initiated a secure WhatsApp checkout window for instantaneous processing and confirmation.
                  </p>
                  
                  <div className="w-full bg-white border border-emerald-150 p-4 rounded-2xl mb-6 text-left text-xs text-gray-700 space-y-1">
                    <div className="font-bold text-emerald-800 text-sm mb-2 pb-1 border-b border-gray-100">Order Estimation</div>
                    <div><strong>Customer Name:</strong> {custName}</div>
                    <div><strong>Phone:</strong> {custPhone}</div>
                    <div><strong>Delivery Route:</strong> {custAddress}</div>
                    <div><strong>Charge Mode:</strong> {deliveryMode} (Rs. {savedDeliveryCharge})</div>
                    <div><strong>Expected Delivery:</strong> {deliverySlot}</div>
                    <div className="pt-2 text-sm font-semibold text-gray-900">Estimated Invoice: Rs. {savedGrandTotal}</div>
                  </div>

                  <p className="text-xs text-paragraph text-gray-500 mb-8 leading-relaxed">
                    If WhatsApp didn't open automatically, you can always click the button below to retry or return back to shopping.
                  </p>

                  <div className="flex flex-col w-full gap-2">
                    <button
                      onClick={() => {
                        handleCheckout({ preventDefault: () => {} } as React.FormEvent);
                      }}
                      className="w-full py-3 rounded-xl bg-amber-550 hover:bg-amber-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Retry WhatsApp Dispatch
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-all active:scale-95 cursor-pointer"
                    >
                      Back to Grocery Grid
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Drawer Content */
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Cart Item Grid */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center py-10">
                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-emerald-600/60 mb-4 animate-pulse">
                          <ShoppingBag className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Your basket is empty</h3>
                        <p className="text-sm text-gray-550 max-w-xs mt-1.5 leading-relaxed">
                          Pristine organic rice, premium lentils, fresh spices, and baby care solutions are waiting for you in the shop!
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-6 px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-semibold transition-all active:scale-95 cursor-pointer"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{cartItems.length} Unique Items</span>
                          <button 
                            onClick={onClearCart}
                            className="text-xs text-gray-500 hover:text-red-650 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Clear All
                          </button>
                        </div>

                        <div className="divide-y divide-gray-100">
                          {cartItems.map((item) => (
                            <div key={item.product.id} className="flex py-4 gap-4 items-center">
                              <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 p-1 flex items-center justify-center overflow-hidden">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80";
                                  }}
                                  className="h-full w-full object-contain"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between text-sm font-medium text-gray-900">
                                  <h4 className="truncate font-semibold text-gray-805">{item.product.name}</h4>
                                  <span className="ml-4 text-emerald-700 font-bold whitespace-nowrap">Rs. {item.product.price * item.quantity}</span>
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                  {item.product.brand} &bull; {item.product.weight}
                                </div>
                                
                                <div className="flex items-center justify-between mt-2.5">
                                  <div className="flex items-center border border-gray-250 rounded-lg bg-gray-50 p-0.5">
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                                      className="w-6 h-6 flex items-center justify-center hover:bg-white text-gray-500 rounded transition-colors cursor-pointer"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-xs font-bold text-gray-805">{item.quantity}</span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                                      className="w-6 h-6 flex items-center justify-center hover:bg-white text-gray-500 rounded transition-colors cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  
                                  <button
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" /> Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    /* Checkout Form and Invoice Summary */
                    <div className="border-t border-gray-150 py-6 px-4 sm:px-6 bg-gray-50/70">
                      
                      {/* Shipping Mode Select */}
                      <div className="mb-4">
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">
                          Delivery Option
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setDeliveryMode('Standard');
                              setDeliverySlot('Morning Slot (7:00 AM - 10:00 AM)');
                            }}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col justify-center items-center transition-all cursor-pointer ${
                              deliveryMode === 'Standard'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                : 'bg-white border-gray-200 text-gray-650 hover:bg-white'
                            }`}
                          >
                            <span>Standard Route</span>
                            <span className="text-[10px] text-gray-400 font-normal">Next Day (FREE &gt;Rs.1500)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeliveryMode('Express');
                              setDeliverySlot('Express Dispatch (Within 60 Mins)');
                            }}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col justify-center items-center transition-all cursor-pointer ${
                              deliveryMode === 'Express'
                                ? 'bg-amber-50 border-amber-500 text-amber-800'
                                : 'bg-white border-gray-200 text-gray-650 hover:bg-white'
                            }`}
                          >
                            <span className="text-amber-700">Express Delivery</span>
                            <span className="text-[10px] text-gray-400 font-normal">Within 60 Mins (Rs. 200)</span>
                          </button>
                        </div>
                      </div>

                      {/* Customer Details Fields */}
                      <form onSubmit={handleCheckout} className="space-y-2.5 mb-5 pb-4 border-b border-gray-200">
                        <label className="text-xs font-bold text-gray-500 block uppercase tracking-wider">
                          Delivery Dispatch Details
                        </label>
                        <input
                          type="text"
                          required
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          placeholder="Your Name (e.g. Rajesh Khanal)"
                          className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <input
                          type="tel"
                          required
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          placeholder="Phone / WhatsApp Number"
                          className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <div className="space-y-1 mt-1">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Delivery Address
                            </span>
                            <button
                              type="button"
                              onClick={handleGetLocation}
                              disabled={fetchingLocation}
                              className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-150 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 transition-all cursor-pointer animate-pulse"
                            >
                              <MapPin className="w-3 h-3 text-emerald-600 animate-bounce" />
                              <span>Click here to fill current location</span>
                            </button>
                          </div>
                          
                          <div className="relative group">
                            <input
                              type="text"
                              required
                              value={custAddress}
                              onChange={(e) => setCustAddress(e.target.value)}
                              placeholder="Delivery Address (e.g., Aawa Road, Milanchowk)"
                              className="w-full rounded-xl bg-white border border-gray-200 pl-3.5 pr-12 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            
                            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center">
                              <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={fetchingLocation}
                                className={`p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 cursor-pointer transition-colors relative ${fetchingLocation ? 'animate-pulse text-emerald-450' : ''}`}
                                title="Click here to auto-share GPS location"
                              >
                                <MapPin className="w-5 h-5" />
                              </button>
                              
                              {/* Hover Tooltip Box */}
                              <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden group-hover:block sm:group-hover:flex flex-col items-center z-50 transition-opacity duration-200">
                                <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1">
                                  <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                                  Click here to share GPS location!
                                </span>
                                <div className="w-2.5 h-2.5 bg-gray-900 rotate-45 -mt-1 rounded-sm mr-2 shadow-xl"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {fetchingLocation && (
                          <div className="text-[10px] text-emerald-600 font-semibold animate-pulse flex items-center gap-1 pl-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            Acquiring precise GPS satellite fix...
                          </div>
                        )}

                        {coords && !fetchingLocation && (
                          <div className="text-[10px] text-emerald-700 font-medium bg-emerald-50/50 rounded-xl p-2 flex items-center justify-between border border-emerald-100">
                            <span className="flex items-center gap-1 pl-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              GPS Linked: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setCoords(null);
                                // remove the GPS text if appended automatically
                                if (custAddress.includes('GPS:')) {
                                  setCustAddress(custAddress.split(' (GPS:')[0]);
                                }
                              }}
                              className="text-emerald-800 hover:text-red-600 font-bold transition-colors cursor-pointer text-[10px]"
                            >
                              Reset GPS Link
                            </button>
                          </div>
                        )}

                        {locationError && (
                          <div className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-100 font-semibold">
                            ⚠️ {locationError}
                          </div>
                        )}

                        {/* Preferred Timeslot Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-gray-550 block uppercase tracking-wider mb-1">
                            Preferred Delivery Time Slot
                          </label>
                          {deliveryMode === 'Express' ? (
                            <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold flex items-center gap-2">
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                              <span>Express Dispatch: Delivered in &lt;60 Minutes</span>
                            </div>
                          ) : (
                            <select
                              value={deliverySlot}
                              onChange={(e) => setDeliverySlot(e.target.value)}
                              className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 font-medium cursor-pointer"
                            >
                              <option value="Morning Slot (7:00 AM - 10:00 AM)">Morning Slot (7:00 AM - 10:00 AM)</option>
                              <option value="Mid-day Slot (10:00 AM - 1:00 PM)">Mid-day Slot (10:00 AM - 1:00 PM)</option>
                              <option value="Afternoon Slot (1:00 PM - 4:00 PM)">Afternoon Slot (1:00 PM - 4:00 PM)</option>
                              <option value="Evening Slot (4:00 PM - 7:00 PM)">Evening Slot (4:00 PM - 7:00 PM)</option>
                              <option value="Night Slot (7:00 PM - 9:00 PM)">Night Slot (7:00 PM - 9:00 PM)</option>
                            </select>
                          )}
                        </div>

                        {/* Order Calculation block */}
                        <div className="pt-3 space-y-1.5 text-xs text-gray-550 border-t border-gray-150 mt-4">
                          <div className="flex justify-between">
                            <span>Basket Subtotal</span>
                            <span className="font-semibold text-gray-900">Rs. {subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span className="font-semibold text-gray-900">
                              {deliveryCharge === 0 ? 'FREE' : `Rs. ${deliveryCharge}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-dashed border-gray-200">
                            <span>Estimated Invoice</span>
                            <span className="text-emerald-700">Rs. {grandTotal}</span>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Send className="w-4 h-4" /> Ship Order via WhatsApp
                        </button>
                      </form>

                      <div className="flex items-start gap-1.5 text-[10px] text-gray-500 bg-amber-50/50 border border-amber-100 p-2 rounded-lg">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>
                          Pricing updates dynamically based on stock and morning market sheets. Verification call is executed within 5 mins of dispatch.
                        </span>
                      </div>

                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
