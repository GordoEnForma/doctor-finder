import { MisCitasCardSkeleton } from "@/components/skeletons/mis-citas-card-skeleton";

export default function LoadingCitasPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Mis Citas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[...Array(6)].map((_, index) => (
          <MisCitasCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}