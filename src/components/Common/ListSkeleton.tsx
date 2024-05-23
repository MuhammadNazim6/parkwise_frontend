import * as React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex place-content-center m-10 pl-10">
      <div className="space-y-2">
        <Skeleton className="h-20 w-[750px] bg-gray-200" />
        <Skeleton className="h-4 w-[700px] bg-gray-200" />
      </div>
    </div>
  )
}