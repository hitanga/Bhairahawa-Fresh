import React, { useEffect } from 'react';

interface SEOMetadataProps {
  currentView: string;
}

export default function SEOMetadata({ currentView }: SEOMetadataProps) {
  useEffect(() => {
    let title = "Bhairahawa Fresh | Premium Local Grocery Store & Organic Farm";
    let description = "Shop premium organic fruits, farm-fresh vegetables, pure ghee, local honey, and daily kitchen essentials at Bhairahawa Fresh. Sourced directly from farms in Nepal.";
    let keywords = "Bhairahawa Fresh, Bhairahawa grocery delivery, organic vegetables Bhairahawa, fresh fruits Nepal, local dairy ghee, online grocery Bhairahawa";
    let schemaObj = null;

    switch (currentView) {
      case 'home':
        title = "Bhairahawa Fresh | Premium Local Grocery Store & Organic Farm";
        description = "Discover farm-fresh organic vegetables, premium seasonal fruits, local dairy ghee, finest pulses, and daily household essentials from our premier shop in Bhairahawa. Quality guaranteed.";
        keywords = "Bhairahawa Fresh, fresh vegetables Bhairahawa, organic farm nepal, online grocery, local ghee, fresh honey";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "Bhairahawa Fresh",
          "description": "Premium organic fruits and harvest-fresh vegetables sourced directly from regional farms.",
          "telephone": "+977-9715716789",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Aawa Road",
            "addressLocality": "Bhairahawa",
            "addressCountry": "NP"
          }
        };
        break;
      case 'products':
        title = "Shop Fresh Veggies, Fruits & Groceries | Bhairahawa Fresh";
        description = "Browse our full product catalog of local vegetables, seasonal fruits, organic spices, regional pulses, laundry soaps, and beverages with easy home delivery.";
        keywords = "grocery catalog Bhairahawa, fresh vegetables list, organic fruits Bhairahawa, premium spices nepal, detergent delivery";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Bhairahawa Fresh Product Catalog",
          "description": "Premium collection of client-favorite organic vegetables, pulses, spices, personal care, and dairy items."
        };
        break;
      case 'price-list':
        title = "Daily Live Grocery Price List | Bhairahawa Fresh";
        description = "Check current wholesale & retail market prices for green vegetables, local onions, garlic, premium rice, and kitchen utilities with daily live updates.";
        keywords = "Bhairahawa vegetable price list, live grocery prices Nepal, daily price sheet Bhairahawa, onion potato wholesale price";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Daily Live Price Sheet - Bhairahawa Fresh",
          "description": "Daily transparent active price listing of produce and grocery items from Bhairahawa markets."
        };
        break;
      case 'delivery':
        title = "Doorstep Grocery Delivery Services | Bhairahawa Fresh";
        description = "Get home delivery across Bhairahawa & nearby areas. Order fresh groceries today with 100% replacement guarantee and zero hassle.";
        keywords = "Bhairahawa home delivery, online grocery delivery Nepal, same day grocery shipping, food delivery Bhairahawa";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are the delivery charges?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Delivery is free for orders above Rs. 1000. For orders under Rs. 1000, a minimal charge of Rs. 50 is applicable."
              }
            },
            {
              "@type": "Question",
              "name": "What is the delivery timing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our orders are dispatched in hourly intervals. You get same-day delivery for all orders placed before 7 PM."
              }
            }
          ]
        };
        break;
      case 'offers':
        title = "Weekly Grocery Deals & Super Combos | Bhairahawa Fresh";
        description = "Save more with our handpicked weekly combos, kitchen packages, and special seasonal discounts. Fresh harvests at unmatched budget prices.";
        keywords = "grocery offers Bhairahawa, weekly food deals, kitchen combo pack, discount vegetables nepal, grocery savings";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          "name": "Super Savings Offers & Combo Deals",
          "description": "Exclusive discounts and value bundles of food essentials including flour, oils, pulses, tea, and noodles."
        };
        break;
      case 'about':
        title = "About Us & Our Farm Sourcing | Bhairahawa Fresh";
        description = "Read our story! Sourcing purest, chemical-free crops directly from Nepalese farmers to deliver nutrition, health, and organic quality straight to your table.";
        keywords = "about Bhairahawa Fresh, our farms nepal, healthy organic lifestyle, local farmer support lumbini";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Bhairahawa Fresh",
          "description": "Connecting local farmers of Terai with conscious families of Bhairahawa."
        };
        break;
      case 'contact':
        title = "Contact Us & Store Location | Bhairahawa Fresh";
        description = "Find us on Aawa Road, Bhairahawa, Nepal. Call us at +977-9715716789 or send a direct query. We are open daily from 6 AM to 9 PM.";
        keywords = "Bhairahawa Fresh phone number, Aawa Road store location, customer care grocery bhairahawa, whatsapp grocery nepal";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Bhairahawa Fresh Customer Service",
          "description": "Get in touch for custom orders, bulk requirements, or quick home delivery support on Aawa Road."
        };
        break;
      default:
        break;
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Update meta tags in head
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', description);
    }

    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const url = `https://bhairahawafresh.com/#${currentView}`;
      canonicalLink.setAttribute('href', url);
    }

    // 3. Inject/Update Dynamic Schema.org JSON-LD tag
    let schemaScript = document.getElementById('dynamic-seo-schema') as HTMLScriptElement;
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schemaObj || {});
    } else if (schemaObj) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-seo-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(schemaScript);
    }
  }, [currentView]);

  return null;
}
