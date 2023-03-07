import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface ISpinner {
  size: number;
  centered?: boolean;
}

export const Spinner = styled.div<ISpinner>`
  animation: ${rotate360} 1s none infinite;
  border-top: 4px solid ${({ theme }) => theme.text};
  border-right: 4px solid ${({ theme }) => theme.text};
  border-bottom: 4px solid ${({ theme }) => theme.text};
  border-left: 4px solid ${({ theme }) => theme.colors.YELLOW};
  background: transparent;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  position: ${({ centered }) => centered ? 'relative' : 'absolute'};
  right: ${({ centered }) => centered ? 'undefined' : '10px'};
`;
