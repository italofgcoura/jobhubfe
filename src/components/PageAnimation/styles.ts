import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 100
}
`;

export const Container = styled.div`
animation: ${FadeIn} 0.2s;
/* padding-bottom: 32px; */
max-width: 960px;
width: 960px;
`;
