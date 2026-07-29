import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/assets/logotipo-eden.png" alt="Luis Eden" className="logo-img" />
          <div className="logo-text">
            <span className="logo-name">Luis Eden</span>
            <span className="logo-sub">Paisagismo</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#sobre" className="text-gray-700 font-medium hover:text-green-700 transition">Empresa</a>
          <a href="#paisagismo" className="text-gray-700 font-medium hover:text-green-700 transition">Nossos Serviços</a>
          <a href="#floricultura" className="text-gray-700 font-medium hover:text-green-700 transition">Floricultura</a>
          <a href="#projetos" className="text-gray-700 font-medium hover:text-green-700 transition">Projetos</a>
          <a href="#contato" className="text-gray-700 font-medium hover:text-green-700 transition">Contato</a>
        </div>

        <button 
          className="md:hidden flex flex-col gap-1.5 cursor-pointer" 
          id="hamburger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span className="w-6 h-0.5 bg-green-900 rounded transition-all"></span>
          <span className="w-6 h-0.5 bg-green-900 rounded transition-all"></span>
          <span className="w-6 h-0.5 bg-green-900 rounded transition-all"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-links hidden md:hidden flex-col bg-white shadow-md ${isOpen ? 'active' : ''}`} id="navLinks">
        <a href="#sobre" className="px-6 py-3 text-gray-700 hover:bg-gray-100 transition">Empresa</a>
        <a href="#paisagismo" className="px-6 py-3 text-gray-700 hover:bg-gray-100 transition">Nossos Serviços</a>
        <a href="#floricultura" className="px-6 py-3 text-gray-700 hover:bg-gray-100 transition">Floricultura</a>
        <a href="#projetos" className="px-6 py-3 text-gray-700 hover:bg-gray-100 transition">Projetos</a>
        <a href="#contato" className="px-6 py-3 text-gray-700 hover:bg-gray-100 transition">Contato</a>
      </div>
    </nav>
  );
}

export default Navigation;
