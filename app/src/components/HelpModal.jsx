import React, { useState } from 'react'

export function HelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('quick')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light px-6 py-4 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-circle-question text-white text-xl"></i>
            <h2 className="text-xl font-bold text-white">Central de Ajuda</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            aria-label="Fechar"
          >
            <i className="fa-solid fa-times text-lg"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'quick'
                ? 'text-eden-primary border-b-2 border-eden-primary bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-bolt mr-2"></i>
            Início Rápido
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'modules'
                ? 'text-eden-primary border-b-2 border-eden-primary bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-th mr-2"></i>
            Módulos
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'faq'
                ? 'text-eden-primary border-b-2 border-eden-primary bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-question mr-2"></i>
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'support'
                ? 'text-eden-primary border-b-2 border-eden-primary bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-headset mr-2"></i>
            Suporte
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Quick Start Tab */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">
                  <i className="fa-solid fa-play mr-2"></i>Primeiros Passos
                </h3>
                <ol className="text-sm text-blue-800 space-y-2 ml-6 list-decimal">
                  <li>Faça login com suas credenciais</li>
                  <li>Explore o Dashboard para visão geral</li>
                  <li>Acesse o Catálogo para gerenciar plantas</li>
                  <li>Use "Nova Venda" para registrar transações</li>
                  <li>Crie orçamentos usando o Construtor</li>
                </ol>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h3 className="font-bold text-green-900 mb-2">
                  <i className="fa-solid fa-keyboard mr-2"></i>Atalhos Rápidos
                </h3>
                <div className="text-sm text-green-800 space-y-1">
                  <p><kbd className="bg-white px-2 py-1 rounded border">Ctrl+N</kbd> - Nova Venda</p>
                  <p><kbd className="bg-white px-2 py-1 rounded border">Ctrl+O</kbd> - Novo Orçamento</p>
                  <p><kbd className="bg-white px-2 py-1 rounded border">Ctrl+?</kbd> - Abrir Ajuda</p>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <h3 className="font-bold text-purple-900 mb-2">
                  <i className="fa-solid fa-lightbulb mr-2"></i>Dica
                </h3>
                <p className="text-sm text-purple-800">
                  Use os botões na topbar para acessar rapidamente as funções mais usadas: Nova Venda e Lançamento Financeiro.
                </p>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-3">
              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-eden-primary mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-chart-line"></i>Dashboard
                </h4>
                <p className="text-sm text-stone-600">Visão geral de vendas, desempenho e alertas importantes.</p>
              </div>

              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-eden-primary mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-leaf"></i>Catálogo
                </h4>
                <p className="text-sm text-stone-600">Gerenciar plantas, flores e seus preços. Adicione, edite ou delete itens.</p>
              </div>

              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-eden-primary mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-shopping-cart"></i>Vendas
                </h4>
                <p className="text-sm text-stone-600">Registre vendas rápidas (PDV) e visualize o histórico de transações.</p>
              </div>

              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-eden-primary mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-file-invoice"></i>Orçamentos
                </h4>
                <p className="text-sm text-stone-600">Crie orçamentos profissionais com cálculo automático de totais.</p>
              </div>

              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-eden-primary mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-wrench"></i>Manutenção
                </h4>
                <p className="text-sm text-stone-600">Agende e acompanhe serviços de manutenção em calendário.</p>
              </div>

              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-eden-primary mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-money-bill-wave"></i>Fluxo de Caixa
                </h4>
                <p className="text-sm text-stone-600">Controle financeiro com receitas, despesas e relatórios.</p>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <details className="border border-stone-200 rounded-lg p-4 cursor-pointer hover:bg-stone-50">
                <summary className="font-bold text-eden-primary flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i>
                  Como criar uma nova venda?
                </summary>
                <p className="text-sm text-stone-600 mt-3 ml-6">
                  Clique no botão "Nova Venda" na topbar, selecione os produtos, defina as quantidades e confirme. A venda será registrada automaticamente.
                </p>
              </details>

              <details className="border border-stone-200 rounded-lg p-4 cursor-pointer hover:bg-stone-50">
                <summary className="font-bold text-eden-primary flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i>
                  Como importar dados do Excel?
                </summary>
                <p className="text-sm text-stone-600 mt-3 ml-6">
                  Acesse o módulo desejado, clique em "Importar", selecione o arquivo .xlsx e revise os dados antes de confirmar.
                </p>
              </details>

              <details className="border border-stone-200 rounded-lg p-4 cursor-pointer hover:bg-stone-50">
                <summary className="font-bold text-eden-primary flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i>
                  Como resetar minha senha?
                </summary>
                <p className="text-sm text-stone-600 mt-3 ml-6">
                  Clique no seu avatar no canto superior direito, selecione "Meu Perfil" e procure pela opção de alterar senha.
                </p>
              </details>

              <details className="border border-stone-200 rounded-lg p-4 cursor-pointer hover:bg-stone-50">
                <summary className="font-bold text-eden-primary flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i>
                  Como exportar um orçamento em PDF?
                </summary>
                <p className="text-sm text-stone-600 mt-3 ml-6">
                  Abra o orçamento desejado e clique no botão "Exportar PDF" no canto superior direito.
                </p>
              </details>

              <details className="border border-stone-200 rounded-lg p-4 cursor-pointer hover:bg-stone-50">
                <summary className="font-bold text-eden-primary flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i>
                  O aplicativo está lento, o que fazer?
                </summary>
                <p className="text-sm text-stone-600 mt-3 ml-6">
                  Tente limpar o cache do navegador (Ctrl+Shift+Delete), feche abas desnecessárias ou reinicie o navegador.
                </p>
              </details>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-phone"></i>Contato
                </h3>
                <div className="space-y-2 text-sm text-stone-700">
                  <p><strong>Email:</strong> suporte@luiseden.com</p>
                  <p><strong>Telefone:</strong> (XX) XXXX-XXXX</p>
                  <p><strong>WhatsApp:</strong> (XX) XXXXX-XXXX</p>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-clock"></i>Horário de Atendimento
                </h3>
                <div className="space-y-2 text-sm text-stone-700">
                  <p><strong>Segunda a Sexta:</strong> 09:00 - 18:00</p>
                  <p><strong>Sábado:</strong> 09:00 - 13:00</p>
                  <p><strong>Domingo:</strong> Fechado</p>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-book"></i>Recursos
                </h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="text-eden-primary hover:underline flex items-center gap-2">
                    <i className="fa-solid fa-external-link-alt"></i>Manual Completo
                  </a>
                  <a href="#" className="text-eden-primary hover:underline flex items-center gap-2">
                    <i className="fa-solid fa-external-link-alt"></i>Documentação Online
                  </a>
                  <a href="#" className="text-eden-primary hover:underline flex items-center gap-2">
                    <i className="fa-solid fa-external-link-alt"></i>Vídeos Tutoriais
                  </a>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-exclamation-triangle"></i>Reportar um Bug
                </h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Encontrou um problema? Envie um email para suporte@luiseden.com com:
                </p>
                <ul className="text-sm text-yellow-800 space-y-1 ml-4 list-disc">
                  <li>Descrição do problema</li>
                  <li>Passos para reproduzir</li>
                  <li>Screenshots (se aplicável)</li>
                  <li>Versão do navegador</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 bg-stone-50 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            <i className="fa-solid fa-info-circle mr-2"></i>
            Sistema v1.0.0 | Última atualização: Janeiro 2024
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-medium text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
