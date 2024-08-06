import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import DropdownMenuItem from "@/features/character-commands/move-dropdown/dropdown-menu-item";
import type { ArtifactsMap, ArtifactsMaps } from "@/types/artifacts.types";

export interface DropdownSubmenuProps {
  maps: ArtifactsMaps;
  title: string;
  handleMoveToMap: (map: ArtifactsMap) => void;
  Icon?: React.ElementType;
}

const DropdownSubmenu = ({
  maps,
  handleMoveToMap,
  title,
  Icon,
}: DropdownSubmenuProps) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{title}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent asChild>
          <ScrollArea className="h-[300px] w-56">
            {maps?.map((map) => (
              <DropdownMenuSub key={`X${map.x}Y${map.y}`}>
                <DropdownMenuItem
                  handleMoveToMap={handleMoveToMap}
                  map={map}
                  title={map.content?.code ?? map.name}
                />
              </DropdownMenuSub>
            ))}
          </ScrollArea>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default DropdownSubmenu;
