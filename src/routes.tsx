import React, { useContext, ReactNode, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

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

      <Route path='' element={<Login />} />

      <Route path='cadastro-usuario' element={<Register />} />

      <Route path='esqueci-senha' element={<ForgotMyPassword />} />

      <Route path='vagas'>

        <Route index element={
          // <ProtectedRoute>
          < Jobs />
          // </ProtectedRoute>
        } />

        <Route path='detalhes/:id' element={
          <JobDetails />
        } />

        <Route path='cadastro-vaga' element={
          <ProtectedRoute>
            <RegisterNewJob />
          </ProtectedRoute>
        } />

        {/* jobs company registereds */}
        <Route path='minhas-vagas-cadastradas' element={
          <ProtectedRoute>
            <CompanyRegisteredJobs />
          </ProtectedRoute>
        } />




        {/* jobs user applied */}
        <Route path='minhas-candidaturas' element={
          <ProtectedRoute>
            <AppliedJobs />
          </ProtectedRoute>
        } />

        <Route path='candidatos/:id' element={
          <ProtectedRoute>
            <JobsByUser />
          </ProtectedRoute>
        } />


      </Route>

      {/* new job register */}
      {/* <Route path='/vagas/cadastro-vaga' element={
          <ProtectedRoute>
            <RegisterNewJob />
          </ProtectedRoute>
        } /> */}

      <Route path='meu-perfil' element={
        <ProtectedRoute>
          <UserData />
        </ProtectedRoute>
      } />

      {/* jobs user applied
        <Route path='/minhas-vagas' element={
          <ProtectedRoute>
            <AppliedJobs />
          </ProtectedRoute>
        } /> */}

      <Route path='*' element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default RouterComponent;
