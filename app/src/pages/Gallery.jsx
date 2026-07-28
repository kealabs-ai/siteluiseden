import React, { useState } from 'react';
import './Gallery.css';

function Gallery() {
  const [filter, setFilter] = useState('todos');

  const projects = [
    { id: 1, category: 'residencial', title: 'Jardim Residencial', location: 'São Paulo, SP', icon: '🏡' },
    { id: 2, category: 'corporativo', title: 'Sede Corporativa', location: 'Rio de Janeiro, RJ', icon: '🏢' },
    { id: 3, category: 'eventos', title: 'Decoração de Casamento', location: 'Belo Horizonte, MG', icon: '💒' },
    { id: 4, category: 'residencial', title: 'Jardim Vertical', location: 'São Paulo, SP', icon: '🌿' },
    { id: 5, category: 'corporativo', title: 'Lago Ornamental', location: 'Curitiba, PR', icon: '🌊' },
    { id: 6, category: 'residencial', title: 'Jardim Tropical', location: 'Salvador, BA', icon: '🌺' }
  ];

  const filtered = filter === 'todos' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Galeria de Projetos</h1>
        <p>Conheça alguns dos nossos trabalhos</p>
      </div>

      <div className="container">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'todos' ? 'active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'residencial' ? 'active' : ''}`}
            onClick={() => setFilter('residencial')}
          >
            Residencial
          </button>
          <button 
            className={`filter-btn ${filter === 'corporativo' ? 'active' : ''}`}
            onClick={() => setFilter('corporativo')}
          >
            Corporativo
          </button>
          <button 
            className={`filter-btn ${filter === 'eventos' ? 'active' : ''}`}
            onClick={() => setFilter('eventos')}
          >
            Eventos
          </button>
        </div>

        <div className="gallery-items">
          {filtered.map(project => (
            <div key={project.id} className="gallery-card">
              <div className="gallery-image">
                <div className="image-placeholder">{project.icon}</div>
              </div>
              <div className="gallery-info">
                <h3>{project.title}</h3>
                <p>{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
