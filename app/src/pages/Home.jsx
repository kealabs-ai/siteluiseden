import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    servico: '',
    mensagem: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.email && formData.mensagem) {
      setSubmitted(true);
      setFormData({ nome: '', telefone: '', email: '', servico: '', mensagem: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-tag">✦ Paisagismo & Floricultura</p>
          <h1>Transformando espaços em<br /><span>verdadeiros refúgios naturais</span></h1>
          <p className="hero-desc">Criamos ambientes únicos que unem beleza, harmonia e conexão com a natureza para sua casa, empresa ou evento.</p>
          <div className="hero-actions">
            <a href="#projetos" className="btn-primary">Ver Projetos</a>
            <a href="#contato" className="btn-outline">Fale Conosco</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Role para baixo</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="hero-leaf leaf-1">🍁</div>
        <div className="hero-leaf leaf-2">🍁</div>
        <div className="hero-leaf leaf-3">🍁</div>
        <div className="hero-leaf leaf-4">🍁</div>
        <div className="hero-leaf leaf-5">🍁</div>
        <div className="hero-leaf leaf-6">🍁</div>
        <div className="hero-leaf leaf-7">🍁</div>
        <div className="hero-leaf leaf-8">🍁</div>
        <div className="hero-leaf leaf-9">🍁</div>
        <div className="hero-leaf leaf-10">🍁</div>
        <div className="hero-leaf leaf-11">🍁</div>
        <div className="hero-leaf leaf-12">🍁</div>
        <div className="hero-leaf leaf-13">🍁</div>
        <div className="hero-leaf leaf-14">🍁</div>
        <div className="hero-leaf leaf-15">🍁</div>
        <div className="hero-leaf leaf-16">🍁</div>
        <div className="hero-leaf leaf-17">🍁</div>
        <div className="hero-leaf leaf-18">🍁</div>
        <div className="hero-leaf leaf-19">🍁</div>
        <div className="hero-leaf leaf-20">🍁</div>
        <div className="hero-leaf leaf-21">🍁</div>
        <div className="hero-leaf leaf-22">🍁</div>
        <div className="hero-leaf leaf-23">🍁</div>
        <div className="hero-leaf leaf-24">🍁</div>
        <div className="hero-leaf leaf-25">🍁</div>
        <div className="hero-leaf leaf-26">🍁</div>
        <div className="hero-leaf leaf-27">🍁</div>
        <div className="hero-leaf leaf-28">🍁</div>
        <div className="hero-leaf leaf-29">🍁</div>
        <div className="hero-leaf leaf-30">🍁</div>
      </section>

      {/* SOBRE */}
      <section className="section sobre" id="sobre">
        <div className="container">
          <div className="sobre-grid">
            <div className="sobre-img">
              <div className="img-placeholder sobre-placeholder logo-container">
                <img src="/assets/logotipo-eden.png" alt="Luis Eden Paisagismo" className="logo-img" />
              </div>
            </div>
            <div className="sobre-content">
              <p className="section-tag">Sobre a Empresa</p>
              <h2>Paixão pela natureza, <span>arte no paisagismo</span></h2>
              <p>A Luis Eden Paisagismo nasceu da paixão por transformar espaços comuns em ambientes extraordinários. Com mais de 15 anos de experiência, nossa equipe de especialistas une técnica, criatividade e amor pela natureza em cada projeto.</p>
              <p>Atendemos residências, empresas, condomínios e eventos, sempre com foco na sustentabilidade e na beleza duradoura dos espaços criados.</p>
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
      <section className="section paisagismo" id="paisagismo">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">O que fazemos</p>
            <h2>Serviços de <span>Paisagismo</span></h2>
            <p className="section-desc">Soluções completas para criar e manter ambientes naturais únicos e sofisticados.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏡</div>
              <h3>Paisagismo Residencial</h3>
              <p>Jardins personalizados que transformam sua casa em um paraíso verde, com plantas selecionadas e design exclusivo.</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="service-card featured">
              <div className="service-icon">🏢</div>
              <h3>Paisagismo Corporativo</h3>
              <p>Ambientes verdes para empresas e condomínios que transmitem bem-estar, produtividade e sofisticação.</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">🌊</div>
              <h3>Jardins Aquáticos</h3>
              <p>Lagos ornamentais, fontes e espelhos d'água integrados ao paisagismo para criar ambientes únicos e relaxantes.</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">🌿</div>
              <h3>Jardins Verticais</h3>
              <p>Paredes vivas e jardins verticais que otimizam espaços e trazem vida e cor a ambientes internos e externos.</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">✂️</div>
              <h3>Manutenção de Jardins</h3>
              <p>Serviço contínuo de poda, adubação, irrigação e cuidados para manter seu jardim sempre impecável.</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">🎪</div>
              <h3>Decoração para Eventos</h3>
              <p>Cenários naturais deslumbrantes para casamentos, festas e eventos corporativos com flores e plantas exclusivas.</p>
              <a href="#contato" className="service-link">Saiba mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* FLORICULTURA */}
      <section className="section floricultura" id="floricultura">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Nossa Floricultura</p>
            <h2>Flores que <span>encantam</span></h2>
            <p className="section-desc">Trabalhamos com as mais belas espécies florais para decoração, presentes e eventos especiais.</p>
          </div>
          <div className="flori-grid">
            <div className="flori-card">
              <div className="flori-img">
                <div className="img-placeholder flori-placeholder">🌹</div>
              </div>
              <div className="flori-info">
                <h3>Arranjos Florais</h3>
                <p>Composições únicas para decoração de ambientes, mesas e eventos com flores frescas selecionadas.</p>
              </div>
            </div>
            <div className="flori-card">
              <div className="flori-img">
                <div className="img-placeholder flori-placeholder">💐</div>
              </div>
              <div className="flori-info">
                <h3>Buquês Especiais</h3>
                <p>Buquês personalizados para presentear com amor e elegância em qualquer ocasião especial.</p>
              </div>
            </div>
            <div className="flori-card">
              <div className="flori-img">
                <div className="img-placeholder flori-placeholder">🌸</div>
              </div>
              <div className="flori-info">
                <h3>Plantas Ornamentais</h3>
                <p>Variedade de plantas para interiores e exteriores, com orientação especializada para cada ambiente.</p>
              </div>
            </div>
            <div className="flori-card">
              <div className="flori-img">
                <div className="img-placeholder flori-placeholder">🌺</div>
              </div>
              <div className="flori-info">
                <h3>Flores para Eventos</h3>
                <p>Decoração floral completa para casamentos, formaturas, aniversários e eventos corporativos.</p>
              </div>
            </div>
          </div>
          <div className="flori-cta">
            <p>Encomende arranjos personalizados com antecedência</p>
            <a href="#contato" className="btn-primary">Fazer Encomenda</a>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section className="section projetos" id="projetos">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Portfólio</p>
            <h2>Projetos <span>Executados</span></h2>
            <p className="section-desc">Conheça alguns dos nossos trabalhos e inspire-se para o seu próximo projeto.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="gallery-img"><div className="img-placeholder gallery-placeholder">🏡<span>Jardim Residencial - SP</span></div></div>
              <div className="gallery-overlay"><h4>Jardim Residencial</h4><p>São Paulo, SP</p></div>
            </div>
            <div className="gallery-item large">
              <div className="gallery-img"><div className="img-placeholder gallery-placeholder">🏢<span>Jardim Corporativo - RJ</span></div></div>
              <div className="gallery-overlay"><h4>Sede Corporativa</h4><p>Rio de Janeiro, RJ</p></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-img"><div className="img-placeholder gallery-placeholder">💒<span>Casamento - MG</span></div></div>
              <div className="gallery-overlay"><h4>Decoração de Casamento</h4><p>Belo Horizonte, MG</p></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-img"><div className="img-placeholder gallery-placeholder">🌿<span>Jardim Vertical - SP</span></div></div>
              <div className="gallery-overlay"><h4>Jardim Vertical</h4><p>São Paulo, SP</p></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-img"><div className="img-placeholder gallery-placeholder">🌊<span>Lago Ornamental - PR</span></div></div>
              <div className="gallery-overlay"><h4>Lago Ornamental</h4><p>Curitiba, PR</p></div>
            </div>
            <div className="gallery-item large">
              <div className="gallery-img"><div className="img-placeholder gallery-placeholder">🌺<span>Jardim Tropical - BA</span></div></div>
              <div className="gallery-overlay"><h4>Jardim Tropical</h4><p>Salvador, BA</p></div>
            </div>
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
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"A Luis Eden transformou completamente o jardim da nossa casa. O resultado superou todas as expectativas. Profissionalismo e criatividade excepcionais!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">AM</div>
                <div>
                  <strong>Ana Maria S.</strong>
                  <span>Cliente Residencial</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card featured">
              <div className="stars">★★★★★</div>
              <p>"Contratamos para decorar o jardim da nossa empresa e o resultado foi incrível. Nossos colaboradores adoraram o novo ambiente. Recomendo muito!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">RC</div>
                <div>
                  <strong>Roberto C.</strong>
                  <span>Diretor Comercial</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"A decoração floral do nosso casamento foi simplesmente perfeita. Cada detalhe foi pensado com muito carinho e elegância. Dia inesquecível!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">JL</div>
                <div>
                  <strong>Juliana & Lucas</strong>
                  <span>Casamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-leaves">🍃🌿🌱🍀🌾</div>
        <div className="container">
          <h2>Pronto para transformar seu espaço?</h2>
          <p>Entre em contato e receba um orçamento personalizado sem compromisso.</p>
          <a href="#contato" className="btn-primary btn-large">Solicitar Orçamento Gratuito</a>
        </div>
      </section>

      {/* CONTATO */}
      <section className="section contato" id="contato">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Fale Conosco</p>
            <h2>Entre em <span>Contato</span></h2>
            <p className="section-desc">Estamos prontos para criar o jardim dos seus sonhos. Solicite seu orçamento!</p>
          </div>
          
          {/* MAPA */}
          <div className="map-container mb-12">
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
            <div className="contato-info">
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <strong>Endereço</strong>
                  <span>Rua das Flores, 123 - Jardim Verde<br />São Paulo, SP - CEP 01234-567</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <strong>Telefone / WhatsApp</strong>
                  <span><a href="tel:+5511999999999">(11) 99999-9999</a></span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <strong>E-mail</strong>
                  <span><a href="mailto:contato@luisedenpaisagismo.com.br">contato@luisedenpaisagismo.com.br</a></span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-clock"></i></div>
                <div>
                  <strong>Horário de Atendimento</strong>
                  <span>Seg - Sex: 8h às 18h<br />Sáb: 8h às 13h</span>
                </div>
              </div>
              <div className="social-links">
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
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="servico">Serviço de interesse</label>
                <select
                  id="servico"
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                >
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
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Descreva seu projeto ou dúvida..."
                  required
                ></textarea>
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
            {/* KEALABS LOGO COLUMN */}
            <div className="footer-section footer-kealabs-column">
              <div className="kealabs-logo-container">
                <div className="kealabs-branding">
                  <img src="/assets/images/kealabs_logo_strategic_white.png" alt="Kealabs" className="kealabs-column-logo h-10 mb-3 opacity-80 hover:opacity-100 transition-opacity brightness-0 invert" width="124" height="40" />
                  <p className="kealabs-text-1">Business Intelligence e Agentes de IA</p>
                  <p className="kealabs-text-2">Lab de Passos-MG</p>
                </div>
              </div>
            </div>

            {/* NAVIGATION */}
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

            {/* SERVICES */}
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

            {/* CONTACT */}
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
            <div className="footer-copyright">
              <p>© 2025 Luis Eden Paisagismo. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/5511999999999" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default Home;
