interface IJob {
  id: string,
  companyName: string,
  title: string,
  seniority: string,
  description: string,
  benefits: string,
  requirements: string,
  wage: number,
  contact: string,
  startDeadLine: string,
  applied?: boolean,
  numberOfCandidates?: number
  applicationId: string,
  companyRepply: string
}

type IJobs = Array<IJob>

interface IProps {
  children?: React.ReactNode;
}

interface IJobContext {
  loadJobs: () => void,
  jobs: IJobs,
  errorLoadingJobs: boolean,
  loadingJobs: boolean,
  resetStates: () => void,
  applyForJob: (jobId: string) => Promise<boolean>,
  errorApplyingForJob: boolean,
  applingForJob: boolean,
  loadAppliedJobs: (reload: boolean) => void,
  appliedJobs: IJob[],
  errorLoadingAppliedJobs: boolean,
  loadingAppliedJobs: boolean,
  companyJobs: any[],
  loadCompanyRegisteredJobs: () => void,
  loading: boolean,
  error: boolean,
  reloadJobs: () => void,
  selectedJobDetails: IJob,
  handleSelectJob: (job: IJob) => void
}

interface IListJobs {
  errorLoading: boolean,
  jobs: IJobs,
  appliedPage?: boolean,
  isCompanyRegisteredJobs?: boolean
}

export type { IJobs, IProps, IJobContext, IJob, IListJobs };
