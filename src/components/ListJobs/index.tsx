import JobCard from '../JobCard';

import { IListJobs } from '../../interfaces/jobInterfaces';

import { ListContainer } from '../../styles/common';

export default ({ errorLoading, jobs, appliedPage, isCompanyRegisteredJobs }: IListJobs) => {

  return (
    <ListContainer>
      {errorLoading && <p>Ocorreu um erro ao carregar as vagas...</p>}
      {!errorLoading &&
        jobs.length > 0 && jobs.map((job) => (
        <JobCard job={job} appliedPage={appliedPage} key={job.id} isCompanyRegisteredJobs={isCompanyRegisteredJobs} />
      ))
      }
    </ListContainer>
  );
};
