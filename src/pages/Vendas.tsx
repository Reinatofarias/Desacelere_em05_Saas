
import React from 'react';
import Header from '@/components/Header';

const Vendas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-rose-800 mb-4">
            Página de Vendas
          </h1>
          <p className="text-pink-600 text-lg">
            Em breve, mais informações sobre o programa Desacelere em 05
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vendas;
