'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl">
              🥜
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-amber-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.category_name}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">
            {parseFloat(product.price).toFixed(2)} ₺
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition"
            disabled={!product.available || product.stock === 0}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        {product.stock === 0 && (
          <p className="text-red-500 text-sm mt-2">Stokta yok</p>
        )}
      </div>
    </div>
  );
}
