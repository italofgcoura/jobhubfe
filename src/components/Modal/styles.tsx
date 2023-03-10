import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 100
}
`;

// export const Container = styled.div`
// animation: ${FadeIn} 0.2s;
// /* padding-bottom: 32px; */
// max-width: 960px;
// width: 960px;
// `;



export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.GRAY_TRANSLUCID};
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  z-index: 9999;
  animation: ${FadeIn} 0.2s;
`;
