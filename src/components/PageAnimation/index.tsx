import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode,
}

import { Container } from './styles';

export default ({ children }: IProps) => {

  return <Container>{children}</Container>;
};
