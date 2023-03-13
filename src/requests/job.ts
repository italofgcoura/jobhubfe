import api from '../client';

const getJobsRequest = async () => {
  const result = await api.get('/jobs');

  return result.data;
};

const companyRegisteredNewJobRequest = async (jobData: object) => {
  const result = await api.post('/job', jobData);

  return result.data;
};


const jobDetailsRequest = async (jobId: any) => {
  const result = await api.get('/job-details', { params: { jobId } });

  return result.data;
};


const applyForJobRequest = async (jobId: string) => {
  const result = await api.post('/apply', { jobId });

  return result;
};


const usersByJobRequest = async (jobId: any) => {
  const result = await api.get('/users-by-job', { params: { jobId } });

  return result.data;
};

const userAppliedJobsRequest = async () => {
  const result = await api.get('/user-applied-jobs');

  return result.data;
};

const companyRegisteredJobsRequest = async () => {
  const result = await api.get('/company-registered-jobs');

  return result.data;
};

const repplyAllApplications = async (applicationReply: string, jobId: string) => {
  const result = await api.patch('/all-applications-repply', { applicationReply, jobId });

  return result;
};

const repplySingleApplication = async (applicationId: string, applicationReply: string, userId: string, selectedJobId?: string,) => {
  const result = await api.patch('/single-application-repply',
    { applicationId, applicationReply, selectedJobId, userId });

  return result;
};

// const getNotificationsRequest = async () => {
//   const result = await api.get('/notifications');

//   return result.data;
// };

// const getUserDataRequest = async () => {
//   const result = await api.get('/user-data');

//   return result.data;
// };


// const updateUserDataRequest = async (userData: object) => {
//   const result = await api.patch('/user-data', {
//     ...userData
//   });

//   return result.data;
// };

export {
  getJobsRequest, applyForJobRequest, userAppliedJobsRequest,
  companyRegisteredJobsRequest, companyRegisteredNewJobRequest,
  usersByJobRequest, jobDetailsRequest, repplyAllApplications,
  repplySingleApplication
};
