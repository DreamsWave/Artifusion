import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { setTokenToLocalStorage } from "@/lib/utils";
import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const DeleteTokenItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className }, ref) => {
  const navigate = useNavigate();

  function deleteToken() {
    setTokenToLocalStorage("");
    navigate("/");
  }

  return (
    <DropdownMenuItem onClick={deleteToken} className={className} ref={ref}>
      <LogOut className="h-4 w-4 mr-2" />
      Delete token
    </DropdownMenuItem>
  );
});

export default DeleteTokenItem;
