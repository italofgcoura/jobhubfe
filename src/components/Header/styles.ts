import styled from 'styled-components';


export const Header = styled.div`
  position: sticky;
  top: 0;
  height: calc(10vh - 2px);
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  display: flex;
  justify-content: center;
  z-index: 99;
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
    h1{
        font-size: 16px;
        margin-bottom: 0;
    }
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
    }


  }
`;
