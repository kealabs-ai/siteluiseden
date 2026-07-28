import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-mobile">
      <div className="nav-header">
        <Link to="/" className="nav-logo">
          <span>🌿</span>
          <div>
            <span className="logo-name">Luis Eden</span>
            <span className="logo-sub">Paisagismo</span>
          </div>
        </Link>
        <button 
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      
      <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Início</Link></li>
        <li><Link to="/servicos" onClick={() => setIsOpen(false)}>Serviços</Link></li>
        <li><Link to="/galeria" onClick={() => setIsOpen(false)}>Galeria</Link></li>
        <li><Link to="/contato" onClick={() => setIsOpen(false)}>Contato</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
