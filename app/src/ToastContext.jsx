import React, { useState, useCallback } from 'react'

const ToastContext = React.createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    const toast = { id, message, type }
    
    setToasts(prev => [...prev, toast])
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
    
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove }) {
  const getStyles = () => {
    switch(toast.type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-stone-800 text-white'
    }
  }

  const getIcon = () => {
    switch(toast.type) {
      case 'success':
        return 'fa-check-circle'
      case 'error':
        return 'fa-exclamation-circle'
      case 'warning':
        return 'fa-exclamation-triangle'
      case 'info':
        return 'fa-info-circle'
      default:
        return 'fa-bell'
    }
  }

  return (
    <div
      className={`${getStyles()} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 pointer-events-auto animate-in fade-in slide-in-from-right-5 duration-300`}
    >
      <i className={`fa-solid ${getIcon()}`}></i>
      <span className="font-medium">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 hover:opacity-80 transition-opacity"
      >
        <i className="fa-solid fa-times"></i>
      </button>
    </div>
  )
}
