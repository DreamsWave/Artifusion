import { DropdownMenuItem as DropdownMenuItemShadcn } from "@/components/ui/dropdown-menu";
import type { ArtifactsMap } from "@/types/artifacts.types";

export interface DropdownMenuItemProps {
  map: ArtifactsMap;
  title: string;
  handleMoveToMap: (map: ArtifactsMap) => void;
  Icon?: React.ElementType;
}

const DropdownMenuItem = ({
  map,
  title,
  handleMoveToMap,
  Icon,
}: DropdownMenuItemProps) => {
  return (
    <DropdownMenuItemShadcn
      onClick={() => handleMoveToMap(map)}
      className="flex justify-between"
    >
      <div className="flex items-center">
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{title}</span>
      </div>
      <span className="text-slate-500">
        x:{map.x} y:{map.y}
      </span>
    </DropdownMenuItemShadcn>
  );
};

export default DropdownMenuItem;
