"use client"

import CarCard from "@/components/car-card"
import CarCardSkeleton from "@/components/car-card-skeleton"
import type { Car } from "@/lib/types"

interface CarListingsGridProps {
  cars: Car[]
  isLoading: boolean
  onViewDetails: (carId: number) => void
  onDeleteCar: (carId: number) => void
}

export default function CarListingsGrid({ cars, isLoading, onViewDetails, onDeleteCar }: CarListingsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, index) => (
        <div
          key={car.id}
          className="animate-fadeIn"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          <CarCard car={car} onViewDetails={onViewDetails} onDeleteCar={onDeleteCar} />
        </div>
      ))}
    </div>
  )
}
