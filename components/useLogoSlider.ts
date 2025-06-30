'use client'

import { useEffect } from 'react'

export function useLogoSlider(loading: boolean) {
  useEffect(() => {
    if (loading) return

    const slidesContainer = document.querySelector(".logos")
    const slideElement = document.querySelector(".logos-slide")
    
    if (slidesContainer && slideElement) {
      const copy = slideElement.cloneNode(true)
      slidesContainer.appendChild(copy)
    }
  }, [loading])
} 