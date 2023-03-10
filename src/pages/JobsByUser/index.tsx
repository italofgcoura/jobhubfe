import { useEffect, useState } from 'react';

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

  const theme = useTheme();

  useEffect(() => {

    if (params) {
      (async () => {
        try {
          const temp = await usersByJobRequest(params.id);
          if (temp) {
            setUsers(temp);
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

      {/* <ListContainer> */}

      <ListJobs listItems={users} />

      {/* </ListContainer> */}

    </PageWithTitleContainer>);
};
