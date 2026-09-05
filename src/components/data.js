const products = [
  {
    id: 1,
    name: "Apple MacBook Air 15-inch M3, 16GB RAM, 512GB SSD",
    price: 134999,
    originalPrice: 149999,
    discount: "10% OFF",
    rating: 4.9,
    image: "https://imageio.forbes.com/specials-images/imageserve/65edf9344bf5e45e09a32b1b/DSC01908/1960x0.jpg?format=jpg&width=960",
    isBestSeller: true,
    brand: "Apple"
  },
  {
    id: 2,
    name: "Apple iPhone 17 Pro Max, 1TB",
    price: 129999,
    originalPrice: 149999,
    discount: "13% OFF",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Apple"
  },
  {
    id: 3,
    name: "Samsung Galaxy S25 Ultra, 512GB",
    price: 119999,
    originalPrice: 134999,
    discount: "11% OFF",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Samsung"
  },
  {
    id: 4,
    name: "Google Pixel 9 Pro XL, 256GB",
    price: 99999,
    originalPrice: 109999,
    discount: "9% OFF",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85",
    isBestSeller: false,
    brand: "Google"
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 29990,
    originalPrice: 34990,
    discount: "14% OFF",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Sony"
  },
  {
    id: 6,
    name: "Apple AirPods Pro 2nd Generation",
    price: 21999,
    originalPrice: 24900,
    discount: "12% OFF",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Apple"
  },
  {
    id: 7,
    name: "Bose QuietComfort Ultra Earbuds",
    price: 24900,
    originalPrice: 29900,
    discount: "17% OFF",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85",
    isBestSeller: false,
    brand: "Bose"
  },
  {
    id: 8,
    name: "Apple Watch Series 10 GPS, 46mm",
    price: 46900,
    originalPrice: 49900,
    discount: "6% OFF",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Apple"
  },
  {
    id: 9,
    name: "Samsung Galaxy Watch 7 Classic LTE",
    price: 34999,
    originalPrice: 42999,
    discount: "19% OFF",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=85",
    isBestSeller: false,
    brand: "Samsung"
  },
  {
    id: 10,
    name: "Dell XPS 14 Intel Core Ultra 7, 1TB SSD",
    price: 154990,
    originalPrice: 169990,
    discount: "9% OFF",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85",
    isBestSeller: false,
    brand: "Dell"
  },
  {
    id: 11,
    name: "iPad Pro 13-inch M4, Wi-Fi, 512GB",
    price: 119900,
    originalPrice: 129900,
    discount: "8% OFF",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Apple"
  },
  {
    id: 12,
    name: "PlayStation 5 Slim Disc Edition",
    price: 54990,
    originalPrice: 59990,
    discount: "8% OFF",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=85",
    isBestSeller: true,
    brand: "Sony"
  },
  {
    id: 13,
    name: "Logitech MX Master 3S Performance Mouse",
    price: 8995,
    originalPrice: 10995,
    discount: "18% OFF",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=85",
    isBestSeller: false,
    brand: "Logitech"
  },
  {
    id: 14,
    name: "Keychron K2 Pro Wireless Mechanical Keyboard",
    price: 10999,
    originalPrice: 13999,
    discount: "21% OFF",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=85",
    isBestSeller: false,
    brand: "Keychron"
  },
  {
    id: 15,
    name: "Anker 737 Power Bank, 24000mAh 140W",
    price: 11999,
    originalPrice: 14999,
    discount: "20% OFF",
    rating: 4.5,
    image: "https://i5.walmartimages.com/seo/Anker-24000mAh-Power-Bank-PowerCore-24K-3-Port-Portable-Charger-Fast-Charging-140W-Output-Smart-Digital-Display_4dbba0de-e70d-47e3-b549-cae789e6df91.58febb4e7e62b70c0852e011caee453b.jpeg",
    isBestSeller: false,
    brand: "Anker"
  }
];

export default products;