import React from 'react'
import { useModal } from './ModalContext'

// Modais Fiscais
import CreateNFeModal from './modules/fiscal/components/CreateNFeModal'
import ViewNFeModal from './modules/fiscal/components/ViewNFeModal'
import SignNFeModal from './modules/fiscal/components/SignNFeModal'
import AuthorizeNFeModal from './modules/fiscal/components/AuthorizeNFeModal'
import CancelNFeModal from './modules/fiscal/components/CancelNFeModal'
import ConfigFiscalModal from './modules/fiscal/components/ConfigFiscalModal'
import DeleteNFeModal from './modules/fiscal/components/DeleteNFeModal'

export default function ModalRenderer() {
  const { modals, modalData, closeModal } = useModal()

  return (
    <>
      {/* Modais Fiscais */}
      {modals.createNFe && <CreateNFeModal />}
      {modals.viewNFe && <ViewNFeModal nfe={modalData} />}
      {modals.signNFe && <SignNFeModal nfe={modalData} />}
      {modals.authorizeNFe && <AuthorizeNFeModal nfe={modalData} />}
      {modals.cancelNFe && <CancelNFeModal nfe={modalData} />}
      {modals.configFiscal && <ConfigFiscalModal />}
      {modals.deleteNFe && <DeleteNFeModal nfe={modalData} />}
    </>
  )
}
