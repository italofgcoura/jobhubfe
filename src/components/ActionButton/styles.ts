import styled from 'styled-components';

export const Button = styled.div`

    gap: 16px;
    margin-top: 32px;
    width: 100%;
    font-size:0.85rem;
    height: 36px;
    position: relative;
    button,a{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: 0.3s;
      text-transform: uppercase;
      text-decoration: none;
      color: ${({ theme }) => theme.text};
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.text};
      cursor: pointer;

      &:hover{
        border: 2px solid ${({ theme }) => theme.accent};
        box-shadow: 0px 0px 8px ${({ theme }) => theme.accent};
      }

      &:disabled{
        opacity: 0.4;
        &:hover{
          border: 2px solid ${({ theme }) => theme.text};
          box-shadow: none;
          cursor: auto;
        }
    }
  }
`;
