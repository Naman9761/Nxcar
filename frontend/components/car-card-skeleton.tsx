"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function CarCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-64 w-full animate-pulse bg-muted" />

      <CardContent className="pt-6">
        {/* Title Skeleton */}
        <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />

        {/* Details Skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-2/5 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-6 flex gap-2">
          <div className="h-10 flex-1 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}
