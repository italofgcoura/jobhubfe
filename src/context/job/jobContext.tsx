import { createContext, useMemo, useState, useCallback } from 'react';

import { IJobs, IProps, IJobContext, IJob, } from '../../interfaces/jobInterfaces';

import makeRequest from '../../utils/makeRequest';

import { applyForJobRequest, getJobsRequest, userAppliedJobsRequest, companyRegisteredJobsRequest } from '../../requests/job';

import initialValues from './initialValues';

import documentCreationDate from '../../utils/documentCreationDate';

// import { auth } from '../../firebase';

const initial = {};

const JobContext = createContext<IJobContext>(initial as IJobContext);

const JobProvider = ({ children }: IProps) => {

  const [loadingJobs, setLoadingJobs] = useState(initialValues.loadingJobs);

  const [jobs, setJobs] = useState<IJobs>([]);

  const [appliedJobs, setAppliedJobs] = useState([]);

  const [errorLoadingAppliedJobs, setErrorLoadingAppliedJobs] = useState(false);

  const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(true);

  const [errorLoadingJobs, setErrorLoadingJobs] = useState(initialValues.errorLoadingJobs);

  const [errorApplyingForJob, seterrorApplyingForJob] = useState(initialValues.errorApplyingForJob);

  const [applingForJob, setLoadingApplyingForJob] = useState(initialValues.errorApplyingForJob);

  const [companyJobs, setCompanyJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [selectedJobDetails, setSelectedJobDetails] = useState<IJob>(initialValues.job);

  const handleSelectJob = useCallback((job: IJob) => {
    setSelectedJobDetails(job);
  }, []);

  const loadJobs = async () => {

    if (jobs.length === 0) {

      setLoadingJobs(true);

      const res: IJobs = await makeRequest(getJobsRequest, setErrorLoadingJobs, setLoadingJobs);

      setJobs(res?.sort((a, b) => documentCreationDate(b?.id).getTime() - documentCreationDate(a?.id).getTime()));

      return;
    }

    setLoadingJobs(false);

  };

  const reloadJobs = async () => {

    const res: IJobs = await makeRequest(getJobsRequest, setErrorLoadingJobs, setLoadingJobs);

    setJobs(res?.sort((a, b) => documentCreationDate(b?.id).getTime() - documentCreationDate(a?.id).getTime()));

  };

  const applyForJob = async (jobId: string) => {

    const successApplied = await makeRequest(applyForJobRequest, seterrorApplyingForJob, setLoadingApplyingForJob, jobId);

    if (successApplied) {

      reloadJobs();

    }

    return successApplied;

  };

  const loadAppliedJobs = async (reload?: boolean) => {

    if (appliedJobs.length === 0 || reload) {

      const res = await makeRequest(userAppliedJobsRequest, setErrorLoadingAppliedJobs, setLoadingAppliedJobs);

      if (res) {
        setAppliedJobs(res);
      }
    }
  };

  const loadCompanyRegisteredJobs = async () => {
    const res = await makeRequest(companyRegisteredJobsRequest, setError, setLoading);

    if (res) {
      setCompanyJobs(res);
    }
  };

  const resetStates = () => {
    setJobs([]);
    setAppliedJobs([]);
  };

  const values = useMemo(() => ({
    loadJobs,
    jobs,
    errorLoadingJobs,
    loadingJobs,
    resetStates,
    applyForJob,
    errorApplyingForJob,
    applingForJob,
    loadAppliedJobs,
    appliedJobs,
    errorLoadingAppliedJobs,
    loadingAppliedJobs,
    companyJobs,
    loadCompanyRegisteredJobs,
    loading,
    error,
    reloadJobs,
    handleSelectJob,
    selectedJobDetails
  }), [loadJobs,
    jobs,
    errorLoadingJobs,
    loadingJobs,
    resetStates,
    applyForJob,
    errorApplyingForJob,
    applingForJob,
    loadAppliedJobs,
    appliedJobs,
    errorLoadingAppliedJobs,
    loadingAppliedJobs,
    companyJobs,
    loadCompanyRegisteredJobs,
    loading,
    error,
    reloadJobs,
    handleSelectJob,
    selectedJobDetails
  ]);

  return (
    <JobContext.Provider value={values}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };
