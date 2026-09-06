import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../ModalContext'
import { QuickSaleModal } from './QuickSaleModal'
import { FinancialEntryModal } from './FinancialEntryModal'
import { NewPlantModal } from './NewPlantModal'
import { MaintenanceScheduleModal } from './MaintenanceScheduleModal'
import { BudgetBuilderModal } from './BudgetBuilderModal'
import { ViewSaleDetailsModal } from './ViewSaleDetailsModal'
import { ViewBudgetDetailsModal } from './ViewBudgetDetailsModal'
import { EditPlantModal } from './EditPlantModal'
import { EditTransactionModal } from './EditTransactionModal'
import { EditMaintenanceModal } from './EditMaintenanceModal'
import { ImportExcelModal } from './ImportExcelModal'
import { NewSupplierModal } from './NewSupplierModal'
import { NewQuotationModal } from './NewQuotationModal'

function AppNavigation() {
  const navigate = useNavigate()
  const { modals, modalData, closeModal, openModal } = useModal()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userName = user.name || 'Usuário'
  const userInitial = userName.charAt(0).toUpperCase()

  // Mock flowers data - in production, this would come from API
  const flowers = [
    { id: 1, name: 'Rosa Vermelha', price: 45.00 },
    { id: 2, name: 'Orquídea Branca', price: 65.00 },
    { id: 3, name: 'Girassol', price: 35.00 },
    { id: 4, name: 'Tulipa', price: 40.00 },
    { id: 5, name: 'Samambaia', price: 25.00 }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    navigate('/')
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 items-center justify-between px-5 sm:px-8">
          {/* Logo - Left Side (Permanent) */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logotipo-eden.png"
              alt="Luis Eden"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-bold text-eden-primary">Luis Eden</span>
              <span className="text-xs font-medium text-eden-light">Gestão</span>
            </div>
          </div>

          {/* Quick Actions - Center */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openModal('quickSale')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
              title="Nova Venda Rápida (PDV)"
            >
              <i className="fa-solid fa-plus"></i>
              Nova Venda
            </button>
            <button
              onClick={() => openModal('financialEntry')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
              title="Lançamento Financeiro"
            >
              <i className="fa-solid fa-exchange-alt"></i>
              Lançamento
            </button>
          </div>

          {/* User Info and Avatar - Right Side */}
          <div className="flex items-center gap-4">
            {/* User Name */}
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-semibold text-stone-900">{userName}</p>
              <p className="text-xs text-stone-500">Administrador</p>
            </div>

            {/* Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-eden-primary to-eden-light text-white font-bold hover:shadow-lg transition-all"
                aria-label="Menu do usuário"
                aria-expanded={isDropdownOpen}
              >
                {userInitial}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-stone-200 bg-stone-50">
                    <p className="text-sm font-semibold text-stone-900">{userName}</p>
                    <p className="text-xs text-stone-500">admin@luiseden.com</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-3"
                    >
                      <i className="fa-solid fa-gear text-eden-primary w-4"></i>
                      Configurações
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-3"
                    >
                      <i className="fa-solid fa-user text-eden-primary w-4"></i>
                      Meu Perfil
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-3"
                    >
                      <i className="fa-solid fa-bell text-eden-primary w-4"></i>
                      Notificações
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-200"></div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium"
                  >
                    <i className="fa-solid fa-sign-out-alt w-4"></i>
                    Sair
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Quick Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => openModal('quickSale')}
                className="p-2 text-green-500 hover:bg-stone-100 rounded-lg transition-colors"
                title="Nova Venda"
              >
                <i className="fa-solid fa-shopping-cart"></i>
              </button>
              <button
                onClick={() => openModal('financialEntry')}
                className="p-2 text-blue-500 hover:bg-stone-100 rounded-lg transition-colors"
                title="Lançamento"
              >
                <i className="fa-solid fa-money-bill-wave"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <QuickSaleModal 
        isOpen={modals.quickSale} 
        onClose={() => closeModal('quickSale')}
        flowers={[
          { id: 1, name: 'Rosa Vermelha', price: 45.00 },
          { id: 2, name: 'Orquídea Branca', price: 65.00 },
          { id: 3, name: 'Girassol', price: 35.00 },
          { id: 4, name: 'Tulipa', price: 40.00 },
          { id: 5, name: 'Samambaia', price: 25.00 }
        ]}
      />
      <FinancialEntryModal 
        isOpen={modals.financialEntry} 
        onClose={() => closeModal('financialEntry')}
      />
      <NewPlantModal 
        isOpen={modals.newPlant} 
        onClose={() => closeModal('newPlant')}
      />
      <MaintenanceScheduleModal 
        isOpen={modals.maintenanceSchedule} 
        onClose={() => closeModal('maintenanceSchedule')}
      />
      <BudgetBuilderModal 
        isOpen={modals.budgetBuilder} 
        onClose={() => closeModal('budgetBuilder')}
      />
      <ViewSaleDetailsModal 
        isOpen={modals.viewSaleDetails} 
        onClose={() => closeModal('viewSaleDetails')}
        saleData={modalData.viewSaleDetails}
      />
      <ViewBudgetDetailsModal 
        isOpen={modals.viewBudgetDetails} 
        onClose={() => closeModal('viewBudgetDetails')}
        budgetData={modalData.viewBudgetDetails}
      />
      <EditPlantModal 
        isOpen={modals.editPlant} 
        onClose={() => closeModal('editPlant')}
        plantData={modalData.editPlant}
      />
      <EditTransactionModal 
        isOpen={modals.editTransaction} 
        onClose={() => closeModal('editTransaction')}
        transactionData={modalData.editTransaction}
      />
      <EditMaintenanceModal 
        isOpen={modals.editMaintenance} 
        onClose={() => closeModal('editMaintenance')}
        maintenanceData={modalData.editMaintenance}
      />
      <ImportExcelModal 
        isOpen={modals.importExcel} 
        onClose={() => closeModal('importExcel')}
      />
      <NewSupplierModal 
        isOpen={modals.newSupplier} 
        onClose={() => closeModal('newSupplier')}
      />
      <NewQuotationModal 
        isOpen={modals.newQuotation} 
        onClose={() => closeModal('newQuotation')}
      />
    </>
  )
}

export default AppNavigation
