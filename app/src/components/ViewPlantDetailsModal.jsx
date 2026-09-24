import React from 'react'
import { formatCurrency } from '../utils/formatCurrency'

export function ViewPlantDetailsModal({ isOpen, onClose, plantData = {} }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-leaf"></i>
            Detalhes da Planta
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity" aria-label="Fechar detalhes">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="h-32 rounded-lg bg-gradient-to-br from-eden-accent-light to-eden-accent flex items-center justify-center text-6xl">
            {plantData.image || '🌿'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-stone-900">{plantData.name || 'Planta'}</h3>
            <p className="text-stone-600">{plantData.category || 'Sem categoria'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 rounded-lg p-4">
              <p className="text-sm text-stone-500">Preço de venda</p>
              <p className="text-xl font-bold text-eden-primary">{formatCurrency(plantData.price)}</p>
            </div>
            <div className="bg-stone-50 rounded-lg p-4">
              <p className="text-sm text-stone-500">Custo</p>
              <p className="text-xl font-bold text-stone-900">{formatCurrency(plantData.cost)}</p>
            </div>
            <div className="bg-stone-50 rounded-lg p-4">
              <p className="text-sm text-stone-500">Estoque</p>
              <p className="text-xl font-bold text-stone-900">{plantData.stock || 0}</p>
            </div>
            <div className="bg-stone-50 rounded-lg p-4">
              <p className="text-sm text-stone-500">ID</p>
              <p className="text-sm font-medium text-stone-900 break-all">{plantData.id}</p>
            </div>
          </div>
          {plantData.descricao && <p className="text-sm text-stone-600">{plantData.descricao}</p>}
          <button onClick={onClose} className="w-full px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
