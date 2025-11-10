"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Navbar from "@/components/navbar"
import SearchBar from "@/components/search-bar"
import CarListingsGrid from "@/components/car-listings-grid"
import Footer from "@/components/footer"
import CarCarousel from "@/components/car-carousel"
import { getCars, deleteCar as deleteCarApi, ApiException } from "@/lib/api"
import type { Car } from "@/lib/types"
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allCars, setAllCars] = useState<Car[]>([])

  // Fetch cars on mount and when search query changes
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const cars = await getCars(searchQuery)
        setAllCars(cars)
      } catch (err) {
        const errorMessage = err instanceof ApiException 
          ? err.message 
          : "Failed to load cars. Please try again later."
        setError(errorMessage)
        toast.error(errorMessage)
        setAllCars([])
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search to avoid excessive API calls
    const timeoutId = setTimeout(() => {
      fetchCars()
    }, searchQuery ? 300 : 0)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const featuredCar = allCars[0]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleViewDetails = (carId: number) => {
    router.push(`/car/${carId}`)
  }

  const handleDeleteCar = async (carId: number) => {
    if (!confirm(`Are you sure you want to delete this car?`)) {
      return
    }

    try {
      await deleteCarApi(carId)
      toast.success("Car deleted successfully")
      // Refresh the car list
      const cars = await getCars(searchQuery)
      setAllCars(cars)
    } catch (err) {
      const errorMessage = err instanceof ApiException 
        ? err.message 
        : "Failed to delete car. Please try again."
      toast.error(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Enhanced Animations */}
        <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content with Enhanced Typography */}
              <div className="space-y-6 animate-slideUp">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 animate-fadeIn">
                  <Sparkles className="w-4 h-4" />
                  Premium Car Marketplace
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                  Find Your
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Perfect Ride
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Discover premium used vehicles with verified listings, detailed specifications, and trusted seller information. Your dream car is just a click away.
                </p>

                {/* Stats Section */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{allCars.length}+</p>
                      <p className="text-sm text-muted-foreground">Listings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">100%</p>
                      <p className="text-sm text-muted-foreground">Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">24/7</p>
                      <p className="text-sm text-muted-foreground">Support</p>
                    </div>
                  </div>
                </div>

                {featuredCar && (
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => router.push(`/car/${featuredCar.id}`)}
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                    >
                      Explore Collection
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => router.push("/add-car")}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                    >
                      List Your Car
                    </button>
                  </div>
                )}
              </div>

              {/* Carousel with Enhanced Animation */}
              {allCars.length > 0 && (
                <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10"></div>
                    <CarCarousel cars={allCars} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="relative px-4 py-12 bg-gradient-to-b from-background via-background to-muted/30">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8 animate-fadeIn">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Find Your Dream Car
              </h2>
              <p className="text-muted-foreground text-lg">
                Search through our extensive collection of premium vehicles
              </p>
            </div>
            <div className="relative animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Collections Section */}
        <div className="px-4 py-16 bg-background">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Collection</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  Handpicked premium vehicles just for you
                </p>
              </div>
              {allCars.length > 0 && (
                <div className="px-6 py-3 bg-muted rounded-full">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Showing <span className="text-foreground">{allCars.length}</span> {allCars.length === 1 ? 'vehicle' : 'vehicles'}
                  </span>
                </div>
              )}
            </div>

            {isLoading ? (
              <CarListingsGrid
                cars={[]}
                isLoading={true}
                onViewDetails={handleViewDetails}
                onDeleteCar={handleDeleteCar}
              />
            ) : error ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
                <svg
                  className="h-24 w-24 text-destructive/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Error loading cars</h3>
                <p className="mt-2 text-muted-foreground">{error}</p>
                <button
                  onClick={() => {
                    setError(null)
                    setIsLoading(true)
                    getCars(searchQuery)
                      .then(setAllCars)
                      .catch((err) => {
                        setError(err instanceof ApiException ? err.message : "Failed to load cars")
                        toast.error("Failed to reload cars")
                      })
                      .finally(() => setIsLoading(false))
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Retry
                </button>
              </div>
            ) : allCars.length > 0 ? (
              <div className="animate-fadeIn">
                <CarListingsGrid
                  cars={allCars}
                  isLoading={false}
                  onViewDetails={handleViewDetails}
                  onDeleteCar={handleDeleteCar}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
                <svg
                  className="h-24 w-24 text-muted-foreground/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-foreground">No cars found</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchQuery 
                    ? "Try adjusting your search criteria to find the perfect car."
                    : "No cars available. Be the first to add a listing!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
