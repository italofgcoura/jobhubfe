import { useState } from 'react';

import LoginContainer from '../../components/LoginContainer';

import InputContainer from '../../components/InputContainer';

import Spinner from '../../components/Spinner';

import handleInputChange from '../../utils/handleInputChange';

import { sendPasswordReset } from '../../firebase';

// import { useAuthState } from 'react-firebase-hooks/auth';

import LinkComponent from '../../components/LinkComponent';
import makeRequest from '../../utils/makeRequest';

const Login = () => {

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    confirmEmail: ''
  });

  const [sendingReset, setSendingReset] = useState(false);

  const [errorResetPassword, setErrorResetPassword] = useState('');

  // const [User, loading] = useAuthState(auth);

  const disabled = sendingReset ||
    !userLoginData.email || !userLoginData.confirmEmail ||
    (userLoginData.email !== userLoginData.confirmEmail);

  const handleSubmitResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    // setSendingReset(true);

    await makeRequest(sendPasswordReset, setErrorResetPassword, setSendingReset, userLoginData.email);

    // try {
    //   await sendPasswordReset(userLoginData.email);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setSendingReset(false);
    // }

  };

  console.log('disabled', disabled, sendingReset);

  return (

    <LoginContainer>

      <form
        onSubmit={handleSubmitResetPassword}>
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
          {sendingReset &&
            <Spinner size={10} />
          }
        </button>

        {((userLoginData.email !== '' && userLoginData.confirmEmail !== '') && (
          (userLoginData.email !== userLoginData.confirmEmail))
        ) && <p className='alertMsg'>emails não coincidem</p>}

        {errorResetPassword &&
          <p className='alertMsg'>Ocorreu um erro ao enviar o email</p>
        }

      </form>



      {/* <div style={{ padding: '16px 0', display: 'flex', alignItems: 'space-between', flexDirection: 'column', height: '60px', justifyContent: 'space-evenly' }}> */}
      <LinkComponent path='/' text='Voltar para login' />
      {/* </div> */}

    </LoginContainer >

  );
};

export default Login;
