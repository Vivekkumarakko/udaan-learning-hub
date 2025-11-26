import { useEffect, useState } from 'react';
import { Sparkles, Star, Heart, BookOpen } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-rainbow flex items-center justify-center overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <Star className="absolute top-[10%] left-[10%] w-8 h-8 text-warning fill-warning animate-float" style={{ animationDelay: '0s' }} />
        <Sparkles className="absolute top-[20%] right-[15%] w-10 h-10 text-white animate-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-[15%] left-[20%] w-9 h-9 text-destructive fill-destructive animate-float" style={{ animationDelay: '1s' }} />
        <BookOpen className="absolute bottom-[25%] right-[10%] w-10 h-10 text-white animate-float" style={{ animationDelay: '1.5s' }} />
        <Star className="absolute top-[50%] left-[5%] w-6 h-6 text-secondary fill-secondary animate-float" style={{ animationDelay: '0.7s' }} />
        <Sparkles className="absolute top-[70%] right-[8%] w-7 h-7 text-success fill-success animate-float" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo/Icon */}
        <div className="mb-8 animate-bounce-fun">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 inline-block animate-rainbow-pulse">
            <BookOpen className="w-24 h-24 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-bounce-in">
          Udaan Learning
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-8 animate-slide-in-right font-medium" style={{ animationDelay: '0.2s' }}>
          उड़ान सीखने का मंच
        </p>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 mx-auto mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-lg">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300 ease-out shadow-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-white/90 text-sm animate-pulse">
          Loading amazing content... {progress}%
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
};
