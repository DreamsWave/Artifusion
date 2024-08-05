import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DarkThemeItem from "@/features/sidebar/settings-menu-items/dark-theme-item";
import DeleteTokenItem from "@/features/sidebar/settings-menu-items/delete-token-item";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

export interface SettingsDropdownProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const SettingsDropdown = forwardRef<HTMLAnchorElement, SettingsDropdownProps>(
  ({ className, ...props }, ref) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Link
            to="#"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
              className
            )}
            ref={ref}
            {...props}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="end" className="min-w-52">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DarkThemeItem />
          <DropdownMenuSeparator />
          <DeleteTokenItem />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default SettingsDropdown;
