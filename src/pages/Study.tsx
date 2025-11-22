import { useState } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';

const Study = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const classes = ['nursery', 'kg', '1', '2', '3'];
  const subjects = ['english', 'hindi', 'math', 'evs', 'social'];

  const sampleLessons = {
    english: [
      {
        title: { en: 'Letter A - Apple', hi: 'अक्षर A - सेब' },
        content: { en: 'A is for Apple. Apple is red and sweet.', hi: 'A अक्षर Apple के लिए है। सेब लाल और मीठा होता है।' },
      },
      {
        title: { en: 'Letter B - Ball', hi: 'अक्षर B - गेंद' },
        content: { en: 'B is for Ball. We play with a ball.', hi: 'B अक्षर Ball के लिए है। हम गेंद से खेलते हैं।' },
      },
    ],
    hindi: [
      {
        title: { en: 'अ for अनार', hi: 'अ अनार के लिए' },
        content: { en: 'अ is for अनार (Pomegranate)', hi: 'अ अनार के लिए है। अनार लाल फल है।' },
      },
      {
        title: { en: 'आ for आम', hi: 'आ आम के लिए' },
        content: { en: 'आ is for आम (Mango)', hi: 'आ आम के लिए है। आम पीला और मीठा होता है।' },
      },
    ],
    math: [
      {
        title: { en: 'Counting 1-10', hi: 'गिनती 1-10' },
        content: { en: 'Let\'s count: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10', hi: 'चलो गिनें: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10' },
      },
      {
        title: { en: 'Addition - Simple Sums', hi: 'जोड़ - आसान योग' },
        content: { en: '1 + 1 = 2. Two apples together!', hi: '1 + 1 = 2। दो सेब एक साथ!' },
      },
    ],
    evs: [
      {
        title: { en: 'My Family', hi: 'मेरा परिवार' },
        content: { en: 'I have mother, father, brother, and sister.', hi: 'मेरे पास माँ, पिताजी, भाई और बहन हैं।' },
      },
      {
        title: { en: 'Animals Around Us', hi: 'हमारे आसपास के जानवर' },
        content: { en: 'Dog, cat, cow, and goat are animals.', hi: 'कुत्ता, बिल्ली, गाय और बकरी जानवर हैं।' },
      },
    ],
    social: [
      {
        title: { en: 'Good Manners', hi: 'अच्छे शिष्टाचार' },
        content: { en: 'Say Please and Thank You.', hi: 'कृपया और धन्यवाद कहें।' },
      },
      {
        title: { en: 'Helping at Home', hi: 'घर में मदद करना' },
        content: { en: 'Help parents with small tasks.', hi: 'छोटे कामों में माता-पिता की मदद करें।' },
      },
    ],
  };

  const playAudio = (text: string) => {
    // Simulated audio playback
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    speechSynthesis.speak(utterance);
  };

  const lessons = selectedSubject ? sampleLessons[selectedSubject as keyof typeof sampleLessons] || [] : [];

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
          <h1 className="text-3xl font-bold text-white">{t('nav.study')}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Class Selection */}
        {!selectedClass && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">{t('study.select_class')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {classes.map((cls) => (
                <Card
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className="p-6 cursor-pointer hover:scale-105 transition-all bg-gradient-secondary hover:shadow-colored text-center border-2"
                >
                  <h3 className="text-2xl font-bold">
                    {cls === 'nursery' ? t('study.nursery') : cls === 'kg' ? t('study.kg') : `${t('study.class')} ${cls}`}
                  </h3>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Subject Selection */}
        {selectedClass && !selectedSubject && (
          <div>
            <Button
              onClick={() => setSelectedClass(null)}
              variant="outline"
              className="mb-4"
            >
              {t('action.back')}
            </Button>
            <h2 className="text-2xl font-bold mb-4 text-center">{t('study.subjects')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {subjects.map((subject) => (
                <Card
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className="p-6 cursor-pointer hover:scale-105 transition-all bg-card hover:shadow-colored text-center border-2"
                >
                  <h3 className="text-xl font-bold">{t(`study.${subject}`)}</h3>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lessons */}
        {selectedSubject && (
          <div>
            <Button
              onClick={() => setSelectedSubject(null)}
              variant="outline"
              className="mb-4"
            >
              {t('action.back')}
            </Button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {t(`study.${selectedSubject}`)} - {selectedClass === 'nursery' ? t('study.nursery') : selectedClass === 'kg' ? t('study.kg') : `${t('study.class')} ${selectedClass}`}
            </h2>
            <div className="grid gap-4 max-w-3xl mx-auto">
              {lessons.map((lesson, idx) => (
                <Card key={idx} className="p-6 border-2 hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    {lesson.title[language]}
                  </h3>
                  <p className="text-lg mb-4 text-foreground">
                    {lesson.content[language]}
                  </p>
                  <Button
                    onClick={() => playAudio(lesson.content[language])}
                    className="bg-gradient-success hover:scale-105 transition-all"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    {t('action.listen')}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default Study;
