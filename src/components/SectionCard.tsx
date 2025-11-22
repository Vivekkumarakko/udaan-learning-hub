import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient: string;
}

export const SectionCard = ({ title, subtitle, icon: Icon, onClick, gradient }: SectionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-colored border-2 border-border bg-card animate-bounce-in group",
        "active:scale-95"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={cn(
          "w-20 h-20 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:rotate-6",
          gradient
        )}>
          <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
