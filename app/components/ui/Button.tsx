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
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 border border-blue-500",
      secondary: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20 border border-purple-500",
      outline: "border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white",
      ghost: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg",
    };

    // Cast the props to match what motion.button expects, handling the ref separately
    const motionProps = props as HTMLMotionProps<"button">;

    return (
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: variant === "primary"
            ? "0 20px 40px rgba(59, 130, 246, 0.4)"
            : variant === "secondary"
            ? "0 20px 40px rgba(168, 85, 247, 0.4)"
            : undefined
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none",
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
