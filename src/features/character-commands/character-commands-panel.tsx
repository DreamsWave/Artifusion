import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMapsGetAll } from "@/hooks/artifacts/maps";
import { useMonstersGetAll } from "@/hooks/artifacts/monsters";
import { useResourcesGetAll } from "@/hooks/artifacts/resources";
import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { ArtifactsError, GetMyCharactersApiResult } from "artifacts-api-client";
import {
  BadgeCent,
  ClipboardList,
  Fish,
  Gem,
  Landmark,
  PawPrint,
  Store,
  TreeDeciduous,
} from "lucide-react";
import { toast } from "sonner";

export interface CharacterCommandsPanelProps {
  characters: GetMyCharactersApiResult["data"];
}

const CharacterCommandsPanel = ({
  characters,
}: CharacterCommandsPanelProps) => {
  const { data: resources } = useResourcesGetAll();
  const { data: monsters } = useMonstersGetAll();
  const { data: workshops } = useMapsGetAll({ content_type: "workshop" });
  const { data: bank } = useMapsGetAll({ content_type: "bank" });
  const { data: grandExchange } = useMapsGetAll({
    content_type: "grand_exchange",
  });
  const { data: tasksMaster } = useMapsGetAll({ content_type: "tasks_master" });
  const [character] = characters;

  const resourcesBySkillType = [
    {
      type: "woodcutting",
      items: resources?.filter((resource) => resource.skill === "woodcutting"),
    },
    {
      type: "mining",
      items: resources?.filter((resource) => resource.skill === "mining"),
    },
    {
      type: "fishing",
      items: resources?.filter((resource) => resource.skill === "fishing"),
    },
  ];

  const monstersByLevels = [
    monsters?.filter((monster) => monster.level >= 0 && monster.level <= 10),
    monsters?.filter((monster) => monster.level > 10 && monster.level <= 20),
    monsters?.filter((monster) => monster.level > 20 && monster.level <= 30),
  ];

  const handleToGo = async (code: string | undefined) => {
    const destination = {
      x: 0,
      y: 0,
    };

    try {
      if (code === "tasks_master") {
        destination.x = 1;
        destination.y = 2;
      } else {
        const responseMaps = await artifactsApi.maps.getAll({
          content_code: code,
        });
        destination.x = responseMaps.data[0].x;
        destination.y = responseMaps.data[0].y;
      }
      const responseMove = await artifactsApi.myCharacters.move(
        character.name,
        destination,
      );
      toast.success(
        `Character ${character.name} successfully moved to ${code}. Cooldown ${responseMove.data.cooldown.total_seconds} seconds`,
      );
    } catch (error) {
      if (error instanceof ArtifactsError) {
        toast.warning(error.message);
      } else {
        toast.error("An error occurred while moving the character.");
      }
    }
  };

  return (
    <div className="flex w-full gap-2 px-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Go To</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{character.name} - Go To</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* Resources */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Gem className="mr-2 h-4 w-4" />
                <span>Resources</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {resourcesBySkillType?.map((resources) => (
                    <DropdownMenuSub key={resources.type}>
                      <DropdownMenuSubTrigger>
                        {resources.type === "woodcutting" && (
                          <TreeDeciduous className="mr-2 h-4 w-4" />
                        )}
                        {resources.type === "mining" && (
                          <Gem className="mr-2 h-4 w-4" />
                        )}
                        {resources.type === "fishing" && (
                          <Fish className="mr-2 h-4 w-4" />
                        )}
                        <span>
                          {resources.type === "woodcutting" && "Woodcutting"}
                          {resources.type === "mining" && "Mining"}
                          {resources.type === "fishing" && "Fishing"}
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {resources?.items?.map((item) => (
                            <DropdownMenuItem
                              key={item.code}
                              onClick={() => handleToGo(item.code)}
                            >
                              {resources.type === "woodcutting" && (
                                <TreeDeciduous className="mr-2 h-4 w-4" />
                              )}
                              {resources.type === "mining" && (
                                <Gem className="mr-2 h-4 w-4" />
                              )}
                              {resources.type === "fishing" && (
                                <Fish className="mr-2 h-4 w-4" />
                              )}
                              <span>
                                {item.name} - {item.level}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Monsters */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PawPrint className="mr-2 h-4 w-4" />
                <span>Monsters</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {monstersByLevels.map((monsters, index) => (
                    <DropdownMenuSub key={index}>
                      <DropdownMenuSubTrigger>
                        <PawPrint className="mr-2 h-4 w-4" />
                        <span>
                          {index * 10 + 1}-{(index + 1) * 10}
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {monsters?.map((monster) => (
                            <DropdownMenuItem
                              key={monster.code}
                              onClick={() => handleToGo(monster.code)}
                            >
                              <PawPrint className="mr-2 h-4 w-4" />
                              <span>
                                {monster.name} - {monster.level}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Workshops */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Store className="mr-2 h-4 w-4" />
                <span>Workshops</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {workshops?.map((workshop) => (
                    <DropdownMenuSub key={workshop.content?.code}>
                      <DropdownMenuItem
                        onClick={() => handleToGo(workshop.content?.code)}
                      >
                        <Store className="mr-2 h-4 w-4" />
                        <span>{workshop.content?.code}</span>
                      </DropdownMenuItem>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {/* Bank */}
            {bank?.map((item) => (
              <DropdownMenuItem
                key={item.content?.code}
                onClick={() => handleToGo(item.content?.code)}
              >
                <Landmark className="mr-2 h-4 w-4" />
                <span>Bank</span>
              </DropdownMenuItem>
            ))}
            {/* Grand Exchange */}
            {grandExchange?.map((item) => (
              <DropdownMenuItem
                key={item.content?.code}
                onClick={() => handleToGo(item.content?.code)}
              >
                <BadgeCent className="mr-2 h-4 w-4" />
                <span>Grand Exchange</span>
              </DropdownMenuItem>
            ))}
            {/* Tasks Master */}
            {tasksMaster?.map((item) => (
              <DropdownMenuItem
                key={item.content?.code}
                onClick={() => handleToGo(item.content?.type)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Tasks Master</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CharacterCommandsPanel;
