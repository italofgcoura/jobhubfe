import React, { useContext, useState } from 'react';

import { UserContext } from '../../context/user/userContext';

import { JobContext } from '../../context/job/jobContext';

import Modal from '../../components/Modal';

import Spinner from '../../components/Spinner';

import InputContainer from '../../components/InputContainer';

import handleInputChange, { handleChangeJobDescriptionObject } from '../../utils/handleInputChange';

import { IJob } from '../../interfaces/jobInterfaces';

import { companyRegisteredNewJobRequest } from '../../requests/job';
import makeRequest from '../../utils/makeRequest';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';
import { Button } from '../../components/ActionButton/styles';

const RegisterNewJob = () => {

  const { userData } = useContext(UserContext);
  const { loadJobs } = useContext(JobContext);
  const [errorRegisterNewJob, setErrorRegisterNewJob] = useState(false);

  const [registeringNewJob, setRegisteringNewJob] = useState(false);

  const startJobObject = {
    companyName: userData.name,
    title: '',
    seniority: '',
    description: {
      jobDescription: '',
      benefits: '',
      requirements: ''
    },
    wage: '',
    contact: '',
    startDeadLine: '',
    _id: ''
  };

  const [newJobData, setNewJobData] = useState<IJob>(startJobObject);

  const handleRegisterNewJob = async (event: React.FormEvent<HTMLFormElement>,
  ) => {

    event.preventDefault();

    await makeRequest(companyRegisteredNewJobRequest, setErrorRegisterNewJob, setRegisteringNewJob, newJobData);

    loadJobs();

    setNewJobData(startJobObject);

  };

  if (!userData.name) return <Modal><Spinner size={80} centered /></Modal>;

  return (
    <PageWithTitleContainer>
      <form onSubmit={handleRegisterNewJob} style={{ paddingBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <InputContainer
            // handleInputChange={(e) => handleInputChange(e, setNewJobData, newJobData)}
            name={'name'}
            type={'text'}
            labelName={'Name da empresa'}
            value={userData.name}
          />

          <InputContainer
            handleInputChange={(e) => handleInputChange(e, setNewJobData, newJobData)}
            name={'title'}
            type={'text'}
            labelName={'Título da vaga'}
            value={newJobData.title}
          />

          <InputContainer
            handleInputChange={(e) => handleInputChange(e, setNewJobData, newJobData)}
            name={'seniority'}
            type={'text'}
            labelName={'Senioridade'}
            value={newJobData.seniority}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>

          <InputContainer
            handleInputChange={(e) => handleInputChange(e, setNewJobData, newJobData)}
            name={'wage'}
            type={'text'}
            labelName={'Salário'}
            value={newJobData.wage}
          />

          <InputContainer
            handleInputChange={(e) => handleInputChange(e, setNewJobData, newJobData)}
            name={'contact'}
            type={'text'}
            labelName={'Contato'}
            value={newJobData.contact}
          />

          <InputContainer
            handleInputChange={(e) => handleInputChange(e, setNewJobData, newJobData)}
            name={'startDeadLine'}
            type={'text'}
            labelName={'Prazo para início'}
            value={newJobData.startDeadLine}
          />
        </div>
        <InputContainer
          handleInputChange={(e) => {
            handleChangeJobDescriptionObject(e, setNewJobData, newJobData);
          }}
          name={'jobDescription'}
          type={'text'}
          labelName={'Descrição da vaga'}
          value={newJobData.description.jobDescription}
          isTextArea
        />

        <InputContainer
          handleInputChange={(e) => {
            handleChangeJobDescriptionObject(e, setNewJobData, newJobData);
          }}
          name={'benefits'}
          type={'text'}
          labelName={'Benefícios da vaga'}
          value={newJobData.description.benefits}
          isTextArea
        />

        <InputContainer
          handleInputChange={(e) => {
            handleChangeJobDescriptionObject(e, setNewJobData, newJobData);
          }}
          name={'requirements'}
          type={'text'}
          labelName={'Requerimentos da vaga'}
          value={newJobData.description.requirements}
          isTextArea
        />


        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button>
            <button type='submit' disabled={registeringNewJob}>
              <span>Cadastrar nova vaga</span>
              {registeringNewJob && <Spinner size={14} />}
            </button>
          </Button>
        </div>
      </form>
    </PageWithTitleContainer>
  );
};

export default RegisterNewJob;
