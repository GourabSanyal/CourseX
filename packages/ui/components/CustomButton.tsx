import React from "react"
import { Loader2, type LucideIcon } from "lucide-react"
import { Button, type ButtonProps } from "./Button"
import { cn } from "../libs/utils"

interface CustomButtonProps extends ButtonProps {
  loading?: boolean
  hoverEffect?: boolean
  icon?: LucideIcon
  destructive?: boolean
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { className, variant, size, children, disabled, loading, hoverEffect = true, icon: Icon, destructive, ...props },
    ref,
  ) => {
    return (
      <Button
        className={cn(
          "relative",
          hoverEffect ? "transition-colors" : "transition-none",
          destructive && "bg-red-600 hover:bg-red-700 text-white",
          !hoverEffect && "hover:bg-transparent hover:text-inherit",
          className,
        )}
        variant={destructive ? "destructive" : variant}
        size={size}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            "flex items-center transition-transform duration-200 ease-in-out",
            loading && "transform translate-x-2",
          )}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin animate-slide-in" />}
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {children}
        </span>
      </Button>
    )
  },
)
CustomButton.displayName = "CustomButton"

