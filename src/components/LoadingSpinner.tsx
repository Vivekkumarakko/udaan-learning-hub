import { cn } from "@/lib/utils";
import { Sparkles, Star, Heart } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {size === "lg" && (
          <>
            <Star className="absolute -top-6 -left-6 w-4 h-4 text-warning fill-warning animate-bounce-fun" />
            <Sparkles className="absolute -top-6 -right-6 w-4 h-4 text-primary fill-primary animate-bounce-fun" style={{ animationDelay: '0.2s' }} />
            <Heart className="absolute -bottom-6 -left-6 w-4 h-4 text-destructive fill-destructive animate-bounce-fun" style={{ animationDelay: '0.4s' }} />
          </>
        )}
        <div
          className={cn(
            "animate-spin rounded-full border-primary border-t-transparent animate-rainbow-pulse",
            sizeClasses[size],
            className
          )}
        />
      </div>
    </div>
  );
};
