import * as React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex place-content-center m-10">
      <div className="space-y-2 w-full">
        <Skeleton className="h-20 w-full bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
      </div>
    </div>
  )
}