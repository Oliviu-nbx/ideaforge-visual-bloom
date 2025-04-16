
import React from "react";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 flex items-center [&>svg]:shrink-0 [&>svg+div]:ml-3 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-success-200 text-success-700 bg-success-50 [&>svg]:text-success-500",
        info: "border-info-200 text-info-700 bg-info-50 [&>svg]:text-info-500",
        warning: "border-warning-200 text-warning-700 bg-warning-50 [&>svg]:text-warning-500",
        error: "border-destructive-200 text-destructive-700 bg-destructive-50 [&>svg]:text-destructive-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  onClose?: () => void;
  title?: string;
}

const AlertToast = React.forwardRef<HTMLDivElement, AlertToastProps>(
  ({ className, variant, onClose, children, title, ...props }, ref) => {
    // Determine icon based on variant
    const IconComponent = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5" />;
        case "info":
          return <Info className="h-5 w-5" />;
        case "warning":
          return <AlertTriangle className="h-5 w-5" />;
        case "error":
          return <AlertCircle className="h-5 w-5" />;
        default:
          return <Info className="h-5 w-5" />;
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), "relative", className)}
        {...props}
      >
        <IconComponent />
        <div className="flex-1">
          {title && <h5 className="font-medium">{title}</h5>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-500"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

AlertToast.displayName = "AlertToast";

export { AlertToast };
