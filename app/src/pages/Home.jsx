import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    servico: '',
    mensagem: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.nome && formData.email && formData.mensagem) {
      setSubmitted(true)
      setFormData({ nome: '', telefone: '', email: '', servico: '', mensagem: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const services = [
    { icon: '🏡', title: 'Paisagismo Residencial', desc: 'Jardins personalizados que transformam sua casa em um paraíso verde.' },
    { icon: '🏢', title: 'Paisagismo Corporativo', desc: 'Ambientes verdes para empresas que transmitem bem-estar e produtividade.', featured: true },
    { icon: '🌊', title: 'Jardins Aquáticos', desc: 'Lagos ornamentais e fontes integradas ao paisagismo.' },
    { icon: '🌿', title: 'Jardins Verticais', desc: 'Paredes vivas que otimizam espaços e trazem vida.' },
    { icon: '✂️', title: 'Manutenção de Jardins', desc: 'Serviço contínuo para manter seu jardim impecável.' },
    { icon: '🎪', title: 'Decoração para Eventos', desc: 'Cenários naturais para casamentos, festas e eventos.' }
  ]

  const flowers = [
    { icon: '🌹', title: 'Arranjos Florais', desc: 'Composições únicas para decoração de ambientes.' },
    { icon: '💐', title: 'Buquês Especiais', desc: 'Buquês personalizados para presentear com elegância.' },
    { icon: '🌸', title: 'Plantas Ornamentais', desc: 'Variedade de plantas para interiores e exteriores.' },
    { icon: '🌺', title: 'Flores para Eventos', desc: 'Decoração floral completa para eventos especiais.' }
  ]

  const projects = [
    { emoji: '🏡', title: 'Jardim Residencial', location: 'São Paulo, SP' },
    { emoji: '🏢', title: 'Sede Corporativa', location: 'Rio de Janeiro, RJ', large: true },
    { emoji: '💒', title: 'Decoração de Casamento', location: 'Belo Horizonte, MG' },
    { emoji: '🌿', title: 'Jardim Vertical', location: 'São Paulo, SP' },
    { emoji: '🌊', title: 'Lago Ornamental', location: 'Curitiba, PR' },
    { emoji: '🌺', title: 'Jardim Tropical', location: 'Salvador, BA', large: true }
  ]

  const testimonials = [
    { stars: 5, text: 'A Luis Eden transformou completamente o jardim da nossa casa. Profissionalismo excepcional!', author: 'Ana Maria S.', role: 'Cliente Residencial', avatar: 'AM' },
    { stars: 5, text: 'Contratamos para decorar o jardim da empresa e o resultado foi incrível. Recomendo muito!', author: 'Roberto C.', role: 'Diretor Comercial', avatar: 'RC', featured: true },
    { stars: 5, text: 'A decoração floral do nosso casamento foi simplesmente perfeita. Dia inesquecível!', author: 'Juliana & Lucas', role: 'Casamento', avatar: 'JL' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="hero" id="home">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto">
          <p className="hero-tag">✦ Paisagismo & Floricultura</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transformando espaços em<br /><span className="text-eden-accent">verdadeiros refúgios naturais</span>
          </h1>
          <p className="text-lg text-white/90 mb-8">Criamos ambientes únicos que unem beleza, harmonia e conexão com a natureza.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projetos" className="btn-primary">Ver Projetos</a>
            <Link to="/login" className="btn-outline">Área do Cliente</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce">
          <span>Role para baixo</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </section>

      {/* SOBRE */}
      <section className="section sobre" id="sobre">
        <div className="container">
          <div className="sobre-grid">
            <div className="flex justify-center">
              <div className="img-placeholder">
                <img src="/assets/logotipo-eden.png" alt="Luis Eden" className="h-32 w-auto" />
              </div>
            </div>
            <div>
              <p className="section-tag">Sobre a Empresa</p>
              <h2>Paixão pela natureza, <span>arte no paisagismo</span></h2>
              <p className="text-stone-600 mb-4">A Luis Eden Paisagismo nasceu da paixão por transformar espaços comuns em ambientes extraordinários. Com mais de 15 anos de experiência, nossa equipe une técnica, criatividade e amor pela natureza.</p>
              <p className="text-stone-600 mb-8">Atendemos residências, empresas, condomínios e eventos, sempre com foco na sustentabilidade e beleza duradoura.</p>
              <div className="sobre-stats">
                <div className="stat">
                  <strong>500+</strong>
                  <span>Projetos realizados</span>
                </div>
                <div className="stat">
                  <strong>98%</strong>
                  <span>Clientes satisfeitos</span>
                </div>
                <div className="stat">
                  <strong>15+</strong>
                  <span>Anos no mercado</span>
                </div>
              </div>
              <a href="#contato" className="btn-primary">Solicitar Orçamento</a>
            </div>
          </div>
        </div>
      </section>

      {/* PAISAGISMO */}
      <section className="section paisagismo bg-stone-50" id="paisagismo">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">O que fazemos</p>
            <h2>Serviços de <span>Paisagismo</span></h2>
            <p className="section-desc">Soluções completas para criar e manter ambientes naturais únicos.</p>
          </div>
          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className={`service-card ${service.featured ? 'featured' : ''}`}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="text-stone-600 mb-4">{service.desc}</p>
                <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLORICULTURA */}
      <section className="section floricultura" id="floricultura">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Nossa Floricultura</p>
            <h2>Flores que <span>encantam</span></h2>
            <p className="section-desc">Trabalhamos com as mais belas espécies florais para decoração e eventos.</p>
          </div>
          <div className="flori-grid">
            {flowers.map((flower, idx) => (
              <div key={idx} className="flori-card">
                <div className="flori-img text-6xl">{flower.icon}</div>
                <div className="flori-info">
                  <h3>{flower.title}</h3>
                  <p className="text-stone-600">{flower.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flori-cta">
            <p className="text-lg font-semibold text-eden-primary mb-4">Encomende arranjos personalizados com antecedência</p>
            <a href="#contato" className="btn-primary">Fazer Encomenda</a>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section className="section projetos bg-stone-50" id="projetos">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Portfólio</p>
            <h2>Projetos <span>Executados</span></h2>
            <p className="section-desc">Conheça alguns dos nossos trabalhos e inspire-se.</p>
          </div>
          <div className="gallery-grid">
            {projects.map((project, idx) => (
              <div key={idx} className={`gallery-item ${project.large ? 'large' : ''}`}>
                <div className="w-full h-full bg-gradient-to-br from-eden-accent-light to-eden-accent flex items-center justify-center text-6xl">
                  {project.emoji}
                </div>
                <div className="gallery-overlay">
                  <h4 className="text-white text-xl font-bold">{project.title}</h4>
                  <p className="text-white/90">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="section depoimentos">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Depoimentos</p>
            <h2>O que nossos <span>clientes dizem</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className={`testimonial-card ${test.featured ? 'featured' : ''}`}>
                <div className="stars">{'★'.repeat(test.stars)}</div>
                <p className="text-stone-700 mb-6">"{test.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{test.avatar}</div>
                  <div>
                    <strong className="block">{test.author}</strong>
                    <span className="text-sm text-stone-600">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container text-center">
          <h2>Pronto para transformar seu espaço?</h2>
          <p className="text-white/90 text-lg mb-8">Entre em contato e receba um orçamento personalizado sem compromisso.</p>
          <a href="#contato" className="btn-primary btn-large">Solicitar Orçamento Gratuito</a>
        </div>
      </section>

      {/* CONTATO */}
      <section className="section contato" id="contato">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Fale Conosco</p>
            <h2>Entre em <span>Contato</span></h2>
            <p className="section-desc">Estamos prontos para criar o jardim dos seus sonhos.</p>
          </div>

          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975508788447!2d-46.6560521!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x6ff45007cece6fe!2sRua%20das%20Flores%2C%20123%20-%20Jardim%20Verde%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890" 
              width="100%" 
              height="400" 
              style={{border: 0, borderRadius: '15px'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="contato-grid">
            <div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <strong>Endereço</strong>
                  <span className="text-stone-600">Rua das Flores, 123 - Jardim Verde<br />São Paulo, SP - CEP 01234-567</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <strong>Telefone / WhatsApp</strong>
                  <span className="text-stone-600"><a href="tel:+5511999999999" className="text-eden-primary hover:underline">(11) 99999-9999</a></span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <strong>E-mail</strong>
                  <span className="text-stone-600"><a href="mailto:contato@luisedenpaisagismo.com.br" className="text-eden-primary hover:underline">contato@luisedenpaisagismo.com.br</a></span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-clock"></i></div>
                <div>
                  <strong>Horário de Atendimento</strong>
                  <span className="text-stone-600">Seg - Sex: 8h às 18h<br />Sáb: 8h às 13h</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>

            <form className="contato-form" onSubmit={handleSubmit}>
              {submitted && <div className="success-message">✓ Mensagem enviada com sucesso!</div>}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome" required />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(11) 99999-9999" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="servico">Serviço de interesse</label>
                <select id="servico" name="servico" value={formData.servico} onChange={handleChange}>
                  <option value="">Selecione um serviço</option>
                  <option>Paisagismo Residencial</option>
                  <option>Paisagismo Corporativo</option>
                  <option>Jardins Aquáticos</option>
                  <option>Jardins Verticais</option>
                  <option>Manutenção de Jardins</option>
                  <option>Decoração para Eventos</option>
                  <option>Floricultura / Arranjos</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} rows="4" placeholder="Descreva seu projeto..." required></textarea>
              </div>
              <button type="submit" className="btn-primary btn-full">
                <i className="fa-solid fa-paper-plane"></i> Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section kealabs-logo-container">
              <div className="kealabs-branding">
                <img src="/assets/images/kealabs_logo_strategic_white.png" alt="Kealabs" className="h-10 mb-3 opacity-80 hover:opacity-100 transition-opacity brightness-0 invert" />
                <p className="kealabs-text-1">Business Intelligence e Agentes de IA</p>
                <p className="kealabs-text-2">Lab de Passos-MG</p>
              </div>
            </div>

            <div className="footer-section">
              <h4>Navegação</h4>
              <ul>
                <li><a href="#sobre">Sobre a Empresa</a></li>
                <li><a href="#paisagismo">Serviços</a></li>
                <li><a href="#floricultura">Floricultura</a></li>
                <li><a href="#projetos">Projetos</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Serviços</h4>
              <ul>
                <li><a href="#paisagismo">Paisagismo Residencial</a></li>
                <li><a href="#paisagismo">Paisagismo Corporativo</a></li>
                <li><a href="#paisagismo">Jardins Verticais</a></li>
                <li><a href="#paisagismo">Jardins Aquáticos</a></li>
                <li><a href="#floricultura">Arranjos Florais</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contato</h4>
              <div className="footer-contact-info">
                <p><i className="fa-solid fa-phone"></i> (11) 99999-9999</p>
                <p><i className="fa-solid fa-envelope"></i> contato@luisedenpaisagismo.com.br</p>
                <p><i className="fa-solid fa-location-dot"></i> São Paulo, SP</p>
              </div>
              <div className="footer-social">
                <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Luis Eden Paisagismo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/5511999999999" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  )
}

export default Home
