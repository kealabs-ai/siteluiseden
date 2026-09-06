import React from 'react'

function Services() {
  const services = [
    { id: 1, icon: '🏡', title: 'Paisagismo Residencial', description: 'Jardins personalizados que transformam sua casa em um paraíso verde' },
    { id: 2, icon: '🏢', title: 'Paisagismo Corporativo', description: 'Ambientes verdes para empresas que transmitem bem-estar' },
    { id: 3, icon: '🌊', title: 'Jardins Aquáticos', description: 'Lagos ornamentais e fontes integradas ao paisagismo' },
    { id: 4, icon: '🌿', title: 'Jardins Verticais', description: 'Paredes vivas que otimizam espaços e trazem vida' },
    { id: 5, icon: '✂️', title: 'Manutenção de Jardins', description: 'Serviço contínuo para manter seu jardim impecável' },
    { id: 6, icon: '🎪', title: 'Decoração para Eventos', description: 'Cenários naturais deslumbrantes para eventos especiais' }
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-r from-eden-primary to-eden-light text-white py-16 px-5">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-xl text-white/90">Soluções completas em paisagismo e floricultura</p>
        </div>
      </div>

      <div className="container py-20">
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-eden-primary">{service.title}</h3>
              <p className="text-stone-600 mb-6">{service.description}</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right ml-2"></i></a>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-eden-accent-light py-16 px-5">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-eden-primary mb-8">Quer conhecer mais sobre nossos serviços?</h2>
          <a href="#contato" className="btn-primary btn-large">Fale Conosco</a>
        </div>
      </section>
    </div>
  )
}

export default Services
