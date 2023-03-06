import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { useTheme } from 'styled-components';

import done from '../../assets/done_black_24dp.svg';

// import Spinner from '../Spinner';
import { Button } from './styles';

interface IProps {
  children: ReactNode,
}

const ButtonContainer = styled.button``;

export default ({ children }: IProps) => {

  const theme = useTheme();

  // const alreadyAppliedMsg = 'Você já se candidatou para esta vaga.';

  // const applyMsg = 'Candidatar';

  // const visualizeCandidates = 'visualizar candidatos';

  return (
    <Button>
      {/* Você já se candidatou para esta vaga.
      <img src={done} alt='' /> */}
      {children}
    </Button>
  );
};
