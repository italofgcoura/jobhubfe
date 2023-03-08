import { useContext, useEffect, useRef } from 'react';

import { AuthContext } from '../../context/auth/authContext';
import { UserContext } from '../../context/user/userContext';
import { JobContext } from '../../context/job/jobContext';

import { ILogin } from './interfaces';

import Spinner from '../../components/Spinner';

import Modal from '../../components/Modal';

import ListJobs from '../../components/ListJobs';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';
import NotFound from '../../components/NotFound';

const Login: React.FC<ILogin> = () => {

  const { loadingHome, loadingUserData, userData, homeError } = useContext(UserContext);

  const { loadingJobs, loadJobs, jobs, errorLoadingJobs, } = useContext(JobContext);

  const { isAuthenticated } = useContext(AuthContext);

  const jobsLoaded = useRef(false);

  useEffect(() => {
    if (!jobsLoaded.current) {
      loadJobs();
      jobsLoaded.current = true;
    }
  }, []);

  const loading = isAuthenticated ?
    loadingHome || loadingUserData || loadingJobs || userData.name === ''
    : loadingJobs;


  if (loading) return (<Modal>
    <Spinner size={80} centered />
  </Modal>);


  if (homeError) return <h1>Erro ao carregar a home...</h1>;


  return (

    <PageWithTitleContainer>

      {jobs.length === 0 ? <NotFound message='Não existem vagas cadastradas...' />
        :
        <ListJobs
          errorLoading={errorLoadingJobs}
          jobs={jobs}
        />
      }
    </PageWithTitleContainer>

  );

};

export default Login;
