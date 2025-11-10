"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites } from "@/context/favorites-context";
import { Heart } from "lucide-react";
import type { Car } from "@/lib/types";

interface CarCardProps {
  car: Car;
  onViewDetails: (carId: number) => void;
  onDeleteCar: (carId: number) => void;
}

export default function CarCard({
  car,
  onViewDetails,
  onDeleteCar,
}: CarCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(car.id);

  const getConditionColor = () => {
    switch (car.condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFuelTypeInfo = () => {
    switch (car.fuelType) {
      case "Electric":
        return { icon: "⚡", color: "bg-blue-50" };
      case "Hybrid":
        return { icon: "🔋", color: "bg-green-50" };
      case "Diesel":
        return { icon: "⛽", color: "bg-orange-50" };
      default:
        return { icon: "⛽", color: "bg-gray-50" };
    }
  };

  const fuelInfo = getFuelTypeInfo();

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:scale-105 ${fuelInfo.color}`}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        {/* Heart Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(car);
          }}
          className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all hover:scale-110 hover:shadow-lg"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* Condition Badge */}
        {car.condition && (
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold z-10 ${getConditionColor()}`}
          >
            {car.condition}
          </div>
        )}

        <Image
          src={
            car.image_path
              ? `${
                  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
                }/images/${car.image_path}`
              : car.image || "/placeholder.svg"
          }
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <CardContent className="pt-6">
        {/* Make and Model */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">{car.year}</p>
          </div>
          <span className="text-2xl">{fuelInfo.icon}</span>
        </div>

        {/* Fuel Type Badge */}
        {car.fuelType && (
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-4">
            {car.fuelType}
          </span>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3 my-4 pb-4 border-b border-border">
          {/* Mileage */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-medium">MILEAGE</p>
            <p className="text-sm font-bold text-foreground">
              {car.mileage ? `${(car.mileage / 1000).toFixed(1)}K mi` : "N/A"}
            </p>
          </div>

          {/* Transmission */}
          {car.transmission && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium">TRANS</p>
              <p className="text-sm font-bold text-foreground">
                {car.transmission[0]}
              </p>
            </div>
          )}

          {/* Color */}
          {car.color ? (
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium">COLOR</p>
              <p className="text-sm font-bold text-foreground">
                {car.color.slice(0, 8)}...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium">YEAR</p>
              <p className="text-sm font-bold text-foreground">{car.year}</p>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-medium">
            ASKING PRICE
          </p>
          <p className="text-2xl font-bold text-foreground">
            ${(car.price / 1000).toFixed(1)}K
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onViewDetails(car.id)}
            className="flex-1 transition-all hover:shadow-lg"
            variant="default"
          >
            See Details
          </Button>
          <Button
            onClick={() => onDeleteCar(car.id)}
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive/10"
            size="icon"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
