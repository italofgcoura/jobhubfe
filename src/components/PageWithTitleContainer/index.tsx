import PageAnimation from '../PageAnimation';
interface IProps {
  children: React.ReactNode
}

export default ({ children }: IProps) => {
  return (
    <PageAnimation>

      {children}

    </PageAnimation>
  );
};
