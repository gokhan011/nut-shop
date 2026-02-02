'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProduct } from '@/lib/api';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(slug);
        setProduct(response.data);
      } catch (error) {
        console.error('Ürün yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Ürün bulunamadı</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-9xl">
              🥜
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.category_name}</p>
          <p className="text-3xl font-bold text-amber-600 mb-6">
            {parseFloat(product.price).toFixed(2)} ₺
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">Açıklama:</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.weight && (
            <p className="text-gray-600 mb-4">Ağırlık: {product.weight}</p>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                <Plus size={20} />
              </button>
            </div>
            <p className="text-gray-600">Stok: {product.stock}</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.available || product.stock === 0}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={24} />
            Sepete Ekle
          </button>

          {product.stock === 0 && (
            <p className="text-red-500 mt-4 text-center">Bu ürün stokta yok</p>
          )}
        </div>
      </div>
    </div>
  );
}
