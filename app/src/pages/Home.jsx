import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero-mobile">
        <div className="hero-content">
          <h1>Transformando espaços em refúgios naturais</h1>
          <p>Paisagismo e floricultura com sofisticação e elegância</p>
          <div className="hero-buttons">
            <Link to="/servicos" className="btn-primary">Ver Serviços</Link>
            <Link to="/contato" className="btn-secondary">Contato</Link>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <h2>Por que escolher a Luis Eden?</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">🌿</div>
              <h3>Expertise</h3>
              <p>+15 anos de experiência em paisagismo</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">✨</div>
              <h3>Qualidade</h3>
              <p>Projetos únicos e personalizados</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🎯</div>
              <h3>Dedicação</h3>
              <p>Atendimento atencioso e profissional</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Pronto para transformar seu espaço?</h2>
          <p>Entre em contato e receba um orçamento personalizado</p>
          <Link to="/contato" className="btn-primary btn-large">Solicitar Orçamento</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
