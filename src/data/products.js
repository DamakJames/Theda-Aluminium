import { createClient } from '../utils/supabase/client';

export const fallbackProducts = [
  {
    id: 1,
    name: 'Hydroseal Damp Shield',
    category: 'paints',
    price: 38000,
    formattedPrice: '₦38,000',
    rating: 5,
    reviews: 96,
    tagline: 'Ultimate Protection Against Dampness & Moisture',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Weather Shield Exterior Paint',
    category: 'paints',
    price: 45000,
    formattedPrice: '₦45,000',
    rating: 5,
    reviews: 128,
    tagline: 'Weather Resistant, Long Lasting Finish',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Ingco Paint Roller Set 9"',
    category: 'tools',
    price: 6500,
    formattedPrice: '₦6,500',
    rating: 5,
    reviews: 75,
    tagline: 'Premium Quality Roller Set For Smooth Finish',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Stanley Paint Brush 3"',
    category: 'tools',
    price: 2800,
    formattedPrice: '₦2,800',
    rating: 5,
    reviews: 64,
    tagline: 'High Quality Bristles For Perfect Application',
    image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    name: 'Tile Adhesive 20kg',
    category: 'working',
    price: 4500,
    formattedPrice: '₦4,500',
    rating: 5,
    reviews: 43,
    tagline: 'Strong Bond, For Tiles & Large Surfaces',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    name: 'Masking Tape 36mm',
    category: 'working',
    price: 1200,
    formattedPrice: '₦1,200',
    rating: 5,
    reviews: 52,
    tagline: 'High Adhesion, Easy Removal',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    name: 'Luxury Silk Acrylic Paint 20L',
    category: 'paints',
    price: 52000,
    formattedPrice: '₦52,000',
    rating: 5,
    reviews: 110,
    tagline: 'Premium satin finish for interior walls, washable',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    name: 'Hydroseal Super Lock 20L',
    category: 'paints',
    price: 68000,
    formattedPrice: '₦68,000',
    rating: 5,
    reviews: 84,
    tagline: 'Advanced polymer roof & concrete dampness shield',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80'
  }
];

// For now, we export products as a static array for synchronous use in components.
// We will convert the components to use fetchProducts later when we integrate Server Components fully.
export const products = fallbackProducts;

export async function fetchProducts() {
  try {
    const supabase = createClient();
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return fallbackProducts;
    }
    const { data, error } = await supabase.from('products').select('*');
    if (error || !data || data.length === 0) {
      return fallbackProducts;
    }
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return fallbackProducts;
  }
}
