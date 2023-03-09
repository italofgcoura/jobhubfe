import { useState, useEffect, useRef, createRef } from 'react';

import { useTheme } from 'styled-components';

import { InputContainer } from './styles';

interface IField {
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  labelName?: string;
  type?: string;
  name?: string;
  userLogin?: object;
  value?: string | number;
  style?: object,
  size?: number,
  isTextArea?: boolean,
  disabled?: boolean
}

export default ({ handleInputChange, name, type, labelName, value, style, size, isTextArea, disabled }: IField) => {

  const isFirstLoad = useRef<null | boolean>(true);

  const inputRefTextArea = createRef<HTMLTextAreaElement>();

  const inputRef = createRef<HTMLInputElement>();

  const [focusStyle, setFocusStyle] = useState({});

  const theme = useTheme();

  const handleFocus = () => {

    setFocusStyle({ top: '-18px', color: theme.text });

  };

  useEffect(() => {
    if (!value) {
      handleBlur();
    } else {
      handleFocus();
    }
  }, [theme]);


  const handleBlur = () => {
    if (!value) {
      setFocusStyle({});
    }
  };

  const handleLabelClick = () => {
    if (!disabled) {
      handleFocus();
      inputRef.current?.focus();
      inputRefTextArea.current?.focus();
    }
  };

  useEffect(() => {
    if (isFirstLoad.current === false && value) {
      handleFocus();
      isFirstLoad.current = null;
    }
    isFirstLoad.current = false;
  }, [value, isFirstLoad.current, disabled]);

  const inputContainerStyle = {
    width: size ?? '100%', ...style
  };

  return (
    <InputContainer
      style={inputContainerStyle}
      disabled={disabled}
    >
      <label
        style={focusStyle}
        onClick={handleLabelClick}
      >{labelName}:</label>
      {!isTextArea &&
        <input
          type={type}
          name={name}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          ref={inputRef}
          readOnly={handleInputChange === undefined}
          disabled={disabled}
        />
      }
      {isTextArea &&
        <>
          <textarea
            name={name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            ref={inputRefTextArea}
            readOnly={handleInputChange === undefined}
            style={{ height: '100px', resize: 'none' }}
            disabled={disabled}
          />
          <label style={{
            bottom: '-15px', top: 'unset', fontSize: '10px', right: 0, left: 'unset'
          }}>Caracteres disponíveis: {value ?
              500 - value?.toString().length || 0
              : 500} </label>
        </>
      }
    </InputContainer >
  );
};
