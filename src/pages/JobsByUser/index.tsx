import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { usersByJobRequest } from '../../requests/job';

import { IUserData, IUsers } from '../../interfaces/userInterfaces';

import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import PageWithTitleContainer from '../../components/PageWithTitleContainer';

import { ListContainer } from '../../styles/common';

export default () => {

  const params = useParams();

  const [users, setUsers] = useState<IUsers>([]);

  const [loading, setLoading] = useState(true);

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

  return <PageWithTitleContainer>
    <ListContainer>
      {
        users.map((user: IUserData) =>
          <div style={{ display: 'flex', gap: 8, border: '1px solid #000', padding: 16, flexDirection: 'column' }}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.userDescription}</p>
            {/* <div style={{ display: 'flex', gap: 8 }}>
              {user.userTechnologies.map((tech) =>
                <span>{tech.name}</span>)}
            </div> */}
          </div>
        )}
    </ListContainer>
  </PageWithTitleContainer>;
};
