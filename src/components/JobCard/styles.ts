import styled from 'styled-components';

export const CardContainer = styled.div`
  box-shadow: 0px 0px 3px ${({ theme }) => theme.text};
  padding: 16px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p{
    color: ${({ theme }) => theme.text};
    margin:0;
  }


  /* .actionButton{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 2px solid ${({ theme }) => theme.text};
    margin-top: 32px;
    width: 100%;
    transition: 0.3s;
    text-transform: uppercase;
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    width: 100%;
    font-size:0.85rem;
    background-color: transparent;

    &:hover{
      border: 2px solid ${({ theme }) => theme.accent};
      box-shadow: 0px 0px 8px ${({ theme }) => theme.accent};
    }

    &:disabled{
      &:hover{
        border: 2px solid ${({ theme }) => theme.text};
        box-shadow: none;
      }
    }
  } */
`;

export const InnerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 16px;
  width: 100%;
  p{
    color: ${({ theme }) => theme.text};
  }
`;


