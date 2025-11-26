import { ArrowLeft, Music, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';

const RhymesActivity = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const rhymes = [
    {
      title: { en: 'Twinkle Twinkle Little Star', hi: 'चंदा मामा दूर के' },
      lyrics: {
        en: 'Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.',
        hi: 'चंदा मामा दूर के,\nपुए पकाएं बूर के,\nआप खाएं थाली में,\nमुन्ने को दें प्याली में।'
      },
      videoId: 'yCjJyiqpAuU',
    },
    {
      title: { en: 'Baa Baa Black Sheep', hi: 'मछली जल की रानी है' },
      lyrics: {
        en: 'Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.',
        hi: 'मछली जल की रानी है,\nजीवन उसका पानी है,\nहाथ लगाओ डर जाएगी,\nबाहर निकालो मर जाएगी।'
      },
      videoId: 'kU2qMkaU9iY',
    },
    {
      title: { en: 'Johny Johny Yes Papa', hi: 'आलू कचालू' },
      lyrics: {
        en: 'Johny, Johny! Yes, Papa?\nEating sugar? No, Papa!\nTelling lies? No, Papa!\nOpen your mouth! Ha! Ha! Ha!',
        hi: 'आलू कचालू बेटा कहाँ गए थे,\nबैंगन की टोकरी में सो रहे थे,\nबैंगन ने लात मारी रो रहे थे,\nमम्मी ने प्यार किया हँस रहे थे।'
      },
      videoId: '0jfU7pw76ZE',
    },
    {
      title: { en: 'Humpty Dumpty', hi: 'नानी तेरी मोरनी' },
      lyrics: {
        en: 'Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall,\nAll the king\'s horses and all the king\'s men,\nCouldn\'t put Humpty together again.',
        hi: 'नानी तेरी मोरनी को मोर ले गए,\nचोर ले गए, चोर ले गए,\nनानी तेरी मोरनी को मोर ले गए।'
      },
      videoId: 'SgI2666Cyv0',
    },
    {
      title: { en: 'Old MacDonald Had a Farm', hi: 'लकड़ी की काठी' },
      lyrics: {
        en: 'Old MacDonald had a farm,\nE-I-E-I-O,\nAnd on that farm he had a cow,\nE-I-E-I-O!',
        hi: 'लकड़ी की काठी,\nकाठी पे घोड़ा,\nघोड़े की दुम पे जो मारा हथोड़ा,\nदौड़ा दौड़ा दौड़ा घोड़ा।'
      },
      videoId: '_6HzoUcx3eo',
    },
    {
      title: { en: 'The Wheels on the Bus', hi: 'रेल चली छुक छुक छुक' },
      lyrics: {
        en: 'The wheels on the bus go round and round,\nRound and round, round and round,\nThe wheels on the bus go round and round,\nAll through the town.',
        hi: 'रेल चली छुक छुक छुक,\nरेल चली छुक छुक छुक,\nगाड़ी चली टुक टुक टुक,\nटुक टुक टुक।'
      },
      videoId: 'e_04ZrNroTo',
    },
  ];

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      {/* Header */}
      <div className="bg-gradient-success py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button
            onClick={() => navigate('/fun')}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Music className="w-8 h-8 text-white mr-3" />
          <h1 className="text-3xl font-bold text-white">
            {language === 'hi' ? 'मज़ेदार गाने' : 'Fun Rhymes'}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {rhymes.map((rhyme, idx) => (
            <Card 
              key={idx} 
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader className="bg-gradient-success/10">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Music className="w-6 h-6" />
                  {rhyme.title[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Video Embed */}
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${rhyme.videoId}`}
                    title={rhyme.title[language]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>

                {/* Lyrics */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-foreground whitespace-pre-line leading-relaxed font-medium">
                    {rhyme.lyrics[language]}
                  </p>
                </div>

                {/* Play Audio Button */}
                <Button 
                  onClick={() => playAudio(rhyme.lyrics[language])}
                  className="w-full bg-gradient-success"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  {language === 'hi' ? 'सुनें' : 'Play Audio'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default RhymesActivity;
