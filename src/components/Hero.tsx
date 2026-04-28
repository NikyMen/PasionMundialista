import React from 'react';
import { ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div
      className="relative flex min-h-[680px] items-center overflow-hidden text-white"
      style={{
        backgroundImage: 'url(/hero-pasion-mundialista.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-gray-100 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur">
            <Sparkles size={16} className="text-cup-400" />
            Álbumes, figuritas y coleccionables originales
          </div>
          <h1 className="mb-6 text-4xl font-black leading-tight drop-shadow-lg md:text-6xl">
            Bienvenido a Pasión Mundialista
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-8 text-white/90 drop-shadow-md md:text-2xl">
            Todo para completar tu colección mundialista con productos seleccionados, compra simple y atención directa.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3 font-bold text-white shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
            >
              <ShoppingBag size={20} />
              <span>Ver Productos</span>
            </a>
            <a
              href="/nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-7 py-3 font-bold text-white backdrop-blur transition-all hover:bg-white/25"
            >
              <ShieldCheck size={20} />
              <span>Conocenos</span>
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-center sm:text-left">
            {['Originales', 'Stock curado', 'Compra rápida'].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-black/20 p-3 backdrop-blur">
                <p className="text-sm font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
