import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';

type Language = 'ko' | 'en';

type LanguageAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'TOGGLE_LANGUAGE' }
  | { type: 'INITIALIZE'; payload: Language };

interface LanguageState {
  language: Language;
  isLoading: boolean;
}

interface LanguageContextType {
  language: Language;
  isLoading: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  text: (key: TranslationKey) => string;
}

type TranslationKey = keyof typeof translations.ko;

const translations = {
  ko: {
    'app.title': '경희대 서울캠퍼스',
    'app.subtitle': '어디로 떠나볼까요?',
    'app.title.global': '경희대 국제캠퍼스',
    'app.title.gwangneung': '경희대 광릉캠퍼스',
    'settings.title': '설정',
    'settings.appearance': '외관',
    'settings.theme': '테마',
    'settings.about': '정보',
    'settings.version': '버전',
    'settings.language': '언어',
    'theme.light': '라이트',
    'theme.dark': '다크',
    'language.korean': '한국어',
    'language.english': 'English',
    'button.choose_photo': '사진 선택',
    'button.use_photo': '이 사진 사용',
    'bus.hoegi01': '회기역-경희대 01번',
    'bus.hoegi02': '회기역-외대앞역 02번',
    'bus.autonomous': '자율주행 A01번',
    'bus.shuttle': '서울-국제 셔틀버스',
    'bus.foreign_lang': '외국어대학-사색의 광장',
    'bus.sasak': '사색의 광장-정문 건너편',
    'bus.yeongtong': '영통역 통학버스',
    'bus.global_shuttle': '국제-서울 셔틀버스',
    'bus.bongsa_nesan': '봉선사입구-내산정 방면',
    'bus.bongsa_terminal': '봉선사입구-종점 방면',
  },
  en: {
    'app.title': 'Kyung Hee University Seoul Campus',
    'app.subtitle': 'Where should we go?',
    'app.title.global': 'Kyung Hee University Global Campus',
    'app.title.gwangneung': 'Kyung Hee University Gwangneung Campus',
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.theme': 'Theme',
    'settings.about': 'About',
    'settings.version': 'Version',
    'settings.language': 'Language',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'language.korean': '한국어',
    'language.english': 'English',
    'button.choose_photo': 'Choose a photo',
    'button.use_photo': 'Use this photo',
    'bus.hoegi01': 'Hoegi Station-KHU 01',
    'bus.hoegi02': 'Hoegi Station-HUFS Station 02',
    'bus.autonomous': 'Autonomous A01',
    'bus.shuttle': 'Seoul-International Shuttle',
    'bus.foreign_lang': 'Foreign Language Building-Sasak Plaza',
    'bus.sasak': 'Sasak Plaza-Main Gate Across',
    'bus.yeongtong': 'Yeongtong Station Commute Bus',
    'bus.global_shuttle': 'International-Seoul Shuttle',
    'bus.bongsa_nesan': 'Bongsa Temple Entrance-Nesan Direction',
    'bus.bongsa_terminal': 'Bongsa Temple Entrance-Terminal Direction',
  },
} as const;

const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, language: action.payload, isLoading: false };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_LANGUAGE':
      return { ...state, language: state.language === 'ko' ? 'en' : 'ko' };
    default:
      return state;
  }
};

// External store implementation - no side effects
let languageState: LanguageState = { language: 'ko', isLoading: true };
let languageListeners: ((state: LanguageState) => void)[] = [];

const languageStore = {
  getState: () => languageState,
  setState: (newState: LanguageState) => {
    languageState = newState;
    languageListeners.forEach(listener => listener(languageState));
  },
  subscribe: (listener: (state: LanguageState) => void) => {
    languageListeners.push(listener);
    return () => {
      languageListeners = languageListeners.filter(l => l !== listener);
    };
  },
  dispatch: (action: LanguageAction) => {
    languageState = languageReducer(languageState, action);
    languageListeners.forEach(listener => listener(languageState));
    
    // Auto-save when language changes
    if (action.type === 'SET_LANGUAGE' || action.type === 'TOGGLE_LANGUAGE') {
      AsyncStorage.setItem('language', languageState.language).catch(error => {
        console.error('Failed to save language to storage:', error);
      });
    }
  }
};

// Initialize immediately when module loads (no useEffect)
const initializeLanguageStore = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    const initialLanguage = savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en') 
      ? savedLanguage 
      : 'ko';
    languageStore.dispatch({ type: 'INITIALIZE', payload: initialLanguage });
  } catch (error) {
    console.error('Failed to load language from storage:', error);
    languageStore.dispatch({ type: 'INITIALIZE', payload: 'ko' });
  }
};

// Start initialization immediately
initializeLanguageStore();

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const state = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getState,
    languageStore.getState
  );

  const toggleLanguage = () => {
    languageStore.dispatch({ type: 'TOGGLE_LANGUAGE' });
  };

  const setLanguage = (lang: Language) => {
    languageStore.dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  const text = (key: TranslationKey): string => {
    return translations[state.language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language: state.language, 
      isLoading: state.isLoading,
      toggleLanguage, 
      setLanguage, 
      text 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
