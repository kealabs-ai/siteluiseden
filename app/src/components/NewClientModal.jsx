import React, { useState } from 'react'
import { useToast } from '../ToastContext'
import { masks } from '../utils/inputMasks'
import { clientsApi, getApiError } from '../services/api'

export function NewClientModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    cep: '',
    cidade: '',
    estado: '',
    condominio: '',
    numero: ''
  })
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 })

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'phone') {
      maskedValue = masks.phone(value)
    }
    if (name === 'cep') {
      maskedValue = masks.cep(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }))

    if (name === 'cep' && maskedValue.replace(/\D/g, '').length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${maskedValue.replace(/\D/g, '')}/json/`)
        const address = await response.json()
        if (address.erro) {
          addToast('CEP não encontrado.', 'error')
          return
        }
        setFormData(prev => ({ ...prev, cidade: address.localidade || '', estado: address.uf || '' }))
      } catch {
        addToast('Não foi possível consultar o CEP.', 'error')
      }
    }
  }

  const handleDateSelect = (day) => {
    const month = String(currentMonth + 1).padStart(2, '0')
    const year = currentYear
    const date = `${String(day).padStart(2, '0')}/${month}/${year}`
    setFormData(prev => ({ ...prev, birthDate: date }))
    setShowCalendar(false)
  }

  const positionCalendar = (input) => {
    const rect = input.getBoundingClientRect()
    const calendarWidth = 288
    const calendarHeight = 310
    const margin = 8
    const maxLeft = Math.max(margin, window.innerWidth - calendarWidth - margin)
    const opensAbove = rect.bottom + calendarHeight + margin > window.innerHeight && rect.top - calendarHeight - margin >= margin

    setCalendarPosition({
      top: opensAbove
        ? rect.top - calendarHeight - margin
        : Math.min(rect.bottom + margin, window.innerHeight - calendarHeight - margin),
      left: Math.min(Math.max(rect.left, margin), maxLeft)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name) {
      addToast('Preencha o nome do cliente', 'error')
      return
    }

    if (formData.birthDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.birthDate)) {
      addToast('Data de aniversário inválida (use DD/MM/YYYY)', 'error')
      return
    }

    try {
      await clientsApi.create({
        nome: formData.name,
        email: formData.email,
        telefone: formData.phone,
        data_aniversario: formData.birthDate,
        cep: formData.cep,
        cidade: formData.cidade,
        estado: formData.estado,
        condominio: formData.condominio,
        numero: formData.numero
      })
      
      addToast(`Cliente "${formData.name}" cadastrado com sucesso!`, 'success')
      window.dispatchEvent(new CustomEvent('eden:data-changed', { detail: { resource: 'clients' } }))
      
      setFormData({ name: '', email: '', phone: '', birthDate: '', cep: '', cidade: '', estado: '', condominio: '', numero: '' })
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível cadastrar o cliente.'), 'error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-user-plus"></i>
            Novo Cliente
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Nome do Cliente *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: João Silva"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: joao@email.com"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11) 98765-4321"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">CEP</label>
                <input type="text" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" maxLength="9" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Número</label>
                <input type="text" name="numero" value={formData.numero} onChange={handleChange} placeholder="Ex: 123" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Cidade</label>
                <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Preenchida pelo CEP" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Estado</label>
                <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="UF" maxLength="2" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Condomínio <span className="font-normal text-stone-500">(opcional)</span></label>
              <input type="text" name="condominio" value={formData.condominio} onChange={handleChange} placeholder="Nome do condomínio" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Data de Aniversário
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  onFocus={(e) => {
                    positionCalendar(e.target)
                    setShowCalendar(true)
                  }}
                  placeholder="DD/MM/YYYY"
                  maxLength="10"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    positionCalendar(e.currentTarget.parentElement.querySelector('input'))
                    setShowCalendar(!showCalendar)
                  }}
                  className="absolute right-3 top-3 text-eden-primary hover:text-eden-light transition-colors"
                >
                  <i className="fa-solid fa-calendar"></i>
                </button>

                {/* Calendar Popup */}
                {showCalendar && (
                  <div className="fixed bg-white border-2 border-eden-primary rounded-lg shadow-2xl z-[9999] p-3 w-72" style={{
                    top: `${calendarPosition.top}px`,
                    left: `${calendarPosition.left}px`
                  }}>
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)
                          if (currentMonth === 0) setCurrentYear(currentYear - 1)
                        }}
                        className="p-1 hover:bg-stone-100 rounded transition-colors"
                      >
                        <i className="fa-solid fa-chevron-left text-eden-primary text-sm"></i>
                      </button>
                      <div className="text-center">
                        <p className="font-bold text-stone-900 text-sm">{monthNames[currentMonth]}</p>
                        <p className="text-xs text-stone-600">{currentYear}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)
                          if (currentMonth === 11) setCurrentYear(currentYear + 1)
                        }}
                        className="p-1 hover:bg-stone-100 rounded transition-colors"
                      >
                        <i className="fa-solid fa-chevron-right text-eden-primary text-sm"></i>
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 mb-2">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-stone-600 py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5">
                      {days.map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => day && handleDateSelect(day)}
                          disabled={!day}
                          className={`p-1 text-xs rounded transition-colors ${
                            !day
                              ? 'text-stone-300 cursor-default'
                              : 'text-stone-700 hover:bg-eden-primary hover:text-white cursor-pointer'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowCalendar(false)}
                      className="w-full mt-3 px-2 py-1.5 bg-stone-100 text-stone-700 rounded hover:bg-stone-200 transition-colors text-xs font-medium"
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
              {showCalendar && <div className="fixed inset-0 z-[9998]" onClick={() => setShowCalendar(false)} />}
              <p className="text-xs text-stone-500 mt-1">Formato: DD/MM/YYYY</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-check"></i>
              Cadastrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
