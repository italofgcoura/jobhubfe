import { useState } from 'react';
import { repplySingleApplication } from '../../requests/job';
import ReplyModal from '../ReplyModal';
import { useTheme } from 'styled-components';
interface iProps {
  job: any,
  selectedJobId?: string
}

export const ApplicationCard = ({ job, selectedJobId }: iProps) => {

  const [showRepplyModal, setShowRepplyModal] = useState(false);

  const theme = useTheme();

  const handleModal = () => {
    setShowRepplyModal((prevState) => !prevState);
  };

  const handleSubmitRepplyToSingle = async (applicationReply: string) => {

    return await repplySingleApplication(job.applicationId, applicationReply, job.id, selectedJobId,);

  };

  return (<>
    <ReplyModal showRepplyModal={showRepplyModal} onCloseModal={handleModal}
      handleSubmitRepply={handleSubmitRepplyToSingle} />
    <div style={{
      display: 'flex', gap: 8, border: '1px solid #000',
      padding: 16, flexDirection: 'column', color: theme.text
    }}>
      <p>{job.name}</p>
      <p>{job.email}</p>
      <p>{job.userDescription}</p>
      {/* <div style={{ display: 'flex', gap: 8 }}>
    {user.userTechnologies.map((tech) =>
      <span>{tech.name}</span>)}
  </div> */}
      <button onClick={handleModal}>Responder candidatura</button>
    </div>
  </>
  );
};
