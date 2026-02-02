'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/api';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts({ ordering: '-created_at', page_size: 8 }),
          getCategories()
        ]);
        setProducts(productsRes.data.results || productsRes.data);
        setCategories(categoriesRes.data.results || categoriesRes.data);
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">
            Hoş Geldiniz - Nut Shop
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            En taze ve kaliteli kuruyemişler için doğru adrestesiniz. 
            Sağlıklı atıştırmalıkların keyfini çıkarın!
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition"
          >
            Ürünlere Göz Atın
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">
            Öne Çıkan Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-amber-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">
            Kategoriler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-amber-800">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
