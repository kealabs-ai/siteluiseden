import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'

export default function Catalog() {
  const [activeTab, setActiveTab] = useState('flowers')
  const { openModal } = useModal()

  const [flowers] = useState([
    { id: 1, name: 'Rosa Vermelha', category: 'Rosas', price: 45.00, stock: 25, image: '🌹' },
    { id: 2, name: 'Orquídea Branca', category: 'Orquídeas', price: 65.00, stock: 12, image: '🌸' },
    { id: 3, name: 'Girassol', category: 'Flores Silvestres', price: 35.00, stock: 30, image: '🌻' },
    { id: 4, name: 'Tulipa Rosa', category: 'Tulipas', price: 40.00, stock: 18, image: '🌷' },
    { id: 5, name: 'Samambaia', category: 'Plantas', price: 25.00, stock: 15, image: '🌿' }
  ])

  const [arrangements] = useState([
    { id: 1, name: 'Arranjo Floral Premium', price: 250.00, flowers: 'Rosa, Orquídea, Samambaia', image: '💐' },
    { id: 2, name: 'Buquê Especial', price: 180.00, flowers: 'Rosa, Tulipa, Girassol', image: '💐' },
    { id: 3, name: 'Decoração Casamento', price: 1500.00, flowers: 'Rosas, Orquídeas, Flores Silvestres', image: '💐' }
  ])

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Catálogo</h1>
          <p className="text-stone-600 mt-1">Gerencie flores e arranjos</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('flowers')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'flowers'
                ? 'border-eden-primary text-eden-primary'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-leaf mr-2"></i>
            Plantas
          </button>
        </div>

        {/* Flowers Tab */}
        {activeTab === 'flowers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900">Plantas Disponíveis</h2>
              <button onClick={() => openModal('newPlant')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
                <i className="fa-solid fa-plus mr-2"></i>
                Adicionar Planta
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flowers.map(flower => (
                <div key={flower.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-eden-accent-light to-eden-accent flex items-center justify-center text-6xl">
                    {flower.image}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{flower.name}</h3>
                    <p className="text-sm text-stone-600 mb-4">{flower.category}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-eden-primary">R$ {flower.price.toFixed(2)}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {flower.stock} em estoque
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openModal('editPlant', flower)} className="flex-1 px-3 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors text-sm font-medium">
                        <i className="fa-solid fa-edit mr-1"></i>
                        Editar
                      </button>
                      <button className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                        <i className="fa-solid fa-trash mr-1"></i>
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
