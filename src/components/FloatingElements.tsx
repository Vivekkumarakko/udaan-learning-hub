import { Sparkles, Star, Heart, Music, Palette, Book } from 'lucide-react';

export const FloatingElements = () => {
  const elements = [
    { Icon: Star, color: 'text-warning', delay: '0s', top: '10%', left: '5%' },
    { Icon: Sparkles, color: 'text-primary', delay: '0.5s', top: '20%', right: '8%' },
    { Icon: Heart, color: 'text-destructive', delay: '1s', bottom: '15%', left: '10%' },
    { Icon: Music, color: 'text-success', delay: '1.5s', top: '60%', right: '5%' },
    { Icon: Palette, color: 'text-secondary', delay: '2s', bottom: '25%', right: '15%' },
    { Icon: Book, color: 'text-accent', delay: '2.5s', top: '40%', left: '3%' },
    { Icon: Star, color: 'text-success', delay: '0.7s', top: '70%', left: '12%' },
    { Icon: Sparkles, color: 'text-warning', delay: '1.2s', bottom: '40%', right: '12%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, idx) => {
        const { Icon, color, delay, ...position } = element;
        return (
          <div
            key={idx}
            className="absolute animate-float opacity-20"
            style={{ 
              animationDelay: delay,
              ...position
            }}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        );
      })}
    </div>
  );
};
