import { ClinicCardSkeleton } from "@/components/skeletons/clinic-card-skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary/80 mb-8">
        Clínicas
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[...Array(5)].map((_, index) => (
          <ClinicCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}