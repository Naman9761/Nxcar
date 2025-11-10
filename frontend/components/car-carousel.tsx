"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Car } from "@/lib/types";

interface CarouselProps {
  cars: Car[];
}

export default function CarCarousel({ cars }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, cars.length]);

  const currentCar = cars[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
    setIsAutoplay(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 h-96 shadow-2xl"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Background carousel effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-white/2"></div>

        {/* Current car image with animation */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {cars.map((car, idx) => (
            <div
              key={car.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${
                idx === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <Image
                src={
                  car.image_path
                    ? `${
                        process.env.NEXT_PUBLIC_API_URL ||
                        "http://localhost:8000"
                      }/images/${car.image_path}`
                    : car.image || "/placeholder.svg"
                }
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
                priority={idx === currentIndex}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        {/* Top info */}
        <div className="animate-slideUp">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 mb-3">
            Featured Vehicle
          </span>
        </div>

        {/* Center car info */}
        <div
          className="text-center animate-slideUp"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-2">
            {currentCar.year} {currentCar.make} {currentCar.model}
          </h3>
          <p className="text-lg font-semibold text-white/90 drop-shadow-md">
            From ${(currentCar.price / 1000).toFixed(0)}K
          </p>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white transition-all hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Indicator dots */}
          <div className="flex gap-2">
            {cars.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoplay(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 w-2 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white transition-all hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
