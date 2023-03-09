export default {
  loadJobs: () => { },
  jobs: [{
    _id: '',
    companyName: '',
    title: '',
    seniority: '',
    description: {
      jobDescription: '',
      benefits: '',
      requirements: ''
    },
    wage: 0.00,
    contact: null,
    startDeadLine: null,
    applied: false
  }],
  errorLoadingJobs: false,
  loadingJobs: true,
  resetStates: () => { },
  applyForJob: (jobId: string) => { jobId; },
  errorApplyingForJob: false,
  applingForJob: false,
  job: {
    id: '',
    companyName: '',
    title: '',
    seniority: '',
    description: '',
    benefits: '',
    requirements: '',
    wage: 0.00,
    contact: '',
    startDeadLine: '',
    applied: false,
    numberOfCandidates: 0,
    applicationId: '',
    companyRepply: ''
  }
};
