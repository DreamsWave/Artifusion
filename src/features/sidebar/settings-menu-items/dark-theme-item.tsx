import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Moon } from "lucide-react";
import React from "react";

const DarkThemeItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuItem
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-sm px-0 py-0 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
      onClick={(e: { preventDefault: () => void }) => {
        e.preventDefault();
      }}
    >
      <Label
        htmlFor="dark-theme"
        className="flex h-full w-full cursor-pointer items-center gap-2 px-2 py-1.5 font-normal"
      >
        <Moon className="h-4 w-4" />
        Dark Theme
      </Label>
      <Switch
        className="ml-auto"
        id="dark-theme"
        checked={theme === "dark" || theme === "system"}
        onCheckedChange={(checked) =>
          checked ? setTheme("dark") : setTheme("light")
        }
      />
    </DropdownMenuItem>
  );
});

DarkThemeItem.displayName = "DarkThemeItem";

export default DarkThemeItem;
