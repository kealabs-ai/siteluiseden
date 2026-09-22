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
    confirmation: false
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
    setModals(prev => ({ ...prev, [modalName]: true }))
    setModalData(prev => ({ ...prev, [modalName]: data }))
  }

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }))
    setModalData(prev => ({ ...prev, [modalName]: {} }))
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
