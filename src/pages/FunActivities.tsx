import { ArrowLeft, Palette, Scissors, Music, Puzzle, Trophy, BookOpen, Sparkles, Gamepad2, Newspaper, Mic } from 'lucide-react';
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
      route: '/fun/drawing',
    },
    {
      title: t('fun.crafts'),
      icon: Scissors,
      gradient: 'bg-gradient-secondary',
      description: { en: 'Make things with paper and colors', hi: 'कागज़ और रंगों से चीज़ें बनाएं' },
      route: null,
    },
    {
      title: t('fun.rhymes'),
      icon: Music,
      gradient: 'bg-gradient-success',
      description: { en: 'Sing along with fun songs!', hi: 'मज़ेदार गानों के साथ गाएं!' },
      route: '/fun/rhymes',
    },
    {
      title: { en: 'Singing & Music', hi: 'गायन और संगीत' },
      icon: Mic,
      gradient: 'bg-gradient-warm',
      description: { en: 'Learn songs and music activities', hi: 'गाने और संगीत गतिविधियाँ सीखें' },
      route: null,
    },
    {
      title: t('fun.puzzles'),
      icon: Puzzle,
      gradient: 'bg-gradient-secondary',
      description: { en: 'Solve puzzles and brain teasers', hi: 'पहेलियाँ और दिमागी खेल सुलझाएं' },
      route: null,
    },
    {
      title: { en: 'Fun Games', hi: 'मज़ेदार खेल' },
      icon: Gamepad2,
      gradient: 'bg-gradient-primary',
      description: { en: 'Play educational learning games', hi: 'शैक्षिक खेल खेलें' },
      route: null,
    },
    {
      title: t('fun.quiz'),
      icon: Trophy,
      gradient: 'bg-gradient-success',
      description: { en: 'Answer questions and win stars!', hi: 'सवालों के जवाब दें और सितारे जीतें!' },
      route: '/fun/quiz',
    },
    {
      title: { en: 'Story Time', hi: 'कहानी का समय' },
      icon: BookOpen,
      gradient: 'bg-gradient-warm',
      description: { en: 'Listen to amazing stories!', hi: 'अद्भुत कहानियाँ सुनें!' },
      route: null,
    },
    {
      title: { en: 'General Knowledge', hi: 'सामान्य ज्ञान' },
      icon: Sparkles,
      gradient: 'bg-gradient-primary',
      description: { en: 'Learn interesting facts!', hi: 'रोचक तथ्य सीखें!' },
      route: null,
    },
    {
      title: { en: 'Kids News', hi: 'बच्चों की खबरें' },
      icon: Newspaper,
      gradient: 'bg-gradient-secondary',
      description: { en: 'Current affairs for children', hi: 'बच्चों के लिए समाचार' },
      route: null,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity, idx) => (
            <div 
              key={idx}
              className="animate-bounce-in hover:scale-105 transition-transform"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <SectionCard
                title={typeof activity.title === 'string' ? activity.title : activity.title[useLanguage().language]}
                subtitle={activity.description[useLanguage().language]}
                icon={activity.icon}
                gradient={activity.gradient}
                onClick={() => {
                  if (activity.route) {
                    navigate(activity.route);
                  } else {
                    alert(`${typeof activity.title === 'string' ? activity.title : activity.title[useLanguage().language]} - Coming soon!`);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default FunActivities;
