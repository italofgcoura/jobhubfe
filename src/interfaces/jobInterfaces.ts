interface IJob {
  _id: string,
  companyName: string,
  title: string,
  seniority: string,
  description: {
    jobDescription: string,
    benefits: string,
    requirements: string
  },
  wage: string,
  contact: string,
  startDeadLine: string,
  applied?: boolean,
  candidates?: string[]
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
  error: boolean
}

interface IListJobs {
  errorLoading: boolean,
  jobs: IJobs,
  appliedPage?: boolean,
  isCompanyRegisteredJobs?: boolean
}

export type { IJobs, IProps, IJobContext, IJob, IListJobs };
