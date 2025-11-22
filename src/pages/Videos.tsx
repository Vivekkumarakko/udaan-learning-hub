import { useState } from 'react';
import { ArrowLeft, Play, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';

const Videos = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [lowDataMode, setLowDataMode] = useState(false);

  const videoCategories = [
    {
      category: t('videos.lessons'),
      videos: [
        {
          title: { en: 'ABC Song for Kids', hi: 'बच्चों के लिए ABC गाना' },
          duration: '3:20',
          thumbnail: '🎵',
        },
        {
          title: { en: 'Counting 1 to 20', hi: '1 से 20 तक गिनती' },
          duration: '2:45',
          thumbnail: '🔢',
        },
      ],
    },
    {
      category: t('videos.stories'),
      videos: [
        {
          title: { en: 'The Honest Woodcutter', hi: 'ईमानदार लकड़हारा' },
          duration: '5:10',
          thumbnail: '📖',
        },
        {
          title: { en: 'Thirsty Crow', hi: 'प्यासा कौआ' },
          duration: '4:30',
          thumbnail: '🐦',
        },
      ],
    },
    {
      category: t('videos.science'),
      videos: [
        {
          title: { en: 'How Plants Grow', hi: 'पौधे कैसे बढ़ते हैं' },
          duration: '3:50',
          thumbnail: '🌱',
        },
        {
          title: { en: 'Water Cycle', hi: 'जल चक्र' },
          duration: '4:15',
          thumbnail: '💧',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      {/* Header */}
      <div className="bg-gradient-success py-6 px-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 mr-4"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-3xl font-bold text-white">{t('nav.videos')}</h1>
            </div>
            
            {/* Low Data Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
              <Wifi className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{t('videos.low_data')}</span>
              <Switch
                checked={lowDataMode}
                onCheckedChange={setLowDataMode}
                className="data-[state=checked]:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {videoCategories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.videos.map((video, vIdx) => (
                <Card key={vIdx} className="overflow-hidden hover:shadow-md transition-all border-2">
                  {/* Thumbnail */}
                  <div className="bg-gradient-primary h-40 flex items-center justify-center text-6xl">
                    {video.thumbnail}
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{video.title[language]}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{video.duration}</span>
                      <Button size="sm" className="bg-gradient-success hover:scale-105 transition-all">
                        <Play className="w-4 h-4 mr-1" />
                        {t('action.play')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default Videos;
