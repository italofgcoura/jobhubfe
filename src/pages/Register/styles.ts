import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 100
}
`;

export const RegisterContainer = styled.div`
animation: ${FadeIn} 0.5s;
display: flex;
justify-content: center;
width: 100%;
align-items: center;
`;
