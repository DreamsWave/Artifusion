import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuItem from "@/features/character-commands/move-dropdown/dropdown-menu-item";
import DropdownSubmenu from "@/features/character-commands/move-dropdown/dropdown-submenu";
import { useMaps } from "@/hooks/artifacts/use-maps";
import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import type { ArtifactsMap } from "@/types/artifacts.types";
import { ArtifactsError } from "artifacts-api-client";
import {
  ClipboardList,
  Gem,
  HandCoins,
  Landmark,
  PawPrint,
  PencilRuler,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";

export interface MoveDropdownProps {
  name: string;
}

const MoveDropdown = ({ name }: MoveDropdownProps) => {
  const { data: maps, isFetched } = useMaps();

  const handleMoveToMap = async (map: ArtifactsMap) => {
    try {
      const responseMove = await artifactsApi.myCharacters.move(name, {
        x: map.x,
        y: map.y,
      });
      toast.success(
        `Character ${name} successfully moved to ${map?.content?.code ?? map.name} { x: ${map.x}, y: ${map.y} }. Cooldown ${responseMove.data.cooldown.total_seconds} seconds`,
      );
    } catch (error) {
      if (error instanceof ArtifactsError) {
        toast.warning(error.message);
      } else {
        toast.error("An error occurred while moving the character.");
      }
    }
  };

  if (!isFetched) return "Loading...";
  if (!maps) return "No maps";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Move</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name} - Move</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownSubmenu
            handleMoveToMap={handleMoveToMap}
            maps={maps.resource}
            title="Resources"
            Icon={Gem}
          />
          <DropdownSubmenu
            handleMoveToMap={handleMoveToMap}
            maps={maps.monster}
            title="Monsters"
            Icon={PawPrint}
          />
          <DropdownSubmenu
            handleMoveToMap={handleMoveToMap}
            maps={maps.workshop}
            title="Workshops"
            Icon={PencilRuler}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            handleMoveToMap={handleMoveToMap}
            map={maps.bank[0]}
            title="Bank"
            Icon={Landmark}
          />
          <DropdownMenuItem
            handleMoveToMap={handleMoveToMap}
            map={maps.grand_exchange[0]}
            title="Grand Exchange"
            Icon={HandCoins}
          />
          <DropdownMenuItem
            handleMoveToMap={handleMoveToMap}
            map={maps.tasks_master[0]}
            title="Tasks Master"
            Icon={ClipboardList}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownSubmenu
            handleMoveToMap={handleMoveToMap}
            maps={maps.empty}
            title="Other"
            Icon={StickyNote}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoveDropdown;
