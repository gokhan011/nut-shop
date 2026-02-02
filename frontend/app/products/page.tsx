'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts, getCategories } from '@/lib/api';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(category ? { category } : {}),
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
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-amber-900 mb-8">
        {category ? categories.find(c => c.slug === category)?.name : 'Tüm Ürünler'}
      </h1>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <h2 className="text-xl font-semibold mb-4 text-amber-800">Kategoriler</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/products"
                className={`block p-2 rounded hover:bg-amber-100 transition ${
                  !category ? 'bg-amber-200 font-semibold' : ''
                }`}
              >
                Tümü
              </a>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`/products?category=${cat.slug}`}
                  className={`block p-2 rounded hover:bg-amber-100 transition ${
                    category === cat.slug ? 'bg-amber-200 font-semibold' : ''
                  }`}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Bu kategoride ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
