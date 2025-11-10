"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Car } from "@/app/page"

interface FavoritesContextType {
  favorites: Car[]
  isFavorite: (carId: number) => boolean
  toggleFavorite: (car: Car) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Car[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorited-cars")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error("Error loading favorites:", error)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("favorited-cars", JSON.stringify(favorites))
    }
  }, [favorites, isHydrated])

  const isFavorite = (carId: number) => {
    return favorites.some((car) => car.id === carId)
  }

  const toggleFavorite = (car: Car) => {
    setFavorites((prev) => {
      if (prev.some((c) => c.id === car.id)) {
        return prev.filter((c) => c.id !== car.id)
      } else {
        return [...prev, car]
      }
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }
  return context
}
