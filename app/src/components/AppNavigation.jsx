import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../ModalContext'
import { QuickSaleModal } from './QuickSaleModal'
import { FinancialEntryModal } from './FinancialEntryModal'
import { NewPlantModal } from './NewPlantModal'
import { MaintenanceScheduleModal } from './MaintenanceScheduleModal'
import { BudgetBuilderModal } from './BudgetBuilderModal'
import { ViewSaleDetailsModal } from './ViewSaleDetailsModal'
import { ViewBudgetDetailsModal } from './ViewBudgetDetailsModal'
import { ViewPlantDetailsModal } from './ViewPlantDetailsModal'
import { EditPlantModal } from './EditPlantModal'
import { EditTransactionModal } from './EditTransactionModal'
import { EditMaintenanceModal } from './EditMaintenanceModal'
import { ImportExcelModal } from './ImportExcelModal'
import { ImportQuotationsModal } from './ImportQuotationsModal'
import { NewSupplierModal } from './NewSupplierModal'
import { EditSupplierModal } from './EditSupplierModal'
import { NewQuotationModal } from './NewQuotationModal'
import { EditQuotationModal } from './EditQuotationModal'
import { NewClientModal } from './NewClientModal'
import { EditClientModal } from './EditClientModal'
import { ConfirmationModal } from './ConfirmationModal'
import { catalogApi } from '../services/api'

function AppNavigation({ onLogout }) {
  const navigate = useNavigate()
  const { modals, modalData, closeModal, openModal, confirmationData } = useModal()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userName = user.name || 'Usuário'
  const userInitial = userName.charAt(0).toUpperCase()
  const appVersion = '1.0.0'

  const [flowers, setFlowers] = useState([])

  useEffect(() => {
    const loadFlowers = async () => {
      try {
        const { data } = await catalogApi.list()
        setFlowers(data.map(plant => ({ id: plant.id, name: plant.nome, price: plant.precoCents / 100 })))
      } catch {
        setFlowers([])
      }
    }
    loadFlowers()
    window.addEventListener('eden:data-changed', loadFlowers)
    return () => window.removeEventListener('eden:data-changed', loadFlowers)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('accessToken')
    onLogout()
    navigate('/login', { replace: true })
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
            {/* Version Button */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsVersionOpen(!isVersionOpen)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                title="Informações de versão"
              >
                <i className="fa-solid fa-code-branch"></i>
                v{appVersion}
              </button>

              {/* Version Dropdown */}
              {isVersionOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-stone-200 bg-gradient-to-r from-eden-primary to-eden-light">
                    <p className="text-sm font-bold text-white">Informações do Sistema</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-600 font-medium">Versão:</span>
                      <span className="text-sm font-bold text-eden-primary">{appVersion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-600 font-medium">Ambiente:</span>
                      <span className="text-sm font-medium text-stone-700">Produção</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-600 font-medium">Status:</span>
                      <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                        <i className="fa-solid fa-circle text-green-500 text-xs"></i>
                        Online
                      </span>
                    </div>
                    <hr className="border-stone-200" />
                    <p className="text-xs text-stone-500 text-center">
                      Luis Eden Paisagismo & Floricultura
                    </p>
                  </div>
                </div>
              )}
            </div>

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
        flowers={flowers}
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
      <ViewPlantDetailsModal
        isOpen={modals.viewPlant}
        onClose={() => closeModal('viewPlant')}
        plantData={modalData.viewPlant}
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
      <ImportQuotationsModal 
        isOpen={modals.importQuotations} 
        onClose={() => closeModal('importQuotations')}
      />
      <NewSupplierModal 
        isOpen={modals.newSupplier} 
        onClose={() => closeModal('newSupplier')}
      />
      <NewQuotationModal 
        isOpen={modals.newQuotation} 
        onClose={() => closeModal('newQuotation')}
      />
      <EditSupplierModal 
        isOpen={modals.editSupplier} 
        onClose={() => closeModal('editSupplier')}
        supplier={modalData.editSupplier}
      />
      <EditQuotationModal 
        isOpen={modals.editQuotation} 
        onClose={() => closeModal('editQuotation')}
        quotation={modalData.editQuotation}
      />
      <NewClientModal 
        isOpen={modals.newClient} 
        onClose={() => closeModal('newClient')}
      />
      <EditClientModal 
        isOpen={modals.editClient} 
        onClose={() => closeModal('editClient')}
        clientData={modalData.editClient}
      />
      <ConfirmationModal
        isOpen={modals.confirmation}
        title={confirmationData.title}
        message={confirmationData.message}
        onConfirm={confirmationData.onConfirm}
        onCancel={confirmationData.onCancel}
        confirmText={confirmationData.confirmText}
        cancelText={confirmationData.cancelText}
        isDangerous={confirmationData.isDangerous}
      />
    </>
  )
}

export default AppNavigation
