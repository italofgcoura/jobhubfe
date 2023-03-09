import styled from 'styled-components';


export const Header = styled.div`
  position: sticky;
  top: 0;
  height: calc(10vh - 2px);
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  display: flex;
  justify-content: center;
  z-index: 999;
  border-bottom: 2px solid ${({ theme }) => theme.primary};

  .active{
    color: ${({ theme }) => theme.accent};
    border-bottom: 2px solid ${({ theme }) => theme.accent};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  max-width: 960px;
  width: 960px;
  a{
      text-decoration: none;
  }
`;

export const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;

  li{
      list-style: none;
    a{
      text-decoration: none;
      color: ${({ theme }) => theme.text};
      text-transform: uppercase;
      font-size: 13px;
      font-weight: bold;
      border-bottom: 2px solid ${({ theme }) => theme.text};
      &:hover{
        color: ${({ theme }) => theme.accent};
        border-bottom: 2px solid ${({ theme }) => theme.accent};
      }
    }
  }

`;

export const UserSalutation = styled.h3`
  font-size: 14px;
  color: ${({ theme }) => theme.accent};
`;

export const LoginButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.pageBackgroundColor};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: 0.2s;
  text-transform: uppercase;
  gap: 4px;
  &:hover{
    border: 1px solid ${({ theme }) => theme.accent};
  }
`;

export const ThemeSelector = styled(LoginButton)`
  border: none;
  &:hover{
    border: none;
  }
`;
