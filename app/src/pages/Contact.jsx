import React, { useState } from 'react';
import './Contact.css';

function Contact() {
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
    <div className="contact-page">
      <div className="page-header">
        <h1>Entre em Contato</h1>
        <p>Estamos prontos para criar o jardim dos seus sonhos</p>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Informações de Contato</h2>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <strong>Endereço</strong>
                <p>Rua das Flores, 123 - Jardim Verde<br />São Paulo, SP - CEP 01234-567</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📱</div>
              <div>
                <strong>Telefone / WhatsApp</strong>
                <p><a href="tel:+5511999999999">(11) 99999-9999</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div>
                <strong>E-mail</strong>
                <p><a href="mailto:contato@luisedenpaisagismo.com.br">contato@luisedenpaisagismo.com.br</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🕐</div>
              <div>
                <strong>Horário de Atendimento</strong>
                <p>Seg - Sex: 8h às 18h<br />Sáb: 8h às 13h</p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">📘</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">📷</a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">💬</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Envie uma Mensagem</h2>
            
            {submitted && <div className="success-message">✓ Mensagem enviada com sucesso!</div>}

            <div className="form-group">
              <label htmlFor="nome">Nome completo *</label>
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

            <div className="form-group">
              <label htmlFor="email">E-mail *</label>
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
              <label htmlFor="mensagem">Mensagem *</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows="5"
                placeholder="Descreva seu projeto ou dúvida..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary btn-submit">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
