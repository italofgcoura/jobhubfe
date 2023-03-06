import { ReactNode } from 'react';
import PageAnimation from '../PageAnimation';

import { Container } from './styles';

interface IProps {
  children?: ReactNode
}

const Modal = ({ children }: IProps) => {
  return (
    // <PageAnimation>
    <Container >
      {children}
    </Container>
    // </PageAnimation>
  );
};

export default Modal;
