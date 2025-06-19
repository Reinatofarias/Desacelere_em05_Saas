
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/57856187-a76d-4a9b-b59d-cf329858d21b.png" 
            alt="Desacelere em 05 Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Navbar */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              location.pathname === '/'
                ? 'bg-white/20 text-white shadow-md'
                : 'hover:bg-white/10 text-white/90 hover:text-white'
            }`}
          >
            Timer
          </Link>
          <Link
            to="/vendas"
            className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              location.pathname === '/vendas'
                ? 'bg-white/20 text-white shadow-md'
                : 'hover:bg-white/10 text-white/90 hover:text-white'
            }`}
          >
            Página de Vendas
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
