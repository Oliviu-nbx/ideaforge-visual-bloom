
import React from "react";
import { cn } from "@/lib/utils";

export interface CategoryTagProps {
  name: string;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "accent";
  size?: "sm" | "md";
  onClick?: () => void;
  children?: React.ReactNode;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
  name,
  className,
  variant = "primary",
  size = "md",
  onClick,
  children,
}) => {
  const variantClasses = {
    default: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    primary: "bg-primary-100 text-primary-800 hover:bg-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 hover:bg-secondary-200",
    accent: "bg-accent-100 text-accent-800 hover:bg-accent-200",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >
      {name}
      {children}
    </span>
  );
};
