import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-card hover:bg-accent hover:text-accent-foreground font-semibold border-2 shadow-md transition-all hover:scale-105"
    >
      {language === 'en' ? 'हिंदी' : 'EN'}
    </Button>
  );
};
