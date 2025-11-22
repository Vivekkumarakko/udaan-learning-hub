import { useState } from 'react';
import { ArrowLeft, Heart, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useToast } from '@/hooks/use-toast';

const Parents = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', contact: '', city: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer Interest:', formData);
    toast({
      title: language === 'en' ? 'Thank You!' : 'धन्यवाद!',
      description: language === 'en' 
        ? 'We have received your interest. We will contact you soon!' 
        : 'हमें आपकी रुचि मिल गई है। हम जल्द ही आपसे संपर्क करेंगे!',
    });
    setFormData({ name: '', contact: '', city: '', message: '' });
  };

  const parentTips = [
    {
      title: { en: 'Read Together', hi: 'साथ में पढ़ें' },
      content: { en: 'Spend 15 minutes daily reading with your child. Even if you can\'t read, look at pictures and talk about them.', hi: 'अपने बच्चे के साथ रोजाना 15 मिनट पढ़ने में बिताएं। अगर आप नहीं पढ़ सकते, तो चित्र देखें और उनके बारे में बात करें।' },
    },
    {
      title: { en: 'Encourage Questions', hi: 'सवाल पूछने दें' },
      content: { en: 'Let children ask questions. Praise them when they try to learn new things.', hi: 'बच्चों को सवाल पूछने दें। जब वे नई चीजें सीखने की कोशिश करें तो उनकी प्रशंसा करें।' },
    },
    {
      title: { en: 'Basic Discipline', hi: 'बुनियादी अनुशासन' },
      content: { en: 'Set simple routines: wake up time, study time, play time, and sleep time.', hi: 'सरल दिनचर्या बनाएं: उठने का समय, पढ़ाई का समय, खेलने का समय और सोने का समय।' },
    },
    {
      title: { en: 'Teach Civic Values', hi: 'नागरिक मूल्य सिखाएं' },
      content: { en: 'Teach children to be clean, stand in line, respect elders, and not litter. These habits build good citizens.', hi: 'बच्चों को साफ रहना, लाइन में खड़े होना, बड़ों का सम्मान करना और कूड़ा नहीं फेंकना सिखाएं। ये आदतें अच्छे नागरिक बनाती हैं।' },
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      {/* Header */}
      <div className="bg-gradient-primary py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{t('parents.title')}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* For Parents Section */}
        <div>
          <Card className="p-6 bg-gradient-warm text-white border-0 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-8 h-8" />
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'Dear Parents' : 'प्रिय माता-पिता'}
              </h2>
            </div>
            <p className="text-white/95">
              {language === 'en'
                ? 'Education changes lives. Even basic literacy and good civic sense can help your children build a better future. Here are simple ways you can support their learning at home:'
                : 'शिक्षा जीवन बदल देती है। बुनियादी साक्षरता और अच्छे नागरिक बोध से भी आपके बच्चे बेहतर भविष्य बना सकते हैं। यहां कुछ आसान तरीके हैं जिनसे आप घर पर उनके सीखने में मदद कर सकते हैं:'}
            </p>
          </Card>

          <div className="grid gap-4">
            {parentTips.map((tip, idx) => (
              <Card key={idx} className="p-5 border-2 hover:shadow-md transition-all">
                <h3 className="text-lg font-bold mb-2 text-primary">{tip.title[language]}</h3>
                <p className="text-foreground">{tip.content[language]}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* For Volunteers Section */}
        <div>
          <Card className="p-6 bg-gradient-success text-white border-0 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-8 h-8" />
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'For Volunteers' : 'स्वयंसेवकों के लिए'}
              </h2>
            </div>
            <p className="text-white/95">
              {language === 'en'
                ? 'Are you a college student, working professional, or someone who wants to give back? You can teach underprivileged children in your free time at nearby community centers or tuition centers. Even 1-2 hours a week can make a huge difference!'
                : 'क्या आप कॉलेज के छात्र, काम करने वाले पेशेवर, या कोई हैं जो समाज को देना चाहते हैं? आप अपने खाली समय में आस-पास के सामुदायिक केंद्रों या ट्यूशन केंद्रों में गरीब बच्चों को पढ़ा सकते हैं। हफ्ते में सिर्फ 1-2 घंटे भी बहुत बड़ा फर्क ला सकते हैं!'}
            </p>
          </Card>

          {/* Volunteer Form */}
          <Card className="p-6 border-2">
            <h3 className="text-xl font-bold mb-4">
              {language === 'en' ? 'I Want to Volunteer!' : 'मैं स्वयंसेवक बनना चाहता हूं!'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === 'en' ? 'Your Name' : 'आपका नाम'}
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'en' ? 'Enter your name' : 'अपना नाम दर्ज करें'}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === 'en' ? 'Phone / Email' : 'फोन / ईमेल'}
                </label>
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder={language === 'en' ? 'Your contact' : 'आपका संपर्क'}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === 'en' ? 'Your City' : 'आपका शहर'}
                </label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder={language === 'en' ? 'e.g., Greater Noida' : 'जैसे, ग्रेटर नोएडा'}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === 'en' ? 'Message (Optional)' : 'संदेश (वैकल्पिक)'}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'en' ? 'Tell us more...' : 'हमें और बताएं...'}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-success hover:scale-105 transition-all">
                <Send className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Submit Interest' : 'रुचि भेजें'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Parents;
