import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

const initial = {};

interface lib {
  LOGIN: string,
  LOGOUT: string,
  SALUTATION: string,
}

interface iProps {
  currentLanguage: lib,
  handleChangeLanguage: () => void,
  language: string | null,
}

interface IProps {
  children?: React.ReactNode;
}

import languageLibrary from '../../language';

const LanguageContext = createContext<iProps>(initial as iProps);

const LanguageProvider = ({ children }: IProps) => {

  const [language, setLanguage] = useState(localStorage.getItem('language'));

  const currentLanguage = useMemo(() => (language === 'portuguese' ? languageLibrary.portuguese : languageLibrary.english), [language]);

  const handleChangeLanguage = useCallback(() => {
    setLanguage((prevState) => (prevState === 'portuguese' ? 'english' : 'portuguese'));
  }, []);

  const values = useMemo(() => ({
    currentLanguage, handleChangeLanguage, language
  }), [currentLanguage, handleChangeLanguage, language
  ]);

  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
