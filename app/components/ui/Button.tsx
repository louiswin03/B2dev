import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-teal-800 text-white hover:bg-teal-700 border border-teal-800 hover:border-teal-700",
      secondary: "bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900/40 border border-teal-200 dark:border-teal-800/50",
      outline: "border border-border text-foreground hover:bg-muted transition-colors",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const motionProps = props as HTMLMotionProps<"button">;

    return (
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: variant === "primary"
            ? "0 10px 30px rgba(17, 94, 89, 0.3)"
            : undefined
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...motionProps}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
