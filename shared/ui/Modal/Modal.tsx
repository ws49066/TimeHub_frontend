'use client'

import { useEffect } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}
