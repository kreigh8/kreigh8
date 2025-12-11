'use client'

import { Id } from '@/convex/_generated/dataModel'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ImageDeleteContextType {
  imageToDelete: { id: Id<'images'>; url: string } | null
  setImageToDelete: (image: { id: Id<'images'>; url: string } | null) => void
}

const ImageDeleteContext = createContext<ImageDeleteContextType | undefined>(
  undefined
)

export const useImageDeleteContext = () => {
  const context = useContext(ImageDeleteContext)
  if (!context) {
    throw new Error(
      'useImageDeleteContext must be used within an ImageDeleteProvider'
    )
  }
  return context
}

export const ImageDeleteProvider = ({ children }: { children: ReactNode }) => {
  const [imageToDelete, setImageToDelete] = useState<{
    id: Id<'images'>
    url: string
  } | null>(null)

  return (
    <ImageDeleteContext.Provider value={{ imageToDelete, setImageToDelete }}>
      {children}
    </ImageDeleteContext.Provider>
  )
}
