import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="flex-grow h-6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="flex-grow h-4 mt-4" />
        <Skeleton className="flex-grow h-4 mt-4" />
        <Skeleton className="w-1/2 h-4 mt-4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
}
