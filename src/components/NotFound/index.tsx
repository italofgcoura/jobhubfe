
import SvgIcon from '../SvgIcon';

import { useTheme } from 'styled-components';

interface IProps {
  message: string
}

export default ({ message }: IProps) => {

  const theme = useTheme();

  const color = theme.text;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: color }}>{message}</h1>
      <SvgIcon source="sadFace" width={150} height={150} color={color} />
    </div>
  );
};
