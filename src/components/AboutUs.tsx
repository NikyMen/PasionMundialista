import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <section
      id="nosotros"
      className="relative min-h-[600px]"
      style={{
        backgroundImage: 'url(/background-nosotros-futbol.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex justify-end">
        <div className="bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg shadow-lg w-full md:max-w-xl p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nosotros</h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed">
            <p>
              En Pasión Mundialista nos dedicamos a acercar la emoción del Mundial a cada rincón, ofreciendo álbumes y figuritas originales para fanáticos del fútbol.
            </p>
            <p>
              Trabajamos con productos auténticos, garantizando calidad y confiabilidad en cada compra.
            </p>
            <p>
              Nuestro objetivo es brindar un servicio ágil y atención personalizada, acompañando a nuestros clientes durante toda la experiencia.
            </p>
            <p>
              Nos enfocamos en el abastecimiento, la disponibilidad y el compromiso con nuestros clientes, especialmente en momentos de alta demanda como el lanzamiento del Mundial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
