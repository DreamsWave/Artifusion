import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useState, useEffect } from "react";
import Announcements from "./announcements";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ServerInfo = () => {
  const [statusData, setStatusData] =
    useState<Awaited<ReturnType<typeof artifactsApi.getStatus>>>();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await artifactsApi.getStatus();
        setStatusData(response);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchStatus();
  }, []);

  // if (!statusData) return <div>Loading...</div>;

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
                  statusData?.data.status === "online" &&
                    "bg-green-600 hover:bg-green-600"
                )}
              >
                {statusData?.data.status ? statusData?.data.status : "..."}
              </Badge>
            </div>
            <div className="inline-flex gap-2">
              Version:{" "}
              {statusData?.data.version ? (
                statusData?.data.version
              ) : (
                <Skeleton className="h-6 w-8" />
              )}
            </div>
            <div className="inline-flex gap-2">
              Characters online:{" "}
              {statusData?.data.characters_online ? (
                statusData?.data.characters_online
              ) : (
                <Skeleton className="h-6 w-10" />
              )}
            </div>
            <div className="inline-flex gap-2">
              Last wipe:{" "}
              {statusData?.data.last_wipe ? (
                statusData?.data.last_wipe
              ) : (
                <Skeleton className="h-6 w-20" />
              )}
            </div>
            <div className="inline-flex gap-2">
              Next wipe:{" "}
              {statusData?.data.next_wipe ? (
                statusData?.data.next_wipe
              ) : (
                <Skeleton className="h-6 w-20" />
              )}
            </div>
          </div>
        </div>
        <Announcements announcements={statusData?.data.announcements} />
      </CardContent>
    </Card>
  );
};

export default ServerInfo;
