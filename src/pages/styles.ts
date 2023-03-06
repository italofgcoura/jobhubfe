import styled from 'styled-components';

export const PagesContainer = styled.div`

  min-height: calc(90vh - 34px);
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
