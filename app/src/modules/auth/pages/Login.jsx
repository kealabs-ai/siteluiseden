import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (email && password) {
        const validUsers = [
          { email: 'admin@luiseden.com', password: '123456' },
          { email: 'user@luiseden.com', password: '123456' }
        ]

        const user = validUsers.find(u => u.email === email && u.password === password)

        if (user) {
          localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }))
          localStorage.setItem('isLoggedIn', 'true')
          setIsLoggedIn(true)
          navigate('/dashboard')
        } else {
          setError('Email ou senha inválidos')
        }
      } else {
        setError('Preencha todos os campos')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eden-primary via-eden-light to-eden-primary flex items-center justify-center px-4 py-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-eden-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-eden-primary to-eden-light px-8 py-8 text-center">
            <img 
              src="/assets/logotipo-eden.png" 
              alt="Luis Eden" 
              className="h-12 w-auto mx-auto mb-2 object-contain"
            />
            <h1 className="text-2xl font-bold text-white mb-1 font-display">Luis Eden</h1>
            <p className="text-eden-accent-light text-xs font-medium">Área do Cliente</p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {error}
                  </p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-eden-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20 transition-all disabled:bg-stone-50 disabled:cursor-not-allowed font-body"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-eden-primary mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20 transition-all disabled:bg-stone-50 disabled:cursor-not-allowed font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-eden-primary transition-colors"
                    disabled={loading}
                  >
                    <i className={`fa-solid fa-eye${showPassword ? '' : '-slash'}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-eden-primary to-eden-light text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    Entrando...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-sign-in-alt"></i>
                    Entrar
                  </>
                )}
              </button>
            </form>

            {/* Test Credentials */}
            <div className="mt-6 p-3 bg-eden-accent-light/30 rounded-lg border border-eden-accent/20">
              <p className="text-xs font-semibold text-eden-primary mb-1 flex items-center gap-2">
                <i className="fa-solid fa-info-circle"></i>
                Dados de teste:
              </p>
              <div className="space-y-0.5 text-xs text-stone-600 font-mono">
                <p><span className="font-semibold">Email:</span> admin@luiseden.com</p>
                <p><span className="font-semibold">Senha:</span> 123456</p>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-4 text-center">
              <a 
                href="/" 
                className="text-sm text-eden-primary hover:text-eden-light font-medium transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Voltar para o site
              </a>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white/80 text-xs mt-4">
          © 2025 Luis Eden Paisagismo. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
