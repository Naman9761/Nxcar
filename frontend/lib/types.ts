// TypeScript types matching backend CarResponse schema
export interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage?: number | null
  description?: string | null
  created_at: string // ISO datetime string from backend
  image_path?: string | null

  // Optional frontend-only fields for backward compatibility
  image?: string
  transmission?: "Manual" | "Automatic"
  fuelType?: "Petrol" | "Diesel" | "Electric" | "Hybrid"
  engineSize?: string
  bodyType?: string
  color?: string
  seating?: number
  condition?: "Excellent" | "Good" | "Fair"
  features?: string[]
}

// Type for creating a new car (matches backend CarCreate schema)
export interface CarCreate {
  make: string
  model: string
  year: number
  price: number
  mileage?: number | null
  description?: string | null
}

// API Error response type
export interface ApiError {
  error: boolean
  message: string
  status_code?: number
  details?: any
}

