"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import AddCarForm from "@/components/add-car-form";
import { createCar, ApiException } from "@/lib/api";
import type { CarCreate } from "@/lib/types";

export default function AddCarPage() {
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    try {
      await createCar(data);
      toast.success("Car listing added successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof ApiException
          ? err.message
          : "Failed to create car listing. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAddCar={() => router.push("/add-car")} />

      <main className="pt-20">
        <div className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Add a New Car Listing
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Fill in the details below to add your vehicle to our marketplace
              </p>
            </div>

            <AddCarForm onSubmit={handleSubmit} />
          </div>
        </div>
      </main>
    </div>
  );
}
