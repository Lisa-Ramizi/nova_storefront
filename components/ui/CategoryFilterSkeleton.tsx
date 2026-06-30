import { Skeleton } from "@/components/ui/Skeleton";

type CategoryFilterSkeletonProps = {
  count?: number;
};

export function CategoryFilterSkeleton({ count = 7 }: CategoryFilterSkeletonProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className={`h-9 shrink-0 rounded-full ${index === 0 ? "w-12" : "w-24"}`}
        />
      ))}
    </div>
  );
}
