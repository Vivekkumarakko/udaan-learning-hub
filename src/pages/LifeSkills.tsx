import { ArrowLeft, Volume2, Sparkles, Smile, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';

const LifeSkills = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const skills = [
    {
      title: t('life.hygiene'),
      icon: Sparkles,
      gradient: 'bg-gradient-primary',
      content: {
        en: 'Wash your hands before eating. Brush your teeth twice a day. Keep your body clean.',
        hi: 'खाने से पहले हाथ धोएं। दिन में दो बार दांत साफ करें। अपने शरीर को साफ रखें।',
      },
      dos: {
        en: ['Wash hands regularly', 'Bath daily', 'Cut nails', 'Wear clean clothes'],
        hi: ['नियमित रूप से हाथ धोएं', 'रोज नहाएं', 'नाखून काटें', 'साफ कपड़े पहनें'],
      },
      donts: {
        en: ['Don\'t eat without washing hands', 'Don\'t keep long dirty nails', 'Don\'t wear dirty clothes'],
        hi: ['हाथ धोए बिना न खाएं', 'लंबे गंदे नाखून न रखें', 'गंदे कपड़े न पहनें'],
      },
    },
    {
      title: t('life.grooming'),
      icon: Smile,
      gradient: 'bg-gradient-secondary',
      content: {
        en: 'Comb your hair. Wear neat clothes. Look presentable and feel confident.',
        hi: 'अपने बालों में कंघी करें। साफ कपड़े पहनें। सुंदर दिखें और आत्मविश्वास महसूस करें।',
      },
      dos: {
        en: ['Comb hair daily', 'Dress neatly', 'Keep uniform clean'],
        hi: ['रोज बालों में कंघी करें', 'साफ कपड़े पहनें', 'यूनिफॉर्म साफ रखें'],
      },
      donts: {
        en: ['Don\'t go out with messy hair', 'Don\'t wear torn clothes'],
        hi: ['बिखरे बालों के साथ बाहर न जाएं', 'फटे कपड़े न पहनें'],
      },
    },
    {
      title: t('life.confidence'),
      icon: Heart,
      gradient: 'bg-gradient-warm',
      content: {
        en: 'Speak clearly. Stand straight. Believe in yourself. You are special!',
        hi: 'स्पष्ट बोलें। सीधे खड़े रहें। खुद पर विश्वास करें। आप खास हैं!',
      },
      dos: {
        en: ['Speak clearly', 'Look at people when talking', 'Ask questions', 'Try new things'],
        hi: ['स्पष्ट बोलें', 'बात करते समय लोगों को देखें', 'सवाल पूछें', 'नई चीज़ें आज़माएं'],
      },
      donts: {
        en: ['Don\'t be afraid to speak', 'Don\'t feel shy to ask for help'],
        hi: ['बोलने से न डरें', 'मदद मांगने में शर्म न करें'],
      },
    },
    {
      title: t('life.behavior'),
      icon: Users,
      gradient: 'bg-gradient-success',
      content: {
        en: 'Be polite. Say Thank You and Sorry. Help others. Share with friends.',
        hi: 'विनम्र रहें। धन्यवाद और माफी कहें। दूसरों की मदद करें। दोस्तों के साथ बांटें।',
      },
      dos: {
        en: ['Say Please and Thank You', 'Help parents', 'Share toys', 'Listen to teachers'],
        hi: ['कृपया और धन्यवाद कहें', 'माता-पिता की मदद करें', 'खिलौने शेयर करें', 'शिक्षकों को सुनें'],
      },
      donts: {
        en: ['Don\'t fight', 'Don\'t be rude', 'Don\'t talk loudly'],
        hi: ['लड़ाई न करें', 'रूखे न बनें', 'ज़ोर से बात न करें'],
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
      <div className="bg-gradient-warm py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold text-white">{t('nav.lifeskills')}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {skills.map((skill, idx) => (
          <Card key={idx} className="p-6 border-2 hover:shadow-md transition-all">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-xl ${skill.gradient} flex items-center justify-center flex-shrink-0`}>
                <skill.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">{skill.title}</h2>
                <p className="text-lg mb-4 text-foreground">{skill.content[language]}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* DOs */}
                  <div className="bg-success/10 rounded-lg p-4 border-2 border-success/30">
                    <h3 className="font-bold text-success mb-2">✓ {language === 'en' ? 'DO' : 'करें'}</h3>
                    <ul className="space-y-1 text-sm">
                      {skill.dos[language].map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* DON'Ts */}
                  <div className="bg-destructive/10 rounded-lg p-4 border-2 border-destructive/30">
                    <h3 className="font-bold text-destructive mb-2">✗ {language === 'en' ? 'DON\'T' : 'न करें'}</h3>
                    <ul className="space-y-1 text-sm">
                      {skill.donts[language].map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button
                  onClick={() => playAudio(skill.content[language])}
                  className="bg-gradient-primary hover:scale-105 transition-all"
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

export default LifeSkills;
