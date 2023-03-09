import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { jobDetailsRequest } from '../../requests/job';
import { AuthContext } from '../../context/auth/authContext';
import { UserContext } from '../../context/user/userContext';
import { JobContext } from '../../context/job/jobContext';
import { IJob } from '../../interfaces/jobInterfaces';
import makeRequest from '../../utils/makeRequest';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';

import { Button } from '../../components/ActionButton/styles';

import { useTheme } from 'styled-components';
import Message from '../../components/Message';

export default () => {

  const { isAuthenticated } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const { applyForJob, applingForJob, selectedJobDetails } = useContext(JobContext);

  const [jobDetails, setJobDetails] = useState<IJob>(selectedJobDetails);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(false);

  const [successApplied, setSuccessApplied] = useState<boolean | undefined>(undefined);

  const params = useParams();

  const theme = useTheme();

  const load = async () => {
    // const res = await jobDetailsRequest(params.id);
    const res: IJob = await makeRequest(jobDetailsRequest, setError, setLoadingDetails, params.id);
    if (res) {
      setJobDetails(res);
    }
  };

  useEffect(() => {
    if (!selectedJobDetails.id) {
      load();
    }
  }, []);

  const loading = isAuthenticated ?
    !jobDetails?.companyName || loadingDetails
    : loadingDetails;

  if (loading) {
    return <Modal>
      <Spinner centered size={84} />
    </Modal>;
  }

  const handleApplyForJob = async () => {

    const applyResul = await applyForJob(jobDetails?.id);

    if (applyResul) {
      jobDetails.applied = true;
      setSuccessApplied(true);
      return;
    }

    setSuccessApplied(false);

  };

  return (
    <PageWithTitleContainer>
      {error || !jobDetails?.id && <h1>Ocorreu um erro ao carregar as informações da vaga. Tente novamente mais tarde.</h1>}

      {!error && jobDetails?.id &&
        <div style={{ color: theme.text }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <p>{jobDetails?.companyName}</p>
            <p>Título: {jobDetails?.title}</p>
            <p>Senioridade:{jobDetails?.seniority}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <p>Salário: {jobDetails?.wage}</p>
            <p>Prazo para início: {jobDetails?.startDeadLine}</p>
            <p>Contato: {jobDetails?.contact}</p>
          </div>
          <ul>
            <li>
              <p>Descrição:</p>
              <p>{jobDetails?.description}</p>
            </li>
            <li>
              <p>Benefícios:</p>
              <p>{jobDetails?.benefits}</p>
            </li>
            <li>
              <p>Requerimentos da vaga:</p>
              <p>{jobDetails?.requirements}</p>
            </li>
          </ul>

          {jobDetails.companyRepply && <div style={{ borderTop: '1px solid red', width: '100%', paddingTop: '8px', marginTop: '8px' }}>
            <p>Resposta da empresa:</p>
            <p>{jobDetails.companyRepply}</p>
          </div>}

          {!userData.isCompany &&
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
            >

              {successApplied === true &&
                <Message message='Candidatura efetuada com sucesso.' success />
              }

              {successApplied === false &&
                <Message message='Ocorreu um erro ao efetuar sua canditura, tente novamente mais tarde.' />
              }

              {(successApplied === undefined) &&
                <>
                  {jobDetails?.applied ?
                    <Message message='Você já se candidatou a esta vaga.' success />

                    :
                    <Button
                      onClick={handleApplyForJob}
                    >
                      <button disabled={applingForJob}>
                        candidatar
                        {applingForJob && <Spinner size={10} />}
                      </button></Button>
                  }
                </>
              }
            </div>
          }
        </div>
      }
    </PageWithTitleContainer>
  );
};
