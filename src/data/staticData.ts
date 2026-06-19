import { CategoryItem, FaqItem, Review } from '../types';

export const categoriesData: CategoryItem[] = [
  { name: "Rice", icon: "Rice", bgColor: "bg-emerald-50 text-emerald-700 hover:bg-emerald-600" },
  { name: "Flour", icon: "Wheat", bgColor: "bg-amber-50 text-amber-700 hover:bg-amber-600" },
  { name: "Oils", icon: "Droplets", bgColor: "bg-yellow-50 text-yellow-700 hover:bg-yellow-600" },
  { name: "Pulses", icon: "Sprout", bgColor: "bg-teal-50 text-teal-700 hover:bg-teal-600" },
  { name: "Sugar/Salt", icon: "Cookie", bgColor: "bg-orange-50 text-orange-700 hover:bg-orange-600" },
  { name: "Tea/Coffee", icon: "Coffee", bgColor: "bg-amber-100 text-amber-900 hover:bg-amber-800" },
  { name: "Spices", icon: "Flame", bgColor: "bg-red-50 text-red-700 hover:bg-red-600" },
  { name: "Soap", icon: "Sparkles", bgColor: "bg-indigo-50 text-indigo-700 hover:bg-indigo-600" },
  { name: "Detergent", icon: "Shirt", bgColor: "bg-blue-50 text-blue-700 hover:bg-blue-600" },
  { name: "Personal Care", icon: "FaceSmile", bgColor: "bg-purple-50 text-purple-700 hover:bg-purple-600" },
  { name: "Snacks", icon: "Pizza", bgColor: "bg-rose-50 text-rose-700 hover:bg-rose-600" },
  { name: "Beverages", icon: "GlassWater", bgColor: "bg-cyan-50 text-cyan-700 hover:bg-cyan-600" },
  { name: "Baby Care", icon: "Baby", bgColor: "bg-pink-50 text-pink-700 hover:bg-pink-600" },
  { name: "Household", icon: "Home", bgColor: "bg-stone-50 text-stone-700 hover:bg-stone-600" }
];

export const reviewsData: Review[] = [
  {
    name: "Rajesh Khanal",
    avatar: "RK",
    rating: 5,
    text: "Bhairahawa Fresh has changed how I buy groceries. The delivery is super fast, and the quality of their Jeera Rice is the best in town.",
    role: "Local Resident"
  },
  {
    name: "Sita Sharma",
    avatar: "SS",
    rating: 5,
    text: "Finally a modern store in Bhairahawa. It's so clean and everything is organized. Their WhatsApp ordering system is very convenient.",
    role: "Business Owner"
  },
  {
    name: "Mahesh Pandey",
    avatar: "MP",
    rating: 5,
    text: "Great pricing! I compared their prices with the local bazaar and they are very competitive. Highly recommended for monthly groceries.",
    role: "School Teacher"
  }
];

export const faqData: FaqItem[] = [
  {
    question: "Which areas do you deliver to?",
    answer: "We deliver across the entire Bhairahawa city area including Aawa Road, Milanchowk, Devkota Chowk, and as far as the Airport area."
  },
  {
    question: "How can I place an order?",
    answer: "You can place an order directly through this website by clicking on 'Order via WhatsApp' inside your interactive cart, call us at our store number, or simply send your list via WhatsApp."
  },
  {
    question: "Are the prices on the website updated daily?",
    answer: "Yes, our team updates the prices list every morning by 8:00 AM based on the current market rates. The live price list matches our dynamic local catalog."
  },
  {
    question: "Do you offer premium local products and unpolished lentils?",
    answer: "Absolutely! We focus on highlighting premium local suppliers like Jumla organic kidney beans, Ilam orthodox tea leaves, and local cold-pressed mustard oils."
  }
];
