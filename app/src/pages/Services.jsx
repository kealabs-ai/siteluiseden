import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

function Services() {
  const services = [
    {
      id: 1,
      icon: '🏡',
      title: 'Paisagismo Residencial',
      description: 'Jardins personalizados que transformam sua casa em um paraíso verde'
    },
    {
      id: 2,
      icon: '🏢',
      title: 'Paisagismo Corporativo',
      description: 'Ambientes verdes para empresas que transmitem bem-estar'
    },
    {
      id: 3,
      icon: '🌊',
      title: 'Jardins Aquáticos',
      description: 'Lagos ornamentais e fontes integradas ao paisagismo'
    },
    {
      id: 4,
      icon: '🌿',
      title: 'Jardins Verticais',
      description: 'Paredes vivas que otimizam espaços e trazem vida'
    },
    {
      id: 5,
      icon: '✂️',
      title: 'Manutenção de Jardins',
      description: 'Serviço contínuo para manter seu jardim impecável'
    },
    {
      id: 6,
      icon: '🎪',
      title: 'Decoração para Eventos',
      description: 'Cenários naturais deslumbrantes para eventos especiais'
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Nossos Serviços</h1>
        <p>Soluções completas em paisagismo e floricultura</p>
      </div>

      <div className="container">
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/contato" className="service-link">Saiba mais →</Link>
            </div>
          ))}
        </div>
      </div>

      <section className="service-cta">
        <div className="container">
          <h2>Quer conhecer mais sobre nossos serviços?</h2>
          <Link to="/contato" className="btn-primary">Fale Conosco</Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
