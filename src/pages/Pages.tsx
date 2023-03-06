// import { useContext } from 'react';

import RouterComponent from '../routes';
import Footer from '../components/Footer';
import Header from '../components/Header';

// import { AuthContext } from '../context/auth/authContext';
// import { UserContext } from '../context/user/userContext';
import { PagesContainer } from './styles';


export default () => {

  // const { isAuthenticated } = useContext(AuthContext);
  // const { userData } = useContext(UserContext);

  return (
    <>
      <Header />
      <PagesContainer>
        <RouterComponent />
      </PagesContainer>
      <Footer />
      {/* {(isAuthenticated && userData.name) && <Footer />} */}
    </>
  );
};
