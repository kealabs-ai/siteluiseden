import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modals, setModals] = useState({
    quickSale: false,
    financialEntry: false,
    newPlant: false,
    maintenanceSchedule: false,
    budgetBuilder: false,
    editPlant: false,
    editTransaction: false,
    editMaintenance: false,
    viewPlant: false,
    viewSaleDetails: false,
    viewBudgetDetails: false,
    importExcel: false,
    importQuotations: false,
    newSupplier: false,
    editSupplier: false,
    newQuotation: false,
    editQuotation: false,
    newClient: false,
    editClient: false,
    confirmation: false,
    createNFe: false,
    viewNFe: false,
    signNFe: false,
    authorizeNFe: false,
    cancelNFe: false,
    configFiscal: false,
    deleteNFe: false
  })

  const [modalData, setModalData] = useState({})
  const [confirmationData, setConfirmationData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    isDangerous: false
  })

  const openModal = (modalName, data = {}) => {
    // Fechar todos os outros modais
    setModals(prev => {
      const newModals = {}
      Object.keys(prev).forEach(key => {
        newModals[key] = key === modalName
      })
      return newModals
    })
    setModalData(data)
  }

  const closeModal = () => {
    setModals(prev => {
      const newModals = { ...prev }
      Object.keys(newModals).forEach(key => {
        if (key !== 'confirmation') newModals[key] = false
      })
      return newModals
    })
    setModalData({})
  }

  const openConfirmation = (title, message, onConfirm, onCancel, options = {}) => {
    setConfirmationData({
      title,
      message,
      onConfirm: () => {
        onConfirm()
        closeConfirmation()
      },
      onCancel: () => {
        onCancel?.()
        closeConfirmation()
      },
      confirmText: options.confirmText || 'Confirmar',
      cancelText: options.cancelText || 'Cancelar',
      isDangerous: options.isDangerous || false
    })
    setModals(prev => ({ ...prev, confirmation: true }))
  }

  const closeConfirmation = () => {
    setModals(prev => ({ ...prev, confirmation: false }))
  }

  return (
    <ModalContext.Provider value={{ modals, modalData, openModal, closeModal, confirmationData, openConfirmation, closeConfirmation }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal deve ser usado dentro de ModalProvider')
  }
  return context
}
