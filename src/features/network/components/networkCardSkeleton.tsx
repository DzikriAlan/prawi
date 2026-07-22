// Import Shadcn/UI Components
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NetworkCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative h-20 w-full">
        <Skeleton className="h-full w-full rounded-none" />

        <div className="absolute -bottom-8 left-4 h-16 w-16 rounded-full border-4 border-card">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-10">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        <div className="mt-auto flex items-center gap-1.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-7 w-7 rounded-full"
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
