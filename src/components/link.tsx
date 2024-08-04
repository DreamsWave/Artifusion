import { cn } from "@/lib/utils";
import type React from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        "text-slate-500 hover:text-slate-700 transition-all",
        className
      )}
    >
      {children}
    </a>
  );
};

export default Link;
