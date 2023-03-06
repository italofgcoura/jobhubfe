import { useEffect, useContext, useState, useCallback, } from 'react';

import { UserContext } from '../../context/user/userContext';

import { IUserData } from '../../interfaces/userInterfaces';

import InputContainer from '../../components/InputContainer';

import handleInputChange, { handleChangeAddressObject } from '../../utils/handleInputChange';

interface ILogin {
  title?: string
}

interface ICategorie {
  _id: string,
  name: string
}

import Modal from '../../components/Modal';

import Spinner from '../../components/Spinner';
import PageAnimation from '../../components/PageAnimation';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';
import { Button } from '../../components/ActionButton/styles';

const Register: React.FC<ILogin> = ({ title }) => {

  const { userData, loadingUserData, updateUserData, categories, isCompany } = useContext(UserContext);

  const [editUserData, setEditUserData] = useState(false);

  const [userDataInputs, setUserDataInputs] = useState<IUserData>(userData);

  useEffect(() => {
    setUserDataInputs(userData);
  }, [userData]);

  const onRegiterUserdata = async (e: any) => {
    e.preventDefault();
    console.log('userDataInputs', userDataInputs);
    await updateUserData(userDataInputs);
    setEditUserData(false);
  };

  const categorieStyle = useCallback((categorieId: string) => {
    if (userDataInputs.userTechnologies.find(userCategorie => userCategorie._id === categorieId)) {
      return {
        backgroundColor: '#d1d1d1'
      };
    }
    return {
      backgroundColor: '#182da3'
    };
  }, []);

  const handleAddCategorie = useCallback((categorie: ICategorie) => {

    const tempUserTechnologies = userDataInputs.userTechnologies;

    tempUserTechnologies.push(categorie);

    setUserDataInputs({ ...userDataInputs, userTechnologies: tempUserTechnologies });

  }, []);

  const handleRemoveCategorie = useCallback((categorieId: string) => {

    setUserDataInputs({
      ...userDataInputs,
      userTechnologies: userDataInputs.userTechnologies.filter((cat: ICategorie) => cat._id !== categorieId)
    });

  }, []);

  const handleClick = useCallback((categorie: ICategorie) => {
    if (userDataInputs.userTechnologies.find(userCategorie => userCategorie._id === categorie._id)) {
      handleRemoveCategorie(categorie._id);
      return;
    }

    handleAddCategorie(categorie);
  }, []);

  if (loadingUserData) return <Modal><Spinner size={80} centered /></Modal>;

  return (
    <PageWithTitleContainer>

      <div style={{ paddingBottom: '32px' }}>

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserDataInputs, userDataInputs)}
          name='name'
          type='text'
          labelName='Nome'
          value={userDataInputs.name || ''}
          disabled={!editUserData}
        />

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserDataInputs, userDataInputs)}
          name='email'
          type='text'
          labelName='E-mail'
          value={userDataInputs.email || ''}
          disabled={!editUserData}
        />

        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setUserDataInputs, userDataInputs)}
          name='userDescription'
          type='text'
          labelName='Descrição'
          value={userDataInputs.userDescription || ''}
          style={{ height: '150px' }}
          isTextArea
          disabled={!editUserData}
        />

        {!isCompany &&
          <>
            {/* technoligas que o usuário tem as manhas */}
            <h1>Tecnologias que o usuário tem as manhas:</h1>
            <div>
              {userDataInputs.userTechnologies.length === 0 ?
                <h4>Este usuário ainda não cadastrou nenhuma tecnologia</h4>
                :
                userDataInputs.userTechnologies.sort((a, b) => a?.name.localeCompare(b?.name)).map((categorie: ICategorie) => (
                  <button key={categorie?._id}
                    onClick={() => handleClick(categorie)}
                    disabled={!editUserData}
                  >{categorie?.name}</button>
                ))
              }
            </div>
            <h5>Categorias disponíveis para serem adicionadas ao perfil:</h5>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', width: '60%', justifyContent: 'center' }}>
                {categories.sort((a, b) => a?.name.localeCompare(b?.name)).map((categorie: ICategorie) => (
                  <button key={categorie._id}
                    style={{ ...categorieStyle(categorie._id), padding: '8px', color: '#ffffff', border: 'none' }}
                    onClick={() => handleClick(categorie)}
                    disabled={!editUserData}
                  >{categorie.name}</button>
                ))
                }
              </div>
            </div>

          </>
        }

        <h1>Endereço:</h1>

        <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
          <InputContainer
            handleInputChange={(e) =>
              handleChangeAddressObject(e, setUserDataInputs, userDataInputs)}
            name='street'
            type='text'
            labelName='Rua'
            value={userDataInputs.address.street || ''}
            disabled={!editUserData}
          />

          <InputContainer
            handleInputChange={(e) =>
              handleChangeAddressObject(e, setUserDataInputs, userDataInputs)}
            name='city'
            type='text'
            labelName='Cidade'
            value={userDataInputs.address.city || ''}
            disabled={!editUserData}
          />

          <InputContainer
            handleInputChange={(e) =>
              handleChangeAddressObject(e, setUserDataInputs, userDataInputs)}
            name='number'
            type='text'
            labelName='Número'
            value={userDataInputs.address.number || ''}
            disabled={!editUserData}
          />
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>

          <Button>
            <button onClick={() => { setEditUserData(prevState => !prevState); }}>editar</button>
          </Button>

          <Button>
            <button disabled={!editUserData} onClick={onRegiterUserdata} type='submit'>salvar alterações</button>
          </Button>

        </div>
      </div>
    </PageWithTitleContainer>
  );
};

export default Register;
