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
    viewSaleDetails: false,
    viewBudgetDetails: false,
    importExcel: false,
    newSupplier: false,
    editSupplier: false,
    newQuotation: false,
    editQuotation: false
  })

  const [modalData, setModalData] = useState({})

  const openModal = (modalName, data = {}) => {
    setModals(prev => ({ ...prev, [modalName]: true }))
    setModalData(prev => ({ ...prev, [modalName]: data }))
  }

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }))
    setModalData(prev => ({ ...prev, [modalName]: {} }))
  }

  return (
    <ModalContext.Provider value={{ modals, modalData, openModal, closeModal }}>
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
