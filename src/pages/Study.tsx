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
      { title: { en: 'Letter A - Apple', hi: 'अक्षर A - सेब' }, content: { en: 'A is for Apple. Apple is red and sweet.', hi: 'A अक्षर Apple के लिए है। सेब लाल और मीठा होता है।' } },
      { title: { en: 'Letter B - Ball', hi: 'अक्षर B - गेंद' }, content: { en: 'B is for Ball. We play with a ball.', hi: 'B अक्षर Ball के लिए है। हम गेंद से खेलते हैं।' } },
      { title: { en: 'Letter C - Cat', hi: 'अक्षर C - बिल्ली' }, content: { en: 'C is for Cat. Cats say meow!', hi: 'C अक्षर Cat के लिए है। बिल्लियाँ म्याऊं करती हैं!' } },
      { title: { en: 'Letter D - Dog', hi: 'अक्षर D - कुत्ता' }, content: { en: 'D is for Dog. Dogs are our best friends.', hi: 'D अक्षर Dog के लिए है। कुत्ते हमारे सबसे अच्छे दोस्त हैं।' } },
      { title: { en: 'Letter E - Elephant', hi: 'अक्षर E - हाथी' }, content: { en: 'E is for Elephant. Elephants are big and strong.', hi: 'E अक्षर Elephant के लिए है। हाथी बड़े और मजबूत होते हैं।' } },
      { title: { en: 'Simple Words', hi: 'आसान शब्द' }, content: { en: 'Learn: hat, bat, cat, mat, rat', hi: 'सीखो: hat, bat, cat, mat, rat' } },
    ],
    hindi: [
      { title: { en: 'अ for अनार', hi: 'अ अनार के लिए' }, content: { en: 'अ is for अनार (Pomegranate)', hi: 'अ अनार के लिए है। अनार लाल फल है।' } },
      { title: { en: 'आ for आम', hi: 'आ आम के लिए' }, content: { en: 'आ is for आम (Mango)', hi: 'आ आम के लिए है। आम पीला और मीठा होता है।' } },
      { title: { en: 'इ for इमली', hi: 'इ इमली के लिए' }, content: { en: 'इ is for इमली (Tamarind)', hi: 'इ इमली के लिए है। इमली खट्टी होती है।' } },
      { title: { en: 'ई for ईख', hi: 'ई ईख के लिए' }, content: { en: 'ई is for ईख (Sugarcane)', hi: 'ई ईख के लिए है। ईख मीठी होती है।' } },
      { title: { en: 'उ for उल्लू', hi: 'उ उल्लू के लिए' }, content: { en: 'उ is for उल्लू (Owl)', hi: 'उ उल्लू के लिए है। उल्लू रात में जागता है।' } },
      { title: { en: 'Simple Hindi Words', hi: 'आसान हिंदी शब्द' }, content: { en: 'Learn: पानी, रोटी, दूध, फल', hi: 'सीखो: पानी, रोटी, दूध, फल' } },
    ],
    math: [
      { title: { en: 'Counting 1-10', hi: 'गिनती 1-10' }, content: { en: 'Let\'s count: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10', hi: 'चलो गिनें: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10' } },
      { title: { en: 'Addition', hi: 'जोड़' }, content: { en: '1 + 1 = 2. Two apples together!', hi: '1 + 1 = 2। दो सेब एक साथ!' } },
      { title: { en: 'Subtraction', hi: 'घटाना' }, content: { en: '5 - 2 = 3. Five take away two is three!', hi: '5 - 2 = 3। पाँच में से दो हटाओ तो तीन!' } },
      { title: { en: 'Shapes', hi: 'आकार' }, content: { en: 'Circle, Square, Triangle, Rectangle', hi: 'गोला, चौकोर, त्रिकोण, आयत' } },
      { title: { en: 'Big and Small', hi: 'बड़ा और छोटा' }, content: { en: 'Elephant is big. Mouse is small.', hi: 'हाथी बड़ा है। चूहा छोटा है।' } },
      { title: { en: 'More and Less', hi: 'ज्यादा और कम' }, content: { en: '5 is more than 3. 2 is less than 4.', hi: '5, 3 से ज्यादा है। 2, 4 से कम है।' } },
    ],
    evs: [
      { title: { en: 'My Family', hi: 'मेरा परिवार' }, content: { en: 'I have mother, father, brother, and sister.', hi: 'मेरे पास माँ, पिताजी, भाई और बहन हैं।' } },
      { title: { en: 'Animals', hi: 'जानवर' }, content: { en: 'Dog, cat, cow, goat are animals.', hi: 'कुत्ता, बिल्ली, गाय, बकरी जानवर हैं।' } },
      { title: { en: 'Birds', hi: 'पक्षी' }, content: { en: 'Parrot, peacock, crow, sparrow can fly.', hi: 'तोता, मोर, कौआ, गौरैया उड़ सकते हैं।' } },
      { title: { en: 'Plants', hi: 'पौधे' }, content: { en: 'Plants give us fruits and vegetables.', hi: 'पौधे हमें फल और सब्जियाँ देते हैं।' } },
      { title: { en: 'Seasons', hi: 'मौसम' }, content: { en: 'Summer, winter, rainy, spring are seasons.', hi: 'गर्मी, सर्दी, बारिश, बसंत मौसम हैं।' } },
      { title: { en: 'Our Body', hi: 'हमारा शरीर' }, content: { en: 'We have eyes, ears, nose, mouth, hands.', hi: 'हमारे पास आँखें, कान, नाक, मुँह, हाथ हैं।' } },
    ],
    social: [
      { title: { en: 'Good Manners', hi: 'अच्छे शिष्टाचार' }, content: { en: 'Say Please and Thank You.', hi: 'कृपया और धन्यवाद कहें।' } },
      { title: { en: 'Helping at Home', hi: 'घर में मदद' }, content: { en: 'Help parents with small tasks.', hi: 'छोटे कामों में माता-पिता की मदद करें।' } },
      { title: { en: 'Sharing', hi: 'बाँटना' }, content: { en: 'Share your toys with friends.', hi: 'अपने खिलौने दोस्तों के साथ बाँटें।' } },
      { title: { en: 'Clean Habits', hi: 'स्वच्छ आदतें' }, content: { en: 'Wash hands before eating.', hi: 'खाने से पहले हाथ धोएँ।' } },
      { title: { en: 'Respect Elders', hi: 'बड़ों का सम्मान' }, content: { en: 'Always respect your elders.', hi: 'हमेशा अपने बड़ों का सम्मान करें।' } },
      { title: { en: 'Be Kind', hi: 'दयालु बनो' }, content: { en: 'Be kind to everyone around you.', hi: 'अपने आसपास के सभी लोगों के प्रति दयालु बनें।' } },
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
                  className="p-6 cursor-pointer hover:scale-105 transition-all bg-gradient-secondary hover:shadow-colored text-center border-2 animate-float card-hover"
                  style={{ animationDelay: `${classes.indexOf(cls) * 0.1}s` }}
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
                  className="p-6 cursor-pointer hover:scale-105 transition-all bg-card hover:shadow-colored text-center border-2 animate-bounce-in card-hover"
                  style={{ animationDelay: `${subjects.indexOf(subject) * 0.1}s` }}
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
                <Card 
                  key={idx} 
                  className="p-6 border-2 hover:shadow-md transition-all card-hover animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
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
