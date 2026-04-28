import React, { useState } from 'react';
import { Menu, Settings, X } from 'lucide-react';
import { CartButton } from './Cart/CartButton';
import { CartSidebar } from './Cart/CartSidebar';

export const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClass =
    'rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700';

  const mobileLinkClass =
    'block rounded-md px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700';

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="/logo-pasion-mundialista.png"
                  alt="Pasión Mundialista Logo"
                  className="h-12 w-12 rounded-full object-cover drop-shadow-sm"
                />
              </a>
            </div>

            <nav className="hidden items-center rounded-full border border-gray-200 bg-white px-2 py-1 shadow-sm md:flex">
              <a href="/" className={navLinkClass}>
                Inicio
              </a>
              <a href="/#productos" className={navLinkClass}>
                Productos
              </a>
              <a href="/nosotros" className={navLinkClass}>
                Nosotros
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <CartButton onClick={toggleCart} />

              <button
                onClick={toggleMobileMenu}
                className="rounded-full border border-gray-200 p-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 md:hidden"
                aria-label="Abrir menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="space-y-1 border-t border-gray-200 px-2 pb-3 pt-2 sm:px-3">
                <a
                  href="/"
                  className={mobileLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </a>
                <a
                  href="/#productos"
                  className={mobileLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Productos
                </a>
                <a
                  href="/nosotros"
                  className={mobileLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nosotros
                </a>
                <a
                  href="/admin"
                  className="flex items-center rounded-md px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Admin
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
