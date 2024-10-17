
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const DoctorCardSkeleton = () => {
  return (
    <Card className="bg-white shadow-lg flex flex-col min-w-[250px]">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}