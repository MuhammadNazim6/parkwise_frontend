import * as React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

export function SlotSkeleton() {
  return (
    // <div className="flex mt-2 justify-center h-60 w-fit">
    //   <div className="space-x-2 w-full flex justify-center">

    //     <div className="w-full flex flex-wrap justify-center">
    //       {Array.from({ length: 4 }).map((_, rowIndex) => (
    //         <div key={rowIndex} className="flex space-x-2">
    //           {Array.from({ length: 8    }).map((_, colIndex) => (
                <Skeleton
                  // key={`${rowIndex}-${colIndex}`}
                  className="h-12 w-12 bg-blue-100"
                />
    //           ))}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  )
}