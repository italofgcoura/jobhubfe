import styled from 'styled-components';

export const Footer = styled.div`
background-color: ${({ theme }) => theme.pageBackgroundColor};
/* border-top: 2px solid ${({ theme }) => theme.primary}; */
display: flex;
justify-content: center;
`;

export const FooterContainer = styled.div`
width: 100%;
max-width: 960px;
display: inherit;
justify-content: space-between;
padding: 8px 0;
color: ${({ theme }) => theme.text};
`;
