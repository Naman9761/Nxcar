"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Star,
  Fuel,
  Gauge,
  Radio,
  Palette,
  Users,
  Shield,
  CheckCircle,
} from "lucide-react";
import { getCarById, ApiException } from "@/lib/api";
import type { Car } from "@/lib/types";

export default function CarDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const carId = params.id as string; // ✅ Use string instead of number

  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        setError("Invalid car ID");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const fetchedCar = await getCarById(carId); // ✅ Works with string IDs
        if (!fetchedCar) {
          setError("Car not found");
        } else {
          setCar(fetchedCar);
        }
      } catch (err) {
        const errorMessage =
          err instanceof ApiException
            ? err.message
            : "Failed to load car details. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading car details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Car not found
            </h1>
            <p className="text-muted-foreground mb-6">
              {error || "The car you're looking for doesn't exist."}
            </p>
            <Button onClick={() => router.push("/")}>Back to Listings</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Back Button */}
        <div className="px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <button
              onClick={() => router.back()}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-2"
            >
              ← Back to Listings
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Images and Details */}
              <div className="lg:col-span-2">
                <div className="mb-6 overflow-hidden rounded-xl bg-muted h-96 relative group">
                  <img
                    src={
                      car.image_path
                        ? `${
                            process.env.NEXT_PUBLIC_API_URL ||
                            "http://localhost:8000"
                          }/images/${car.image_path}`
                        : car.image || "/placeholder.svg"
                    }
                    alt={`${car.make} ${car.model}`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay with condition badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  {car.condition && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                      {car.condition}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground mb-2">
                        {car.year} {car.make} {car.model}
                      </h1>
                      <div className="flex items-center gap-4">
                        {car.bodyType && (
                          <p className="text-lg text-muted-foreground">
                            {car.bodyType}
                          </p>
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-foreground">
                            4.8
                          </span>
                          <span className="text-sm text-muted-foreground">
                            (247 reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-primary">
                        ${car.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {(car.price / 12).toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                        /month financing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/10">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    About this vehicle
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {car.description || "No description available."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-900 rounded-full text-xs font-semibold">
                      No Accident History
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold">
                      Service Records Available
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Specifications
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-4 h-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Mileage</p>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {car.mileage
                          ? `${car.mileage.toLocaleString()} km`
                          : "N/A"}
                      </p>
                    </div>
                    {car.fuelType && (
                      <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <Fuel className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Fuel Type
                          </p>
                        </div>
                        <p className="text-xl font-bold text-foreground">
                          {car.fuelType}
                        </p>
                      </div>
                    )}
                    {car.transmission && (
                      <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <Radio className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Transmission
                          </p>
                        </div>
                        <p className="text-xl font-bold text-foreground">
                          {car.transmission}
                        </p>
                      </div>
                    )}
                    {car.engineSize && (
                      <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Engine
                          </p>
                        </div>
                        <p className="text-xl font-bold text-foreground">
                          {car.engineSize}
                        </p>
                      </div>
                    )}
                    {car.color && (
                      <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">Color</p>
                        </div>
                        <p className="text-xl font-bold text-foreground">
                          {car.color}
                        </p>
                      </div>
                    )}
                    {car.seating && (
                      <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Seating
                          </p>
                        </div>
                        <p className="text-xl font-bold text-foreground">
                          {car.seating}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {car.features && car.features.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Premium Features
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {car.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-accent/10 border border-accent/20 rounded-lg p-3 flex items-center gap-2 hover:bg-accent/20 transition-all hover:shadow-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-foreground text-sm font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Contact and CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card rounded-xl border border-border p-6 space-y-4 shadow-xl">
                  <h3 className="text-xl font-bold text-foreground">
                    Interested in this car?
                  </h3>

                  <Button
                    size="lg"
                    className="w-full text-base"
                    onClick={() => setIsContactFormOpen(true)}
                  >
                    Schedule Test Drive
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Contact Seller
                  </Button>

                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">
                        Verified Dealer
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground font-medium">
                        7-Day Money Back
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground font-medium">
                        3-Year Warranty
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">
                        EMAIL
                      </p>
                      <p className="text-foreground font-medium">
                        support@nxcar.com
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">
                        PHONE
                      </p>
                      <p className="text-foreground font-medium">
                        (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
