import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { Package, Loader2, X } from 'lucide-react';
import type { Product } from '../types';

interface ProductGridProps {
  onCartUpdate?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onCartUpdate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const readCachedArray = <T,>(key: string): T[] => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return [];
      const parsed = JSON.parse(cached);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setLoadError(false);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('No se pudo cargar el catálogo');
      const data = await response.json();
      const productList = Array.isArray(data) ? data : [];
      setProducts(productList);
      try {
        localStorage.setItem('catalog-products', JSON.stringify(productList));
      } catch {}
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setLoadError(true);
      const cachedProducts = readCachedArray<Product>('catalog-products');
      if (cachedProducts.length > 0) setProducts(cachedProducts);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('No se pudieron cargar las categorías');
      const data = await response.json();
      const categoryList = Array.isArray(data) ? data.map((cat: any) => cat.name) : [];
      setCategories(categoryList);
      try {
        localStorage.setItem('catalog-categories', JSON.stringify(categoryList));
      } catch {}
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      const cachedCategories = readCachedArray<string>('catalog-categories');
      if (cachedCategories.length > 0) setCategories(cachedCategories);
    }
  };

  // Optimized filtering with useMemo
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por búsqueda
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [products, debouncedSearchQuery, selectedCategory]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const handleToggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">
            Catálogo
          </p>
          <h2 className="text-3xl font-black text-gray-950">
            Productos para coleccionistas
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-gray-600">
          Busca por nombre o filtra por categoría para encontrar rápido lo que te falta.
        </p>
      </div>

      {/* Search and Filters */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        showFilters={showFilters}
        onToggleFilters={handleToggleFilters}
      />

      {loadError && (
        <div className="mb-6 border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-900">
          No pudimos actualizar el catálogo. Si ves productos, son datos guardados temporalmente.
        </div>
      )}

      {/* Results Info */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-gray-600">
          {loadError && products.length === 0 ? (
            'No se pudieron cargar productos'
          ) : filteredProducts.length === 0 ? (
            'No se encontraron productos'
          ) : (
            `Mostrando ${filteredProducts.length} de ${products.length} productos`
          )}
        </p>
        {(searchQuery || selectedCategory) && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-800">
                Búsqueda: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-800">
                Categoría: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 bg-white py-16 text-center shadow-sm">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {loadError && products.length === 0
              ? 'No pudimos cargar el catálogo'
              : searchQuery || selectedCategory ? 'No se encontraron productos' : 'No hay productos disponibles'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {loadError && products.length === 0
              ? 'Intentá de nuevo en unos minutos.'
              : searchQuery || selectedCategory 
              ? 'Intenta con otros términos de búsqueda o filtros diferentes.'
              : 'Los productos aparecerán aquí cuando estén disponibles.'
            }
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={handleClearFilters}
              className="mt-4 text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};
