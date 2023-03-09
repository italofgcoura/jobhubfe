import { useTheme } from 'styled-components';

import SvgIcon from '../SvgIcon';

interface iProps {
  message: string,
  success?: boolean,
}

export default ({ message, success }: iProps) => {

  const theme = useTheme();

  return (
    <p
      style={{
        color: success ? theme.colors.GREEN[900] : theme.colors.RED[900],
        marginTop: '32px',
        display: 'flex',
        alignItems: 'center', gap: '8px'
      }}
    >
      <b>{message}</b>
      <SvgIcon source={success ? 'check' : 'fail'}
        color={success ? theme.colors.GREEN[900] : theme.colors.RED[900]}
      />
    </p>
  );
};
