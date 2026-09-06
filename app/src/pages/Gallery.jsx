import React, { useState } from 'react'

function Gallery() {
  const [filter, setFilter] = useState('todos')

  const projects = [
    { id: 1, category: 'residencial', title: 'Jardim Residencial', location: 'São Paulo, SP', icon: '🏡' },
    { id: 2, category: 'corporativo', title: 'Sede Corporativa', location: 'Rio de Janeiro, RJ', icon: '🏢' },
    { id: 3, category: 'eventos', title: 'Decoração de Casamento', location: 'Belo Horizonte, MG', icon: '💒' },
    { id: 4, category: 'residencial', title: 'Jardim Vertical', location: 'São Paulo, SP', icon: '🌿' },
    { id: 5, category: 'corporativo', title: 'Lago Ornamental', location: 'Curitiba, PR', icon: '🌊' },
    { id: 6, category: 'residencial', title: 'Jardim Tropical', location: 'Salvador, BA', icon: '🌺' }
  ]

  const filtered = filter === 'todos' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-r from-eden-primary to-eden-light text-white py-16 px-5">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Galeria de Projetos</h1>
          <p className="text-xl text-white/90">Conheça alguns dos nossos trabalhos</p>
        </div>
      </div>

      <div className="container py-20">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['todos', 'residencial', 'corporativo', 'eventos'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === cat
                  ? 'bg-eden-primary text-white'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map(project => (
            <div key={project.id} className="gallery-item">
              <div className="w-full h-full bg-gradient-to-br from-eden-accent-light to-eden-accent flex items-center justify-center text-6xl">
                {project.icon}
              </div>
              <div className="gallery-overlay">
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
                <p className="text-white/90">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery
