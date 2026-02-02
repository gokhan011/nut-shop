import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl">Yükleniyor...</div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
