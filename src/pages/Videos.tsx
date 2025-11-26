import { useState } from 'react';
import { ArrowLeft, Play, Wifi, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';
import { useToast } from '@/components/ui/use-toast';

const Videos = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lowDataMode, setLowDataMode] = useState(true); // Default to true to avoid embed issues
  
  const handleVideoClick = (videoId: string, title: string) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const opened = window.open(url, '_blank');
    
    if (!opened) {
      toast({
        title: "Opening Video",
        description: "Click 'Allow pop-ups' if the video doesn't open",
        variant: "default",
      });
    } else {
      toast({
        title: "Opening " + title,
        description: "Video will open in YouTube",
      });
    }
  };

  const videoCategories = [
    {
      category: t('videos.lessons'),
      videos: [
        {
          title: { en: 'ABC Song for Kids', hi: 'बच्चों के लिए ABC गाना' },
          duration: '3:20',
          videoId: 'hq3yfQnllfQ',
          thumbnail: '🎵',
        },
        {
          title: { en: 'Counting 1 to 20', hi: '1 से 20 तक गिनती' },
          duration: '2:45',
          videoId: 'DR-cfDsHCGA',
          thumbnail: '🔢',
        },
        {
          title: { en: 'Colors for Children', hi: 'बच्चों के लिए रंग' },
          duration: '4:10',
          videoId: 'Fe8cJEGiLjM',
          thumbnail: '🎨',
        },
        {
          title: { en: 'Hindi Alphabet Song', hi: 'हिंदी वर्णमाला गीत' },
          duration: '5:00',
          videoId: 'VQHQW1bAv-E',
          thumbnail: '🔤',
        },
      ],
    },
    {
      category: t('videos.stories'),
      videos: [
        {
          title: { en: 'The Honest Woodcutter', hi: 'ईमानदार लकड़हारा' },
          duration: '5:10',
          videoId: 'V6LbgxdB-XU',
          thumbnail: '📖',
        },
        {
          title: { en: 'Thirsty Crow', hi: 'प्यासा कौआ' },
          duration: '4:30',
          videoId: 'C8MEtXB9oX0',
          thumbnail: '🐦',
        },
        {
          title: { en: 'Panchatantra Stories', hi: 'पंचतंत्र की कहानियाँ' },
          duration: '8:20',
          videoId: 'tNcfC2QPXC8',
          thumbnail: '📚',
        },
        {
          title: { en: 'Moral Stories Collection', hi: 'नैतिक कहानियाँ संग्रह' },
          duration: '15:30',
          videoId: '3SaJL5bh5lA',
          thumbnail: '🌟',
        },
      ],
    },
    {
      category: t('videos.science'),
      videos: [
        {
          title: { en: 'How Plants Grow', hi: 'पौधे कैसे बढ़ते हैं' },
          duration: '3:50',
          videoId: 'HVwPG7h3CsY',
          thumbnail: '🌱',
        },
        {
          title: { en: 'Water Cycle', hi: 'जल चक्र' },
          duration: '4:15',
          videoId: 'ncORPoiwYR8',
          thumbnail: '💧',
        },
        {
          title: { en: 'Solar System for Kids', hi: 'बच्चों के लिए सौर मंडल' },
          duration: '6:45',
          videoId: 'libKVRa01L8',
          thumbnail: '🌍',
        },
        {
          title: { en: 'Animals and Their Homes', hi: 'जानवर और उनके घर' },
          duration: '5:20',
          videoId: 'JC9hCvgDDWE',
          thumbnail: '🏠',
        },
      ],
    },
    {
      category: { en: 'General Knowledge', hi: 'सामान्य ज्ञान' },
      videos: [
        {
          title: { en: 'Fruits and Vegetables', hi: 'फल और सब्जियाँ' },
          duration: '4:00',
          videoId: 'MjPrYs8jHbM',
          thumbnail: '🍎',
        },
        {
          title: { en: 'Days of the Week', hi: 'सप्ताह के दिन' },
          duration: '2:30',
          videoId: 'loINl3Ln6Ck',
          thumbnail: '📅',
        },
        {
          title: { en: 'Body Parts for Kids', hi: 'बच्चों के लिए शरीर के अंग' },
          duration: '3:15',
          videoId: 'QkHQ0CYFy1I',
          thumbnail: '👶',
        },
        {
          title: { en: 'Seasons and Weather', hi: 'मौसम और ऋतुएँ' },
          duration: '4:40',
          videoId: 'gp-ej3BXxcI',
          thumbnail: '☀️',
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
            
            {/* Info Badge */}
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
              <Play className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Opens in YouTube</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {videoCategories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-4">
              {typeof category.category === 'string' ? category.category : category.category[language]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.videos.map((video, vIdx) => (
                <Card 
                  key={vIdx} 
                  className="overflow-hidden hover:shadow-colored transition-all border-2 card-hover animate-fade-in-up cursor-pointer group"
                  style={{ animationDelay: `${vIdx * 0.1}s` }}
                  onClick={() => handleVideoClick(video.videoId, video.title[language])}
                >
                  {/* Thumbnail with Play Overlay */}
                  <div className="relative bg-gradient-primary h-40 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {video.thumbnail}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-8 h-8 text-primary" fill="currentColor" />
                      </div>
                    </div>
                    {/* External Link Indicator */}
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title[language]}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{video.duration}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          YouTube
                        </span>
                      </div>
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
