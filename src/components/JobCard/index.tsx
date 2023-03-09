
import { useContext } from 'react';

import { JobContext } from '../../context/job/jobContext';

import { UserContext } from '../../context/user/userContext';
import { AuthContext } from '../../context/auth/authContext';
import { IJob } from '../../interfaces/jobInterfaces';

import { Link } from 'react-router-dom';

import SvgIcon from '../SvgIcon';

import { useTheme } from 'styled-components';

import documentCreationDate from '../../utils/documentCreationDate';

import { CardContainer, InnerCard } from './styles';

import { Button } from '../ActionButton/styles';

interface IJobCard {
  job: IJob,
  appliedPage?: boolean,
  isCompanyRegisteredJobs?: boolean
}

export default ({ job, appliedPage, isCompanyRegisteredJobs }: IJobCard) => {

  const { errorApplyingForJob } = useContext(JobContext);

  const theme = useTheme();

  const { isCompany, userData } = useContext(UserContext);

  const { isAuthenticated } = useContext(AuthContext);

  const creationDate = (date: Date) => {

    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

  };

  return (<CardContainer key={job.id}>
    <InnerCard>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: '32px' }}>
          <div>
            <div
              style={{ borderRadius: '50%', width: '50px', height: '50px', overflow: 'hidden', }}
            >
              <img src={'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
                style={{ objectFit: 'cover', objectPosition: 'center', width: '100%' }} />
            </div>
          </div>
          <p>{job.companyName}</p>

          <p>{creationDate(documentCreationDate(job.id))}</p>
        </div>
        <p style={{ paddingTop: '16px', width: '100%', textAlign: 'center', fontSize: '20px', color: theme.secondary }}>{job.title}</p>
      </div>
    </InnerCard>

    <div
      style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', width: '100%', paddingTop: '32px'
      }}
    >

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* <SvgIcon source='moneyWage' color={theme.text} /> */}
        <p>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(job.wage)) || 'Não informado'}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <SvgIcon source='seniority' color={theme.text} width={24} />
        <p>
          {job.seniority || 'Não informado'}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <SvgIcon source='calendar' color={theme.text} width={24} height={24} />
        <p>{job.startDeadLine || 'Não informado'}</p>
      </div>

    </div>

    {
      (isAuthenticated && !appliedPage && !isCompany) && <>

        {errorApplyingForJob &&
          <p>Ocorreu um erro ao condidatar. Tente novamente mais tarde.</p>
        }

        {/* {(!errorApplyingForJob) &&
          <>
            {(job.applied || job.candidates?.find(i => i === userData.userId)) &&
              <p
                style={{
                  color: theme.colors.GREEN[900],
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center', gap: '8px'
                }}
              >
                <b>Você já se candidatou para esta vaga.</b>
                <SvgIcon source='check' color={theme.colors.GREEN[900]} />
              </p>
            }
          </>
        } */}
      </>
    }

    <div style={{
      display: 'flex', justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'column'
    }}>
      {isCompanyRegisteredJobs &&
        (
          job.numberOfCandidates === 0 ?
            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center', gap: '8px',
                justifyContent: 'center'
              }}
            >
              <p style={{ color: theme.text }}>
                <b>Ainda sem candidatos para esta vaga.</b>
              </p>
              <SvgIcon source='sadFace' color={theme.text} />
            </div>
            :
            <Button>
              <Link to={`/vagas/candidatos/${job.id}`}
                className='actionButton'>visualizar candidatos</Link>
            </Button>
        )
      }

      <Button>
        <Link to={`/vagas/detalhes/${job.id}`} className='actionButton'>
          Visualizar todos dados da vaga
        </Link>
      </Button>

    </div>

  </CardContainer >);
};
