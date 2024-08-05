import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Announcements from "@/features/server-info/announcements";
import { useGetStatus } from "@/hooks/artifacts";
import { cn } from "@/lib/utils";

const ServerInfo = () => {
  const { data, error } = useGetStatus();

  if (error) return <div>Failed to load</div>;

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-2 gap-4">
        <div>
          <div className="flex gap-2 justify-center mb-4">
            <h2 className="text-4xl">ArtifApp</h2>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 py-4">
            <div className="flex gap-2">
              <a
                href="https://artifactsmmo.com/"
                className="text-slate-500 hover:text-slate-700 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                artifactsmmo.com
              </a>
              <Badge
                className={cn(
                  "bg-gray-500 hover:bg-gray-500",
                  data?.status === "online" && "bg-green-600 hover:bg-green-600"
                )}
              >
                {data?.status}
              </Badge>
            </div>
            <div className="inline-flex gap-2">
              Version:{" "}
              {data?.version ? data?.version : <Skeleton className="h-6 w-8" />}
            </div>
            <div className="inline-flex gap-2">
              Characters online:{" "}
              {data?.characters_online ? (
                data?.characters_online
              ) : (
                <Skeleton className="h-6 w-10" />
              )}
            </div>
            <div className="inline-flex gap-2">
              Last wipe:{" "}
              {data?.last_wipe ? (
                data?.last_wipe
              ) : (
                <Skeleton className="h-6 w-20" />
              )}
            </div>
            <div className="inline-flex gap-2">
              Next wipe:{" "}
              {data?.next_wipe ? (
                data?.next_wipe
              ) : (
                <Skeleton className="h-6 w-20" />
              )}
            </div>
          </div>
        </div>
        <Announcements announcements={data?.announcements} />
      </CardContent>
    </Card>
  );
};

export default ServerInfo;
