import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

const initial = {};

interface lib {
  LOGIN: string,
  LOGOUT: string,
  SALUTATION: string,
  HOME: string,
  USERPROFILE: string,
  MYAPPLICATIONS: string,
  REGISTERNEWJOB: string,
  MYREGISTEREDJOBS: string,
  JOBDETAILS: string
}

interface iProps {
  currentLibrary: lib,
  handleChangeLanguage: () => void,
  language: string,
  loadingNewLanguage: boolean
}

interface IProps {
  children?: React.ReactNode;
}

import languageLibrary from '../../language';

const LanguageContext = createContext<iProps>(initial as iProps);

const LanguageProvider = ({ children }: IProps) => {

  const [language, setLanguage] = useState<string>(localStorage.getItem('language') ?? window.navigator.language ?? 'pt-BR');

  const [loadingNewLanguage, setLoadingNewLanguage] = useState(true);

  const currentLibrary = useMemo(() => (language === 'pt-BR' ? languageLibrary.portuguese : languageLibrary.english), [language]);

  const handleChangeLanguage = useCallback(() => {

    setLoadingNewLanguage(true);

    setTimeout(() => {
      setLanguage((prevState) => (prevState === 'pt-BR' ? 'english' : 'pt-BR'));
      setLoadingNewLanguage(false);
    }, 500);

  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    setLoadingNewLanguage(false);
  }, [language]);


  const values = useMemo(() => ({
    currentLibrary, handleChangeLanguage, language, loadingNewLanguage
  }), [currentLibrary, handleChangeLanguage, language, loadingNewLanguage
  ]);

  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
