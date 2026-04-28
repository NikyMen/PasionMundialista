import React from 'react';
import { Headphones, Shield, Truck } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black text-gray-950">
            Por qué elegir Pasión Mundialista
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Originales, confiables y listos para que vivas el Mundial como corresponde.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-pitch-100">
              <Truck className="h-6 w-6 text-pitch-700" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-950">
              Entrega ágil
            </h3>
            <p className="text-sm leading-6 text-gray-600">
              Recibí tus álbumes y figuritas sin vueltas.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cup-100">
              <Shield className="h-6 w-6 text-cup-700" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-950">
              Productos originales
            </h3>
            <p className="text-sm leading-6 text-gray-600">
              Trabajamos con artículos auténticos y confiables.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
              <Headphones className="h-6 w-6 text-primary-700" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-950">
              Atención personalizada
            </h3>
            <p className="text-sm leading-6 text-gray-600">
              Te acompañamos durante toda la compra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
