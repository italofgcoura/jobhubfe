import { useContext, useEffect } from 'react';
import { JobContext } from '../../context/job/jobContext';

import ListJobs from '../../components/ListJobs';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';

export default () => {

  const { companyJobs, loadCompanyRegisteredJobs, loading, error } = useContext(JobContext);

  useEffect(() => {
    if (companyJobs.length === 0) {

      loadCompanyRegisteredJobs();

    }
  }, []);

  if (loading) return <Modal><Spinner size={80} centered /></Modal>;

  return (
    <PageWithTitleContainer>
      {(companyJobs.length === 0) ? <p>Ainda não tem vagas cadastradas</p>
        :
        <ListJobs
          errorLoading={error}
          jobs={companyJobs}
          isCompanyRegisteredJobs
        />
      }
    </PageWithTitleContainer>
  );
};
