'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-amber-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold hover:text-amber-200 transition">
            🥜 Nut Shop
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-amber-200 transition">
              Ana Sayfa
            </Link>
            <Link href="/products" className="hover:text-amber-200 transition">
              Ürünler
            </Link>
            <Link href="/cart" className="relative hover:text-amber-200 transition flex items-center gap-2">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
