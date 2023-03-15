import { useContext, useEffect, useRef } from 'react';

import { AuthContext } from '../../context//auth/authContext';
import { UserContext } from '../../context/user/userContext';
import { ThemeContext } from '../../App';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { Header, MenuContainer, HeaderContainer, UserSalutation, LoginButton, ThemeSelector } from './styles';

import { JobContext } from '../../context/job/jobContext';
import { LanguageContext } from '../../context/language';

import SvgIcon from '../SvgIcon';

import { useTheme } from 'styled-components';

import Notifications from '../Notifications';

export default () => {
  const { handleLogout, isAuthenticated } = useContext(AuthContext);
  const { handleChangeLanguage, currentLanguage, language } = useContext(LanguageContext);

  const { loadUserData, userData, loadingHome, loadingUserData,
    isCompany, resetUser, homeError } = useContext(UserContext);

  const { resetStates } = useContext(JobContext);

  const { selectedTheme, handleToggleTheme } = useContext(ThemeContext);



  const navigate = useNavigate();

  const isLoaded = useRef(false);

  const theme = useTheme();

  const logout = () => {
    resetUser();
    resetStates();
    isLoaded.current = false;
    handleLogout();
    navigate('/');
  };

  const loadUser = async () => {

    await loadUserData();

  };


  useEffect(() => {
    if (isAuthenticated) {

      if (!isLoaded.current) {
        loadUser();
        isLoaded.current = true;
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && homeError) {
      handleLogout();
    }
  }, [homeError]);

  const loading = isAuthenticated ?
    (loadingHome || loadingUserData || userData.name === '')
    : false;

  if (loading) return null;

  return (
    <Header>
      <HeaderContainer>

        <Link to='/vagas'
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
          {isAuthenticated && <UserSalutation>{currentLanguage.SALUTATION}, {userData.name}</UserSalutation>}
        </Link>
        <MenuContainer>
          <li><NavLink end to='/vagas'>home</NavLink></li>

          {isAuthenticated && <>
            <li><NavLink end to='/meu-perfil'>meu perfil</NavLink></li>
            {isCompany &&
              <>
                <li><NavLink end to='/vagas/cadastro-vaga'>cadastrar nova vaga</NavLink></li>

                <li><NavLink end to='/vagas/minhas-vagas-cadastradas'>minhas vagas cadastradas</NavLink></li>
              </>
            }
            {!isCompany &&
              <li><NavLink end to='/vagas/minhas-candidaturas'>minhas candidaturas</NavLink></li>
            }

            <LoginButton onClick={logout}>
              <SvgIcon source='leave' color={theme.text} />
              <span>sair</span>
            </LoginButton>

            <Notifications theme={theme} />

          </>}
          {!isAuthenticated && <li><NavLink end to='/'>login</NavLink></li>}

          <ThemeSelector onClick={handleToggleTheme}>
            {selectedTheme === 'dark' ? '☀️' : '🌙'}
          </ThemeSelector>
          <button onClick={handleChangeLanguage} style={{width: 30}}>
            {language === 'portuguese' ? 'EN' : 'PT'}
          </button>

        </MenuContainer>
      </HeaderContainer>
    </Header >
  );
};
