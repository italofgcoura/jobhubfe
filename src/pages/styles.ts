import styled from 'styled-components';

interface iProps {
  center?: boolean
}

export const PagesContainer = styled.div<iProps>`

  min-height: calc(90vh - 34px);
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ center }) => center ? 'center' : 'flex-start'} ;
`;
