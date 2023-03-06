import { useState, useEffect, useMemo, useCallback, createContext } from 'react';
import { HashRouter } from 'react-router-dom';

import { AuthProvider } from './context/auth/authContext';
import { UserProvider } from './context/user/userContext';
import { JobProvider } from './context/job/jobContext';

import { ThemeProvider } from 'styled-components';

import Pages from './pages/Pages';
import GlobalStyle from './styles/global';

import themes from './styles/themes';

interface ThemeContextProps {
  handleToggleTheme?: () => void;
  selectedTheme?: string;
}

const ThemeContext = createContext<ThemeContextProps>({});

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('currentTheme') ?? 'dark');

  const currentTheme = useMemo(() => (theme === 'dark' ? themes.dark : themes.light), [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    localStorage.setItem('currentTheme', theme);
  }, [theme]);

  const selectedTheme = theme;

  const values = useMemo(
    () => ({
      handleToggleTheme, selectedTheme, currentTheme,
    }),
    [handleToggleTheme, selectedTheme, currentTheme],
  );

  console.log(currentTheme);

  return (
    <ThemeContext.Provider value={values}>
      <ThemeProvider theme={currentTheme}>
        <AuthProvider>
          <UserProvider>
            <JobProvider>
              <HashRouter >
                <GlobalStyle />
                <Pages />
              </HashRouter>
            </JobProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };

export default App;
