import React, { useContext, ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Jobs from './pages/Jobs';
import UserData from './pages/UserProfile';
import AppliedJobs from './pages/UserAppliedJobs';
import Register from './pages/Register';
import Login from './pages/Login';
import CompanyRegisteredJobs from './pages/CompanyRegisteredJobs';

import { AuthContext } from './context/auth/authContext';
import RegisterNewJob from './pages/RegisterNewJob';
import JobsByUser from './pages/JobsByUser';
import JobDetails from './pages/JobDetails';

import ForgotMyPassword from './pages/ForgotMyPassword';

import { PagesContainer } from './pages/styles';

interface IProps {
  children: ReactNode,
}

const NotFound = () => {
  return <p>notfound</p>;
};



const ProtectedRoute: React.FC<IProps> = ({ children }) => {

  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;

};

const RouterComponent: React.FC = (): JSX.Element => {

  return (
    <Routes>

      <Route path='' element={
        <PagesContainer center><Login /></PagesContainer>}
      />

      <Route path='cadastro-usuario' element={
        <PagesContainer center><Register /></PagesContainer>}
      />

      <Route path='esqueci-senha' element={
        <PagesContainer center><ForgotMyPassword /></PagesContainer>}
      />

      <Route path='vagas'>

        <Route index element={
          <PagesContainer>
            < Jobs />
          </PagesContainer>
        } />

        <Route path='detalhes/:id' element={
          <PagesContainer>
            <JobDetails />
          </PagesContainer>
        } />

        <Route path='cadastro-vaga' element={
          <ProtectedRoute>
            <PagesContainer>
              <RegisterNewJob />
            </PagesContainer>
          </ProtectedRoute>
        } />

        {/* jobs company registereds */}
        <Route path='minhas-vagas-cadastradas' element={
          <ProtectedRoute>
            <PagesContainer>
              <CompanyRegisteredJobs />
            </PagesContainer>
          </ProtectedRoute>
        } />




        {/* jobs user applied */}
        <Route path='minhas-candidaturas' element={
          <ProtectedRoute>
            <PagesContainer>
              <AppliedJobs />
            </PagesContainer>
          </ProtectedRoute>
        } />

        <Route path='candidatos/:id' element={
          <ProtectedRoute>
            <PagesContainer>
              <JobsByUser />
            </PagesContainer>
          </ProtectedRoute>
        } />


      </Route>

      <Route path='meu-perfil' element={
        <ProtectedRoute>
          <PagesContainer>
            <UserData />
          </PagesContainer>
        </ProtectedRoute>
      } />
      <Route path='*' element={
        <ProtectedRoute>
          <PagesContainer center>
            <NotFound />
          </PagesContainer>
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default RouterComponent;
