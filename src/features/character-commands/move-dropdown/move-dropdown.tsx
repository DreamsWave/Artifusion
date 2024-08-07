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
import { runErrorToast, runSuccessToast } from "@/lib/toast";
import type { ArtifactsMap } from "@/types/artifacts.types";
import { useQueryClient } from "@tanstack/react-query";
import {
  ClipboardList,
  Gem,
  HandCoins,
  Landmark,
  PawPrint,
  PencilRuler,
  Rows4,
  StickyNote,
} from "lucide-react";

export interface MoveDropdownProps {
  name: string;
}

const MoveDropdown = ({ name }: MoveDropdownProps) => {
  const { data: maps, isFetched } = useMaps();
  const queryClient = useQueryClient();

  const handleMoveToMap = async (map: ArtifactsMap) => {
    try {
      const responseMove = await artifactsApi.myCharacters.move(name, {
        x: map.x,
        y: map.y,
      });

      const resultMessage = `Character ${name} successfully moved to ${map?.content?.code ?? map.name} { x: ${map.x}, y: ${map.y} }.`;
      runSuccessToast(resultMessage, responseMove.data.cooldown.total_seconds);
      queryClient.invalidateQueries({ queryKey: ["artifacts/my/characters"] });
    } catch (error) {
      runErrorToast(error);
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
            title="Empty"
            Icon={StickyNote}
          />
          <DropdownSubmenu
            handleMoveToMap={handleMoveToMap}
            maps={maps.all}
            title="All"
            Icon={Rows4}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoveDropdown;
