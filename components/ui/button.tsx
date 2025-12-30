import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-slate-100 text-slate-700",
        link: "text-primary-600 underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-6 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

