import React, { useState } from 'react'

function Contact() {
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

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-r from-eden-primary to-eden-light text-white py-16 px-5">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl text-white/90">Estamos prontos para criar o jardim dos seus sonhos</p>
        </div>
      </div>

      <div className="container py-20">
        <div className="contato-grid">
          <div>
            <h2 className="text-3xl font-bold text-eden-primary mb-8">Informações de Contato</h2>
            
            <div className="info-item">
              <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <strong>Endereço</strong>
                <p className="text-stone-600">Rua das Flores, 123 - Jardim Verde<br />São Paulo, SP - CEP 01234-567</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
              <div>
                <strong>Telefone / WhatsApp</strong>
                <p className="text-stone-600"><a href="tel:+5511999999999" className="text-eden-primary hover:underline">(11) 99999-9999</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
              <div>
                <strong>E-mail</strong>
                <p className="text-stone-600"><a href="mailto:contato@luisedenpaisagismo.com.br" className="text-eden-primary hover:underline">contato@luisedenpaisagismo.com.br</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><i className="fa-solid fa-clock"></i></div>
              <div>
                <strong>Horário de Atendimento</strong>
                <p className="text-stone-600">Seg - Sex: 8h às 18h<br />Sáb: 8h às 13h</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <form className="contato-form" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-eden-primary mb-8">Envie uma Mensagem</h2>
            
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

            <button type="submit" className="btn-primary btn-full">
              <i className="fa-solid fa-paper-plane mr-2"></i>Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
