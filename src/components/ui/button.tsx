import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_rgb(238_241_244/0.08)] hover:bg-primary/92",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_0_0_1px_rgb(238_241_244/0.08)] hover:bg-surface-2",
        outline:
          "bg-transparent text-foreground shadow-[0_0_0_1px_rgb(238_241_244/0.12)] hover:bg-surface",
        ghost: "bg-transparent text-foreground hover:bg-surface",
        accent: "bg-accent text-primary-foreground hover:bg-accent/90",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-11 min-h-11 px-4",
        sm: "h-9 min-h-9 px-3 text-xs",
        lg: "h-12 min-h-12 px-5 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    static?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  static: isStatic,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        !isStatic && "active:not-disabled:scale-[0.96]",
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
