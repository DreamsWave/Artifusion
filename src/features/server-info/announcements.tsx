import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { generateKey } from "@/lib/utils";
import moment from "moment";

const Loading = () => (
  <div className="flex flex-col gap-2">
    {[...Array(3)].map((e, i) => (
      <div key={generateKey(String(i))} className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3 w-12" />
        <Separator />
      </div>
    ))}
  </div>
);

export interface AnnouncementsProps {
  announcements: Awaited<
    ReturnType<typeof artifactsApi.getStatus>
  >["data"]["announcements"];
}

const Announcements = ({ announcements }: AnnouncementsProps) => {
  return (
    <ScrollArea className="h-72 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Announcements</h4>
        {!announcements && <Loading />}
        {announcements?.map((announcement) => (
          <div
            key={generateKey(announcement.message.slice(0, 10))}
            className="text-sm"
          >
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-bold">
                {moment(announcement.created_at).format("L")}
              </span>
              <span>{announcement.message}</span>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Announcements;
