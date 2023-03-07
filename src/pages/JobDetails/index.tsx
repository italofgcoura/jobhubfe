import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { jobDetailsRequest } from '../../requests/job';
import { AuthContext } from '../../context/auth/authContext';
import { UserContext } from '../../context/user/userContext';
import { IJob } from '../../interfaces/jobInterfaces';
import makeRequest from '../../utils/makeRequest';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';

import { Button } from '../../components/ActionButton/styles';

export default () => {

  const [jobDetails, setJobDetails] = useState<IJob>();
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [error, setError] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const params = useParams();

  const load = async () => {
    // const res = await jobDetailsRequest(params.id);
    const res: IJob = await makeRequest(jobDetailsRequest, setError, setLoadingDetails, params.id);
    if (res) {
      setJobDetails(res);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const loading = isAuthenticated ?
    !jobDetails?.companyName || loadingDetails
    : loadingDetails;

  if (loading) {
    return <Modal>
      <Spinner centered size={84} />
    </Modal>;
  }

  return (
    <PageWithTitleContainer>
      {error && <h1>Ocorreu um erro ao carregar as informações da vaga. Tente novamente mais tarde.</h1>}

      {!error && <>

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
            <p>{jobDetails?.description.jobDescription}</p>
          </li>
          <li>
            <p>Benefícios:</p>
            <p>{jobDetails?.description.benefits}</p>
          </li>
          <li>
            <p>Requerimentos da vaga:</p>
            <p>{jobDetails?.description.requirements}</p>
          </li>
        </ul>

        {!userData.isCompany &&
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            {jobDetails?.candidates?.find(i => i === userData.userId) ?
              <p>você já se candidatou a esta vaga</p>
              :
              <Button><button>candidatar</button></Button>
            }
          </div>
        }
      </>
      }
    </PageWithTitleContainer>
  );
};