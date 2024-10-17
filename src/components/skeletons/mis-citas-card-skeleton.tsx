import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const MisCitasCardSkeleton = () => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  )
}