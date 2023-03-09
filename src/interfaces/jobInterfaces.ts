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
  applyForJob: (jobId: string) => void,
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
  reloadJobs: () => void
}

interface IListJobs {
  errorLoading: boolean,
  jobs: IJobs,
  appliedPage?: boolean,
  isCompanyRegisteredJobs?: boolean
}

export type { IJobs, IProps, IJobContext, IJob, IListJobs };
