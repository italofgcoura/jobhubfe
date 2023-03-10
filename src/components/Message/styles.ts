import styled, { keyframes } from 'styled-components';

interface iMessage {
  success?: boolean
}

const FadeIn = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 100
}
`;

export const Message = styled.p<iMessage>`
  color: ${({ success, theme }) => success ? theme.colors.GREEN[900] : theme.colors.RED[900]};
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${FadeIn} 0.2s;
`;
