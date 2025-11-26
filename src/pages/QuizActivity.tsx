import { ArrowLeft, Trophy, CheckCircle, XCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';
import { useState } from 'react';

const QuizActivity = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const quizzes = [
    {
      question: { en: 'What color is the sky?', hi: 'आसमान का रंग क्या है?' },
      options: [
        { en: 'Red', hi: 'लाल' },
        { en: 'Blue', hi: 'नीला' },
        { en: 'Green', hi: 'हरा' },
        { en: 'Yellow', hi: 'पीला' },
      ],
      correct: 1,
    },
    {
      question: { en: 'How many fingers do you have?', hi: 'आपके कितने उंगलियाँ हैं?' },
      options: [
        { en: '8', hi: '8' },
        { en: '10', hi: '10' },
        { en: '12', hi: '12' },
        { en: '5', hi: '5' },
      ],
      correct: 1,
    },
    {
      question: { en: 'What sound does a cat make?', hi: 'बिल्ली क्या आवाज़ करती है?' },
      options: [
        { en: 'Meow', hi: 'म्याऊं' },
        { en: 'Woof', hi: 'भौं भौं' },
        { en: 'Moo', hi: 'मू' },
        { en: 'Quack', hi: 'क्वैक' },
      ],
      correct: 0,
    },
    {
      question: { en: 'What comes after 5?', hi: '5 के बाद क्या आता है?' },
      options: [
        { en: '4', hi: '4' },
        { en: '6', hi: '6' },
        { en: '7', hi: '7' },
        { en: '3', hi: '3' },
      ],
      correct: 1,
    },
    {
      question: { en: 'Which one is a fruit?', hi: 'कौन सा फल है?' },
      options: [
        { en: 'Carrot', hi: 'गाजर' },
        { en: 'Potato', hi: 'आलू' },
        { en: 'Apple', hi: 'सेब' },
        { en: 'Onion', hi: 'प्याज' },
      ],
      correct: 2,
    },
  ];

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === quizzes[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = (score / quizzes.length) * 100;
    return (
      <div className="min-h-screen bg-background pb-20">
        <LanguageToggle />
        
        <div className="bg-gradient-primary py-6 px-4 shadow-md">
          <div className="container mx-auto flex items-center">
            <Button
              onClick={() => navigate('/fun')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Trophy className="w-8 h-8 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">
              {language === 'hi' ? 'क्विज परिणाम' : 'Quiz Results'}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[70vh]">
          <Card className="max-w-2xl w-full animate-scale-in">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Trophy className="w-32 h-32 text-yellow-500 animate-bounce-fun" />
                  {percentage >= 80 && (
                    <Star className="w-12 h-12 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                  )}
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground">
                {percentage >= 80 ? (language === 'hi' ? 'शानदार!' : 'Amazing!') : 
                 percentage >= 60 ? (language === 'hi' ? 'बढ़िया!' : 'Good Job!') :
                 (language === 'hi' ? 'अच्छी कोशिश!' : 'Good Try!')}
              </h2>
              
              <div className="bg-gradient-primary/10 p-8 rounded-lg">
                <p className="text-6xl font-bold text-primary mb-4">{score}/{quizzes.length}</p>
                <p className="text-2xl text-muted-foreground">
                  {language === 'hi' ? 'सही उत्तर' : 'Correct Answers'}
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetQuiz} className="flex-1 bg-gradient-primary text-lg py-6">
                  {language === 'hi' ? 'फिर से खेलें' : 'Play Again'}
                </Button>
                <Button onClick={() => navigate('/fun')} variant="outline" className="flex-1 text-lg py-6">
                  {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <UdaanBuddy />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="bg-gradient-primary py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => navigate('/fun')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Trophy className="w-8 h-8 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">
              {language === 'hi' ? 'क्विज' : 'Quiz'}
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold">{score}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="animate-fade-in">
          <CardHeader className="bg-gradient-secondary/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-muted-foreground">
                {language === 'hi' ? 'प्रश्न' : 'Question'} {currentQuestion + 1}/{quizzes.length}
              </span>
              <div className="flex gap-1">
                {quizzes.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-2 rounded-full ${
                      idx <= currentQuestion ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardTitle className="text-2xl text-foreground">
              {quizzes[currentQuestion].question[language]}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {quizzes[currentQuestion].options.map((option, idx) => {
              const isCorrect = idx === quizzes[currentQuestion].correct;
              const isSelected = idx === selectedAnswer;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all font-medium text-lg
                    ${!answered && 'hover:border-primary hover:bg-primary/5 cursor-pointer'}
                    ${answered && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-950'}
                    ${answered && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-950'}
                    ${answered && !isSelected && !isCorrect && 'opacity-50'}
                    ${!answered && 'border-border'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option[language]}</span>
                    {answered && isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {answered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </button>
              );
            })}

            {answered && (
              <Button onClick={handleNext} className="w-full bg-gradient-primary text-lg py-6 mt-6 animate-fade-in">
                {currentQuestion < quizzes.length - 1
                  ? (language === 'hi' ? 'अगला प्रश्न' : 'Next Question')
                  : (language === 'hi' ? 'परिणाम देखें' : 'See Results')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default QuizActivity;
