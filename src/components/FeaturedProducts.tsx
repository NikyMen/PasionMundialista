import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../stores/cartStore';
import { formatPriceARS } from '../lib/formatters';

export const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts.length, isAutoPlaying]);

  const readCachedProducts = (): Product[] => {
    try {
      const cached = localStorage.getItem('featured-products');
      if (!cached) return [];
      const parsed = JSON.parse(cached);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products/featured');
      if (!response.ok) throw new Error('No se pudieron cargar los destacados');
      const products = await response.json();
      const productList = Array.isArray(products) ? products : [];
      setFeaturedProducts(productList);
      try {
        localStorage.setItem('featured-products', JSON.stringify(productList));
      } catch {}
    } catch (error) {
      console.error('Error fetching featured products:', error);
      const cachedProducts = readCachedProducts();
      if (cachedProducts.length > 0) setFeaturedProducts(cachedProducts);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mx-auto mb-4 h-8 w-64 rounded bg-gray-300" />
            <div className="mx-auto mb-8 h-4 w-80 max-w-full rounded bg-gray-300" />
            <div className="h-96 rounded bg-gray-300" />
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-black text-gray-950">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600">
              Descubre nuestros productos más populares y recomendados.
            </p>
          </div>

          <div className="border border-gray-200 bg-stone-50 p-12 text-center shadow-sm">
            <Star size={64} className="mx-auto mb-6 text-gray-300" />
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              No hay productos destacados aún
            </h3>
            <p className="text-gray-500">
              Cuando marques productos como destacados, aparecerán en este carrusel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-black text-gray-950">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600">
            Una selección rápida para arrancar o completar tu colección.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden border border-gray-200 bg-white shadow-2xl shadow-gray-200/70">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="min-h-[250px] md:flex">
                    <div className="relative flex h-[220px] items-center justify-center overflow-hidden bg-stone-50 md:h-[290px] md:w-1/2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-4"
                      />
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center rounded-full bg-cup-400 px-3 py-1 text-sm font-bold text-yellow-950 shadow-lg">
                          <Star size={14} className="mr-1 fill-current" />
                          Destacado
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-8 md:w-1/2 lg:p-12">
                      <div className="mb-6">
                        <span className="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-bold text-primary-800">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="mb-6 text-3xl font-black text-gray-950 lg:text-4xl">
                        {product.name}
                      </h3>
                      <p className="mb-8 line-clamp-4 text-lg leading-relaxed text-gray-600">
                        {product.description}
                      </p>
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="mb-1 text-sm font-semibold text-gray-500">
                            Precio especial
                          </p>
                          <span className="text-4xl font-black text-primary-600">
                            {formatPriceARS(product.price)}
                          </span>
                        </div>
                        <button
                          onClick={() => addItem(product, 1)}
                          className="flex items-center justify-center gap-3 rounded-full bg-primary-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary-700 hover:shadow-xl"
                        >
                          <ShoppingCart size={24} />
                          <span>Agregar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {featuredProducts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Producto destacado anterior"
              >
                <ChevronLeft size={28} className="text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Producto destacado siguiente"
              >
                <ChevronRight size={28} className="text-gray-800" />
              </button>
            </>
          )}

          {featuredProducts.length > 1 && (
            <div className="mt-8 flex justify-center gap-3">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-9 bg-primary-600 shadow-lg'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al destacado ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
