
import { ReactNode } from 'react';

import ReactDOM from 'react-dom';

import PageAnimation from '../PageAnimation';

import { Container } from './styles';

interface IProps {
  children?: ReactNode
}

// modal

const Modal = ({ children }: IProps) => {

  const modalRoot = document.getElementById('modal') as HTMLElement;

  return ReactDOM.createPortal(
    <Container >
      {children}
    </Container>, modalRoot!
  );

};

export default Modal;
