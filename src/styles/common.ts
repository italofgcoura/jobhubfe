import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 960px;
  width: 960px;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 16px));
  gap: 32px;
  transition: 0.3s;
  padding: 32px 0;
  @media(max-width: 768px){
    grid-template-columns: auto;
    width: 720px;
  }
`;
