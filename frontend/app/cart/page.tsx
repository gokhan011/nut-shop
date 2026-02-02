'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
        <p className="text-gray-600 mb-8">Henüz ürün eklemediniz.</p>
        <Link
          href="/products"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-amber-900 mb-8">Alışveriş Sepeti</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4"
              >
                <div className="relative w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                  {item.product.image ? (
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl">
                      🥜
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-lg font-semibold text-gray-800 hover:text-amber-600"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600">{item.product.category_name}</p>
                  <p className="text-amber-600 font-bold mt-2">
                    {parseFloat(item.product.price).toFixed(2)} ₺
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="font-bold text-lg">
                    {(parseFloat(item.product.price) * item.quantity).toFixed(2)} ₺
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span className="font-semibold">{getTotal().toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo:</span>
                <span className="font-semibold text-green-600">Ücretsiz</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Toplam:</span>
                <span className="text-amber-600">{getTotal().toFixed(2)} ₺</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-amber-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
            >
              Sipariş Ver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
