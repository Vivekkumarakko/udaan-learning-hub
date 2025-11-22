import { ArrowLeft, Volume2, Trash2, Users, AlertCircle, HandHeart, TrafficCone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';

const CivicSense = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const civicTopics = [
    {
      title: t('civic.cleanliness'),
      icon: Trash2,
      gradient: 'bg-gradient-success',
      content: {
        en: 'Keep your surroundings clean. Don\'t throw garbage on roads. Use dustbins.',
        hi: 'अपने आसपास साफ रखें। सड़कों पर कूड़ा न फेंकें। डस्टबिन का उपयोग करें।',
      },
      tips: {
        en: ['Always use dustbins', 'Keep school and streets clean', 'Don\'t spit anywhere', 'Pick up if you drop something'],
        hi: ['हमेशा डस्टबिन का उपयोग करें', 'स्कूल और सड़कों को साफ रखें', 'कहीं भी न थूकें', 'गिरा दें तो उठा लें'],
      },
    },
    {
      title: t('civic.queue'),
      icon: Users,
      gradient: 'bg-gradient-primary',
      content: {
        en: 'Stand in line. Wait for your turn. Don\'t push others.',
        hi: 'लाइन में खड़े रहें। अपनी बारी का इंतजार करें। दूसरों को धक्का न दें।',
      },
      tips: {
        en: ['Stand in queue at school', 'Wait for your turn in games', 'Be patient', 'Don\'t cut the line'],
        hi: ['स्कूल में कतार में खड़े रहें', 'खेलों में अपनी बारी का इंतजार करें', 'धैर्य रखें', 'लाइन न काटें'],
      },
    },
    {
      title: t('civic.traffic'),
      icon: TrafficCone,
      gradient: 'bg-gradient-warning',
      content: {
        en: 'Follow traffic rules. Cross roads carefully. Look left and right.',
        hi: 'यातायात नियमों का पालन करें। सड़क सावधानी से पार करें। बाएं और दाएं देखें।',
      },
      tips: {
        en: ['Use zebra crossing', 'Hold parent\'s hand', 'Wait for green signal', 'Don\'t run on roads'],
        hi: ['ज़ेबरा क्रॉसिंग का उपयोग करें', 'माता-पिता का हाथ पकड़ें', 'हरे सिग्नल की प्रतीक्षा करें', 'सड़कों पर न भागें'],
      },
    },
    {
      title: t('civic.respect'),
      icon: HandHeart,
      gradient: 'bg-gradient-warm',
      content: {
        en: 'Respect elders. Help those in need. Be kind to everyone.',
        hi: 'बड़ों का सम्मान करें। जरूरतमंदों की मदद करें। सभी के साथ दयालु रहें।',
      },
      tips: {
        en: ['Give seat to elders', 'Say Namaste', 'Help carry bags', 'Speak politely'],
        hi: ['बड़ों को सीट दें', 'नमस्ते कहें', 'बैग ले जाने में मदद करें', 'विनम्रता से बोलें'],
      },
    },
    {
      title: t('civic.public'),
      icon: Building2,
      gradient: 'bg-gradient-secondary',
      content: {
        en: 'Don\'t damage public property. Parks, buses, schools belong to everyone.',
        hi: 'सार्वजनिक संपत्ति को नुकसान न पहुंचाएं। पार्क, बस, स्कूल सबके हैं।',
      },
      tips: {
        en: ['Don\'t write on walls', 'Don\'t break benches', 'Keep parks clean', 'Share public spaces'],
        hi: ['दीवारों पर न लिखें', 'बेंच न तोड़ें', 'पार्कों को साफ रखें', 'सार्वजनिक स्थानों को साझा करें'],
      },
    },
    {
      title: t('civic.helping'),
      icon: HandHeart,
      gradient: 'bg-gradient-primary',
      content: {
        en: 'Help elderly people. Offer your seat. Carry their bags if needed.',
        hi: 'बुजुर्ग लोगों की मदद करें। अपनी सीट दें। जरूरत पड़ने पर उनके बैग उठाएं।',
      },
      tips: {
        en: ['Help grandparents', 'Give seat in bus', 'Open doors for elders', 'Listen to their stories'],
        hi: ['दादा-दादी की मदद करें', 'बस में सीट दें', 'बड़ों के लिए दरवाजे खोलें', 'उनकी कहानियां सुनें'],
      },
    },
  ];

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      {/* Header */}
      <div className="bg-gradient-success py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{t('nav.civic')}</h1>
            <p className="text-white/90 text-sm mt-1">
              {language === 'en' ? 'Be a responsible citizen!' : 'एक जिम्मेदार नागरिक बनें!'}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Message */}
      <div className="container mx-auto px-4 py-6">
        <Card className="p-6 bg-gradient-primary text-white border-0">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">
                {language === 'en' ? 'Why Civic Sense Matters?' : 'सिविक सेंस क्यों जरूरी है?'}
              </h2>
              <p className="text-white/95">
                {language === 'en' 
                  ? 'Good behavior makes our community better. When we follow rules and help others, everyone is happy and safe!'
                  : 'अच्छा व्यवहार हमारे समुदाय को बेहतर बनाता है। जब हम नियमों का पालन करते हैं और दूसरों की मदद करते हैं, तो सभी खुश और सुरक्षित रहते हैं!'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-4 pb-8 space-y-6">
        {civicTopics.map((topic, idx) => (
          <Card key={idx} className="p-6 border-2 hover:shadow-md transition-all">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-xl ${topic.gradient} flex items-center justify-center flex-shrink-0`}>
                <topic.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">{topic.title}</h2>
                <p className="text-lg mb-4 text-foreground">{topic.content[language]}</p>
                
                <div className="bg-muted rounded-lg p-4 mb-4 border border-border">
                  <h3 className="font-bold text-primary mb-2">
                    💡 {language === 'en' ? 'Remember These:' : 'ये याद रखें:'}
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {topic.tips[language].map((tip, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-success mr-2">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  onClick={() => playAudio(topic.content[language])}
                  className="bg-gradient-success hover:scale-105 transition-all"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  {t('action.listen')}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default CivicSense;
