"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites } from "@/context/favorites-context"

interface NavbarProps {
  onAddCar?: () => void
}

export default function Navbar({ onAddCar }: NavbarProps) {
  const router = useRouter()
  const { favorites } = useFavorites()

  const handleAddCar = () => {
    if (onAddCar) {
      onAddCar()
    } else {
      router.push("/add-car")
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">NX</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Nxcar</h1>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => router.push("/")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Browse Cars
            </button>
            <button
              onClick={() => router.push("/my-cars")}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors relative"
            >
              <Heart className="w-4 h-4" />
              My Cars
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {}}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {}}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Add Car Button */}
          <Button onClick={handleAddCar} size="lg" className="gap-2">
            <span>+</span>
            <span className="hidden sm:inline">Add Car</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
