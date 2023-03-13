import { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';

import { usersByJobRequest } from '../../requests/job';

import { IUserData, IUsers } from '../../interfaces/userInterfaces';

import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';

import { ListContainer } from '../../styles/common';
import ReplyModal from '../../components/ReplyModal';

import { repplySingleApplication } from '../../requests/job';

import { useTheme } from 'styled-components';

import ListJobs from '../../components/ListJobs';

export default () => {

  const params = useParams();

  const [users, setUsers] = useState<IUsers>([]);

  const [loading, setLoading] = useState(true);

  const [selectedJobId, setSelectecJobId] = useState(params.id);

  const theme = useTheme();

  useEffect(() => {

    if (params) {
      (async () => {
        try {
          const { users } = await usersByJobRequest(params.id);
          if (users) {
            setUsers(users);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }

  }, [params]);



  if (loading) return <Modal><Spinner centered size={80} /></Modal>;

  if (users.length === 0) return <h1>No users</h1>;

  return (
    <PageWithTitleContainer>

      <ListJobs listItems={users} selectedJobId={selectedJobId} />

    </PageWithTitleContainer>);
};
