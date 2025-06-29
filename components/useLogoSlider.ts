'use client'

import { useEffect } from 'react'

export function useLogoSlider() {
  useEffect(() => {
    const slidesContainer = document.querySelector(".logos")
    const slideElement = document.querySelector(".logos-slide")
    
    if (slidesContainer && slideElement) {
      const copy = slideElement.cloneNode(true)
      slidesContainer.appendChild(copy)
    }
  }, [])
} 