import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export const UdaanBuddy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const helpOptions = [
    { label: t('buddy.find_hindi'), response: t('nav.study') },
    { label: t('buddy.find_drawing'), response: t('nav.fun') },
    { label: t('buddy.read'), response: 'Audio playback feature' },
  ];

  return (
    <>
      {/* Buddy Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-colored z-50",
          "bg-gradient-warm hover:scale-110 transition-all duration-300 animate-bounce-in",
          isOpen && "rotate-90"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageCircle className="w-8 h-8" />
        )}
      </Button>

      {/* Buddy Panel */}
      {isOpen && (
        <Card className="fixed bottom-28 right-6 w-80 max-w-[calc(100vw-3rem)] p-4 shadow-lg z-50 animate-bounce-in border-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t('buddy.help')}</h3>
                <p className="text-sm text-muted-foreground">{t('buddy.greeting')}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {helpOptions.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    // Simulated response
                    alert(`${option.label}\n\n→ ${option.response}`);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
