import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/auth/authContext';
import { LanguageContext } from '../../context/language';

import { useNavigate } from 'react-router-dom';

import LoginContainer from '../../components/LoginContainer';

import InputContainer from '../../components/InputContainer';

import Spinner from '../../components/Spinner';

import handleInputChange from '../../utils/handleInputChange';

import LinkComponent from '../../components/LinkComponent';

import SvgIcon from '../../components/SvgIcon';

import { useTheme } from 'styled-components';

const Login = () => {

  const { loginError, handleLoginError, handleLogin, isAuthenticated, isLoginIn, handleFederatedLogin, loading } = useContext(AuthContext);

  const { currentLanguage } = useContext(LanguageContext);

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: ''
  });

  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/vagas');
    }
    return (() => {
      handleLoginError();
    });
  }, [isAuthenticated]);

  return (

    <LoginContainer>

      <form
        onSubmit={(event) => handleLogin(event,
          userLoginData.email, userLoginData.password)}
      >
        <h2>LOGIN</h2>

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserLoginData, userLoginData)}
          name={'email'}
          type={'email'}
          labelName={'E-mail'}
          value={userLoginData.email}
          size={266}
        />

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserLoginData, userLoginData)}
          name={'password'}
          type={'password'}
          labelName={'Senha'}
          value={userLoginData.password}
          size={266}
        />

        <button type='submit'
          disabled={!userLoginData.email || !userLoginData.password || isLoginIn}
        >{currentLanguage.LOGIN}
          {(isLoginIn || loading) &&
            <Spinner size={10} />
          }
        </button>

        {loginError &&
          <span className='alertMsg'>
            Usuário ou senha parecem estar incorretos.
          </span>
        }

        <LinkComponent path='esqueci-senha' text='Esqueci minha senha' />

      </form>

      <LinkComponent path='cadastro-usuario' text='Ainda não é um usuário? Clique aqui para cadastrar' />

      <div style={{ width: '100%', borderBottom: `1px solid ${theme.text}`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: theme.text, margin: '8px 0' }} />

      <button className="login__btn login__google" onClick={(e) => {
        e.preventDefault();
        handleFederatedLogin();
      }}
      style={{ margin: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '4px', width: '100%' }}
      >
        <SvgIcon source='google' width={24} height={24} color={theme.pageBackgroundColor} />
        Login com Google
      </button>
    </LoginContainer >
  );
};

export default Login;
