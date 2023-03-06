import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 100
}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${FadeIn} 0.8s;
  height: 100%;
  h1,h2{
      color: ${({ theme }) => theme.text};
      margin: 0;
    }

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 4px;
    box-shadow: 0px 0px 8px ${({ theme }) => theme.modalBg};
    border: 2px solid ${({ theme }) => theme.colors.GRAY[500]};
    width: 370px;
    min-height: 350px;
    padding: 24px 0;
    position: relative;
    margin: 16px 0;
    button{
      border-radius: 4px;
      font-weight: bold;
      background-color: ${({ theme }) => theme.colors.GREEN[500]};
      color:  ${({ theme }) => theme.colors.GREEN[900]};;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      position: relative;
      border: 2px solid ${({ theme }) => theme.colors.GREEN[900]};
      padding: 8px;
      width: 266px;
      transition: 0.2s;
      &:hover{
        box-shadow: 0px 0px 8px ${({ theme }) => theme.colors.GREEN[900]};
        background-color: ${({ theme }) => theme.colors.GREEN[900]};
        color: ${({ theme }) => theme.colors.GRAY[500]};
      }
      &:disabled{
        &:hover{
        box-shadow: none;
        }
        opacity: 0.5;
        color: ${({ theme }) => theme.colors.GRAY[900]};
        background-color: ${({ theme }) => theme.colors.GRAY[500]};
        border: 2px solid ${({ theme }) => theme.colors.GRAY[900]};
      }
    }
    .alertMsg{
      position: absolute;
      bottom: 16px;
      color: ${({ theme }) => theme.colors.RED[900]};
      font-size: ${({ theme }) => theme.fonts.medium};
      font-weight: bold;
      text-shadow: 0px 0px 16px ${({ theme }) => theme.colors.RED[900]};
    }
}
`;

export const Home = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
