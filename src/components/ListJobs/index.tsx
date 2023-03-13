import JobCard from '../JobCard';
import { ApplicationCard } from '../ApplicationCard';

import { IListJobs } from '../../interfaces/jobInterfaces';

import { ListContainer } from '../../styles/common';


export default ({ errorLoading, listItems, appliedPage, isCompanyRegisteredJobs, jobCard, selectedJobId }: IListJobs) => {

  return (
    <ListContainer>
      {errorLoading && <p>Ocorreu um erro ao carregar as vagas...</p>}
      {!errorLoading &&
        <>
          {jobCard &&
            listItems.map((job: any) =>
              <JobCard job={job} appliedPage={appliedPage} key={job.id} isCompanyRegisteredJobs={isCompanyRegisteredJobs} />
            )}
          {!jobCard &&
            listItems.map((item: any) =>
              <ApplicationCard job={item} key={item.id} selectedJobId={selectedJobId} />
            )
          }
        </>
      }
    </ListContainer>
  );
};
