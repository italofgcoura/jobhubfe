import { useState } from 'react';
import handleInputChange from '../../utils/handleInputChange';
import ActionButton from '../ActionButton';
import InputContainer from '../InputContainer';
import Modal from '../Modal';
import SvgIcon from '../SvgIcon';
import { useTheme } from 'styled-components';
interface iProps {
  showRepplyModal: boolean,
  onCloseModal: () => void,
  handleSubmitRepply: (...args: any) => void,
}

export default ({ showRepplyModal, onCloseModal, handleSubmitRepply }: iProps) => {

  if (!showRepplyModal) return null;

  const theme = useTheme();

  const [repply, setRepply] = useState({ text: '' });

  return (
    <Modal>
      <div style={{
        width: '550px', height: '300px',
        backgroundColor: theme.pageBackgroundColor,
        borderRadius: 4,
        padding: 24, display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxShadow: `0px 0px 10px ${theme.text}`
      }}>
        <h3 style={{ color: theme.text }}>RESPOSTA</h3>
        <InputContainer
          handleInputChange={(e) => handleInputChange(e, setRepply, repply)}
          name='text'
          type='text'
          labelName='Resposta'
          value={repply.text}
          isTextArea
        />
        <ActionButton>
          <button
            disabled={repply.text.length < 5}
            onClick={() => handleSubmitRepply(repply.text)}
          >ENVIAR RESPOSTA</button>
        </ActionButton>
        <button onClick={onCloseModal}
          style={{
            position: 'absolute', right: 0, top: 0,
            backgroundColor: 'transparent', border: 'none', cursor: 'pointer'
          }}
        >
          <SvgIcon source='fail' color={theme.colors.RED[900]} />
        </button>
      </div>
    </Modal>
  );
};
