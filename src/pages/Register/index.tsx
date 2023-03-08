import React, { useContext, useState, useEffect, useRef } from 'react';

import { UserContext } from '../../context/user/userContext';

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth/authContext';

import InputContainer from '../../components/InputContainer';

import handleInputChange from '../../utils/handleInputChange';

import LoginContainer from '../../components/LoginContainer';

import LinkComponent from '../../components/LinkComponent';
import SvgIcon from '../../components/SvgIcon';
import Spinner from '../../components/Spinner';

import { useTheme } from 'styled-components';

interface IUserLogin {
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  isCompany: boolean
}

const Register = () => {

  const errorCreatingUserRef = useRef(false);

  const { createNewUser, loadingCreatingNewUser } = useContext(UserContext);

  const { isAuthenticated } = useContext(AuthContext);

  const theme = useTheme();

  const [userLogin, setUserLogin] = useState<IUserLogin>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    isCompany: false
  });

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewUser(userLogin);

    errorCreatingUserRef.current = true;
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/vagas');
    }
  }, [isAuthenticated]);

  const btnDisabled = !userLogin.email ||
    !userLogin.password ||
    !userLogin.confirmPassword ||
    (userLogin.password !==
      userLogin.confirmPassword);

  const navigate = useNavigate();

  return (
    <LoginContainer>
      <form onSubmit={handleRegisterUser}
      >
        <h1 style={{ marginBottom: '16px' }}>Novo usuário</h1>

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserLogin, userLogin)}
          name={'name'}
          type={'text'}
          labelName={'Nome'}
          value={userLogin.name}
          size={266}
        />

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserLogin, userLogin)}
          name={'email'}
          type={'email'}
          labelName={'E-mail'}
          value={userLogin.email}
          size={266}
        />

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserLogin, userLogin)}
          name={'password'}
          type={'password'}
          labelName={'Senha'}
          value={userLogin.password}
          size={266}
        />

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserLogin, userLogin)}
          name={'confirmPassword'}
          type={'password'}
          labelName={'Confirme a senha'}
          value={userLogin.confirmPassword}
          size={266}
        />

        <div
          style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '24px' }}
          onClick={() => setUserLogin({ ...userLogin, isCompany: !userLogin.isCompany })}
        >
          <SvgIcon source={userLogin.isCompany ? 'checkBox' : 'checkBoxBlank'} height={24} width={24} color={theme.text} />
          {/* <input type='checkbox'
            onChange={() => setUserLogin({ ...userLogin, isCompany: !userLogin.isCompany })}
          /> */}
          <label style={{ color: theme.text }}>Sou um empresa</label>
        </div>

        {loadingCreatingNewUser && <p>Criando novo usuário...</p>}

        <button type='submit'
          disabled={btnDisabled || loadingCreatingNewUser}
        >Cadastrar
          {loadingCreatingNewUser && <Spinner size={10} />}
        </button>

        {(userLogin.confirmPassword !== '' && userLogin.password !== userLogin.confirmPassword) &&
          <div style={{ height: '18px' }}>
            <span>Passwords não coincidem.</span>
          </div>
        }

      </form>

      <LinkComponent path='/' text='Voltar para login' />

    </LoginContainer>
  );
};

export default Register;
