import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  'app.title': { en: 'Udaan Learning', hi: 'उड़ान लर्निंग' },
  'app.subtitle': { en: 'Free Learning Platform for Children', hi: 'बच्चों के लिए मुफ्त शिक्षा मंच' },
  'app.tagline': { en: 'Empowering underprivileged children with education', hi: 'गरीब बच्चों को शिक्षा से सशक्त बनाना' },
  
  // Main sections
  'nav.study': { en: 'Study', hi: 'पढ़ाई' },
  'nav.fun': { en: 'Fun & Activities', hi: 'मस्ती और गतिविधियाँ' },
  'nav.videos': { en: 'Videos', hi: 'वीडियो' },
  'nav.lifeskills': { en: 'Life Skills', hi: 'जीवन कौशल' },
  'nav.civic': { en: 'Civic Sense', hi: 'सिविक सेंस' },
  'nav.parents': { en: 'For Parents & Volunteers', hi: 'माता-पिता और स्वयंसेवक के लिए' },
  
  // Study section
  'study.select_class': { en: 'Select Your Class', hi: 'अपनी कक्षा चुनें' },
  'study.nursery': { en: 'Nursery', hi: 'नर्सरी' },
  'study.kg': { en: 'KG', hi: 'केजी' },
  'study.class': { en: 'Class', hi: 'कक्षा' },
  'study.subjects': { en: 'Select Subject', hi: 'विषय चुनें' },
  'study.english': { en: 'English', hi: 'अंग्रेजी' },
  'study.hindi': { en: 'Hindi', hi: 'हिंदी' },
  'study.math': { en: 'Math', hi: 'गणित' },
  'study.evs': { en: 'EVS', hi: 'ईवीएस' },
  'study.social': { en: 'Social', hi: 'सामाजिक' },
  
  // Common actions
  'action.listen': { en: 'Listen', hi: 'सुनें' },
  'action.play': { en: 'Play', hi: 'चलाएं' },
  'action.back': { en: 'Back', hi: 'वापस' },
  'action.next': { en: 'Next', hi: 'अगला' },
  'action.home': { en: 'Home', hi: 'होम' },
  
  // Fun & Activities
  'fun.drawing': { en: 'Drawing & Coloring', hi: 'ड्राइंग और रंग भरना' },
  'fun.crafts': { en: 'Simple Crafts', hi: 'आसान शिल्प' },
  'fun.rhymes': { en: 'Rhymes & Songs', hi: 'कविताएं और गाने' },
  'fun.puzzles': { en: 'Puzzles & Games', hi: 'पहेलियाँ और खेल' },
  'fun.quiz': { en: 'Quiz Time', hi: 'क्विज टाइम' },
  
  // Videos
  'videos.lessons': { en: 'Animated Lessons', hi: 'एनिमेटेड पाठ' },
  'videos.stories': { en: 'Stories', hi: 'कहानियाँ' },
  'videos.science': { en: 'Science Explain-It', hi: 'विज्ञान समझाओ' },
  'videos.gk': { en: 'General Knowledge', hi: 'सामान्य ज्ञान' },
  'videos.news': { en: 'Kid-Friendly News', hi: 'बच्चों के लिए समाचार' },
  'videos.low_data': { en: 'Low Data Mode', hi: 'कम डेटा मोड' },
  
  // Life Skills
  'life.hygiene': { en: 'Hygiene', hi: 'स्वच्छता' },
  'life.grooming': { en: 'Grooming', hi: 'सज-धज' },
  'life.confidence': { en: 'Confidence', hi: 'आत्मविश्वास' },
  'life.behavior': { en: 'Good Behavior', hi: 'अच्छा व्यवहार' },
  
  // Civic Sense
  'civic.cleanliness': { en: 'Keep Clean', hi: 'साफ रखें' },
  'civic.queue': { en: 'Stand in Line', hi: 'लाइन में खड़े रहें' },
  'civic.traffic': { en: 'Traffic Rules', hi: 'यातायात नियम' },
  'civic.respect': { en: 'Respect Others', hi: 'दूसरों का सम्मान करें' },
  'civic.public': { en: 'Public Property', hi: 'सार्वजनिक संपत्ति' },
  'civic.helping': { en: 'Help Elders', hi: 'बड़ों की मदद करें' },
  
  // Udaan Buddy
  'buddy.help': { en: 'Udaan Buddy', hi: 'उड़ान मित्र' },
  'buddy.greeting': { en: 'Hello! How can I help you?', hi: 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?' },
  'buddy.find_hindi': { en: 'Help me find Hindi', hi: 'हिंदी खोजने में मदद करें' },
  'buddy.find_drawing': { en: 'Help me find Drawing', hi: 'ड्राइंग खोजने में मदद करें' },
  'buddy.read': { en: 'Read this for me', hi: 'मेरे लिए यह पढ़ें' },
  
  // Parents & Volunteers
  'parents.title': { en: 'For Parents & Volunteers', hi: 'माता-पिता और स्वयंसेवक के लिए' },
  'parents.support': { en: 'How to Support Learning', hi: 'सीखने में कैसे मदद करें' },
  'parents.volunteer': { en: 'Become a Volunteer', hi: 'स्वयंसेवक बनें' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
