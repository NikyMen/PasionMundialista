import React, { useState } from 'react';
import { ShoppingCart, Package, Star, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useNotification } from '../hooks/useNotification';
import { Notification } from './Notification';
import { ProductDetailModal } from './ProductDetailModal';
import { formatPriceARS } from '../lib/formatters';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { notification, showSuccess, hideNotification } = useNotification();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el modal al hacer clic en "Agregar"
    addItem(product, 1);
    showSuccess(`${product.name} se añadió correctamente al carrito`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Obtener todas las imágenes disponibles
  const allImages = [product.image, ...(product.images || [])].filter(Boolean);
  const currentImage = allImages[currentImageIndex] || product.image;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el modal al navegar por las imágenes
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el modal al navegar por las imágenes
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div
        className="group cursor-pointer overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
        onClick={openModal}
      >
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden bg-stone-50">
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Botón de vista detallada */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity hover:bg-black/30 hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              className="rounded-full bg-white p-3 shadow-md hover:bg-gray-100"
            >
              <Eye size={20} />
            </button>
          </div>
          
          {/* Navegación de imágenes */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-opacity hover:bg-black/70"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-opacity hover:bg-black/70"
              >
                <ChevronRight size={16} />
              </button>
              
              {/* Indicadores de imágenes */}
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se abra el modal al cambiar de imagen
                      setCurrentImageIndex(index);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-5">
          <div className="mb-2">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-1 text-xs font-bold text-primary-800">
              {product.category}
            </span>
          </div>
          
          <h3 className="mb-2 line-clamp-2 text-lg font-black text-gray-950">
            {product.name}
          </h3>
          
          <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
            {product.description}
          </p>
          
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-gray-300" />
              <span className="text-sm text-gray-500 ml-1">(4.0)</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-2xl font-black text-primary-600">
                {formatPriceARS(product.price)}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 font-bold text-white transition-colors hover:bg-primary-700"
            >
              <ShoppingCart size={16} />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de detalle del producto */}
      <ProductDetailModal 
        product={product}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
};
