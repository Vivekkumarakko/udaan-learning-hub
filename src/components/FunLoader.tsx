import { Loader2, Sparkles, Star, Heart } from 'lucide-react';

interface FunLoaderProps {
  message?: string;
}

export const FunLoader = ({ message = 'Loading...' }: FunLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-rainbow">
      <div className="relative">
        {/* Animated circles */}
        <div className="absolute -top-8 -left-8 animate-bounce-fun" style={{ animationDelay: '0s' }}>
          <Star className="w-8 h-8 text-warning fill-warning" />
        </div>
        <div className="absolute -top-8 -right-8 animate-bounce-fun" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="w-8 h-8 text-primary fill-primary" />
        </div>
        <div className="absolute -bottom-8 -left-8 animate-bounce-fun" style={{ animationDelay: '0.4s' }}>
          <Heart className="w-8 h-8 text-destructive fill-destructive" />
        </div>
        <div className="absolute -bottom-8 -right-8 animate-bounce-fun" style={{ animationDelay: '0.6s' }}>
          <Sparkles className="w-8 h-8 text-success fill-success" />
        </div>

        {/* Main loader */}
        <div className="bg-background/95 backdrop-blur-sm rounded-3xl p-12 shadow-colored animate-rainbow-pulse">
          <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
          <p className="mt-6 text-2xl font-bold text-primary animate-pulse text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
