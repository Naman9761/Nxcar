"use client"

import { useFavorites } from "@/context/favorites-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CarListingsGrid from "@/components/car-listings-grid"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

export default function MyCarPage() {
  const { favorites } = useFavorites()
  const router = useRouter()

  const handleViewDetails = (carId: number) => {
    router.push(`/car/${carId}`)
  }

  const handleDeleteCar = (carId: number) => {
    alert(`Delete car ${carId}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="px-4 py-12 bg-background">
          <div className="mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">My Saved Cars</h1>
              </div>
              <p className="text-lg text-muted-foreground mt-4">
                You have {favorites.length} car{favorites.length !== 1 ? "s" : ""} in your wishlist
              </p>
            </div>

            {/* Cars List or Empty State */}
            {favorites.length > 0 ? (
              <CarListingsGrid
                cars={favorites}
                isLoading={false}
                onViewDetails={handleViewDetails}
                onDeleteCar={handleDeleteCar}
              />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 px-6 py-20 text-center">
                <div className="mb-4">
                  <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">No saved cars yet</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Start adding cars to your wishlist by clicking the heart icon on any car card. Your favorite cars will
                  appear here!
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Browse Cars
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
