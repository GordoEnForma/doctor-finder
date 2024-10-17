import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const ClinicCardSkeleton = () => {
  return (
    <Card className="bg-white shadow-lg flex flex-col h-[350px] w-[300px]">
      <CardHeader className="bg-blue-100 border border-blue-300/30 flex items-center">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="flex items-start space-x-2">
            <Skeleton className="h-7 w-7" />
            <Skeleton className="h-10 w-3/4" />
          </div>
          <div className="flex items-start space-x-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
        <div className="mt-10">
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}