import React, { useState } from 'react'

export function DragDropFileInput({ 
  file, 
  onFileChange, 
  accept = '.xlsx,.xls,.csv',
  label = 'Selecione o arquivo',
  placeholder = 'Arraste o arquivo aqui ou clique para selecionar',
  formats = 'XLSX, XLS, CSV',
  disabled = false,
  inputId = 'file-input'
}) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      onFileChange(droppedFile)
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-3">
        {label}
      </label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-eden-primary bg-eden-accent-light/30 shadow-lg'
            : 'border-stone-300 hover:border-eden-primary hover:bg-stone-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files[0])}
          className="hidden"
          id={inputId}
          disabled={disabled}
        />
        <label htmlFor={inputId} className={`cursor-pointer block ${disabled ? 'pointer-events-none' : ''}`}>
          <div className="flex flex-col items-center gap-3">
            <div className={`text-5xl transition-transform ${
              dragActive ? 'scale-125 text-eden-primary' : 'text-stone-400'
            }`}>
              <i className="fa-solid fa-cloud-arrow-up"></i>
            </div>
            <div>
              <p className="text-base font-semibold text-stone-900">
                {file ? (
                  <span className="text-eden-primary flex items-center justify-center gap-2">
                    <i className="fa-solid fa-check-circle"></i>
                    {file.name}
                  </span>
                ) : dragActive ? (
                  'Solte o arquivo aqui'
                ) : (
                  placeholder
                )}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Formatos aceitos: {formats}
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}
