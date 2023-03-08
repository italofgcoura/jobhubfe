import styled from 'styled-components';

interface iInputContainer {
  width?: string,
  disabled?: boolean
}

export const InputContainer = styled.div<iInputContainer>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 40px;

  label{
    position: absolute;
    left: 8px;
    top: 13px;
    font-size: ${({ theme }) => theme.fonts.medium};
    transition: 0.2s;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    padding: 2px;
    z-index: 99;
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  }

  input, textArea{
    padding: 12px 8px;
    width: calc(100% - 20px);
    border: 2px solid ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.pageBackgroundColor};
    border-radius: 4px;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    transition: 0.2s;
    outline: 0;
    font-size: ${({ theme }) => theme.fonts.medium};

    &:focus{
      border: 2px solid ${({ theme }) => theme.accent};
    }

    &:disabled{
      opacity: 0.5;
      cursor: auto;
    }
  }

`;
