import { ArrowLeft, Palette, Scissors, Music, Puzzle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';
import { SectionCard } from '@/components/SectionCard';

const FunActivities = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const activities = [
    {
      title: t('fun.drawing'),
      icon: Palette,
      gradient: 'bg-gradient-primary',
      description: { en: 'Draw and color fun pictures!', hi: 'मज़ेदार चित्र बनाएं और रंग भरें!' },
    },
    {
      title: t('fun.crafts'),
      icon: Scissors,
      gradient: 'bg-gradient-secondary',
      description: { en: 'Make things with paper and colors', hi: 'कागज़ और रंगों से चीज़ें बनाएं' },
    },
    {
      title: t('fun.rhymes'),
      icon: Music,
      gradient: 'bg-gradient-success',
      description: { en: 'Sing along with fun songs!', hi: 'मज़ेदार गानों के साथ गाएं!' },
    },
    {
      title: t('fun.puzzles'),
      icon: Puzzle,
      gradient: 'bg-gradient-warm',
      description: { en: 'Solve puzzles and play games', hi: 'पहेलियाँ सुलझाएं और खेल खेलें' },
    },
    {
      title: t('fun.quiz'),
      icon: Trophy,
      gradient: 'bg-gradient-primary',
      description: { en: 'Answer questions and win stars!', hi: 'सवालों के जवाब दें और सितारे जीतें!' },
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      {/* Header */}
      <div className="bg-gradient-secondary py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold text-white">{t('nav.fun')}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {activities.map((activity, idx) => (
            <SectionCard
              key={idx}
              title={activity.title}
              subtitle={activity.description[useLanguage().language]}
              icon={activity.icon}
              gradient={activity.gradient}
              onClick={() => {
                // Placeholder action
                alert(`${activity.title} - Coming soon!`);
              }}
            />
          ))}
        </div>
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default FunActivities;
