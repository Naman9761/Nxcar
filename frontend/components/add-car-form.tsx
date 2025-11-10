"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CarCreate } from "@/lib/types";

interface FormData {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  description: string;
  image: File | null;
}

interface FormErrors {
  make?: string;
  model?: string;
  year?: string;
  price?: string;
  mileage?: string;
}

interface AddCarFormProps {
  onSubmit: (data: FormData) => void | Promise<void>;
}

export default function AddCarForm({ onSubmit }: AddCarFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.make.trim()) {
      newErrors.make = "This field is required";
    } else if (formData.make.trim().length < 2) {
      newErrors.make = "Make must be at least 2 characters";
    } else if (formData.make.trim().length > 50) {
      newErrors.make = "Make must be at most 50 characters";
    }

    if (!formData.model.trim()) {
      newErrors.model = "This field is required";
    } else if (formData.model.trim().length < 2) {
      newErrors.model = "Model must be at least 2 characters";
    } else if (formData.model.trim().length > 50) {
      newErrors.model = "Model must be at most 50 characters";
    }

    if (!formData.year.trim()) {
      newErrors.year = "This field is required";
    } else if (
      isNaN(Number(formData.year)) ||
      Number(formData.year) < 1900 ||
      Number(formData.year) > 2025
    ) {
      newErrors.year = "Please enter a valid year (1900-2025)";
    }

    if (!formData.price.trim()) {
      newErrors.price = "This field is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid positive price";
    }

    if (
      formData.mileage.trim() &&
      (isNaN(Number(formData.mileage)) || Number(formData.mileage) < 0)
    ) {
      newErrors.mileage = "Please enter a valid positive mileage";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare FormData for multipart/form-data
      const data = new window.FormData();
      data.append("make", formData.make.trim());
      data.append("model", formData.model.trim());
      data.append("year", formData.year);
      data.append("price", formData.price);
      if (formData.mileage.trim()) data.append("mileage", formData.mileage);
      if (formData.description.trim())
        data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      // Pass FormData to onSubmit
      await onSubmit(data as any);
    } catch (error) {
      // Error handling is done in parent component
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm"
    >
      <div className="space-y-6">
        {/* Make Field */}
        <div>
          <label
            htmlFor="make"
            className="block text-sm font-medium text-foreground"
          >
            Make <span className="text-destructive">*</span>
          </label>
          <Input
            id="make"
            name="make"
            type="text"
            placeholder="e.g., Tesla, BMW, Honda"
            value={formData.make}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
          {errors.make && (
            <p className="mt-2 text-sm text-destructive">{errors.make}</p>
          )}
        </div>

        {/* Model Field */}
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-foreground"
          >
            Model <span className="text-destructive">*</span>
          </label>
          <Input
            id="model"
            name="model"
            type="text"
            placeholder="e.g., Model 3, 3 Series, Civic"
            value={formData.model}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
          {errors.model && (
            <p className="mt-2 text-sm text-destructive">{errors.model}</p>
          )}
        </div>

        {/* Year and Price Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Year Field */}
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-foreground"
            >
              Year <span className="text-destructive">*</span>
            </label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="e.g., 2023"
              value={formData.year}
              onChange={handleChange}
              className="mt-2"
              disabled={isSubmitting}
            />
            {errors.year && (
              <p className="mt-2 text-sm text-destructive">{errors.year}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-foreground"
            >
              Price <span className="text-destructive">*</span>
            </label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-2.5 text-muted-foreground">
                $
              </span>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="45000"
                value={formData.price}
                onChange={handleChange}
                className="pl-7"
                disabled={isSubmitting}
              />
            </div>
            {errors.price && (
              <p className="mt-2 text-sm text-destructive">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Mileage Field */}
        <div>
          <label
            htmlFor="mileage"
            className="block text-sm font-medium text-foreground"
          >
            Mileage (Optional)
          </label>
          <Input
            id="mileage"
            name="mileage"
            type="number"
            placeholder="e.g., 15000"
            value={formData.mileage}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
            min="0"
          />
          {errors.mileage && (
            <p className="mt-2 text-sm text-destructive">{errors.mileage}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Description (Optional)
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Add any additional details about the vehicle..."
            value={formData.description}
            onChange={handleChange}
            className="mt-2"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        {/* Image Upload Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-foreground"
          >
            Car Image (Optional)
          </label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Submitting..." : "Submit Listing"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push("/")}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
