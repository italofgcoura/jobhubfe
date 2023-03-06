import { Link } from 'react-router-dom';

import { LinkContainer } from './styles';

interface IProps {
  path: string;
  text: string;
}

export default ({ path, text }: IProps) => {
  return (
    <LinkContainer>
      <Link to={path}>{text}</Link>
    </LinkContainer>
  );
};
