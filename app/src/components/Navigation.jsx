import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navItems = [
    { id: 'sobre', label: 'Empresa' },
    { id: 'paisagismo', label: 'Nossos Serviços' },
    { id: 'floricultura', label: 'Floricultura' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
          onClick={closeMenu}
        >
          <img
            src="/assets/logotipo-eden.png"
            alt="Luis Eden"
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-eden-primary">Luis Eden</span>
            <span className="text-xs font-medium text-eden-light">Paisagismo</span>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium text-stone-700 transition-colors hover:text-eden-primary"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/login"
            className="text-sm font-medium text-white bg-eden-primary px-4 py-2 rounded-lg hover:bg-eden-light transition-colors"
          >
            Área do Cliente
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-eden-primary transition-colors hover:bg-stone-100 lg:hidden"
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div
        className={`border-t border-stone-200 bg-white px-5 py-2 lg:hidden ${
          isOpen ? 'flex' : 'hidden'
        } flex-col`}
      >
        {navItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={closeMenu}
            className="border-b border-stone-100 py-3 text-sm font-medium text-stone-700 last:border-0 transition-colors hover:text-eden-primary hover:bg-stone-50"
          >
            {item.label}
          </a>
        ))}
        <Link
          to="/login"
          onClick={closeMenu}
          className="py-3 text-sm font-medium text-white bg-eden-primary px-4 rounded-lg hover:bg-eden-light transition-colors text-center mt-2 block"
        >
          Área do Cliente
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
