import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";

export interface LinkItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
}

const LinkItem = forwardRef<HTMLAnchorElement, LinkItemProps>(
  ({ to, Icon, title, className, ...props }, ref) => {
    const location = useLocation();
    const isCurrentLocation = location.pathname === to;
    return (
      <Link
        to={to}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
          isCurrentLocation && "text-accent-foreground bg-accent",
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">{title}</span>
      </Link>
    );
  }
);

export default LinkItem;
