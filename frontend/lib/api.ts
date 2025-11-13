import type { Car, CarCreate, ApiError } from './types'

// Get API base URL from environment variable, fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Custom error class for API errors
 */
export class ApiException extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiException'
  }
}

/**
 * Fetch all cars with optional search query
 */
export async function getCars(): Promise<Car[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/cars`);
    // Always fetch all cars, no searchQuery needed
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: true,
        message: `HTTP ${response.status}: ${response.statusText}`,
        status_code: response.status,
      }))
      throw new ApiException(
        response.status,
        errorData.message || 'Failed to fetch cars',
        errorData.details
      )
    }

    const data: Car[] = await response.json()
    return data || []
  } catch (error) {
    if (error instanceof ApiException) {
      throw error
    }
    // Network or other errors
    throw new ApiException(
      0,
      error instanceof Error ? error.message : 'Network error: Failed to fetch cars'
    )
  }
}

/**
 * Get a single car by string ID
 * Note: Backend doesn't have this endpoint, so we fetch all and filter
 */
export async function getCarById(id: string): Promise<Car | null> {
  try {
    const cars = await getCars()
    const car = cars.find((c) => c.id === id)
    return car || null
  } catch (error) {
    if (error instanceof ApiException) {
      throw error
    }
    throw new ApiException(0, 'Failed to fetch car details')
  }
}

/**
 * Create a new car listing
 */
export async function createCar(carData: CarCreate | FormData): Promise<Car> {
  try {
    let body: BodyInit
    let headers: Record<string, string> = {}
    if (typeof window !== 'undefined' && carData instanceof window.FormData) {
      body = carData
      // Let browser set Content-Type for FormData
    } else {
      body = JSON.stringify(carData)
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(`${API_BASE_URL}/api/cars`, {
      method: 'POST',
      headers,
      body,
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: true,
        message: `HTTP ${response.status}: ${response.statusText}`,
        status_code: response.status,
      }))
      throw new ApiException(
        response.status,
        errorData.message || 'Failed to create car',
        errorData.details
      )
    }

    const data: Car = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiException) {
      throw error
    }
    throw new ApiException(0, 'Network error: Failed to create car')
  }
}

/**
 * Delete a car by string ID
 */
export async function deleteCar(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiException(404, `Car with ID ${id} not found`)
      }
      const errorData: ApiError = await response.json().catch(() => ({
        error: true,
        message: `HTTP ${response.status}: ${response.statusText}`,
        status_code: response.status,
      }))
      throw new ApiException(
        response.status,
        errorData.message || 'Failed to delete car',
        errorData.details
      )
    }
  } catch (error) {
    if (error instanceof ApiException) {
      throw error
    }
    throw new ApiException(0, 'Network error: Failed to delete car')
  }
}

