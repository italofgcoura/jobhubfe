
import { Container, Home } from './styles';

interface IProps {
  children: React.ReactNode
}

export default ({ children }: IProps) => {
  return (
    // <Home>
    <Container>
      {children}
    </Container >
    // </Home>
  );
};
