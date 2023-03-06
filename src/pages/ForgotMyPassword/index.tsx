import { useState } from 'react';

import LoginContainer from '../../components/LoginContainer';

import InputContainer from '../../components/InputContainer';

import Spinner from '../../components/Spinner';

import handleInputChange from '../../utils/handleInputChange';

import { auth, sendPasswordReset } from '../../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import LinkComponent from '../../components/LinkComponent';

const Login = () => {

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    confirmEmail: ''
  });

  const [User, loading] = useAuthState(auth);

  const disabled = loading ||
    !userLoginData.email || !userLoginData.confirmEmail ||
    (userLoginData.email !== userLoginData.confirmEmail);

  return (

    <LoginContainer>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendPasswordReset(userLoginData.email);
        }}
      >
        <h2>Esqueci minha senha</h2>

        <InputContainer
          handleInputChange={(e) =>
            handleInputChange(e, setUserLoginData, userLoginData)
          }
          name={'email'}
          type={'email'}
          labelName={'E-mail'}
          value={userLoginData.email}
          size={266}
        />

        <InputContainer
          handleInputChange={(e) =>
            handleInputChange(e, setUserLoginData, userLoginData)
          }
          name={'confirmEmail'}
          type={'email'}
          labelName={'Confirme seu e-mail'}
          value={userLoginData.confirmEmail}
          size={266}
        />

        <button type='submit'
          disabled={disabled}
        >Enviar email
          {loading &&
            <Spinner size={10} />
          }
        </button>

        {((userLoginData.email !== '' && userLoginData.confirmEmail !== '') && (
          (userLoginData.email !== userLoginData.confirmEmail))
        ) && <p className='alertMsg'>emails não coincidem</p>}

      </form>



      {/* <div style={{ padding: '16px 0', display: 'flex', alignItems: 'space-between', flexDirection: 'column', height: '60px', justifyContent: 'space-evenly' }}> */}
      <LinkComponent path='/' text='Voltar para login' />
      {/* </div> */}

    </LoginContainer >

  );
};

export default Login;
