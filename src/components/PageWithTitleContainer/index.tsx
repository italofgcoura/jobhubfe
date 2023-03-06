import { Page } from './styles';
import { PageContainer } from '../../styles/common';
import PageAnimation from '../PageAnimation';
interface IProps {
  children: React.ReactNode
}

export default ({ children }: IProps) => {
  return (
    <PageAnimation>
      {/* <Page> */}
      {/* <PageContainer> */}
      {children}
      {/* </PageContainer> */}
      {/* </Page> */}
    </PageAnimation>
  );
};
