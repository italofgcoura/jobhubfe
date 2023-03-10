import { useContext, useEffect, useMemo, useRef } from 'react';

import { UserContext } from '../../context/user/userContext';

import { JobContext } from '../../context/job/jobContext';

import { AuthContext } from '../../context/auth/authContext';

import Modal from '../../components/Modal';

import Spinner from '../../components/Spinner';

import ListJobs from '../../components/ListJobs';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';
import NotFound from '../../components/NotFound';

export default () => {

  const {
    loadAppliedJobs,
    appliedJobs,
    errorLoadingAppliedJobs,
    loadingAppliedJobs
  } = useContext(JobContext);

  const { loadingHome, loadingUserData, userData } = useContext(UserContext);

  const { isAuthenticated } = useContext(AuthContext);

  const jobsLoaded = useRef(false);

  useEffect(() => {
    if (!jobsLoaded.current) {
      loadAppliedJobs(false);
      jobsLoaded.current = true;
    }
  }, []);

  const loading = useMemo(() => {
    if (isAuthenticated) {
      return loadingHome || loadingUserData || loadingAppliedJobs || !userData.name;
    }
    return loadingAppliedJobs;
  }
  , [isAuthenticated, loadingAppliedJobs, loadingHome, loadingUserData, loadingAppliedJobs, !userData.name]);

  if (loading) return (<Modal>
    <Spinner size={80} centered />
  </Modal>);

  return (
    <PageWithTitleContainer>

      {(appliedJobs.length === 0) ?
        <NotFound message='Você ainda não se candidatou a nenhuma vaga...' />
        :
        <ListJobs
          errorLoading={errorLoadingAppliedJobs}
          listItems={appliedJobs}
          appliedPage
          jobCard
        />
      }
    </PageWithTitleContainer>
  );
};
