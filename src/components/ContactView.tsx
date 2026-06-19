import React from 'react';
import { 
  Mail, Phone, Clock, MapPin, Handshake, MessageSquare
} from 'lucide-react';

export default function ContactView() {
  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Segment */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 mb-3">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2.5xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            Contact Bhairahawa Fresh
          </h1>
          <p className="text-sm text-gray-550 mt-2 leading-relaxed">
            Have a bulk order request for your restaurant? Reach our storefront or talk directly to our supply managers for daily updates.
          </p>
        </div>

        {/* Balanced symmetrical info and map grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12 text-left">
          
          {/* Quick Info contacts column */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-905 font-sans mb-4">Storefront Channels &amp; Operations</h3>
              <p className="text-xs text-gray-550 mb-6">
                Feel free to call us directly, send us a WhatsApp message, or drop by our retail store. No form filing is required.
              </p>
            </div>
            
            <div className="space-y-6 flex-grow justify-center flex flex-col">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Storefront Hub</h4>
                  <p className="text-xs sm:text-sm text-gray-550 leading-relaxed mt-1">
                    Aawa Road, Bhairahawa, Nepal <br />
                    (Near Milanchowk intersection)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Phone / WhatsApp</h4>
                  <a href="tel:+9779715716789" className="text-xs sm:text-sm text-emerald-700 hover:underline block font-semibold mt-1">
                    +977 9715716789
                  </a>
                  <span className="text-[10px] text-gray-400 block font-medium">Verification pilots respond within 5 mins.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Opening Hours</h4>
                  <p className="text-xs sm:text-sm text-gray-550 leading-relaxed mt-1">
                    Daily: 8:00 AM - 9:00 PM <br />
                    (Closed only during core Dashain holidays)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Business Email</h4>
                  <p className="text-xs sm:text-sm text-gray-550 mt-1 font-medium font-mono">
                    support@bhairahawafresh.com
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[10px] text-gray-450">
              <span>All direct calls are routed straight to our Siddharthanagar dispatch desk to ensure immediate support.</span>
            </div>
          </div>

          {/* Google digital Map highlight layout component */}
          <div className="rounded-3xl border border-gray-200 overflow-hidden shadow-sm min-h-[400px] lg:min-h-[auto] bg-gray-100 relative flex">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4zvNREEWKKywew5TmK_vvsk2li7aKDeatNGfklqqb8zTi3tpoU52Amj2OpNM7VTRNHDberTBDc_ooosx37WIVR6TA14P9-6KAtkVoRE_aEhpfIAfoLZFwO0Ve0uKCjlvlg7frI9_bsALyc4kr9DPaqK22bPzs90LK_698RwiW8bocMjK1n3tYLO50bnEx1puaGQjMZCjcTINheY8H_XyOBe6Jip3ZDStls1JVxswectNZ1AkZqaMg" 
              alt="Map Pin on Bhairahawa Aawa road" 
              className="w-full h-full object-cover min-h-[400px]"
            />
            <div className="absolute top-4 left-4 bg-emerald-900 text-white text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md uppercase">
              <Handshake className="w-3 h-3 text-emerald-300" /> Ground Verified Pin
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
