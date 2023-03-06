import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    transition: 0.3s;
    /* background-color: transparent; */
  }

  body {
    background: ${({ theme }: any) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    font-family: sans-serif;

    margin: 0;
  }
`;
