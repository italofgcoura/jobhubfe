import { useTheme } from 'styled-components';

import SvgIcon from '../SvgIcon';
import { Message } from './styles';

interface iProps {
  message: string,
  success?: boolean,
}

export default ({ message, success }: iProps) => {

  const theme = useTheme();

  return (

    <Message success={success}>

      <b>{message}</b>
      <SvgIcon source={success ? 'check' : 'fail'}
        color={success ? theme.colors.GREEN[900] : theme.colors.RED[900]}
      />

    </Message>

  );
};
