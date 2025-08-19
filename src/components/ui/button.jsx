@@ .. @@
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
-  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
+  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
-        default: "bg-primary text-primary-foreground hover:bg-primary/90",
+        default: "bg-gradient-to-r from-medical-500 to-medical-600 text-white hover:from-medical-600 hover:to-medical-700 shadow-lg hover:shadow-xl shadow-medical-500/25",
        destructive:
-          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
+          "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl shadow-red-500/25",
        outline:
-          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
+          "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500",
        secondary:
-          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
-        ghost: "hover:bg-accent hover:text-accent-foreground",
-        link: "text-primary underline-offset-4 hover:underline",
+          "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600",
+        ghost: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
+        link: "text-medical-600 dark:text-medical-400 underline-offset-4 hover:underline",
+        success: "bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl shadow-green-500/25",
+        warning: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl shadow-yellow-500/25",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
+        xs: "h-8 rounded-md px-2 text-xs",
+        xl: "h-12 rounded-lg px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }