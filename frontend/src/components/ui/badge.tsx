import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        glass:
          "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105",
        "glass-success":
          "border-green-400/30 text-white backdrop-blur-sm hover:scale-105 keyword-match",
        "glass-danger":
          "border-red-400/30 text-white backdrop-blur-sm hover:scale-105 keyword-missing",
        "glass-primary":
          "border-blue-400/30 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white backdrop-blur-sm hover:scale-105 hover:from-blue-500/30 hover:to-purple-600/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
